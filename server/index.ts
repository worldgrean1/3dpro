import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import apiRouter from './routes/api';
import { GeminiLiveService } from './services/GeminiLiveService';
import { rateLimitService } from './services/RateLimitService';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';
const MAX_WS_SESSION_MS = Number(process.env.MAX_WS_SESSION_MS || 10 * 60 * 1000);
const WS_HEARTBEAT_MS = Number(process.env.WS_HEARTBEAT_MS || 30 * 1000);
const WS_UPGRADE_RATE_LIMIT = Number(process.env.WS_UPGRADE_RATE_LIMIT || 20);
const WS_UPGRADE_RATE_WINDOW_MS = Number(process.env.WS_UPGRADE_RATE_WINDOW_MS || 60 * 1000);
const WS_MAX_CONCURRENT_PER_IP = Number(process.env.WS_MAX_CONCURRENT_PER_IP || 3);

// Common middleware
app.use(express.json());

// API Routes
app.use('/api', apiRouter);

// Serve static assets in production
if (isProduction) {
  const distPath = path.resolve(process.cwd(), 'dist');
  console.log(`[Server] Production mode: Serving static files from ${distPath}`);
  
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath, {
      etag: true,
      lastModified: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('index.html')) {
          res.setHeader('Cache-Control', 'no-cache');
          return;
        }

        if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          return;
        }

        res.setHeader('Cache-Control', 'public, max-age=3600');
      },
    }));
    
    // SPA fallback: redirect all unhandled requests to index.html (Express 5 wildcard syntax)
    app.get('*any', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    console.warn(`[Server] Warning: 'dist' folder not found at ${distPath}. Run 'npm run build' first.`);
    app.get('*any', (req, res) => {
      res.status(404).send('Static frontend assets not compiled. Please run npm run build.');
    });
  }
} else {
  console.log('[Server] Development mode: API/WebSocket server running alongside Vite dev server.');
  app.get('/', (req, res) => {
    res.send('API/WebSocket server running in development mode. Use Vite on port 3001.');
  });
}

// Create HTTP server
const httpServer = createServer(app);

// Initialize WebSocket Server
const wss = new WebSocketServer({ noServer: true });

const allowedOrigins = new Set(
  [process.env.APP_URL, ...(process.env.ALLOWED_ORIGINS || '').split(',')]
    .map((origin) => origin?.trim())
    .filter(Boolean)
);

const isAllowedOrigin = (origin?: string): boolean => {
  if (!isProduction) return true;
  if (!origin) return false;
  return allowedOrigins.has(origin);
};

const getClientIp = (request: express.Request | import('http').IncomingMessage): string => {
  const forwarded = request.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].split(',')[0].trim();
  }
  return request.socket.remoteAddress || 'unknown';
};

const rejectUpgrade = (
  socket: { write: (chunk: string) => void; destroy: () => void },
  statusCode: number,
  reason: string,
  retryAfterMs?: number
) => {
  const retryHeader =
    retryAfterMs !== undefined ? `Retry-After: ${Math.ceil(retryAfterMs / 1000)}\r\n` : '';
  socket.write(
    `HTTP/1.1 ${statusCode} ${reason}\r\n${retryHeader}Connection: close\r\n\r\n`
  );
  socket.destroy();
};

let voiceConfigCache: any = {};
const loadVoiceConfig = () => {
  try {
    const configPath = path.resolve(process.cwd(), 'src/translinkconfig/live-voice/voice_config.json');
    if (!fs.existsSync(configPath)) return;
    voiceConfigCache = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    console.log('[Server] Voice configuration loaded.');
  } catch (err) {
    console.error('[Server] Error loading voice config:', err);
    voiceConfigCache = {};
  }
};

const getSelectedVoice = (lang: string): string => {
  const langConfig = voiceConfigCache[lang] || voiceConfigCache.en;
  if (langConfig?.activeVoice) return langConfig.activeVoice;
  if (langConfig?.voices) {
    const active = Object.keys(langConfig.voices).find((k) => langConfig.voices[k] === 1);
    if (active) return active;
  }
  return 'Zephyr';
};

loadVoiceConfig();

