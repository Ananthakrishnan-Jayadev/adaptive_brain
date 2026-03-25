"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, Star, Check, Play } from "lucide-react";
import { topics, studyPlan } from "@/lib/mock-data";

const statusColors = {
  mastered: { bg: "bg-sage-100", border: "border-sage-400", icon: "text-sage-500", glow: "shadow-[0_0_15px_rgba(52,153,90,0.3)]" },
  in_progress: { bg: "bg-brand-100", border: "border-brand-400", icon: "text-brand-500", glow: "shadow-glow" },
  not_started: { bg: "bg-brand-100", border: "border-brand-300", icon: "text-brand-500", glow: "" },
  locked: { bg: "bg-surface-100", border: "border-surface-200", icon: "text-ink-500", glow: "" },
};

const today = new Date().toISOString().split("T")[0];
const todayTopicIds = studyPlan.days.find((d) => d.date === today)?.topic_ids || [];

export default function StudyPath({ projectId }: { projectId: string }) {
  const router = useRouter();
  const projectTopics = topics.filter((t) => t.project_id === projectId);

  const getNodeIcon = (status: string) => {
    switch (status) {
      case "mastered": return <Star className="w-5 h-5 fill-sage-500 text-sage-500" />;
      case "in_progress": return <Play className="w-5 h-5 fill-brand-500 text-brand-500" />;
      case "locked": return <Lock className="w-4 h-4" />;
      default: return <Play className="w-5 h-5" />;
    }
  };

  const isClickable = (status: string) => status !== "locked";

  return (
    <div className="relative py-4">
      {projectTopics.map((topic, index) => {
        const colors = statusColors[topic.status];
        const isToday = todayTopicIds.includes(topic.id);
        const isEven = index % 2 === 0;

        return (
          <div key={topic.id} className="relative">
            {/* Connector line */}
            {index > 0 && (
              <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-0.5 h-8">
                <svg width="2" height="32" className="overflow-visible">
                  <path
                    d={`M 1 0 Q ${isEven ? -20 : 20} 16 1 32`}
                    stroke={topic.status === "locked" ? "#d1d1d1" : "#bcd2ff"}
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={topic.status === "locked" ? "4 4" : "none"}
                  />
                </svg>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`relative flex items-center gap-4 py-4 ${
                isEven ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Node */}
              <motion.button
                whileHover={isClickable(topic.status) ? { scale: 1.08 } : undefined}
                whileTap={isClickable(topic.status) ? { scale: 0.95 } : undefined}
                onClick={() =>
                  isClickable(topic.status) &&
                  router.push(`/project/${projectId}/topic/${topic.id}`)
                }
                className={`
                  relative w-16 h-16 rounded-full flex items-center justify-center
                  border-3 ${colors.bg} ${colors.border} ${colors.icon} ${colors.glow}
                  ${isClickable(topic.status) ? "cursor-pointer" : "cursor-default opacity-60"}
                  transition-all duration-300 flex-shrink-0
                `}
              >
                {/* Pulse animation for in-progress */}
                {topic.status === "in_progress" && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-brand-400"
                  />
                )}

                {/* Mastery ring */}
                {topic.mastery_percentage > 0 && topic.status !== "locked" && (
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="3"
                      strokeDasharray={`${(topic.mastery_percentage / 100) * 182} 182`}
                      className="opacity-30"
                    />
                  </svg>
                )}

                {getNodeIcon(topic.status)}

                {/* Shine effect for mastered */}
                {topic.status === "mastered" && (
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.3) 10%, transparent 20%)",
                    }}
                  />
                )}
              </motion.button>

              {/* Label */}
              <div className={`flex-1 ${isEven ? "" : "text-right"}`}>
                {isToday && (
                  <span className="inline-block text-xs font-bold text-brand-500 bg-brand-100 px-2 py-0.5 rounded-full mb-1">
                    TODAY
                  </span>
                )}
                <p className={`font-display font-semibold text-sm ${
                  topic.status === "locked" ? "text-ink-500" : "text-ink-800"
                }`}>
                  {topic.name}
                </p>
                {topic.mastery_percentage > 0 && (
                  <p className="text-xs text-ink-500">{topic.mastery_percentage}% mastery</p>
                )}
                <p className="text-xs text-ink-500">
                  {topic.estimated_minutes} min &middot;{" "}
                  <span className={`
                    ${topic.difficulty === "foundational" ? "text-sage-500" :
                      topic.difficulty === "intermediate" ? "text-amber-500" : "text-coral-500"}
                  `}>
                    {topic.difficulty}
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
