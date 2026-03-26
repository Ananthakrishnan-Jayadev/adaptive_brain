"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Map, List, Calendar, Network, FileText } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import StudyPath from "@/components/project/StudyPath";
import ReadinessScore from "@/components/project/ReadinessScore";
import TodaySession from "@/components/project/TodaySession";
import ProjectStats from "@/components/project/ProjectStats";
import TopicMap from "@/components/project/TopicMap";
import CalendarView from "@/components/project/CalendarView";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { projects } from "@/lib/mock-data";

type ViewMode = "path" | "list" | "calendar";

// Background knowledge graph nodes
const bgNodes = [
  { x: 120, y: 350, r: 38, color: "#337842", delay: 0.3 },
  { x: 280, y: 420, r: 26, color: "#c46220", delay: 0.5 },
  { x: 60, y: 500, r: 18, color: "#3a56b0", delay: 0.7 },
  { x: 200, y: 550, r: 32, color: "#489058", delay: 0.4 },
  { x: 380, y: 350, r: 14, color: "#a07518", delay: 0.8 },
  { x: 450, y: 480, r: 22, color: "#9c3636", delay: 0.6 },
  { x: 550, y: 380, r: 35, color: "#3a56b0", delay: 0.3 },
  { x: 650, y: 500, r: 16, color: "#c46220", delay: 0.9 },
  { x: 750, y: 400, r: 28, color: "#337842", delay: 0.5 },
  { x: 850, y: 470, r: 20, color: "#a07518", delay: 0.7 },
  { x: 950, y: 380, r: 30, color: "#9c3636", delay: 0.4 },
  { x: 1050, y: 450, r: 15, color: "#3a56b0", delay: 0.8 },
  { x: 100, y: 620, r: 14, color: "#489058", delay: 1.0 },
  { x: 300, y: 640, r: 20, color: "#c46220", delay: 0.6 },
  { x: 500, y: 600, r: 16, color: "#3a56b0", delay: 0.8 },
  { x: 700, y: 580, r: 24, color: "#337842", delay: 0.4 },
  { x: 900, y: 600, r: 18, color: "#a07518", delay: 0.7 },
  { x: 1100, y: 550, r: 12, color: "#9c3636", delay: 0.9 },
  { x: 170, y: 700, r: 22, color: "#3a56b0", delay: 0.5 },
  { x: 400, y: 720, r: 16, color: "#337842", delay: 0.8 },
  { x: 620, y: 690, r: 20, color: "#c46220", delay: 0.6 },
  { x: 830, y: 700, r: 14, color: "#a07518", delay: 0.9 },
];

const bgEdges = [
  [0, 1], [1, 3], [0, 2], [2, 3], [1, 4], [4, 5], [5, 6],
  [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [3, 13],
  [2, 12], [5, 14], [7, 15], [9, 16], [11, 17], [12, 18],
  [13, 19], [14, 20], [16, 21], [18, 19], [19, 20], [20, 21],
];

export default function ProjectDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("path");

  const projectId = params.id as string;
  const project = projects.find((p) => p.id === projectId) || projects[0];

  const daysLeft = Math.ceil(
    (new Date(project.exam_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const views: { key: ViewMode; icon: React.ElementType; label: string }[] = [
    { key: "path", icon: Map, label: "Path" },
    { key: "list", icon: List, label: "List" },
    { key: "calendar", icon: Calendar, label: "Calendar" },
  ];

  return (
    <AppShell>
      <div className="relative min-h-[calc(100vh-56px)]">
        {/* ============ Knowledge Graph Background ============ */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            {/* Edges */}
            {bgEdges.map(([from, to], i) => {
              const a = bgNodes[from];
              const b = bgNodes[to];
              return (
                <motion.line
                  key={`e-${i}`}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="#d0c9be"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.2 + i * 0.04 }}
                />
              );
            })}

            {/* Nodes */}
            {bgNodes.map((node, i) => (
              <motion.g key={`n-${i}`}>
                <motion.circle
                  cx={node.x} cy={node.y} r={node.r + 6}
                  fill={node.color} fillOpacity="0.06"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: node.delay, type: "spring", stiffness: 100 }}
                />
                <motion.circle
                  cx={node.x} cy={node.y} r={node.r}
                  fill={node.color} fillOpacity="0.55"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, y: [0, -3, 0, 3, 0] }}
                  transition={{
                    scale: { delay: node.delay, type: "spring", stiffness: 150 },
                    y: { duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: node.delay },
                  }}
                />
                <motion.circle
                  cx={node.x - node.r * 0.2} cy={node.y - node.r * 0.2}
                  r={node.r * 0.3}
                  fill="white" fillOpacity="0.12"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: node.delay + 0.15 }}
                />
              </motion.g>
            ))}
          </svg>
        </div>

        {/* ============ Content ============ */}
        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-2xl font-bold text-ink-900"
              >
                {project.name}
              </motion.h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={daysLeft > 7 ? "success" : daysLeft > 3 ? "warning" : "error"} dot>
                  Exam in {daysLeft} days
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => router.push(`/project/${projectId}/materials`)}>
                <FileText className="w-4 h-4 mr-1.5" /> Materials
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push(`/project/${projectId}/mock-exam`)}>
                <Network className="w-4 h-4 mr-1.5" /> Mock Exam
              </Button>
            </div>
          </div>

          {/* Stats */}
          <ProjectStats project={project} />

          {/* Main Content: Study Path + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar (on top for mobile) */}
            <div className="lg:order-2 space-y-4">
              <ReadinessScore score={project.readiness_score} daysLeft={daysLeft} />
              <TodaySession projectId={projectId} />
            </div>

            {/* Main content */}
            <div className="lg:col-span-2 lg:order-1">
              {/* View toggle */}
              <div className="flex items-center gap-1 bg-surface-100/80 backdrop-blur-sm rounded-xl p-1 w-fit mb-4 border border-surface-200">
                {views.map((v) => {
                  const Icon = v.icon;
                  return (
                    <button
                      key={v.key}
                      onClick={() => setViewMode(v.key)}
                      className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                        ${viewMode === v.key
                          ? "bg-surface-100 text-ink-900 shadow-soft"
                          : "text-ink-500 hover:text-ink-700"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{v.label}</span>
                    </button>
                  );
                })}
              </div>

              {viewMode === "path" && (
                <div className="bg-[#FCF9F1] rounded-3xl p-4 sm:p-6 shadow-soft border border-surface-200/50">
                  <StudyPath projectId={projectId} />
                </div>
              )}
              {viewMode === "list" && <TopicMap projectId={projectId} />}
              {viewMode === "calendar" && <CalendarView projectId={projectId} />}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
