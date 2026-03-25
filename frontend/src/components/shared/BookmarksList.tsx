"use client";

import { motion } from "framer-motion";
import { Bookmark, X } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { bookmarks } from "@/lib/mock-data";

export default function BookmarksList() {
  return (
    <div className="space-y-2">
      {bookmarks.map((bm, i) => (
        <motion.div
          key={bm.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-surface-100 rounded-xl p-3 border border-surface-200 flex items-start gap-3"
        >
          <Bookmark className="w-4 h-4 text-coral-500 fill-coral-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-ink-900">{bm.topic_name}</span>
              <Badge size="sm">{bm.content_type}</Badge>
            </div>
            <p className="text-xs text-ink-500 truncate">{bm.preview}</p>
            <p className="text-[10px] text-ink-500 mt-1">{new Date(bm.saved_at).toLocaleDateString()}</p>
          </div>
          <button className="p-1 rounded hover:bg-surface-100 text-ink-500">
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      ))}
    </div>
  );
}
