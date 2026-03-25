"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send, ChevronDown } from "lucide-react";
import { useToastStore } from "@/stores/toastStore";

const editHistory = [
  { input: "Make my focus window shorter", changed: "Focus Window → 15 minutes", time: "2 days ago" },
  { input: "I prefer visual learning", changed: "Learning Style → Visual-heavy", time: "5 days ago" },
  { input: "Turn off gamification elements", changed: "Engagement → Minimal", time: "1 week ago" },
];

export default function ProfilePromptEditor() {
  const [text, setText] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const addToast = useToastStore((s) => s.addToast);

  const handleSubmit = () => {
    if (!text.trim()) return;
    addToast({
      type: "success",
      title: "Profile updated",
      message: "Updated your focus window to 15 minutes",
    });
    setText("");
  };

  return (
    <div className="sticky bottom-0 bg-surface-100 border-t border-surface-200 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Edit history */}
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-1 text-xs text-ink-500 mb-2 hover:text-ink-500"
        >
          <ChevronDown className={`w-3 h-3 transition-transform ${showHistory ? "rotate-180" : ""}`} />
          Recent edits
        </button>

        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3 space-y-2 overflow-hidden"
            >
              {editHistory.map((edit, i) => (
                <div key={i} className="bg-surface-100 rounded-xl p-2 text-xs">
                  <p className="text-ink-500">&ldquo;{edit.input}&rdquo;</p>
                  <p className="text-brand-500 font-medium">{edit.changed}</p>
                  <p className="text-ink-500">{edit.time}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Tell me what to change..."
            className="flex-1 rounded-xl border border-surface-200 px-4 py-2.5 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="p-2.5 rounded-xl bg-brand-500 text-ink-800 disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
