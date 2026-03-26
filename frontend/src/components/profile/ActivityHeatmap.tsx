"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { sessionHistory } from "@/lib/mock-data";

// ─── Generate 365 days of XP data ───────────────────────────
function generateHeatmapData(): { date: string; xp: number }[] {
  const today = new Date();
  const days: { date: string; xp: number }[] = [];

  // Build a map from session history
  const xpByDate = new Map<string, number>();
  sessionHistory.forEach((s) => {
    const existing = xpByDate.get(s.date) || 0;
    xpByDate.set(s.date, existing + s.xp_earned);
  });

  // Fill 365 days
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    days.push({ date: dateStr, xp: xpByDate.get(dateStr) || 0 });
  }

  return days;
}

function getIntensityClass(xp: number): string {
  if (xp === 0) return "bg-surface-100";
  if (xp < 50) return "bg-sage-200";
  if (xp < 100) return "bg-sage-300";
  if (xp < 150) return "bg-sage-400";
  return "bg-sage-600";
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Mon", "", "Wed", "", "Fri", "", ""];

export default function ActivityHeatmap() {
  const data = generateHeatmapData();
  const [tooltip, setTooltip] = useState<{ date: string; xp: number; x: number; y: number } | null>(null);

  // Organize into weeks (columns)
  const weeks: { date: string; xp: number }[][] = [];
  let currentWeek: { date: string; xp: number }[] = [];

  // Pad first week with empty days
  const firstDay = new Date(data[0].date).getDay();
  const paddedStart = firstDay === 0 ? 6 : firstDay - 1; // Monday = 0
  for (let i = 0; i < paddedStart; i++) {
    currentWeek.push({ date: "", xp: -1 });
  }

  data.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Determine month labels
  const monthLabels: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIdx) => {
    const validDay = week.find((d) => d.date);
    if (validDay && validDay.date) {
      const month = new Date(validDay.date).getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ label: MONTHS[month], weekIndex: weekIdx });
        lastMonth = month;
      }
    }
  });

  const totalXP = data.reduce((sum, d) => sum + d.xp, 0);
  const activeDays = data.filter((d) => d.xp > 0).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-bold text-ink-900">Activity</h3>
          <p className="text-xs text-ink-500">{activeDays} active days &middot; {totalXP.toLocaleString()} XP total</p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-1 text-[10px] text-ink-400">
          <span>Less</span>
          {["bg-surface-100", "bg-sage-200", "bg-sage-300", "bg-sage-400", "bg-sage-600"].map((cls, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${cls}`} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-flex gap-[3px] relative" style={{ minWidth: "max-content" }}>
          {/* Day labels */}
          <div className="flex flex-col gap-[3px] mr-1 pt-5">
            {DAYS.map((day, i) => (
              <div key={i} className="h-[13px] flex items-center">
                <span className="text-[9px] text-ink-400 w-6">{day}</span>
              </div>
            ))}
          </div>

          {/* Weeks */}
          <div className="relative">
            {/* Month labels */}
            <div className="flex h-4 mb-1" style={{ gap: "3px" }}>
              {weeks.map((_, weekIdx) => {
                const label = monthLabels.find((m) => m.weekIndex === weekIdx);
                return (
                  <div key={weekIdx} className="w-[13px] flex-shrink-0">
                    {label && (
                      <span className="text-[9px] text-ink-400 whitespace-nowrap">{label.label}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Grid */}
            <div className="flex gap-[3px]">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, dayIdx) => {
                    if (day.xp === -1) {
                      return <div key={dayIdx} className="w-[13px] h-[13px]" />;
                    }
                    return (
                      <motion.div
                        key={dayIdx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: weekIdx * 0.005, duration: 0.2 }}
                        className={`w-[13px] h-[13px] rounded-sm ${getIntensityClass(day.xp)} cursor-pointer hover:ring-2 hover:ring-brand-400 hover:ring-offset-1 transition-all`}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltip({ date: day.date, xp: day.xp, x: rect.left, y: rect.top - 40 });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed z-50 bg-ink-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-elevated pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <span className="font-semibold">{tooltip.xp} XP</span>
          <span className="text-white/60 ml-1">
            on {new Date(tooltip.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
