"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Flame, Trophy, ArrowRight } from "lucide-react";
import CircularProgress from "@/components/ui/CircularProgress";
import Button from "@/components/ui/Button";
import { currentUser } from "@/lib/mock-data";

interface SessionWrapUpProps {
  topicsCovered: string[];
  questionsCorrect: number;
  questionsTotal: number;
  timeSpent: number;
  xpEarned: number;
}

export default function SessionWrapUp({
  topicsCovered,
  questionsCorrect,
  questionsTotal,
  timeSpent,
  xpEarned,
}: SessionWrapUpProps) {
  const router = useRouter();
  const accuracy = questionsTotal > 0 ? Math.round((questionsCorrect / questionsTotal) * 100) : 0;
  const showConfetti = accuracy >= 80;

  const stats = [
    { label: "Topics Covered", value: topicsCovered.length.toString(), sub: topicsCovered.join(", ") },
    { label: "Questions", value: `${questionsCorrect}/${questionsTotal}`, sub: `${accuracy}% accuracy` },
    { label: "Time Spent", value: `${timeSpent}m`, sub: "study time" },
    { label: "XP Earned", value: `+${xpEarned}`, sub: "experience points" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-surface-50 to-brand-50/30 py-12 px-4"
    >
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: typeof window !== "undefined" ? Math.random() * window.innerWidth : 500,
                y: -20,
                rotate: 0,
              }}
              animate={{
                y: typeof window !== "undefined" ? window.innerHeight + 20 : 800,
                rotate: Math.random() * 720 - 360,
              }}
              transition={{ duration: Math.random() * 2 + 2, ease: "easeIn" }}
              className={`absolute w-2 h-2 rounded-xl ${
                ["bg-brand-400", "bg-coral-400", "bg-amber-400", "bg-sage-400"][i % 4]
              }`}
            />
          ))}
        </div>
      )}

      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="mb-6"
        >
          <span className="text-5xl">{accuracy >= 80 ? "🎉" : accuracy >= 50 ? "💪" : "📚"}</span>
        </motion.div>

        <h2 className="font-display text-2xl font-bold text-ink-900 mb-2">
          {accuracy >= 80 ? "Amazing session!" : accuracy >= 50 ? "Good work!" : "Keep going!"}
        </h2>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-3 my-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-surface-100 rounded-xl p-4 shadow-soft border border-surface-200"
            >
              <p className="font-display text-2xl font-bold text-brand-500">{stat.value}</p>
              <p className="text-xs text-ink-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Accuracy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mb-6"
        >
          <CircularProgress value={accuracy} size={100} strokeWidth={8} />
        </motion.div>

        {/* Readiness change */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-surface-100 rounded-xl p-4 shadow-soft border border-surface-200 mb-4"
        >
          <p className="text-sm text-ink-500 mb-1">Readiness Score</p>
          <p className="font-display text-lg font-bold">
            <span className="text-ink-500">42%</span>
            <span className="text-ink-500 mx-2">→</span>
            <span className="text-sage-500">48%</span>
          </p>
        </motion.div>

        {/* Streak */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <Flame className="w-5 h-5 text-coral-500 fill-coral-500" />
          <span className="font-display font-bold text-ink-900">{currentUser.current_streak}-day streak!</span>
        </motion.div>

        <Button
          onClick={() => router.push("/project/proj_001")}
          size="lg"
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
        >
          Back to Dashboard
        </Button>
      </div>
    </motion.div>
  );
}
