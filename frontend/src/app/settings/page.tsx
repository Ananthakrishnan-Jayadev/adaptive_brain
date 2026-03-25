"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { currentUser } from "@/lib/mock-data";

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`relative w-11 h-6 rounded-full transition-colors ${checked ? "bg-brand-500" : "bg-surface-300"}`}>
      <motion.div
        animate={{ x: checked ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-surface-100 shadow"
      />
    </button>
  );
}

export default function SettingsPage() {
  const [dailyReminder, setDailyReminder] = useState(true);
  const [reviewReminder, setReviewReminder] = useState(true);
  const [streakWarning, setStreakWarning] = useState(true);
  const [milestones, setMilestones] = useState(true);
  const [wellbeing, setWellbeing] = useState(true);
  const [breakReminder, setBreakReminder] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <AppShell>
      <div className="max-w-xl mx-auto space-y-8">
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-display text-2xl font-bold text-ink-900">
          Settings
        </motion.h1>

        {/* Account */}
        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900 mb-4">Account</h2>
          <div className="space-y-4">
            <Input label="Name" defaultValue={currentUser.name} />
            <div>
              <label className="block text-sm font-medium text-ink-900 mb-1.5">Email</label>
              <p className="text-sm text-ink-500 bg-surface-100 rounded-xl px-4 py-2.5">{currentUser.email}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary">Sign Out</Button>
              <Button variant="danger" onClick={() => setShowDelete(true)}>Delete Account</Button>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900 mb-4">Notifications</h2>
          <div className="space-y-3">
            {[
              { label: "Daily study reminders", checked: dailyReminder, onChange: () => setDailyReminder(!dailyReminder) },
              { label: "Spaced review reminders", checked: reviewReminder, onChange: () => setReviewReminder(!reviewReminder) },
              { label: "Streak warnings", checked: streakWarning, onChange: () => setStreakWarning(!streakWarning) },
              { label: "Milestone celebrations", checked: milestones, onChange: () => setMilestones(!milestones) },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <span className="text-sm text-ink-900">{item.label}</span>
                <Toggle checked={item.checked} onChange={item.onChange} />
              </div>
            ))}
          </div>
        </section>

        {/* Study Preferences */}
        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900 mb-4">Study Preferences</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-ink-900">Wellbeing check-in before sessions</span>
              <Toggle checked={wellbeing} onChange={() => setWellbeing(!wellbeing)} />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-ink-900">Break reminders</span>
              <Toggle checked={breakReminder} onChange={() => setBreakReminder(!breakReminder)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-900 mb-1.5">Default content format</label>
              <select className="w-full rounded-xl border border-surface-200 bg-surface-100 px-4 py-2.5 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-300">
                <option>Mixed (recommended)</option>
                <option>Summary</option>
                <option>Micro-lessons</option>
                <option>Flashcards</option>
                <option>Audio</option>
              </select>
            </div>
          </div>
        </section>

        {/* About */}
        <section>
          <h2 className="font-display text-lg font-semibold text-ink-900 mb-4">About</h2>
          <div className="space-y-2 text-sm text-ink-500">
            <p>Version 1.0.0</p>
            <div className="flex gap-4">
              <button className="text-brand-500 hover:text-brand-500">Feedback</button>
              <button className="text-brand-500 hover:text-brand-500">Terms of Service</button>
              <button className="text-brand-500 hover:text-brand-500">Privacy Policy</button>
            </div>
          </div>
        </section>
      </div>

      {/* Delete confirmation */}
      <Modal isOpen={showDelete} onClose={() => setShowDelete(false)} size="sm" title="Delete Account">
        <p className="text-sm text-ink-500 mb-4">
          This action is permanent. All your data, projects, and progress will be deleted.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setShowDelete(false)} className="flex-1">Cancel</Button>
          <Button variant="danger" className="flex-1">Delete</Button>
        </div>
      </Modal>
    </AppShell>
  );
}
