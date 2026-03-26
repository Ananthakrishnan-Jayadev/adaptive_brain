"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Brain } from "lucide-react";
import { topics, spacedRepetitionCards, quizQuestions } from "@/lib/mock-data";

// Determine which topics are "decaying" (have cards due for review)
const today = new Date().toISOString().split("T")[0];
const dueQuestionIds = new Set(
  spacedRepetitionCards
    .filter((c) => c.next_review_date <= today)
    .map((c) => c.question_id)
);
const dueTopicIds = new Set(
  quizQuestions
    .filter((q) => dueQuestionIds.has(q.id))
    .map((q) => q.topic_id)
);

// Layout nodes in a mini graph
const nodePositions = [
  { x: 65, y: 45 },
  { x: 150, y: 30 },
  { x: 235, y: 55 },
  { x: 110, y: 110 },
  { x: 190, y: 100 },
  { x: 60, y: 150 },
  { x: 150, y: 155 },
  { x: 240, y: 140 },
  { x: 100, y: 195 },
  { x: 200, y: 195 },
];

const edges = [
  [0, 1], [1, 2], [0, 3], [1, 4], [2, 4],
  [3, 5], [3, 6], [4, 7], [5, 8], [6, 8],
  [6, 9], [7, 9],
];

function getNodeColor(status: string): string {
  switch (status) {
    case "mastered": return "#337842";
    case "in_progress": return "#3a56b0";
    case "not_started": return "#a07518";
    case "locked": return "#b8b0a4";
    default: return "#b8b0a4";
  }
}

export default function BrainMapPreview({ projectId }: { projectId: string }) {
  const router = useRouter();
  const projectTopics = topics
    .filter((t) => t.project_id === projectId)
    .sort((a, b) => a.path_order - b.path_order);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="relative overflow-hidden rounded-3xl cursor-pointer group"
      onClick={() => router.push(`/project/${projectId}`)}
    >
      {/* Glass background */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl" />

      <div className="relative z-10 p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-semibold text-ink-800">Brain Map</span>
          </div>
          <span className="text-xs text-ink-400 group-hover:text-brand-500 transition-colors">
            View full map &rarr;
          </span>
        </div>

        {/* Mini graph */}
        <svg viewBox="0 0 300 230" className="w-full h-auto">
          {/* Edges */}
          {edges.map(([from, to], i) => {
            const a = nodePositions[from];
            const b = nodePositions[to];
            if (!a || !b) return null;
            return (
              <line
                key={`e-${i}`}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="#d0c9be"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />
            );
          })}

          {/* Nodes */}
          {projectTopics.slice(0, 10).map((topic, i) => {
            const pos = nodePositions[i];
            if (!pos) return null;
            const color = getNodeColor(topic.status);
            const isDecaying = dueTopicIds.has(topic.id);
            const radius = topic.status === "locked" ? 12 : 16;

            return (
              <g key={topic.id}>
                {/* Decay glow — pulsing orange/red for SM-2 due topics */}
                {isDecaying && (
                  <motion.circle
                    cx={pos.x} cy={pos.y} r={radius + 8}
                    fill="none"
                    stroke="#FF6B35"
                    strokeWidth="2"
                    strokeOpacity="0.6"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                {/* Main node */}
                <motion.circle
                  cx={pos.x} cy={pos.y} r={radius}
                  fill={color}
                  fillOpacity={topic.status === "locked" ? 0.4 : 0.8}
                  animate={
                    isDecaying
                      ? { scale: [1, 1.08, 1] }
                      : { scale: 1 }
                  }
                  transition={
                    isDecaying
                      ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      : {}
                  }
                />

                {/* Inner highlight */}
                <circle
                  cx={pos.x - radius * 0.2}
                  cy={pos.y - radius * 0.2}
                  r={radius * 0.3}
                  fill="white"
                  fillOpacity="0.2"
                />

                {/* Label */}
                <text
                  x={pos.x}
                  y={pos.y + radius + 12}
                  textAnchor="middle"
                  className={`text-[8px] font-medium ${
                    topic.status === "locked" ? "fill-ink-400" : "fill-ink-600"
                  }`}
                >
                  {topic.name.length > 10 ? topic.name.substring(0, 10) + "..." : topic.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex items-center gap-3 mt-2 justify-center">
          {[
            { color: "#337842", label: "Mastered" },
            { color: "#3a56b0", label: "In Progress" },
            { color: "#FF6B35", label: "Needs Review", pulse: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1">
              <div
                className={`w-2.5 h-2.5 rounded-full ${item.pulse ? "animate-pulse" : ""}`}
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[9px] text-ink-400">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
