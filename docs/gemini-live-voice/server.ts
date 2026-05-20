import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { WebSocketServer, WebSocket } from "ws";
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;
const app = express();

async function startServer() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // WebSocket for Gemini Live API
  const wss = new WebSocketServer({ server, path: "/ws/live" });

  wss.on("connection", async (clientWs: WebSocket) => {
    console.log("Client connected to WebSocket");

    let session: any;

    try {
      session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        callbacks: {
          onmessage: (message: LiveServerMessage) => {
            // Forward model output to client
            if (message.serverContent?.modelTurn?.parts) {
              for (const part of message.serverContent.modelTurn.parts) {
                if (part.inlineData?.data) {
                  clientWs.send(JSON.stringify({ audio: part.inlineData.data }));
                }
              }
            }
            
            if (message.serverContent?.interrupted) {
              console.log("Gemini session interrupted");
              clientWs.send(JSON.stringify({ interrupted: true }));
            }

            if (message.serverContent?.turnComplete) {
              clientWs.send(JSON.stringify({ turnComplete: true }));
            }
            
            // Handle transcriptions
            if (message.serverContent?.modelTurn?.parts) {
               const text = message.serverContent.modelTurn.parts.map(p => p.text).filter(Boolean).join("");
               if (text) {
                 clientWs.send(JSON.stringify({ text }));
               }
            }
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: "You are a charming theme-appropriate AI voice assistant. For this session, you are minimal and clean. When the session starts, give a very brief and elegant welcome message. Keep your responses concise yet helpful.",
        },
      });

      // Initial welcome message - using sendRealtimeInput with a single object (no array) as per skill hints
      session.sendRealtimeInput({ text: "Show time! Give a very brief welcome to the user." });

      console.log("Connected to Gemini Live session");
    } catch (error: any) {
      console.error("Failed to connect to Gemini Live:", error);
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({ error: error.message || "Failed to connect to Gemini API" }));
      }
      clientWs.close();
      return;
    }

    clientWs.on("message", (data) => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.audio) {
          session.sendRealtimeInput({
            audio: { data: msg.audio, mimeType: "audio/pcm;rate=16000" },
          });
        }
      } catch (error) {
        console.error("Error processing message from client:", error);
      }
    });

    clientWs.on("close", () => {
      console.log("Client disconnected");
      if (session) {
        session.close();
      }
    });
  });
}

startServer();
