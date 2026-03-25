"use client";

import { motion } from "framer-motion";
import { Check, Star, Flag } from "lucide-react";
import { studyPlan, topics, projects } from "@/lib/mock-data";

export default function CalendarView({ projectId }: { projectId: string }) {
  const project = projects.find((p) => p.id === projectId);
  const today = new Date().toISOString().split("T")[0];

  const daysInMonth = 31;
  const firstDayOffset = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDateString = (day: number) => {
    const d = new Date(new Date().getFullYear(), new Date().getMonth(), day);
    return d.toISOString().split("T")[0];
  };

  const getPlanDay = (dateStr: string) => studyPlan.days.find((d) => d.date === dateStr);
  const isExamDate = (dateStr: string) => project?.exam_date === dateStr;

  return (
    <div className="bg-surface-100 rounded-xl p-4 border border-surface-200 shadow-soft">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-ink-500 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = getDateString(day);
          const planDay = getPlanDay(dateStr);
          const isToday = dateStr === today;
          const isExam = isExamDate(dateStr);

          return (
            <motion.div
              key={day}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.01 }}
              className={`
                relative p-1 rounded-xl text-center min-h-[40px] flex flex-col items-center justify-center text-xs
                ${isToday ? "bg-brand-100 ring-2 ring-brand-400 font-bold" : ""}
                ${isExam ? "bg-coral-100" : ""}
              `}
            >
              <span className={isToday ? "text-brand-500" : "text-ink-500"}>{day}</span>
              {planDay && (
                <div className="flex gap-0.5 mt-0.5">
                  {planDay.completed ? (
                    <Check className="w-3 h-3 text-sage-500" />
                  ) : (
                    planDay.topic_ids.slice(0, 2).map((_, j) => (
                      <span key={j} className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                    ))
                  )}
                </div>
              )}
              {isExam && <Flag className="w-3 h-3 text-coral-500 mt-0.5" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
