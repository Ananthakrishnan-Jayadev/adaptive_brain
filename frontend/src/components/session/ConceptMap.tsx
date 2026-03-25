"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Node { id: string; label: string; x: number; y: number }
interface Edge { from: string; to: string; label: string }

interface ConceptMapProps {
  nodes: Node[];
  edges: Edge[];
  onComplete?: () => void;
}

function getMasteryColor(label: string): string {
  return "#3366ff";
}

export default function ConceptMap({ nodes, edges, onComplete }: ConceptMapProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const selectedNode = nodes.find((n) => n.id === selected);

  return (
    <div className="relative bg-surface-100 rounded-xl overflow-hidden border border-surface-200" style={{ height: 500 }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`${-offset.x} ${-offset.y} ${600 / scale} ${500 / scale}`}
        onWheel={(e) => setScale(Math.max(0.5, Math.min(2, scale - e.deltaY * 0.001)))}
        className="cursor-grab active:cursor-grabbing"
      >
        {/* Edges */}
        {edges.map((edge, i) => {
          const from = nodes.find((n) => n.id === edge.from);
          const to = nodes.find((n) => n.id === edge.to);
          if (!from || !to) return null;
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;
          return (
            <g key={i}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#bcd2ff"
                strokeWidth={2}
              />
              <text x={midX} y={midY - 5} textAnchor="middle" className="text-[9px] fill-ink-400">
                {edge.label}
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id} onClick={() => setSelected(selected === node.id ? null : node.id)} className="cursor-pointer">
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={28}
              fill="white"
              stroke={selected === node.id ? "#3366ff" : "#bcd2ff"}
              strokeWidth={selected === node.id ? 3 : 2}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-[10px] font-semibold fill-ink-800 pointer-events-none"
            >
              {node.label.length > 12 ? node.label.slice(0, 12) + "..." : node.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Selected node popup */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 bg-surface-100 rounded-xl shadow-elevated p-4 border border-surface-200"
        >
          <h4 className="font-display font-semibold text-ink-900">{selectedNode.label}</h4>
          <button
            onClick={() => setSelected(null)}
            className="absolute top-2 right-2 text-xs text-ink-500"
          >
            ✕
          </button>
        </motion.div>
      )}
    </div>
  );
}
