"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import AchievementBadge from "@/components/gamification/AchievementBadge";
import { achievements } from "@/lib/mock-data";
import { Trophy } from "lucide-react";

type Filter = "all" | "earned" | "locked";

export default function AchievementsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const earned = achievements.filter((a) => a.earned);
  const locked = achievements.filter((a) => !a.earned);
  const totalXP = earned.reduce((sum, a) => sum + a.xp_award, 0);

  const filtered =
    filter === "earned" ? earned : filter === "locked" ? locked : [...earned, ...locked];

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: achievements.length },
    { key: "earned", label: "Earned", count: earned.length },
    { key: "locked", label: "Locked", count: locked.length },
  ];

  return (
    <AppShell>
      <div className="min-h-[calc(100vh-56px)] bg-[#FCF9F1] space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
                Achievement Shelf
              </h1>
              <p className="text-sm text-ink-500">
                {earned.length} of {achievements.length} unlocked &middot; {totalXP.toLocaleString()} XP earned
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex gap-1 bg-white/60 backdrop-blur-sm rounded-2xl p-1 w-fit border border-white/70 shadow-soft">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f.key
                  ? "bg-white text-ink-900 shadow-soft"
                  : "text-ink-500 hover:text-ink-700"
              }`}
            >
              {f.label}
              <span className={`ml-1.5 text-xs ${filter === f.key ? "text-brand-500" : "text-ink-400"}`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* Medal grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04, type: "spring", stiffness: 200, damping: 20 }}
              className="relative"
            >
              <AchievementBadge achievement={achievement} />
            </motion.div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