// Handle WebSocket upgrade manually
httpServer.on('upgrade', (request, socket, head) => {
  try {
    const url = new URL(request.url || '', `http://${request.headers.host || 'localhost'}`);
    if (url.pathname === '/ws/live') {
      if (!isAllowedOrigin(request.headers.origin)) {
        rejectUpgrade(socket, 403, 'Forbidden');
        return;
      }

      const ip = getClientIp(request);
      const rateResult = rateLimitService.check(
        `ws-live-upgrade:${ip}`,
        WS_UPGRADE_RATE_LIMIT,
        WS_UPGRADE_RATE_WINDOW_MS
      );
      if (!rateResult.allowed) {
        rejectUpgrade(socket, 429, 'Too Many Requests', rateResult.retryAfterMs);
        return;
      }

      if (!rateLimitService.tryAcquireVoiceSession(ip, WS_MAX_CONCURRENT_PER_IP)) {
        rejectUpgrade(socket, 429, 'Too Many Concurrent Voice Sessions');
        return;
      }

      wss.handleUpgrade(request, socket, head, (ws) => {
        ws.once('close', () => rateLimitService.releaseVoiceSession(ip));
        wss.emit('connection', ws, request);
      });
    } else {
      rejectUpgrade(socket, 404, 'Not Found');
    }
  } catch (err) {
    console.error('[Server] Upgrade processing error:', err);
    socket.destroy();
  }
});

const apiKey = process.env.GEMINI_API_KEY || '';
if (!apiKey) {
  console.error('[Server] CRITICAL: GEMINI_API_KEY is not defined in the environment variables!');
}

const service = new GeminiLiveService(apiKey);

// WebSocket connection lifecycle handler
wss.on('connection', async (clientWs, request) => {
  console.log('[Server] Client connected to WebSocket');

  let lang = 'en';
  let welcome = true;
  try {
    const url = new URL(request.url || '', `http://${request.headers.host || 'localhost'}`);
    const rawLang = url.searchParams.get('lang') || 'en';
    lang = rawLang.toLowerCase();
    if (lang !== 'en' && lang !== 'am' && lang !== 'ar') {
      lang = 'en';
    }
    const rawWelcome = url.searchParams.get('welcome');
    if (rawWelcome === 'false') {
      welcome = false;
    }
  } catch (e) {
    console.error('[Server] Error parsing connection request URL lang param:', e);
  }

  const selectedVoice = getSelectedVoice(lang);

  let isAlive = true;
  clientWs.on('pong', () => {
    isAlive = true;
  });

  const heartbeat = setInterval(() => {
    if (!isAlive) {
      clientWs.terminate();
      return;
    }
    isAlive = false;
    clientWs.ping();
  }, WS_HEARTBEAT_MS);

  const maxSessionTimer = setTimeout(() => {
    if (clientWs.readyState === clientWs.OPEN) {
      clientWs.send(JSON.stringify({ error: 'Voice session reached the maximum duration.' }));
      clientWs.close(1000, 'max_session_duration');
    }
  }, MAX_WS_SESSION_MS);

  clientWs.on('close', () => {
    clearInterval(heartbeat);
    clearTimeout(maxSessionTimer);
  });

  try {
    console.log(`[Server] Handing off client to GeminiLiveService (lang: ${lang}, voice: ${selectedVoice}, welcome: ${welcome})`);
    await service.handleConnection(clientWs, lang, selectedVoice, welcome);
  } catch (err) {
    console.error('[Server] GeminiLiveService connection handoff failed:', err);
    clientWs.send(JSON.stringify({ error: 'Failed to initialize AI Service' }));
    clientWs.close();
  }
});

// Start listening
httpServer.listen(PORT, () => {
  console.log(`[Server] Server listening on http://localhost:${PORT}`);
});

// Graceful shutdown handling
const shutdown = () => {
  console.log('[Server] Shutting down server gracefully...');
  
  // Close all websocket clients
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify({ info: 'Server shutting down' }));
      client.close();
    }
  });

  wss.close(() => {
    console.log('[Server] WebSocket server closed.');
    httpServer.close(() => {
      console.log('[Server] HTTP server closed.');
      process.exit(0);
    });
  });

  // Force close after timeout
  setTimeout(() => {
    console.error('[Server] Force shutting down...');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
