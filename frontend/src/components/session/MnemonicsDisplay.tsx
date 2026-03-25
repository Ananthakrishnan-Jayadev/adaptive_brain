"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lightbulb, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

interface Mnemonic {
  term: string;
  mnemonic: string;
  breakdown: string;
  explanation: string;
  emoji: string;
}

interface MnemonicsDisplayProps {
  mnemonics: Mnemonic[];
  onComplete: () => void;
}

export default function MnemonicsDisplay({ mnemonics, onComplete }: MnemonicsDisplayProps) {
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [direction, setDirection] = useState(1);

  const m = mnemonics[current];
  const isRevealed = revealed.has(current);

  const reveal = () => setRevealed((prev) => new Set(prev).add(current));

  const next = () => {
    if (current < mnemonics.length - 1) {
      setDirection(1);
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    if (current > 0) {
      setDirection(-1);
      setCurrent(current - 1);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-amber-500" />
        <h2 className="font-display text-lg font-bold text-ink-900">Memory Tricks</h2>
        <span className="ml-auto text-sm text-ink-400">{current + 1} / {mnemonics.length}</span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mb-6">
        {mnemonics.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full flex-1 transition-all ${
              i === current ? "bg-amber-400" : i < current ? "bg-sage-400" : "bg-surface-200"
            }`}
          />
        ))}
      </div>

      {/* Card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction * 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -80 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="bg-surface-100 rounded-2xl border border-surface-200 shadow-warm overflow-hidden"
        >
          {/* Top — Term */}
          <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
            <p className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-1">Remember this</p>
            <h3 className="font-display text-xl font-bold text-ink-900">{m.term}</h3>
          </div>

          {/* Mnemonic */}
          <div className="px-6 py-5">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">{m.emoji}</span>
              <div>
                <p className="font-display text-lg font-bold text-brand-500 leading-tight">
                  &ldquo;{m.mnemonic}&rdquo;
                </p>
                <p className="text-sm text-ink-500 mt-1 font-mono">{m.breakdown}</p>
              </div>
            </div>

            {/* Reveal explanation */}
            {!isRevealed ? (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={reveal}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-amber-200 text-amber-600 text-sm font-medium hover:bg-amber-50 transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                Tap to see why this works
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-sage-50 rounded-xl p-4 border border-sage-100"
              >
                <p className="text-sm text-ink-700 leading-relaxed">{m.explanation}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        {current === mnemonics.length - 1 ? (
          <Button onClick={onComplete} size="md">
            Continue to quiz
          </Button>
        ) : (
          <button
            onClick={next}
            className="flex items-center gap-1 text-sm text-brand-500 hover:text-brand-600 font-medium transition-colors"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
