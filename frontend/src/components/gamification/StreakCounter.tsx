"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import Tooltip from "@/components/ui/Tooltip";

interface StreakCounterProps {
  count: number;
  size?: "sm" | "md" | "lg";
}

export default function StreakCounter({ count, size = "md" }: StreakCounterProps) {
  const sizeMap = { sm: "text-sm", md: "text-lg", lg: "text-3xl" };
  const iconSize = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-8 h-8" };

  return (
    <Tooltip content={`You've studied ${count} days in a row!`}>
      <div className="flex items-center gap-1.5">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="relative"
        >
          <Flame className={`${iconSize[size]} text-coral-500 fill-coral-500`} />
          <div className="absolute inset-0 animate-pulse-soft">
            <Flame className={`${iconSize[size]} text-coral-400 fill-coral-400 blur-sm`} />
          </div>
        </motion.div>
        <span className={`font-display font-bold text-ink-900 ${sizeMap[size]}`}>{count}</span>
      </div>
    </Tooltip>
  );
}
