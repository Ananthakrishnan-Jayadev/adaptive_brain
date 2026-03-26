"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Clock } from "lucide-react";

interface DailyPriorityCardProps {
  project: {
    id: string;
    name: string;
    exam_date: string;
    hours_per_day: number;
    readiness_score: number;
  };
}

export default function DailyPriorityCard({ project }: DailyPriorityCardProps) {
  const router = useRouter();
  const daysLeft = Math.ceil(
    (new Date(project.exam_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
      className="relative overflow-hidden rounded-3xl p-6 sm:p-8"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#6C63FF]/30 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -25, 15, 0], y: [0, 15, -25, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-[#FF6B35]/25 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-brand-400/20 blur-3xl"
        />
      </div>

      {/* Glass surface */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                <span className="text-xs font-semibold text-brand-600">Today&apos;s Focus</span>
              </div>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-ink-900 mb-1.5">
              {project.name}
            </h3>

            <div className="flex items-center gap-3 text-sm text-ink-500 mb-5">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {daysLeft} days left
              </span>
              <span className="w-1 h-1 rounded-full bg-ink-300" />
              <span>{project.hours_per_day} hrs recommended</span>
            </div>

            {/* 3D "clicky" Start Studying button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97, y: 3 }}
              onClick={() => router.push(`/session/session_active`)}
              className="inline-flex items-center gap-2 bg-brand-500 text-white font-bold text-sm px-6 py-3
                rounded-2xl border-b-4 border-b-brand-700
                hover:bg-brand-400 active:border-b-0 active:mt-1
                transition-all shadow-glow"
            >
              Start Studying
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Readiness ring */}
          <div className="flex-shrink-0 hidden sm:flex flex-col items-center">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="6" />
                <circle
                  cx="40" cy="40" r="34"
                  fill="none"
                  stroke="#6C63FF"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${(project.readiness_score / 100) * 213.6} 213.6`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-bold text-lg text-ink-900">{project.readiness_score}%</span>
              </div>
            </div>
            <span className="text-[10px] text-ink-400 font-medium mt-1">Readiness</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
