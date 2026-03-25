"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useState } from "react";

const moods = [
  { value: "great", label: "Great", emoji: "😊" },
  { value: "okay", label: "Okay", emoji: "🙂" },
  { value: "stressed", label: "Stressed", emoji: "😰" },
  { value: "burnt_out", label: "Burnt Out", emoji: "😩" },
];

const energyLevels = [
  { value: "high", label: "High", emoji: "⚡" },
  { value: "medium", label: "Medium", emoji: "🔋" },
  { value: "low", label: "Low", emoji: "🪫" },
];

interface CheckInModalProps {
  onComplete: (mood: string, energy: string) => void;
}

export default function CheckInModal({ onComplete }: CheckInModalProps) {
  const [mood, setMood] = useState<string | null>(null);
  const [energy, setEnergy] = useState<string | null>(null);

  const adaptMessage = () => {
    if (mood === "burnt_out" || (mood === "stressed" && energy === "low"))
      return "Taking it easy today — shorter content, more breaks. 🌿";
    if (mood === "great" && energy === "high")
      return "Let's push hard! You're in the zone. 🚀";
    return "Let's have a solid study session. 💪";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto bg-surface-100 rounded-xl p-6 shadow-elevated"
    >
      <h2 className="font-display text-xl font-bold text-ink-900 text-center mb-1">
        Before we start...
      </h2>
      <p className="text-ink-500 text-center text-sm mb-6">How are you feeling?</p>

      {/* Mood */}
      <div className="mb-6">
        <p className="text-sm font-medium text-ink-500 mb-3">Mood</p>
        <div className="grid grid-cols-4 gap-2">
          {moods.map((m) => (
            <motion.button
              key={m.value}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMood(m.value)}
              className={`
                flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all
                ${mood === m.value
                  ? "border-brand-400 bg-brand-100"
                  : "border-surface-200 hover:border-surface-200"
                }
              `}
            >
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-xs font-medium text-ink-500">{m.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Energy */}
      <div className="mb-6">
        <p className="text-sm font-medium text-ink-500 mb-3">Energy Level</p>
        <div className="grid grid-cols-3 gap-2">
          {energyLevels.map((e) => (
            <motion.button
              key={e.value}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEnergy(e.value)}
              className={`
                flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all
                ${energy === e.value
                  ? "border-brand-400 bg-brand-100"
                  : "border-surface-200 hover:border-surface-200"
                }
              `}
            >
              <span className="text-2xl">{e.emoji}</span>
              <span className="text-xs font-medium text-ink-500">{e.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Adaptation message */}
      {mood && energy && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-center text-brand-500 bg-brand-100 rounded-xl p-3 mb-4"
        >
          {adaptMessage()}
        </motion.p>
      )}

      <Button
        onClick={() => mood && energy && onComplete(mood, energy)}
        disabled={!mood || !energy}
        className="w-full"
        size="lg"
      >
        Let&apos;s go
      </Button>
    </motion.div>
  );
}
