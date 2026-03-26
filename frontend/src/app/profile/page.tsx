"use client";

import { motion } from "framer-motion";
import AppShell from "@/components/layout/AppShell";
import LearningIdentityCard from "@/components/profile/LearningIdentityCard";
import ActivityHeatmap from "@/components/profile/ActivityHeatmap";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfilePromptEditor from "@/components/profile/ProfilePromptEditor";
import { currentUser } from "@/lib/mock-data";
import { Sparkles, BookOpen, Flame, Target } from "lucide-react";

export default function ProfilePage() {
  const stats = [
    { icon: Flame, label: "Streak", value: `${currentUser.current_streak}d`, color: "text-coral-500" },
    { icon: BookOpen, label: "XP", value: currentUser.total_xp.toLocaleString(), color: "text-brand-500" },
    { icon: Target, label: "Daily Goal", value: `${currentUser.daily_xp_earned}/${currentUser.daily_xp_goal}`, color: "text-sage-500" },
  ];

  return (
    <AppShell>
      <div className="min-h-[calc(100vh-56px)] bg-[#FCF9F1] pb-24 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
            Your Profile
          </h1>
          <p className="text-sm text-ink-500 mt-0.5">{currentUser.email}</p>
        </motion.div>

        {/* Identity Card + Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* 3D Identity Card */}
          <div className="lg:col-span-2">
            <LearningIdentityCard />
          </div>

          {/* Right side: stats + traits */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick stat pills */}
            <div className="flex flex-wrap gap-3">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/70 shadow-soft"
                  >
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                    <div>
                      <p className="font-display font-bold text-ink-900 text-sm">{stat.value}</p>
                      <p className="text-[10px] text-ink-400">{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Learning Identity traits */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-brand-500" />
                <h2 className="font-display text-base font-semibold text-ink-900">Learning Identity</h2>
              </div>
              <ProfileCard />
            </div>
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="bg-white/50 backdrop-blur-xl rounded-3xl border border-white/60 p-5 sm:p-6 shadow-soft">
          <ActivityHeatmap />
        </div>

        {/* Prompt Editor */}
        <ProfilePromptEditor />
      </div>
    </AppShell>
  );
}
