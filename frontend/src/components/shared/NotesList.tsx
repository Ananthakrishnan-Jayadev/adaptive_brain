"use client";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { sessionNotes } from "@/lib/mock-data";

export default function NotesList({ topicId }: { topicId?: string }) {
  const notes = topicId ? sessionNotes.filter((n) => n.topic_id === topicId) : sessionNotes;

  return (
    <div className="space-y-2">
      {notes.map((note, i) => (
        <motion.div
          key={note.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-amber-100 rounded-xl p-3 border border-amber-100"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="text-sm text-ink-900">{note.text}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] text-ink-500">{note.topic_name}</span>
                <span className="text-[10px] text-ink-500">&middot;</span>
                <span className="text-[10px] text-ink-500">
                  {new Date(note.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button className="p-1 rounded hover:bg-amber-100 text-ink-500">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
