"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { knowledgeGraph } from "@/lib/mock-data";

function getMasteryColor(mastery: number): string {
  if (mastery >= 80) return "#34995a";
  if (mastery >= 50) return "#f99b07";
  if (mastery > 0) return "#ff5c2e";
  return "#d1d1d1";
}

export default function InteractiveGraph({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const selectedNode = knowledgeGraph.nodes.find((n) => n.id === selected);

  return (
    <div className="relative bg-surface-100 rounded-xl border border-surface-200 shadow-soft overflow-hidden" style={{ height: 500 }}>
      {/* Legend */}
      <div className="absolute top-3 left-3 z-10 bg-surface-100/95 backdrop-blur rounded-xl p-2 text-xs space-y-1">
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-sage-500" /> 80%+</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500" /> 50-80%</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-coral-500" /> 1-50%</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-ink-200" /> 0%</div>
        <div className="flex items-center gap-1.5 mt-2"><span className="w-4 border-t-2 border-ink-400" /> Prereq</div>
        <div className="flex items-center gap-1.5"><span className="w-4 border-t-2 border-dashed border-ink-300" /> Related</div>
      </div>

      <svg width="100%" height="100%" viewBox="0 0 600 500">
        {/* Edges */}
        {knowledgeGraph.edges.map((edge, i) => {
          const from = knowledgeGraph.nodes.find((n) => n.id === edge.from);
          const to = knowledgeGraph.nodes.find((n) => n.id === edge.to);
          if (!from || !to) return null;
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={edge.type === "prerequisite" ? "#888" : "#d1d1d1"}
              strokeWidth={edge.type === "prerequisite" ? 2 : 1.5}
              strokeDasharray={edge.type === "related" ? "5 5" : "none"}
            />
          );
        })}

        {/* Nodes */}
        {knowledgeGraph.nodes.map((node) => {
          const color = getMasteryColor(node.mastery);
          const r = Math.max(20, node.estimated_minutes * 0.6);
          return (
            <g
              key={node.id}
              onClick={() => setSelected(selected === node.id ? null : node.id)}
              className="cursor-pointer"
            >
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill={color}
                opacity={0.2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              />
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={r * 0.7}
                fill={color}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15 }}
              />
              <text
                x={node.x}
                y={node.y + r + 14}
                textAnchor="middle"
                className="text-[10px] font-semibold fill-ink-700"
              >
                {node.label}
              </text>
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                className="text-[11px] font-bold fill-ink-50"
              >
                {node.mastery}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Selected node popup */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 right-4 bg-surface-100 rounded-xl shadow-elevated p-4 border border-surface-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display font-semibold text-ink-900">{selectedNode.label}</h4>
                <p className="text-sm text-ink-500">Mastery: {selectedNode.mastery}% &middot; {selectedNode.difficulty}</p>
              </div>
              <Button
                size="sm"
                onClick={() => router.push(`/project/${projectId}/topic/${selectedNode.id}`)}
              >
                Study
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
