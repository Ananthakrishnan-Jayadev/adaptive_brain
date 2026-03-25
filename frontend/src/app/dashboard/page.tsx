"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import ProjectCard from "@/components/dashboard/ProjectCard";
import DailyPriorityCard from "@/components/dashboard/DailyPriorityCard";
import { currentUser, projects } from "@/lib/mock-data";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

// Floating knowledge graph nodes for the background
const bgNodes = [
  { x: 180, y: 480, r: 45, color: "#337842", label: "Bio", delay: 0.5 },
  { x: 320, y: 540, r: 30, color: "#c46220", label: "Chem", delay: 0.7 },
  { x: 80, y: 600, r: 22, color: "#3a56b0", label: "", delay: 0.9 },
  { x: 250, y: 650, r: 35, color: "#489058", label: "DNA", delay: 0.6 },
  { x: 420, y: 480, r: 18, color: "#a07518", label: "", delay: 1.0 },
  { x: 500, y: 580, r: 28, color: "#9c3636", label: "", delay: 0.8 },
  { x: 600, y: 500, r: 40, color: "#3a56b0", label: "Quiz", delay: 0.4 },
  { x: 700, y: 600, r: 20, color: "#c46220", label: "", delay: 1.1 },
  { x: 800, y: 520, r: 32, color: "#337842", label: "", delay: 0.6 },
  { x: 900, y: 580, r: 24, color: "#a07518", label: "", delay: 0.9 },
  { x: 1000, y: 500, r: 35, color: "#9c3636", label: "", delay: 0.7 },
  { x: 1100, y: 560, r: 18, color: "#3a56b0", label: "", delay: 1.0 },
  { x: 150, y: 700, r: 16, color: "#489058", label: "", delay: 1.2 },
  { x: 350, y: 720, r: 25, color: "#c46220", label: "", delay: 0.8 },
  { x: 550, y: 700, r: 20, color: "#3a56b0", label: "", delay: 1.0 },
  { x: 750, y: 680, r: 30, color: "#337842", label: "", delay: 0.5 },
  { x: 950, y: 700, r: 22, color: "#a07518", label: "", delay: 0.9 },
];

const bgEdges = [
  [0, 1], [1, 3], [0, 2], [2, 3], [1, 4], [4, 5], [5, 6],
  [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [3, 13],
  [2, 12], [5, 14], [7, 15], [9, 16], [12, 13], [14, 15],
];

export default function DashboardPage() {
  const router = useRouter();
  const activeProjects = projects.filter((p) => p.status === "active");
  const priorityProject = [...activeProjects].sort(
    (a, b) => new Date(a.exam_date).getTime() - new Date(b.exam_date).getTime()
  )[0];

  return (
    <AppShell>
      <div className="relative min-h-[calc(100vh-56px)]">
        {/* ============ Floating Knowledge Graph Background ============ */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            {/* Edges (connecting lines) */}
            {bgEdges.map(([from, to], i) => {
              const a = bgNodes[from];
              const b = bgNodes[to];
              return (
                <motion.line
                  key={`edge-${i}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="#d0c9be"
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.3 + i * 0.05 }}
                />
              );
            })}

            {/* Nodes (circles) */}
            {bgNodes.map((node, i) => (
              <motion.g key={`node-${i}`}>
                {/* Outer glow */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r + 8}
                  fill={node.color}
                  fillOpacity="0.08"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: node.delay, type: "spring", stiffness: 100, damping: 15 }}
                />
                {/* Main circle */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill={node.color}
                  fillOpacity="0.65"
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    y: [0, -4, 0, 4, 0],
                  }}
                  transition={{
                    scale: { delay: node.delay, type: "spring", stiffness: 150, damping: 12 },
                    y: { duration: 6 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: node.delay },
                  }}
                />
                {/* Inner highlight */}
                <motion.circle
                  cx={node.x - node.r * 0.25}
                  cy={node.y - node.r * 0.25}
                  r={node.r * 0.35}
                  fill="white"
                  fillOpacity="0.15"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: node.delay + 0.2 }}
                />
                {/* Label */}
                {node.label && (
                  <motion.text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    className="text-[11px] font-semibold fill-white"
                    fillOpacity="0.9"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: node.delay + 0.3 }}
                  >
                    {node.label}
                  </motion.text>
                )}
              </motion.g>
            ))}
          </svg>
        </div>

        {/* ============ Main Content (on top of background) ============ */}
        <div className="relative z-10 space-y-8">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">
              {getGreeting()}, {currentUser.name.split(" ")[0]} 👋
            </h1>
            <p className="text-ink-500 mt-1">
              {currentUser.current_streak > 0
                ? `You're on a ${currentUser.current_streak}-day streak. Keep it going!`
                : "Ready to start studying?"}
            </p>
          </motion.div>

          {/* Daily Priority */}
          {activeProjects.length > 1 && priorityProject && (
            <DailyPriorityCard project={priorityProject} />
          )}

          {/* Projects Grid */}
          <div>
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-4">
              Active Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}

              {/* Create New Project Card */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: activeProjects.length * 0.1 }}
                whileHover={{ y: -3, boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/project/new")}
                className="h-full min-h-[180px] rounded-2xl border-2 border-dashed border-surface-300 bg-surface-100/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 text-ink-500 hover:text-sage-500 hover:border-sage-300 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-surface-200 flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="font-medium text-sm">Create New Project</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
