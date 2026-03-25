"use client";

import { motion } from "framer-motion";

interface ComparisonTableProps {
  columns: string[];
  rows: string[][];
  onComplete?: () => void;
}

export default function ComparisonTable({ columns, rows, onComplete }: ComparisonTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto py-4"
    >
      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-surface-200">
        <table className="w-full">
          <thead>
            <tr className="bg-brand-100">
              {columns.map((col, i) => (
                <th key={i} className="text-left text-sm font-semibold text-brand-700 px-4 py-3">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-t border-surface-200 hover:bg-surface-100"
              >
                {row.map((cell, j) => (
                  <td key={j} className={`px-4 py-3 text-sm ${j === 0 ? "font-medium text-ink-800" : "text-ink-500"}`}>
                    {cell}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {rows.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-surface-100 rounded-xl p-4 border border-surface-200 shadow-soft"
          >
            <p className="font-semibold text-sm text-ink-900 mb-2">{row[0]}</p>
            <div className="space-y-1.5">
              {row.slice(1).map((cell, j) => (
                <div key={j} className="flex items-start gap-2">
                  <span className="text-xs font-medium text-brand-500 min-w-[60px]">{columns[j + 1]}:</span>
                  <span className="text-xs text-ink-500">{cell}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
