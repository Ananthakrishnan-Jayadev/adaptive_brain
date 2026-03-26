"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";

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

  const urgencyColor =
    daysLeft > 7 ? "bg-sage-500" : daysLeft > 3 ? "bg-amber-500" : "bg-rose-500";
  const urgencyTextColor =
    daysLeft > 7 ? "text-sage-600" : daysLeft > 3 ? "text-amber-600" : "text-rose-600";
  const urgencyBg =
    daysLeft > 7 ? "bg-sage-100" : daysLeft > 3 ? "bg-amber-100" : "bg-rose-100";

  // Progress ring values
  const circumference = 2 * Math.PI * 28;
  const strokeDash = (project.readiness_score / 100) * circumference;
  const ringColor =
    project.readiness_score >= 70 ? "#337842" :
    project.readiness_score >= 50 ? "#a07518" :
    project.readiness_score >= 30 ? "#c46220" : "#9c3636";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={() => router.push(`/project/${project.id}`)}
      className="relative group cursor-pointer"
    >
      {/* Hover shadow layer */}
      <div className="absolute inset-0 rounded-3xl bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />

      {/* Glass card */}
      <div className="relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-xl border border-white/70 p-5 sm:p-6 shadow-soft group-hover:shadow-warm transition-shadow duration-300">
        {/* Subtle gradient accent at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-400 via-coral-400 to-sage-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl" />

        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-ink-900 text-base sm:text-lg truncate">
              {project.name}
            </h3>
            <div className="mt-1.5">
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${urgencyBg} ${urgencyTextColor}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${urgencyColor}`} />
                {daysLeft} days left
              </span>
            </div>
          </div>

          {/* SVG progress ring */}
          <div className="relative w-14 h-14 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="5" />
              <motion.circle
                cx="32" cy="32" r="28"
                fill="none"
                stroke={ringColor}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${strokeDash} ${circumference}`}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-bold text-xs text-ink-800">
                {project.readiness_score}%
              </span>
            </div>
          </div>
        </div>

        {/* Topics progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-ink-500 mb-1.5">
            <span>Topics mastered</span>
            <span className="font-semibold text-ink-700">
              {project.topics_mastered}/{project.total_topics}
            </span>
          </div>
          <div className="h-2 bg-surface-200/80 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(project.topics_mastered / project.total_topics) * 100}%` }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.2, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-sage-400 to-sage-500"
            />
          </div>
        </div>

        {/* Last studied */}
        <div className="flex items-center gap-1.5 text-xs text-ink-400">
          <Clock className="w-3.5 h-3.5" />
          <span>
            Last studied{" "}
            {project.last_studied === new Date().toISOString().split("T")[0]
              ? "today"
              : "recently"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
