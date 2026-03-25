"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Minimize2, Clock, Leaf } from "lucide-react";
import Button from "@/components/ui/Button";
import { contentBlocks } from "@/lib/mock-data";

export default function FocusModePage() {
  const router = useRouter();
  const [elapsed, setElapsed] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [ended, setEnded] = useState(false);
  const content = contentBlocks[0];

  useEffect(() => {
    const timer = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const growthPercent = Math.min((elapsed / 1800) * 100, 100); // 30 min max
  const treeHeight = 20 + (growthPercent * 0.8);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  if (ended) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-sage-50 to-surface-50 flex items-center justify-center p-4"
      >
        <div className="max-w-sm text-center">
          <span className="text-5xl block mb-4">🌱</span>
          <h2 className="font-display text-2xl font-bold text-ink-900 mb-2">Great focus session!</h2>
          <div className="space-y-2 mb-6">
            <p className="text-ink-500">Time focused: <span className="font-bold text-ink-900">{formatTime(elapsed)}</span></p>
            <p className="text-ink-500">Focus score: <span className="font-bold text-sage-500">92%</span></p>
            <p className="text-brand-500 font-medium">+30 XP bonus</p>
          </div>
          <Button onClick={() => router.push("/project/proj_001")}>Back to Project</Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        animate={{
          background: [
            "linear-gradient(135deg, #f0faf4 0%, #eef4ff 100%)",
            "linear-gradient(135deg, #eef4ff 0%, #f0faf4 100%)",
            "linear-gradient(135deg, #f0faf4 0%, #eef4ff 100%)",
          ],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      />

      {/* Growing plant */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
        <svg width="120" height="200" viewBox="0 0 120 200">
          <motion.rect
            x="56"
            y={200 - treeHeight * 2}
            width="8"
            height={treeHeight * 2}
            fill="#56b479"
            rx="4"
            animate={{ height: treeHeight * 2, y: 200 - treeHeight * 2 }}
          />
          {growthPercent > 20 && (
            <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} cx="60" cy={200 - treeHeight * 2} r={growthPercent * 0.3 + 10} fill="#8bd0a5" opacity={0.7} />
          )}
          {growthPercent > 50 && (
            <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} cx="45" cy={200 - treeHeight * 1.5} r={growthPercent * 0.2} fill="#bae5cb" opacity={0.6} />
          )}
          {growthPercent > 70 && (
            <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} cx="75" cy={200 - treeHeight * 1.7} r={growthPercent * 0.15} fill="#dbf2e3" opacity={0.5} />
          )}
        </svg>
      </div>

      {/* Floating timer */}
      <button
        onClick={() => setShowTimer(!showTimer)}
        className="fixed top-4 right-4 z-20 p-2 rounded-xl bg-surface-100/95 backdrop-blur shadow-soft text-ink-500"
      >
        <Clock className="w-5 h-5" />
      </button>
      {showTimer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-14 right-4 z-20 bg-surface-100 rounded-xl shadow-elevated p-3"
        >
          <p className="font-mono text-lg font-bold text-ink-900">{formatTime(elapsed)}</p>
        </motion.div>
      )}

      {/* Exit button */}
      <button
        onClick={() => setShowExit(true)}
        className="fixed top-4 left-4 z-20 p-2 rounded-xl bg-surface-100/95 backdrop-blur shadow-soft text-ink-500"
      >
        <Minimize2 className="w-5 h-5" />
      </button>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto py-20 px-6">
        <h2 className="font-display text-2xl font-bold text-ink-900 mb-6">{content.title}</h2>
        {content.data.sections?.map((section: any, i: number) => (
          <div key={i} className="mb-8">
            <h3 className="font-display text-lg font-semibold text-ink-900 mb-3">{section.heading}</h3>
            {section.paragraphs.map((p: string, j: number) => (
              <p key={j} className="text-ink-500 leading-relaxed mb-3">{p}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Exit confirmation */}
      <AnimatePresence>
        {showExit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink-950/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-surface-100 rounded-xl p-6 max-w-sm">
              <h3 className="font-display font-bold text-lg mb-2">Exit focus mode?</h3>
              <p className="text-sm text-ink-500 mb-4">Your focus streak will be saved.</p>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setShowExit(false)} className="flex-1">Stay</Button>
                <Button onClick={() => setEnded(true)} className="flex-1">Exit</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
