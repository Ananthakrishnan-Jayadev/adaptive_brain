"use client";

import { motion } from "framer-motion";

interface XPBarProps {
  current: number;
  goal: number;
}

export default function XPBar({ current, goal }: XPBarProps) {
  const progress = Math.min((current / goal) * 100, 100);
  const isClose = progress > 70;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-ink-500">{current} XP</span>
        <span className="text-ink-500">{goal} XP goal</span>
      </div>
      <div className="h-4 bg-surface-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="h-full rounded-full bg-gradient-to-r from-coral-400 to-coral-500 relative overflow-hidden"
        >
          {isClose && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-surface-100/30 to-transparent animate-shimmer bg-[length:200%_100%]" />
          )}
        </motion.div>
      </div>
    </div>
  );
}
