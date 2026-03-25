"use client";

import { motion } from "framer-motion";
import CircularProgress from "@/components/ui/CircularProgress";

interface ReadinessScoreProps {
  score: number;
  daysLeft: number;
}

function getStatusText(score: number, daysLeft: number): { text: string; color: string } {
  if (score >= 70) return { text: "Almost ready! 🎯", color: "text-sage-500" };
  if (score >= 40 && daysLeft > 5) return { text: "You're on track 👍", color: "text-brand-500" };
  if (daysLeft <= 3) return { text: "Needs attention ⚡", color: "text-coral-500" };
  return { text: "Keep pushing 💪", color: "text-amber-500" };
}

export default function ReadinessScore({ score, daysLeft }: ReadinessScoreProps) {
  const status = getStatusText(score, daysLeft);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-surface-100 rounded-xl p-6 shadow-soft border border-surface-200 text-center"
    >
      <h3 className="text-sm font-medium text-ink-500 mb-4">Readiness Score</h3>
      <div className="flex justify-center mb-4">
        <CircularProgress value={score} size={120} strokeWidth={10} />
      </div>
      <p className={`font-display font-semibold ${status.color}`}>{status.text}</p>
    </motion.div>
  );
}
