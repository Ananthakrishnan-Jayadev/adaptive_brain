"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Flame, Moon, Star, TrendingUp } from "lucide-react";
import CircularProgress from "@/components/ui/CircularProgress";
import Button from "@/components/ui/Button";
import { studyWrapped } from "@/lib/mock-data";

const screens = [
  {
    bg: "from-brand-500 to-brand-700",
    content: (
      <div className="text-ink-800 text-center">
        <p className="text-sm font-medium text-ink-900/60 mb-4">Your Study Journey</p>
        <h1 className="font-display text-4xl font-bold">{studyWrapped.project_name}</h1>
      </div>
    ),
  },
  {
    bg: "from-coral-500 to-coral-700",
    content: (
      <div className="text-ink-800 text-center">
        <p className="text-sm font-medium text-ink-900/60 mb-2">You studied for</p>
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="font-display text-7xl font-bold"
        >
          {studyWrapped.total_hours}
        </motion.p>
        <p className="font-display text-2xl font-bold text-ink-900/80">hours</p>
      </div>
    ),
  },
  {
    bg: "from-brand-600 to-brand-800",
    content: (
      <div className="text-ink-800 text-center">
        <p className="text-sm font-medium text-ink-900/60 mb-2">Across</p>
        <p className="font-display text-6xl font-bold">{studyWrapped.total_sessions}</p>
        <p className="font-display text-xl font-bold text-ink-900/80">sessions</p>
      </div>
    ),
  },
  {
    bg: "from-sage-500 to-sage-700",
    content: (
      <div className="text-ink-800 text-center">
        <p className="text-sm font-medium text-ink-900/60 mb-2">You mastered</p>
        <p className="font-display text-6xl font-bold">{studyWrapped.topics_mastered}</p>
        <p className="font-display text-xl font-bold text-ink-900/80 mb-4">topics</p>
        <Star className="w-8 h-8 mx-auto text-amber-300 fill-amber-300" />
      </div>
    ),
  },
  {
    bg: "from-amber-500 to-amber-700",
    content: (
      <div className="text-ink-800 text-center">
        <p className="text-sm font-medium text-ink-900/60 mb-2">And answered</p>
        <p className="font-display text-6xl font-bold">{studyWrapped.questions_answered}</p>
        <p className="font-display text-xl font-bold text-ink-900/80">questions</p>
      </div>
    ),
  },
  {
    bg: "from-coral-600 to-rose-600",
    content: (
      <div className="text-ink-800 text-center">
        <p className="text-sm font-medium text-ink-900/60 mb-2">Longest streak</p>
        <div className="flex items-center justify-center gap-3">
          <p className="font-display text-6xl font-bold">{studyWrapped.longest_streak}</p>
          <Flame className="w-12 h-12 text-amber-300 fill-amber-300" />
        </div>
        <p className="font-display text-xl font-bold text-ink-900/80">days</p>
      </div>
    ),
  },
  {
    bg: "from-ink-800 to-ink-950",
    content: (
      <div className="text-ink-800 text-center">
        <Moon className="w-12 h-12 mx-auto mb-4 text-amber-200" />
        <p className="text-sm font-medium text-ink-900/60 mb-2">You&apos;re a</p>
        <p className="font-display text-3xl font-bold">{studyWrapped.personality}</p>
      </div>
    ),
  },
  {
    bg: "from-sage-600 to-brand-600",
    content: (
      <div className="text-ink-800 text-center">
        <p className="text-sm font-medium text-ink-900/60 mb-2">Strongest area</p>
        <p className="font-display text-3xl font-bold mb-2">{studyWrapped.strongest_topic} 💪</p>
        <p className="text-ink-900/70">{studyWrapped.strongest_mastery}% mastery</p>
      </div>
    ),
  },
  {
    bg: "from-brand-500 to-sage-500",
    content: (
      <div className="text-ink-800 text-center">
        <TrendingUp className="w-10 h-10 mx-auto mb-4 text-ink-900/70" />
        <p className="text-sm font-medium text-ink-900/60 mb-2">Most improved</p>
        <p className="font-display text-3xl font-bold mb-2">{studyWrapped.most_improved} 📈</p>
        <p className="text-ink-900/70">
          {studyWrapped.most_improved_before}% → {studyWrapped.most_improved_after}%
        </p>
      </div>
    ),
  },
  {
    bg: "from-brand-600 to-coral-600",
    content: (
      <div className="text-center">
        <p className="text-sm font-medium text-ink-900/60 mb-4">Final readiness</p>
        <div className="bg-surface-100 rounded-xl p-8 inline-block">
          <CircularProgress value={studyWrapped.final_readiness} size={120} strokeWidth={10} />
        </div>
      </div>
    ),
  },
];

export default function StudyWrapped({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const isLast = current === screens.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className={`h-full bg-gradient-to-br ${screens[current].bg} flex flex-col items-center justify-center p-8`}
          onClick={() => !isLast && setCurrent(current + 1)}
        >
          {screens[current].content}

          {isLast && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 space-y-3">
              <Button onClick={() => router.push("/project/new")} className="bg-surface-100 text-brand-500 hover:bg-surface-100/90 border-0">
                Start Next Project
              </Button>
              <div>
                <button onClick={onClose} className="text-sm text-ink-900/60 hover:text-ink-900/80">Close</button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-surface-100 w-6" : i < current ? "bg-surface-100/90" : "bg-surface-100/30"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
