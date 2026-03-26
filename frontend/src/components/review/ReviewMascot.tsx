"use client";

import { motion, AnimatePresence } from "framer-motion";

type MascotMood = "idle" | "encourage" | "streak" | "wrong" | "celebrate";

interface ReviewMascotProps {
  mood: MascotMood;
  message?: string;
  userName?: string;
}

export default function ReviewMascot({ mood, message, userName = "friend" }: ReviewMascotProps) {
  const bubbleMessages: Record<MascotMood, string> = {
    idle: "You got this!",
    encourage: "No worries! Let\u2019s try rephrasing that\u2026",
    streak: `You\u2019re on fire, ${userName}! \uD83D\uDD25`,
    wrong: "Hmm, let\u2019s review that one again!",
    celebrate: "Amazing work! \uD83C\uDF89",
  };

  const displayMessage = message || bubbleMessages[mood];
  const showBubble = mood !== "idle";

  return (
    <div className="fixed bottom-4 left-4 z-30 flex items-end gap-2">
      {/* Mascot */}
      <motion.div
        animate={
          mood === "wrong"
            ? { x: [0, -4, 4, -4, 0] }
            : mood === "streak"
            ? { y: [0, -6, 0] }
            : {}
        }
        transition={
          mood === "wrong"
            ? { duration: 0.4 }
            : mood === "streak"
            ? { duration: 0.6, repeat: 2 }
            : {}
        }
        className="flex-shrink-0"
      >
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14 sm:w-16 sm:h-16"
        >
          {/* Head */}
          <circle cx="40" cy="40" r="24" fill="#D4A04A" />
          <circle cx="40" cy="42" r="20" fill="#E6B85C" />
          {/* Ears */}
          <ellipse cx="18" cy="30" rx="8" ry="12" fill="#C49240" transform="rotate(-15 18 30)" />
          <ellipse cx="62" cy="30" rx="8" ry="12" fill="#C49240" transform="rotate(15 62 30)" />
          <ellipse cx="19" cy="31" rx="5" ry="8" fill="#D4A04A" transform="rotate(-15 19 31)" />
          <ellipse cx="61" cy="31" rx="5" ry="8" fill="#D4A04A" transform="rotate(15 61 31)" />
          {/* Muzzle */}
          <ellipse cx="40" cy="48" rx="10" ry="7" fill="#F0D080" />
          {/* Nose */}
          <ellipse cx="40" cy="45" rx="3.5" ry="2.5" fill="#3D2B1F" />
          {/* Mouth */}
          {mood === "wrong" ? (
            <path d="M36 52 Q40 49 44 52" stroke="#3D2B1F" strokeWidth="1.3" strokeLinecap="round" fill="none" />
          ) : (
            <path d="M36 50 Q40 54 44 50" stroke="#3D2B1F" strokeWidth="1.3" strokeLinecap="round" fill="none" />
          )}
          {/* Eyes */}
          {mood === "celebrate" || mood === "streak" ? (
            <>
              <path d="M28 37 Q32 33 36 37" stroke="#3D2B1F" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M44 37 Q48 33 52 37" stroke="#3D2B1F" strokeWidth="2" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <circle cx="32" cy="38" r="3.5" fill="#3D2B1F" />
              <circle cx="48" cy="38" r="3.5" fill="#3D2B1F" />
              <circle cx="33" cy="36.5" r="1.2" fill="white" />
              <circle cx="49" cy="36.5" r="1.2" fill="white" />
            </>
          )}
          {/* Glasses */}
          <circle cx="32" cy="38" r="7" stroke="#5A4A3A" strokeWidth="1.8" fill="none" />
          <circle cx="48" cy="38" r="7" stroke="#5A4A3A" strokeWidth="1.8" fill="none" />
          <path d="M39 38 L41 38" stroke="#5A4A3A" strokeWidth="1.8" />
          <path d="M25 36 L16 34" stroke="#5A4A3A" strokeWidth="1.8" />
          <path d="M55 36 L64 34" stroke="#5A4A3A" strokeWidth="1.8" />
        </svg>
      </motion.div>

      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative bg-white rounded-2xl px-3 py-2 shadow-warm border border-surface-200 max-w-[200px] mb-4"
          >
            <p className="text-xs sm:text-sm font-medium text-ink-700 leading-snug">
              {displayMessage}
            </p>
            {/* Arrow pointing to mascot */}
            <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-white border-b border-r border-surface-200 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
