"use client";

import { motion } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";
import Button from "@/components/ui/Button";

interface SessionIntroProps {
  dayNumber: number;
  topicNames: string[];
  estimatedMinutes: number;
  wellbeingNote?: string;
  onBegin: () => void;
}

export default function SessionIntro({
  dayNumber,
  topicNames,
  estimatedMinutes,
  wellbeingNote,
  onBegin,
}: SessionIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto text-center py-12 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="w-16 h-16 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-6"
      >
        <BookOpen className="w-8 h-8 text-brand-500" />
      </motion.div>

      <h2 className="font-display text-2xl font-bold text-ink-900 mb-2">
        Day {dayNumber}
      </h2>
      <p className="text-ink-500 mb-6">
        Today we&apos;re covering{" "}
        <span className="font-semibold text-ink-900">
          {topicNames.join(" and ")}
        </span>
      </p>

      <div className="space-y-2 mb-6 text-left max-w-xs mx-auto">
        {topicNames.map((name) => (
          <div key={name} className="flex items-center gap-2 text-sm text-ink-500">
            <div className="w-2 h-2 rounded-full bg-brand-400" />
            {name}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-ink-500 mb-6">
        <Clock className="w-4 h-4" />
        <span>~{estimatedMinutes} minutes</span>
      </div>

      {wellbeingNote && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-brand-500 bg-brand-100 rounded-xl p-3 mb-6"
        >
          {wellbeingNote}
        </motion.p>
      )}

      <Button onClick={onBegin} size="lg" className="px-10">
        Let&apos;s begin
      </Button>
    </motion.div>
  );
}
