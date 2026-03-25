"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, Star, Play, Clock } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import { topics } from "@/lib/mock-data";

const difficultyColors = {
  foundational: "success" as const,
  intermediate: "warning" as const,
  advanced: "error" as const,
};

const statusIcons = {
  mastered: <Star className="w-4 h-4 fill-sage-500 text-sage-500" />,
  in_progress: <Play className="w-4 h-4 text-brand-500" />,
  not_started: <Play className="w-4 h-4 text-ink-500" />,
  locked: <Lock className="w-4 h-4 text-ink-500" />,
};

export default function TopicMap({ projectId }: { projectId: string }) {
  const router = useRouter();
  const projectTopics = topics.filter((t) => t.project_id === projectId);

  return (
    <div className="space-y-2">
      {projectTopics.map((topic, i) => (
        <motion.button
          key={topic.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() =>
            topic.status !== "locked" &&
            router.push(`/project/${projectId}/topic/${topic.id}`)
          }
          disabled={topic.status === "locked"}
          className={`
            w-full text-left p-4 rounded-xl border transition-all
            ${topic.status === "locked"
              ? "bg-surface-100 border-surface-200 opacity-60"
              : "bg-surface-100 border-surface-200 hover:shadow-soft hover:border-surface-200 cursor-pointer"
            }
          `}
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">{statusIcons[topic.status]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm text-ink-700 truncate">{topic.name}</span>
                <Badge variant={difficultyColors[topic.difficulty]} size="sm">
                  {topic.difficulty}
                </Badge>
              </div>
              <ProgressBar
                value={topic.mastery_percentage}
                size="sm"
                color={topic.status === "mastered" ? "bg-sage-500" : "bg-brand-500"}
              />
            </div>
            <div className="flex items-center gap-1 text-xs text-ink-500 flex-shrink-0">
              <Clock className="w-3.5 h-3.5" />
              <span>{topic.estimated_minutes}m</span>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
