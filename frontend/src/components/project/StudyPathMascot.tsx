"use client";

import { motion } from "framer-motion";

interface StudyPathMascotProps {
  variant: "wave" | "peek";
  size?: number;
}

/**
 * Golden Retriever with glasses mascot for the Study Path.
 * "wave" — full body, waving at the top of the path.
 * "peek" — just the head peeking from behind a node.
 */
export default function StudyPathMascot({ variant, size = 64 }: StudyPathMascotProps) {
  if (variant === "wave") {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Body */}
          <ellipse cx="60" cy="82" rx="28" ry="22" fill="#D4A04A" />
          <ellipse cx="60" cy="82" rx="22" ry="17" fill="#E6B85C" />

          {/* Head */}
          <circle cx="60" cy="48" r="26" fill="#D4A04A" />
          <circle cx="60" cy="50" r="22" fill="#E6B85C" />

          {/* Ears */}
          <ellipse cx="36" cy="38" rx="10" ry="14" fill="#C49240" transform="rotate(-15 36 38)" />
          <ellipse cx="84" cy="38" rx="10" ry="14" fill="#C49240" transform="rotate(15 84 38)" />
          <ellipse cx="37" cy="39" rx="7" ry="10" fill="#D4A04A" transform="rotate(-15 37 39)" />
          <ellipse cx="83" cy="39" rx="7" ry="10" fill="#D4A04A" transform="rotate(15 83 39)" />

          {/* Muzzle */}
          <ellipse cx="60" cy="56" rx="12" ry="8" fill="#F0D080" />

          {/* Nose */}
          <ellipse cx="60" cy="53" rx="4" ry="3" fill="#3D2B1F" />

          {/* Mouth */}
          <path d="M56 57 Q60 61 64 57" stroke="#3D2B1F" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* Eyes */}
          <circle cx="50" cy="45" r="4" fill="#3D2B1F" />
          <circle cx="70" cy="45" r="4" fill="#3D2B1F" />
          <circle cx="51.5" cy="43.5" r="1.5" fill="white" />
          <circle cx="71.5" cy="43.5" r="1.5" fill="white" />

          {/* Glasses */}
          <circle cx="50" cy="45" r="8" stroke="#5A4A3A" strokeWidth="2" fill="none" />
          <circle cx="70" cy="45" r="8" stroke="#5A4A3A" strokeWidth="2" fill="none" />
          <path d="M58 45 L62 45" stroke="#5A4A3A" strokeWidth="2" />
          <path d="M42 43 L34 40" stroke="#5A4A3A" strokeWidth="2" />
          <path d="M78 43 L86 40" stroke="#5A4A3A" strokeWidth="2" />

          {/* Waving arm */}
          <motion.g
            animate={{ rotate: [0, 15, -5, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            style={{ originX: "85px", originY: "70px" }}
          >
            <path
              d="M82 70 Q95 55 100 45"
              stroke="#D4A04A"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
            {/* Paw */}
            <circle cx="100" cy="44" r="5" fill="#E6B85C" />
          </motion.g>

          {/* Other arm */}
          <path
            d="M38 72 Q30 82 34 90"
            stroke="#D4A04A"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />

          {/* Feet */}
          <ellipse cx="48" cy="100" rx="8" ry="5" fill="#D4A04A" />
          <ellipse cx="72" cy="100" rx="8" ry="5" fill="#D4A04A" />
        </svg>
      </motion.div>
    );
  }

  // "peek" variant — just the head peeking from the side
  return (
    <motion.div
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring" }}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
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

        {/* Mouth — smile */}
        <path d="M36 50 Q40 54 44 50" stroke="#3D2B1F" strokeWidth="1.3" strokeLinecap="round" fill="none" />

        {/* Eyes */}
        <circle cx="32" cy="38" r="3.5" fill="#3D2B1F" />
        <circle cx="48" cy="38" r="3.5" fill="#3D2B1F" />
        <circle cx="33" cy="36.5" r="1.2" fill="white" />
        <circle cx="49" cy="36.5" r="1.2" fill="white" />

        {/* Glasses */}
        <circle cx="32" cy="38" r="7" stroke="#5A4A3A" strokeWidth="1.8" fill="none" />
        <circle cx="48" cy="38" r="7" stroke="#5A4A3A" strokeWidth="1.8" fill="none" />
        <path d="M39 38 L41 38" stroke="#5A4A3A" strokeWidth="1.8" />
        <path d="M25 36 L16 34" stroke="#5A4A3A" strokeWidth="1.8" />
        <path d="M55 36 L64 34" stroke="#5A4A3A" strokeWidth="1.8" />

        {/* Sparkle eyes — excited */}
        <motion.g
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <circle cx="33" cy="36" r="0.8" fill="#FFD700" />
          <circle cx="49" cy="36" r="0.8" fill="#FFD700" />
        </motion.g>
      </svg>
    </motion.div>
  );
}
