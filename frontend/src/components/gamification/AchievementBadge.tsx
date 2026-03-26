"use client";

import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { Lock } from "lucide-react";
import { useState } from "react";

interface AchievementBadgeProps {
  achievement: {
    id: string;
    name: string;
    description: string;
    icon_name: string;
    xp_award: number;
    earned: boolean;
    earned_at: string | null;
    type: string;
  };
}

// Medal tier colors based on XP award
function getMedalStyle(xp: number, earned: boolean) {
  if (!earned) {
    return {
      bg: "bg-gradient-to-b from-surface-200 via-surface-300 to-surface-200",
      ring: "ring-surface-300",
      iconBg: "bg-surface-200",
      iconColor: "text-ink-400",
      shimmer: "from-transparent via-white/10 to-transparent",
    };
  }
  if (xp >= 200) {
    // Gold
    return {
      bg: "bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500",
      ring: "ring-amber-500",
      iconBg: "bg-amber-200/50",
      iconColor: "text-amber-800",
      shimmer: "from-transparent via-yellow-200/40 to-transparent",
    };
  }
  if (xp >= 75) {
    // Silver
    return {
      bg: "bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400",
      ring: "ring-gray-400",
      iconBg: "bg-gray-200/50",
      iconColor: "text-gray-700",
      shimmer: "from-transparent via-white/30 to-transparent",
    };
  }
  // Bronze
  return {
    bg: "bg-gradient-to-b from-orange-300 via-orange-400 to-orange-500",
    ring: "ring-orange-500",
    iconBg: "bg-orange-200/50",
    iconColor: "text-orange-800",
    shimmer: "from-transparent via-orange-200/30 to-transparent",
  };
}

export default function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const [showDetail, setShowDetail] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[achievement.icon_name] || Icons.Star;
  const style = getMedalStyle(achievement.xp_award, achievement.earned);

  return (
    <>
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowDetail(!showDetail)}
        whileTap={{ scale: 0.95 }}
        className="relative w-full flex flex-col items-center gap-2 p-3 rounded-xl focus:outline-none"
        style={{ perspective: "600px" }}
      >
        {/* Medal circle */}
        <motion.div
          animate={isHovered && achievement.earned ? { rotateY: 360 } : { rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`
            relative w-16 h-16 sm:w-18 sm:h-18 rounded-full
            ${style.bg}
            ring-2 ${style.ring} ring-offset-2 ring-offset-[#FCF9F1]
            flex items-center justify-center
            ${achievement.earned ? "shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.15),0_4px_8px_rgba(0,0,0,0.1)]" : "opacity-50"}
          `}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Shimmer sweep */}
          {achievement.earned && (
            <motion.div
              animate={isHovered ? { x: ["-100%", "200%"] } : {}}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
            >
              <div className={`w-1/3 h-full bg-gradient-to-r ${style.shimmer}`} />
            </motion.div>
          )}

          {/* Inner highlight for metallic look */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3/5 h-2/5 rounded-full bg-white/25 blur-[2px]" />

          {/* Icon */}
          <div className={`relative z-10 w-8 h-8 rounded-lg ${style.iconBg} flex items-center justify-center`}>
            {achievement.earned ? (
              <IconComponent className={`w-4 h-4 ${style.iconColor}`} />
            ) : (
              <Lock className="w-4 h-4 text-ink-400" />
            )}
          </div>
        </motion.div>

        {/* Name */}
        <span className={`text-[11px] font-semibold text-center leading-tight ${
          achievement.earned ? "text-ink-800" : "text-ink-400"
        }`}>
          {achievement.name}
        </span>

        {/* XP label */}
        {achievement.earned && (
          <span className="text-[9px] font-medium text-brand-500">+{achievement.xp_award} XP</span>
        )}
      </motion.button>

      {/* Detail popup */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            className="absolute z-30 bg-white rounded-2xl shadow-elevated p-4 border border-surface-200 w-56"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-lg ${achievement.earned ? "bg-brand-50" : "bg-surface-100"} flex items-center justify-center`}>
                <IconComponent className={`w-4 h-4 ${achievement.earned ? "text-brand-600" : "text-ink-400"}`} />
              </div>
              <h4 className="font-display font-bold text-sm text-ink-900">{achievement.name}</h4>
            </div>
            <p className="text-xs text-ink-500 mb-2">{achievement.description}</p>
            <p className="text-xs font-semibold text-brand-500">+{achievement.xp_award} XP</p>
            {achievement.earned_at && (
              <p className="text-[10px] text-ink-400 mt-1">
                Earned {new Date(achievement.earned_at).toLocaleDateString()}
              </p>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); setShowDetail(false); }}
              className="text-[10px] text-ink-400 hover:text-ink-600 mt-2 transition-colors"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
