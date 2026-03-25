"use client";

import { motion } from "framer-motion";
import { Moon, Wind, BookOpen } from "lucide-react";
import Button from "@/components/ui/Button";

interface ExamEveProps {
  totalHours: number;
  topicsMastered: number;
  readiness: number;
  weakTopics: string[];
}

export default function ExamEve({ totalHours, topicsMastered, readiness, weakTopics }: ExamEveProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-brand-50 via-brand-100/50 to-coral-50 rounded-xl p-6 sm:p-8 border border-brand-200"
    >
      <div className="flex items-center gap-2 mb-4">
        <Moon className="w-5 h-5 text-brand-500" />
        <span className="text-sm font-medium text-brand-500">Exam Tomorrow</span>
      </div>

      <h2 className="font-display text-2xl font-bold text-ink-900 mb-2">You&apos;re ready.</h2>
      <p className="text-ink-500 text-sm mb-6">
        You&apos;ve put in {totalHours} hours, mastered {topicsMastered} topics, and reached {readiness}% readiness.
        Trust your preparation and get some rest.
      </p>

      <div className="bg-surface-100/90 rounded-xl p-4 mb-6">
        <h4 className="text-sm font-semibold text-ink-900 mb-2">Quick Review Concepts</h4>
        <div className="space-y-1.5">
          {weakTopics.slice(0, 5).map((topic) => (
            <div key={topic} className="flex items-center gap-2 text-sm text-ink-500">
              <BookOpen className="w-3.5 h-3.5 text-ink-500" />
              {topic}
            </div>
          ))}
        </div>
      </div>

      <Button variant="secondary" icon={<Wind className="w-4 h-4" />}>
        Quick breathing exercise
      </Button>
    </motion.div>
  );
}
