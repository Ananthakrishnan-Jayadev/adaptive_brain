"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Play, Clock } from "lucide-react";
import { topics, studyPlan } from "@/lib/mock-data";

const today = new Date().toISOString().split("T")[0];

export default function TodaySession({ projectId }: { projectId: string }) {
  const router = useRouter();
  const todayPlan = studyPlan.days.find((d) => d.date === today);

  if (!todayPlan) return null;

  const todayTopics = topics.filter((t) => todayPlan.topic_ids.includes(t.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-100 rounded-2xl p-5 shadow-soft border border-surface-200"
    >
      <p className="text-xs font-medium text-ink-400 mb-1">Ready for...</p>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-ink-800">
          Day {todayPlan.day_number} of {studyPlan.total_days}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        {todayTopics.map((topic) => (
          <div key={topic.id} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-sage-400" />
            <span className="text-sm text-ink-700">{topic.name}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-ink-400 text-sm mb-4">
        <Clock className="w-4 h-4" />
        <span>{todayPlan.estimated_minutes} minutes estimated</span>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => router.push("/session/session_active")}
        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sage-400 to-sage-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:from-sage-500 hover:to-sage-600 transition-all shadow-soft"
      >
        <Play className="w-4 h-4 fill-white" />
        Start Studying
      </motion.button>
    </motion.div>
  );
}
