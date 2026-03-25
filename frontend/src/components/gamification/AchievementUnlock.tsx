"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import * as Icons from "lucide-react";
import { useGamificationStore } from "@/stores/gamificationStore";
import Button from "@/components/ui/Button";

export default function AchievementUnlock() {
  const { showAchievement, currentAchievement, dismiss } = useGamificationStore();

  useEffect(() => {
    if (!showAchievement) return;
    const timer = setTimeout(dismiss, 5000);
    return () => clearTimeout(timer);
  }, [showAchievement, dismiss]);

  const IconComponent = currentAchievement
    ? (Icons as any)[currentAchievement.icon] || Icons.Trophy
    : Icons.Trophy;

  return (
    <AnimatePresence>
      {showAchievement && currentAchievement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-ink-950/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={dismiss}
        >
          {/* Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: "50%", y: "50%", scale: 0 }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 60}%`,
                y: `${50 + (Math.random() - 0.5) * 60}%`,
                scale: [0, 1, 0],
              }}
              transition={{ duration: 1.5, delay: i * 0.05 }}
              className={`absolute w-3 h-3 rounded-full ${
                ["bg-brand-400", "bg-coral-400", "bg-amber-400", "bg-sage-400"][i % 4]
              }`}
            />
          ))}

          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
            className="bg-surface-100 rounded-xl p-8 text-center max-w-sm relative"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-20 h-20 rounded-xl bg-gradient-to-br from-brand-100 to-coral-100 flex items-center justify-center mx-auto mb-4"
            >
              <IconComponent className="w-10 h-10 text-brand-500" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm font-medium text-brand-500 uppercase tracking-wide mb-1"
            >
              Achievement Unlocked!
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="font-display text-xl font-bold text-ink-900 mb-1"
            >
              {currentAchievement.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-sm text-ink-500 mb-4"
            >
              {currentAchievement.description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-lg font-bold text-coral-500 mb-4"
            >
              +{currentAchievement.xp} XP
            </motion.p>

            <Button onClick={dismiss}>Awesome!</Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
