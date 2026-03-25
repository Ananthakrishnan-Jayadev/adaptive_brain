"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Calendar, Clock } from "lucide-react";
import Card from "@/components/ui/Card";
import CircularProgress from "@/components/ui/CircularProgress";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    exam_date: string;
    readiness_score: number;
    total_topics: number;
    topics_mastered: number;
    last_studied: string;
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const router = useRouter();
  const daysLeft = Math.ceil(
    (new Date(project.exam_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const urgencyVariant = daysLeft > 7 ? "success" : daysLeft > 3 ? "warning" : "error";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        variant="interactive"
        onClick={() => router.push(`/project/${project.id}`)}
        className="h-full"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0 mr-3">
            <h3 className="font-display font-semibold text-ink-900 text-lg truncate">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={urgencyVariant} size="sm" dot>
                {daysLeft} days left
              </Badge>
            </div>
          </div>
          <CircularProgress value={project.readiness_score} size={64} strokeWidth={6} />
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs text-ink-500 mb-1">
              <span>Topics mastered</span>
              <span className="font-medium">{project.topics_mastered}/{project.total_topics}</span>
            </div>
            <ProgressBar
              value={project.topics_mastered}
              max={project.total_topics}
              color="bg-sage-500"
              size="sm"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-ink-500">
            <Clock className="w-3.5 h-3.5" />
            <span>
              Last studied{" "}
              {project.last_studied === new Date().toISOString().split("T")[0]
                ? "today"
                : "recently"}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
