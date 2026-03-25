"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import AchievementBadge from "@/components/gamification/AchievementBadge";
import { achievements } from "@/lib/mock-data";

type Filter = "all" | "earned" | "locked";

export default function AchievementsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const earned = achievements.filter((a) => a.earned);
  const locked = achievements.filter((a) => !a.earned);
  const totalXP = earned.reduce((sum, a) => sum + a.xp_award, 0);

  const filtered =
    filter === "earned" ? earned : filter === "locked" ? locked : [...earned, ...locked];

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "earned", label: "Earned" },
    { key: "locked", label: "Locked" },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold text-ink-900">Your Achievements</h1>
          <p className="text-sm text-ink-500 mt-1">
            {earned.length} of {achievements.length} unlocked &middot; {totalXP} XP earned
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex gap-1 bg-surface-100 rounded-xl p-1 w-fit">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
                filter === f.key ? "bg-surface-100 text-ink-800 shadow-soft" : "text-ink-600 hover:text-ink-800"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
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
