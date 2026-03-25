"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";

interface DailyPriorityCardProps {
  project: {
    id: string;
    name: string;
    exam_date: string;
    hours_per_day: number;
  };
}

export default function DailyPriorityCard({ project }: DailyPriorityCardProps) {
  const router = useRouter();
  const daysLeft = Math.ceil(
    (new Date(project.exam_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sage-500 via-sage-400 to-brand-500 p-5 sm:p-6 text-white shadow-warm"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-white/70" />
          <span className="text-sm font-medium text-white/80">Today&apos;s Focus</span>
        </div>

        <h3 className="font-display text-xl font-bold mb-1">{project.name}</h3>
        <p className="text-white/70 text-sm mb-4">
          Exam in {daysLeft} days &middot; {project.hours_per_day} hrs recommended today
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push(`/session/session_active`)}
          className="inline-flex items-center gap-2 bg-white text-sage-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors shadow-soft"
        >
          Start Studying
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
