"use client";

import { motion } from "framer-motion";
import { Wind, Coffee, Heart } from "lucide-react";
import Button from "@/components/ui/Button";

interface BrainBreakModalProps {
  onBreathing: () => void;
  onPause: () => void;
  onContinue: () => void;
}

export default function BrainBreakModal({ onBreathing, onPause, onContinue }: BrainBreakModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-[#FCF9F1] rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-elevated text-center"
      >
        {/* Pulsing heart */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4"
        >
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
        </motion.div>

        <h3 className="font-display text-xl font-bold text-ink-900 mb-2">
          Time for a Brain Break
        </h3>
        <p className="text-sm text-ink-500 mb-6 leading-relaxed">
          Your brain works best with rest. Take a quick breather — you&apos;ll come back sharper.
        </p>

        <div className="space-y-2">
          <Button onClick={onBreathing} className="w-full" icon={<Wind className="w-4 h-4" />}>
            Breathing Exercise
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onPause} className="flex-1" icon={<Coffee className="w-4 h-4" />}>
              Take a Break
            </Button>
            <Button variant="secondary" onClick={onContinue} className="flex-1">
              Keep Going
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
