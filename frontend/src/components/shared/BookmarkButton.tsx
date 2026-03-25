"use client";

import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { useState } from "react";

interface BookmarkButtonProps {
  initialBookmarked?: boolean;
  onToggle?: (bookmarked: boolean) => void;
}

export default function BookmarkButton({ initialBookmarked = false, onToggle }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  const toggle = () => {
    const next = !bookmarked;
    setBookmarked(next);
    onToggle?.(next);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={toggle}
      className="p-1.5 rounded-xl hover:bg-surface-100 transition-colors"
    >
      <motion.div animate={{ scale: bookmarked ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
        <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-coral-500 text-coral-500" : "text-ink-500"}`} />
      </motion.div>
    </motion.button>
  );
}
