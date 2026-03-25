"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGamificationStore } from "@/stores/gamificationStore";
import { useEffect } from "react";

const intensityMap = { small: 10, medium: 25, large: 50 };
const colors = ["bg-brand-400", "bg-coral-400", "bg-amber-400", "bg-sage-400", "bg-brand-300"];

export default function CelebrationEffects() {
  const { showCelebration, celebrationType, dismiss } = useGamificationStore();

  useEffect(() => {
    if (!showCelebration) return;
    const timer = setTimeout(dismiss, 3000);
    return () => clearTimeout(timer);
  }, [showCelebration, dismiss]);

  const count = celebrationType ? intensityMap[celebrationType] : 0;

  return (
    <AnimatePresence>
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-[90]">
          {Array.from({ length: count }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: typeof window !== "undefined" ? Math.random() * window.innerWidth : 500,
                y: -20,
                rotate: 0,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: typeof window !== "undefined" ? window.innerHeight + 50 : 800,
                rotate: Math.random() * 720 - 360,
                x: `+=${Math.random() * 100 - 50}`,
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                ease: "easeIn",
                delay: Math.random() * 0.5,
              }}
              className={`absolute w-2.5 h-2.5 rounded-xl ${colors[i % colors.length]}`}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
