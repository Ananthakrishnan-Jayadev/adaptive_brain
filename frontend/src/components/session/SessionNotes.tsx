"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { StickyNote, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { sessionNotes } from "@/lib/mock-data";

export default function SessionNotes({ topicId }: { topicId: string }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [notes, setNotes] = useState(sessionNotes.filter((n) => n.topic_id === topicId));

  const addNote = () => {
    if (!text.trim()) return;
    setNotes([
      { id: `note_new_${Date.now()}`, topic_id: topicId, topic_name: "", text, timestamp: new Date().toISOString() },
      ...notes,
    ]);
    setText("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-30">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 shadow-warm flex items-center justify-center"
      >
        <StickyNote className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-14 right-0 w-72 bg-surface-100 rounded-xl shadow-elevated border border-surface-200 overflow-hidden"
          >
            <div className="p-3 border-b border-surface-200">
              <h4 className="text-sm font-semibold text-ink-900">Quick Notes</h4>
            </div>
            <div className="p-3">
              <div className="flex gap-2 mb-3">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addNote()}
                  placeholder="Jot something down..."
                  className="flex-1 text-sm border border-surface-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-300"
                />
                <button onClick={addNote} className="p-1.5 rounded-xl bg-brand-50 text-brand-600">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {notes.map((note) => (
                  <div key={note.id} className="bg-amber-100 rounded-xl p-2">
                    <p className="text-xs text-ink-900">{note.text}</p>
                    <p className="text-[10px] text-ink-500 mt-1">
                      {new Date(note.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
