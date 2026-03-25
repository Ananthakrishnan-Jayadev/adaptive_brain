"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Pause, Play, Clock } from "lucide-react";
import { useSessionStore } from "@/stores/sessionStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface SessionHeaderProps {
  topicNames: string[];
}

export default function SessionHeader({ topicNames }: SessionHeaderProps) {
  const router = useRouter();
  const { currentTopicIndex, isPaused, pauseSession, resumeSession, elapsedMinutes, setElapsed } = useSessionStore();
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [seconds, setSeconds] = useState(elapsedMinutes * 60);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
      setElapsed(Math.floor(seconds / 60));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused, seconds, setElapsed]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-20 bg-surface-100/95 backdrop-blur-md border-b border-surface-200 px-4 py-3"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <button
          onClick={() => setShowExitConfirm(true)}
          className="p-2 rounded-xl hover:bg-surface-100 text-ink-500"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-ink-500">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-sm font-medium">{formatTime(seconds)}</span>
          </div>

          {/* Topic progress dots */}
          <div className="flex items-center gap-1.5">
            {topicNames.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i < currentTopicIndex
                    ? "bg-sage-500"
                    : i === currentTopicIndex
                    ? "bg-brand-500"
                    : "bg-surface-100"
                }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() => (isPaused ? resumeSession() : pauseSession())}
          className="p-2 rounded-xl hover:bg-surface-100 text-ink-500"
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>
      </div>

      {/* Exit confirmation */}
      {showExitConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-ink-950/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowExitConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface-100 rounded-xl p-6 max-w-sm w-full shadow-elevated"
          >
            <h3 className="font-display font-bold text-lg text-ink-900 mb-2">End session?</h3>
            <p className="text-sm text-ink-500 mb-4">Your progress will be saved.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-surface-200 text-sm font-medium text-ink-800 hover:bg-surface-100"
              >
                Keep studying
              </button>
              <button
                onClick={() => router.push("/project/proj_001")}
                className="flex-1 py-2.5 px-4 rounded-xl bg-coral-500 text-ink-800 text-sm font-medium hover:bg-coral-600"
              >
                End session
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.header>
  );
}
