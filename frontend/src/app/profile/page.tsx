"use client";

import { motion } from "framer-motion";
import AppShell from "@/components/layout/AppShell";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfilePromptEditor from "@/components/profile/ProfilePromptEditor";
import { currentUser } from "@/lib/mock-data";
import { Sparkles } from "lucide-react";

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="pb-24">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-brand-100 flex items-center justify-center">
              <span className="font-display text-xl font-bold text-brand-500">
                {currentUser.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-ink-900">{currentUser.name}</h1>
              <p className="text-sm text-ink-500">{currentUser.email}</p>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-brand-500" />
          <h2 className="font-display text-lg font-semibold text-ink-900">Your Learning Identity</h2>
        </div>

        <ProfileCard />
      </div>

      <ProfilePromptEditor />
    </AppShell>
  );
}
