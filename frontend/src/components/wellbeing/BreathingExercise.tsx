"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

interface BreathingExerciseProps {
  onComplete: () => void;
  onSkip: () => void;
}

const phases = [
  { label: "Breathe in...", duration: 4 },
  { label: "Hold...", duration: 4 },
  { label: "Breathe out...", duration: 4 },
];

export default function BreathingExercise({ onComplete, onSkip }: BreathingExerciseProps) {
  const [cycle, setCycle] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [totalCycles] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhaseIndex((prev) => {
        const next = prev + 1;
        if (next >= phases.length) {
          setCycle((c) => {
            if (c + 1 >= totalCycles) {
              clearInterval(timer);
              setTimeout(onComplete, 500);
              return c;
            }
            return c + 1;
          });
          return 0;
        }
        return next;
      });
    }, phases[phaseIndex].duration * 1000);

    return () => clearInterval(timer);
  }, [phaseIndex, totalCycles, onComplete]);

  const isExpanding = phaseIndex === 0;
  const isHolding = phaseIndex === 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700"
    >
      {/* Circle */}
      <motion.div
        animate={{
          scale: isExpanding ? 1.4 : isHolding ? 1.4 : 1,
          opacity: isHolding ? 0.9 : 1,
        }}
        transition={{ duration: phases[phaseIndex].duration, ease: "easeInOut" }}
        className="w-40 h-40 rounded-full bg-surface-100/20 backdrop-blur-sm flex items-center justify-center mb-8"
      >
        <motion.div
          animate={{
            scale: isExpanding ? 1.3 : isHolding ? 1.3 : 1,
          }}
          transition={{ duration: phases[phaseIndex].duration, ease: "easeInOut" }}
          className="w-24 h-24 rounded-full bg-surface-100/30"
        />
      </motion.div>

      {/* Instruction */}
      <AnimatePresence mode="wait">
        <motion.p
          key={phaseIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-2xl font-display font-semibold text-ink-900 mb-4"
        >
          {phases[phaseIndex].label}
        </motion.p>
      </AnimatePresence>

      <p className="text-ink-900/60 text-sm mb-8">
        Breath {cycle + 1} of {totalCycles}
      </p>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onSkip} className="text-ink-900/70 hover:text-ink-800 hover:bg-surface-100/10">
          Skip
        </Button>
        <Button variant="ghost" onClick={onComplete} className="text-ink-900/70 hover:text-ink-800 hover:bg-surface-100/10">
          Done
        </Button>
      </div>
    </motion.div>
  );
}
