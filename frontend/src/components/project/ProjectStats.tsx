"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, Target, Zap } from "lucide-react";
import CircularProgress from "@/components/ui/CircularProgress";

interface ProjectStatsProps {
  project: {
    topics_mastered: number;
    total_topics: number;
    sessions_completed: number;
    total_study_time_minutes: number;
    average_accuracy: number;
  };
}

export default function ProjectStats({ project }: ProjectStatsProps) {
  const topicPct = Math.round((project.topics_mastered / project.total_topics) * 100);
  const stats = [
    { icon: BookOpen, label: "Topics Mastered", value: `${project.topics_mastered}/${project.total_topics}`, color: "text-sage-500 bg-sage-50", pct: topicPct },
    { icon: Zap, label: "Sessions", value: `${project.sessions_completed}`, color: "text-brand-500 bg-brand-50", pct: null },
    { icon: Clock, label: "Study Time", value: `${Math.round(project.total_study_time_minutes / 60)}h`, color: "text-amber-500 bg-amber-50", pct: null },
    { icon: Target, label: "Accuracy", value: `${project.average_accuracy}%`, color: "text-coral-500 bg-coral-50", pct: project.average_accuracy },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-surface-100 rounded-2xl p-4 border border-surface-200 shadow-soft flex items-center gap-3"
          >
            <div className="flex-1 min-w-0">
              <div className={`w-8 h-8 rounded-xl ${stat.color} flex items-center justify-center mb-2`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="font-display text-lg font-bold text-ink-900">{stat.value}</p>
              <p className="text-xs text-ink-500">{stat.label}</p>
            </div>
            {stat.pct !== null && (
              <CircularProgress value={stat.pct} size={44} strokeWidth={4} showLabel={false} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
