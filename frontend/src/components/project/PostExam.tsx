"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Button from "@/components/ui/Button";

interface PostExamProps {
  onComplete: (feeling: string) => void;
}

const feelings = [
  { value: "great", label: "Great", emoji: "🎉" },
  { value: "okay", label: "Okay", emoji: "👍" },
  { value: "tough", label: "Tough", emoji: "😓" },
  { value: "unsure", label: "Not sure", emoji: "🤷" },
];

export default function PostExam({ onComplete }: PostExamProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-100 rounded-xl p-6 shadow-soft border border-surface-200 text-center"
    >
      <h2 className="font-display text-xl font-bold text-ink-900 mb-6">How did it go?</h2>

      <div className="grid grid-cols-2 gap-3 mb-6 max-w-xs mx-auto">
        {feelings.map((f) => (
          <motion.button
            key={f.value}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(f.value)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selected === f.value ? "border-brand-400 bg-brand-100" : "border-surface-200 hover:border-surface-200"
            }`}
          >
            <span className="text-3xl block mb-1">{f.emoji}</span>
            <span className="text-sm font-medium text-ink-900">{f.label}</span>
          </motion.button>
        ))}
      </div>

      <Button onClick={() => selected && onComplete(selected)} disabled={!selected}>
        See your Study Wrapped
      </Button>
    </motion.div>
  );
}
