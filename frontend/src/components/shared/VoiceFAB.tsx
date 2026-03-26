"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef, useEffect } from "react";
import { Mic, MicOff, X } from "lucide-react";

// ─── Placeholder for Deepgram API connection ─────────────────
async function handleVoiceInput(audioBlob: Blob): Promise<string> {
  // TODO: Connect to Deepgram API endpoint
  // const formData = new FormData();
  // formData.append("audio", audioBlob);
  // const res = await fetch("/api/voice/transcribe", { method: "POST", body: formData });
  // const data = await res.json();
  // return data.transcript;
  console.log("[VoiceFAB] Audio blob ready for Deepgram:", audioBlob.size, "bytes");
  return "Voice transcription placeholder";
}

// ─── Waveform bars ───────────────────────────────────────────
function WaveformBars({ isActive }: { isActive: boolean }) {
  const bars = 12;
  return (
    <div className="flex items-center justify-center gap-[3px] h-8">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          animate={
            isActive
              ? {
                  height: [4, Math.random() * 24 + 8, 4],
                }
              : { height: 4 }
          }
          transition={
            isActive
              ? {
                  duration: 0.5 + Math.random() * 0.4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.05,
                }
              : { duration: 0.3 }
          }
          className="w-[3px] rounded-full bg-brand-400"
        />
      ))}
    </div>
  );
}

// ─── Mascot peeking ──────────────────────────────────────────
function MascotPeek() {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring" }}
      className="absolute -top-10 right-3"
    >
      <div className="relative">
        {/* Speech bubble */}
        <div className="bg-white rounded-xl px-3 py-1.5 shadow-soft border border-surface-200 mb-1 whitespace-nowrap">
          <p className="text-[10px] font-semibold text-ink-600">I&apos;m listening...</p>
          <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white border-b border-r border-surface-200 rotate-45" />
        </div>
        {/* Mini mascot head */}
        <div className="flex justify-end mr-1">
          <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
            <circle cx="16" cy="16" r="10" fill="#D4A04A" />
            <circle cx="16" cy="17" r="8" fill="#E6B85C" />
            <ellipse cx="8" cy="12" rx="3" ry="5" fill="#C49240" transform="rotate(-15 8 12)" />
            <ellipse cx="24" cy="12" rx="3" ry="5" fill="#C49240" transform="rotate(15 24 12)" />
            <ellipse cx="16" cy="19" rx="4" ry="3" fill="#F0D080" />
            <ellipse cx="16" cy="18" rx="1.5" ry="1" fill="#3D2B1F" />
            <circle cx="13" cy="15.5" r="1.2" fill="#3D2B1F" />
            <circle cx="19" cy="15.5" r="1.2" fill="#3D2B1F" />
            <circle cx="13" cy="15.5" r="2.5" stroke="#5A4A3A" strokeWidth="0.7" fill="none" />
            <circle cx="19" cy="15.5" r="2.5" stroke="#5A4A3A" strokeWidth="0.7" fill="none" />
            <line x1="15.5" y1="15.5" x2="16.5" y2="15.5" stroke="#5A4A3A" strokeWidth="0.7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main VoiceFAB component ─────────────────────────────────
export default function VoiceFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [permissionDenied, setPermissionDenied] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Request mic permission and start recording
  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        const result = await handleVoiceInput(audioBlob);
        setTranscript(result);
        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsListening(true);
      setTranscript("");
      setPermissionDenied(false);
    } catch {
      setPermissionDenied(true);
      setIsListening(false);
    }
  }, []);

  // Stop recording
  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsListening(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const handleToggle = () => {
    if (isOpen) {
      stopListening();
      setIsOpen(false);
      setTranscript("");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {/* Expanded voice panel */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-72 bg-white rounded-3xl shadow-elevated border border-surface-200 overflow-visible"
          >
            {/* Mascot peeking */}
            {isListening && <MascotPeek />}

            <div className="p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-display font-bold text-sm text-ink-800">Talk to the Brain</h4>
                <button
                  onClick={handleToggle}
                  className="w-7 h-7 rounded-full bg-surface-100 flex items-center justify-center hover:bg-surface-200 transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-ink-500" />
                </button>
              </div>

              {/* Waveform */}
              <div className="bg-surface-50 rounded-2xl p-4 mb-4">
                <WaveformBars isActive={isListening} />
              </div>

              {/* Transcript area */}
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-brand-50 rounded-2xl px-4 py-3 mb-4"
                >
                  <p className="text-xs text-brand-700 font-medium">{transcript}</p>
                </motion.div>
              )}

              {/* Permission denied message */}
              {permissionDenied && (
                <p className="text-xs text-rose-500 mb-3 text-center">
                  Microphone access denied. Please enable it in browser settings.
                </p>
              )}

              {/* Mic button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={isListening ? stopListening : startListening}
                className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  isListening
                    ? "bg-rose-100 text-rose-600 border-b-4 border-b-rose-300 active:border-b-0 active:mt-1"
                    : "bg-brand-500 text-white border-b-4 border-b-brand-700 active:border-b-0 active:mt-1"
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    Start Listening
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className="relative w-14 h-14 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-fab hover:bg-brand-400 transition-colors"
      >
        {/* Soft pulse ring */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-brand-400"
          />
        )}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 relative z-10" />
            </motion.div>
          ) : (
            <motion.div
              key="mic"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Mic className="w-5 h-5 relative z-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
