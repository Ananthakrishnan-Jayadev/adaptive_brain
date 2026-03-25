"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "@/components/ui/Button";

interface MicroLessonPlayerProps {
  screens: { title: string; key_point: string; explanation: string; visual_description: string }[];
  onComplete: () => void;
}

export default function MicroLessonPlayer({ screens, onComplete }: MicroLessonPlayerProps) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < screens.length - 1) setCurrent(current + 1);
    else onComplete();
  };

  return (
    <div className="relative min-h-[80vh] flex flex-col">
      {/* Progress dots */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
        {screens.map((_, i) => (
          <div
            key={i}
            className={`w-2 rounded-full transition-all ${
              i === current ? "h-6 bg-brand-500" : i < current ? "h-2 bg-sage-400" : "h-2 bg-surface-300"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-lg mx-auto text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="text-5xl mb-6"
          >
            {["📘", "📋", "🚀", "🔤", "🏗️"][current % 5]}
          </motion.span>

          <h3 className="font-display text-sm font-medium text-brand-500 uppercase tracking-wide mb-2">
            {screens[current].title}
          </h3>

          <p className="font-display text-2xl sm:text-3xl font-bold text-ink-900 mb-4 leading-tight">
            {screens[current].key_point}
          </p>

          <p className="text-ink-500 leading-relaxed mb-6">
            {screens[current].explanation}
          </p>

          <div className="bg-surface-100 rounded-xl p-4 text-sm text-ink-500 italic">
            🎨 {screens[current].visual_description}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="sticky bottom-0 flex items-center justify-between p-4 bg-surface-100/95 backdrop-blur-md border-t border-surface-200">
        <button
          onClick={() => current > 0 && setCurrent(current - 1)}
          disabled={current === 0}
          className="p-2 rounded-xl hover:bg-surface-100 disabled:opacity-30 text-ink-500"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        <span className="text-sm text-ink-500">
          {current + 1} / {screens.length}
        </span>

        <Button onClick={next} size="sm">
          {current === screens.length - 1 ? "Done" : "Next"}
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
