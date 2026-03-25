"use client";

import { motion } from "framer-motion";
import { Coffee, Wind, Play } from "lucide-react";
import Button from "@/components/ui/Button";

interface BreakPromptProps {
  elapsedMinutes: number;
  onContinue: () => void;
  onBreathing: () => void;
  onPause: () => void;
}

export default function BreakPrompt({ elapsedMinutes, onContinue, onBreathing, onPause }: BreakPromptProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-surface-100 rounded-t-3xl shadow-elevated border-t border-surface-200 p-6"
    >
      <div className="max-w-md mx-auto text-center">
        <span className="text-3xl mb-3 block">☕</span>
        <h3 className="font-display text-lg font-bold text-ink-900 mb-2">
          You&apos;ve been studying for {elapsedMinutes} minutes
        </h3>
        <p className="text-sm text-ink-500 mb-6">Want to take a breather?</p>

        <div className="space-y-2">
          <Button onClick={onContinue} className="w-full" icon={<Play className="w-4 h-4" />}>
            I&apos;m good, keep going
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onBreathing} className="flex-1" icon={<Wind className="w-4 h-4" />}>
              Breathing exercise
            </Button>
            <Button variant="secondary" onClick={onPause} className="flex-1" icon={<Coffee className="w-4 h-4" />}>
              Just pause
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
