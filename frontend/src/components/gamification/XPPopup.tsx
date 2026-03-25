"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGamificationStore } from "@/stores/gamificationStore";
import { useEffect } from "react";

export default function XPPopup() {
  const { xpPopup, dismissXP } = useGamificationStore();

  useEffect(() => {
    if (!xpPopup) return;
    const timer = setTimeout(dismissXP, 1500);
    return () => clearTimeout(timer);
  }, [xpPopup, dismissXP]);

  return (
    <AnimatePresence>
      {xpPopup && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: 1, y: -40, scale: 1 }}
          exit={{ opacity: 0, y: -80 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          style={{ left: xpPopup.x, top: xpPopup.y }}
          className="fixed z-[100] pointer-events-none"
        >
          <span className="font-display text-xl font-bold text-coral-500 drop-shadow-md">
            +{xpPopup.amount} XP
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
