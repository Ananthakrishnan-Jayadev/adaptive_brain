"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { sessionHistory, projects } from "@/lib/mock-data";
import { Clock, Target, BookOpen, Zap } from "lucide-react";

export default function HistoryPage() {
  const [filterProject, setFilterProject] = useState("all");

  const filtered = filterProject === "all"
    ? sessionHistory
    : sessionHistory.filter((s) => s.project_id === filterProject);

  const totalSessions = sessionHistory.length;
  const totalHours = Math.round(sessionHistory.reduce((sum, s) => sum + s.duration_minutes, 0) / 60);
  const avgAccuracy = Math.round(sessionHistory.reduce((sum, s) => sum + s.accuracy, 0) / sessionHistory.length);

  const summaryStats = [
    { icon: BookOpen, label: "Sessions", value: totalSessions },
    { icon: Clock, label: "Total Hours", value: totalHours },
    { icon: Target, label: "Avg Accuracy", value: `${avgAccuracy}%` },
    { icon: Zap, label: "Total XP", value: sessionHistory.reduce((sum, s) => sum + s.xp_earned, 0).toLocaleString() },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-display text-2xl font-bold text-ink-900">
          Study History
        </motion.h1>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {summaryStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-surface-100 rounded-xl p-4 border border-surface-200 shadow-soft"
              >
                <Icon className="w-5 h-5 text-brand-500 mb-2" />
                <p className="font-display text-xl font-bold text-ink-900">{stat.value}</p>
                <p className="text-xs text-ink-500">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Charts placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <h3 className="font-display font-semibold text-ink-900 mb-3">Readiness Trend</h3>
            <div className="h-40 bg-surface-100 rounded-xl flex items-center justify-center">
              <div className="flex items-end gap-1 h-24">
                {[30, 35, 38, 42, 40, 45, 48, 52, 55, 58, 62, 65, 67, 72].map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${v}%` }}
                    transition={{ delay: i * 0.05 }}
                    className="w-4 bg-brand-400 rounded-t"
                  />
                ))}
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="font-display font-semibold text-ink-900 mb-3">Study Time (Last 14 days)</h3>
            <div className="h-40 bg-surface-100 rounded-xl flex items-center justify-center">
              <div className="flex items-end gap-1.5 h-24">
                {[90, 110, 120, 100, 95, 85, 0, 115, 100, 120, 65, 55, 80, 8].map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${(v / 120) * 100}%` }}
                    transition={{ delay: i * 0.05 }}
                    className="w-5 bg-coral-400 rounded-t"
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-ink-500">Filter by:</span>
          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="rounded-xl border border-surface-200 bg-surface-100 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
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
              transition={{ delay: i * 0.03 }}
            >
              <Card padding="sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-ink-900">{session.project_name}</span>
                      <Badge size="sm">{session.duration_minutes}m</Badge>
                    </div>
                    <p className="text-xs text-ink-500">
                      {session.topics.join(", ")} &middot; {session.accuracy}% accuracy
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-coral-500">+{session.xp_earned} XP</p>
                    <p className="text-xs text-ink-500">{new Date(session.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
