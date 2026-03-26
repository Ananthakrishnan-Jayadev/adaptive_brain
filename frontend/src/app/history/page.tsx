"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import ActivityHeatmap from "@/components/profile/ActivityHeatmap";
import Badge from "@/components/ui/Badge";
import { sessionHistory, projects } from "@/lib/mock-data";
import { Clock, Target, BookOpen, Zap, Calendar } from "lucide-react";

export default function HistoryPage() {
  const [filterProject, setFilterProject] = useState("all");

  const filtered = filterProject === "all"
    ? sessionHistory
    : sessionHistory.filter((s) => s.project_id === filterProject);

  const totalSessions = sessionHistory.length;
  const totalHours = Math.round(sessionHistory.reduce((sum, s) => sum + s.duration_minutes, 0) / 60);
  const avgAccuracy = Math.round(sessionHistory.reduce((sum, s) => sum + s.accuracy, 0) / sessionHistory.length);
  const totalXP = sessionHistory.reduce((sum, s) => sum + s.xp_earned, 0);

  const summaryStats = [
    { icon: BookOpen, label: "Sessions", value: totalSessions, color: "text-brand-500" },
    { icon: Clock, label: "Total Hours", value: totalHours, color: "text-sage-500" },
    { icon: Target, label: "Avg Accuracy", value: `${avgAccuracy}%`, color: "text-coral-500" },
    { icon: Zap, label: "Total XP", value: totalXP.toLocaleString(), color: "text-amber-500" },
  ];

  return (
    <AppShell>
      <div className="min-h-[calc(100vh-56px)] bg-[#FCF9F1] space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight"
        >
          Study History
        </motion.h1>

        {/* Summary stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {summaryStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 border border-white/70 shadow-soft"
              >
                <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <p className="font-display text-xl font-bold text-ink-900">{stat.value}</p>
                <p className="text-xs text-ink-500">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Activity Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/50 backdrop-blur-xl rounded-3xl border border-white/60 p-5 sm:p-6 shadow-soft"
        >
          <ActivityHeatmap />
        </motion.div>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-ink-400" />
          <span className="text-sm text-ink-500">Filter:</span>
          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="rounded-xl border border-surface-200 bg-white/60 backdrop-blur-sm px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
          >
            <option value="all">All Projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Session list */}
        <div className="space-y-2">
          {filtered.map((session, i) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.02 }}
              className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/70 p-4 shadow-soft hover:shadow-warm transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-ink-900">{session.project_name}</span>
                    <Badge size="sm">{session.duration_minutes}m</Badge>
                  </div>
                  <p className="text-xs text-ink-500 truncate">
                    {session.topics.join(", ")} &middot; {session.accuracy}% accuracy
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <p className="text-sm font-bold text-coral-500">+{session.xp_earned} XP</p>
                  <p className="text-xs text-ink-400">{new Date(session.date).toLocaleDateString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
