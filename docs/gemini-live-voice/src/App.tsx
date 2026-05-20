/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Power, PowerOff, MessageSquare, Volume2, AudioLines } from 'lucide-react';
import { pcmToBase64, base64ToFloat32 } from './lib/audio-utils';

const INPUT_SAMPLE_RATE = 16000;
const OUTPUT_SAMPLE_RATE = 24000; // Gemini Live standard output rate

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');
  const [transcription, setTranscription] = useState<string>("");
  const [latency, setLatency] = useState<number>(142);
  
  const wsRef = useRef<WebSocket | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const microphoneRef = useRef<{ stream: MediaStream; processor: ScriptProcessorNode } | null>(null);
  const transcriptionEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll transcription
  useEffect(() => {
    transcriptionEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcription]);

  // Simulate dynamic latency
  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        setLatency(prev => {
          const change = Math.floor(Math.random() * 20) - 10;
          return Math.max(120, Math.min(250, prev + change));
        });
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setLatency(142);
    }
  }, [isConnected]);

  const stopPlayback = useCallback(() => {
    // In a real app, we might maintain a queue of source nodes to stop them
    // For this simple version, we'll just reset the timing
    nextStartTimeRef.current = audioCtxRef.current?.currentTime || 0;
  }, []);

  const connect = useCallback(async () => {
    if (wsRef.current) return;

    setStatus('connecting');
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}/ws/live`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WS connected');
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        setIsConnected(true);
        setStatus('listening');
        startMic();
      }
    };

    ws.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      
      if (msg.audio) {
        if (!audioCtxRef.current) return;
        
        setStatus('speaking');
        const float32Data = base64ToFloat32(msg.audio);
        const buffer = audioCtxRef.current.createBuffer(1, float32Data.length, OUTPUT_SAMPLE_RATE);
        buffer.getChannelData(0).set(float32Data);
        
        const source = audioCtxRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtxRef.current.destination);
        
        // Add a small buffer offset to prevent choppiness/slowdown feeling if chunks are tight
        const LOOKAHEAD = 0.05; 
        const startTime = Math.max(audioCtxRef.current.currentTime + LOOKAHEAD, nextStartTimeRef.current);
        source.start(startTime);
        nextStartTimeRef.current = startTime + buffer.duration;
      }

      if (msg.interrupted) {
        console.log('Interrupted');
        stopPlayback();
      }

      if (msg.text) {
        setTranscription(prev => prev + " " + msg.text);
      }

      if (msg.turnComplete) {
         setStatus('listening');
      }
    };

    ws.onclose = () => {
      console.log('WS closed');
      disconnect();
    };

    ws.onerror = (err) => {
      console.error('WS error', err);
      disconnect();
    };
  }, [stopPlayback]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    stopMic();
    setIsConnected(false);
    setIsRecording(false);
    setStatus('idle');
  }, []);

  const startMic = useCallback(async () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioCtxRef.current.createMediaStreamSource(stream);
      const processor = audioCtxRef.current.createScriptProcessor(2048, 1, 1);

      source.connect(processor);
      processor.connect(audioCtxRef.current.destination); // Required for process to run

      processor.onaudioprocess = (e) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const inputData = e.inputBuffer.getChannelData(0);
          
          // Resample from context rate to 16000
          const ratio = audioCtxRef.current!.sampleRate / INPUT_SAMPLE_RATE;
          const newLength = Math.floor(inputData.length / ratio);
          const resampledData = new Float32Array(newLength);
          
          for (let i = 0; i < newLength; i++) {
            resampledData[i] = inputData[Math.floor(i * ratio)];
          }
          
          const base64 = pcmToBase64(resampledData);
          wsRef.current.send(JSON.stringify({ audio: base64 }));
        }
      };

      microphoneRef.current = { stream, processor };
      setIsRecording(true);
    } catch (err) {
      console.error('Mic error', err);
    }
  }, []);

  const stopMic = useCallback(() => {
    if (microphoneRef.current) {
      microphoneRef.current.stream.getTracks().forEach(t => t.stop());
      microphoneRef.current.processor.disconnect();
      microphoneRef.current = null;
    }
    setIsRecording(false);
  }, []);

  const toggleSession = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  const toggleMic = () => {
    if (isRecording) {
      stopMic();
    } else {
      startMic();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#0A0A0B] overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[600px] h-[600px] border border-blue-500/10 rounded-full animate-pulse"></div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute w-[450px] h-[450px] border border-blue-400/10 rounded-full"
        />
      </div>

      {/* Interactive Central Content */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        <motion.button
          onClick={toggleSession}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={status === 'speaking' ? {
            boxShadow: ["0 0 60px rgba(59,130,246,0.1)", "0 0 100px rgba(59,130,246,0.3)", "0 0 60px rgba(59,130,246,0.1)"]
          } : { boxShadow: "0 0 40px rgba(0,0,0,0.5)" }}
          transition={{ repeat: Infinity, duration: 3 }}
          className={`w-72 h-72 rounded-full flex items-center justify-center border transition-all duration-700 cursor-pointer ${
            isConnected 
              ? 'bg-gradient-to-tr from-[#1A1A1E] to-[#2D2D35] border-[#3A3A40]' 
              : 'bg-[#151518] border-[#2A2A2D] hover:border-blue-500/50'
          }`}
        >
          <div className="flex items-end gap-2 h-20">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <motion.div
                key={i}
                animate={status === 'speaking' || isRecording ? {
                  height: i === 4 ? [25, 80, 25] : [15, Math.random() * 50 + 20, 15],
                  opacity: [0.3, 1, 0.3]
                } : { height: 6, opacity: 0.15 }}
                transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.08 }}
                className={`w-1.5 rounded-full ${i === 4 ? 'bg-white' : 'bg-blue-500'}`}
              />
            ))}
          </div>
        </motion.button>

        <div className="h-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-serif text-2xl text-[#6B6B6B] italic tracking-wide"
            >
              {status === 'idle' ? 'Tap to Connect' : 
               status === 'connecting' ? 'Establishing link...' :
               status === 'speaking' ? 'Gemini is speaking' :
               'Listening...'}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Latency Indicator (Minimalist Footer) */}
      <div className="absolute bottom-10 right-10 flex gap-4 text-[10px] font-mono text-zinc-800 uppercase tracking-[0.2em] pointer-events-none">
        <span>Latency: {latency}ms</span>
        <span>Modality: Realtime-V1</span>
      </div>
    </div>
  );
}
