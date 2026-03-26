"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Plus, Flame, BookOpen } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import ProjectCard from "@/components/dashboard/ProjectCard";
import DailyPriorityCard from "@/components/dashboard/DailyPriorityCard";
import BrainMapPreview from "@/components/dashboard/BrainMapPreview";
import { currentUser, projects, spacedRepetitionCards } from "@/lib/mock-data";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const today = new Date().toISOString().split("T")[0];
const dueReviewCount = spacedRepetitionCards.filter((c) => c.next_review_date <= today).length;

export default function DashboardPage() {
  const router = useRouter();
  const activeProjects = projects.filter((p) => p.status === "active");
  const priorityProject = [...activeProjects].sort(
    (a, b) => new Date(a.exam_date).getTime() - new Date(b.exam_date).getTime()
  )[0];
  const hasStreak = currentUser.current_streak >= 7;
  const firstName = currentUser.name.split(" ")[0];

  return (
    <AppShell>
      <div className="relative min-h-[calc(100vh-56px)] bg-[#FCF9F1]">
        {/* ============ Ambient background blobs ============ */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 50, -30, 0], y: [0, -30, 20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-[#6C63FF]/8 blur-[100px]"
          />
          <motion.div
            animate={{ x: [0, -40, 20, 0], y: [0, 20, -40, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute top-60 -right-24 w-80 h-80 rounded-full bg-[#FF6B35]/8 blur-[100px]"
          />
          <motion.div
            animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
            className="absolute bottom-20 left-1/3 w-72 h-72 rounded-full bg-sage-400/8 blur-[100px]"
          />
        </div>

        {/* ============ Main Content ============ */}
        <div className="relative z-10 space-y-8">
          {/* ── Greeting with mascot ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4"
          >
            {/* Mascot */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
              className="flex-shrink-0 relative"
            >
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 sm:w-16 sm:h-16">
                <circle cx="40" cy="40" r="24" fill="#D4A04A" />
                <circle cx="40" cy="42" r="20" fill="#E6B85C" />
                <ellipse cx="18" cy="30" rx="8" ry="12" fill="#C49240" transform="rotate(-15 18 30)" />
                <ellipse cx="62" cy="30" rx="8" ry="12" fill="#C49240" transform="rotate(15 62 30)" />
                <ellipse cx="19" cy="31" rx="5" ry="8" fill="#D4A04A" transform="rotate(-15 19 31)" />
                <ellipse cx="61" cy="31" rx="5" ry="8" fill="#D4A04A" transform="rotate(15 61 31)" />
                <ellipse cx="40" cy="48" rx="10" ry="7" fill="#F0D080" />
                <ellipse cx="40" cy="45" rx="3.5" ry="2.5" fill="#3D2B1F" />
                <path d="M36 50 Q40 54 44 50" stroke="#3D2B1F" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                {/* Happy eyes for streak */}
                {hasStreak ? (
                  <>
                    <path d="M28 37 Q32 33 36 37" stroke="#3D2B1F" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M44 37 Q48 33 52 37" stroke="#3D2B1F" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </>
                ) : (
                  <>
                    <circle cx="32" cy="38" r="3.5" fill="#3D2B1F" />
                    <circle cx="48" cy="38" r="3.5" fill="#3D2B1F" />
                    <circle cx="33" cy="36.5" r="1.2" fill="white" />
                    <circle cx="49" cy="36.5" r="1.2" fill="white" />
                  </>
                )}
                <circle cx="32" cy="38" r="7" stroke="#5A4A3A" strokeWidth="1.8" fill="none" />
                <circle cx="48" cy="38" r="7" stroke="#5A4A3A" strokeWidth="1.8" fill="none" />
                <path d="M39 38 L41 38" stroke="#5A4A3A" strokeWidth="1.8" />
                <path d="M25 36 L16 34" stroke="#5A4A3A" strokeWidth="1.8" />
                <path d="M55 36 L64 34" stroke="#5A4A3A" strokeWidth="1.8" />
              </svg>

              {/* Fire crown for 7+ day streak */}
              {hasStreak && (
                <motion.div
                  animate={{ y: [0, -2, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                >
                  <Flame className="w-6 h-6 text-coral-500 fill-coral-400 drop-shadow-[0_0_6px_rgba(255,107,53,0.5)]" />
                </motion.div>
              )}
            </motion.div>

            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
                {getGreeting()}, {firstName}
              </h1>
              <p className="text-ink-500 mt-0.5 text-sm sm:text-base">
                {currentUser.current_streak > 0 ? (
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-coral-500 fill-coral-400 inline" />
                    {currentUser.current_streak}-day streak — keep it going!
                  </span>
                ) : (
                  "Ready to start studying?"
                )}
              </p>
            </div>
          </motion.div>

          {/* ── Priority Hero + Brain Map ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
            {/* Priority card — takes 3 cols */}
            <div className="lg:col-span-3">
              {priorityProject && <DailyPriorityCard project={priorityProject} />}
            </div>

            {/* Brain Map — takes 2 cols */}
            <div className="lg:col-span-2">
              <BrainMapPreview projectId="proj_001" />
            </div>
          </div>

          {/* ── Reviews due banner ── */}
          {dueReviewCount > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => router.push("/review")}
              className="w-full relative overflow-hidden rounded-2xl p-4 sm:p-5 text-left group"
            >
              <div className="absolute inset-0 bg-coral-500/8 backdrop-blur-sm border border-coral-200/50 rounded-2xl" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-coral-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-coral-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink-800 text-sm">
                      {dueReviewCount} flashcards due for review
                    </p>
                    <p className="text-xs text-ink-500">Keep those memories fresh</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-coral-500 group-hover:text-coral-600 transition-colors">
                  Review now &rarr;
                </span>
              </div>
            </motion.button>
          )}

          {/* ── Active Projects ── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-ink-900 tracking-tight">
                Active Projects
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/project/new")}
                className="flex items-center gap-1.5 text-xs font-semibold text-brand-500 hover:text-brand-600 transition-colors px-3 py-1.5 rounded-full bg-brand-50 hover:bg-brand-100"
              >
                <Plus className="w-3.5 h-3.5" />
                New Project
              </motion.button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
