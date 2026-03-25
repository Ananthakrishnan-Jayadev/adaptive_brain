"use client";

import { motion } from "framer-motion";
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
  };
}

export default function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const [showDetail, setShowDetail] = useState(false);
  const IconComponent = (Icons as any)[achievement.icon_name] || Icons.Star;

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowDetail(!showDetail)}
        className={`
          relative w-full aspect-square rounded-xl flex flex-col items-center justify-center gap-2 p-3
          transition-all border-2
          ${achievement.earned
            ? "bg-gradient-to-br from-brand-50 to-coral-50 border-brand-200 shadow-soft"
            : "bg-surface-100 border-surface-200 opacity-60 grayscale"
          }
        `}
      >
        {!achievement.earned && (
          <div className="absolute top-2 right-2">
            <Lock className="w-3 h-3 text-ink-500" />
          </div>
        )}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          achievement.earned ? "bg-brand-50 text-brand-600" : "bg-surface-100 text-ink-500"
        }`}>
          <IconComponent className="w-5 h-5" />
        </div>
        <span className="text-xs font-semibold text-ink-900 text-center leading-tight">
          {achievement.name}
        </span>
      </motion.button>

      {showDetail && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-20 bg-surface-100 rounded-xl shadow-elevated p-4 border border-surface-200 w-56"
        >
          <h4 className="font-display font-bold text-sm text-ink-900">{achievement.name}</h4>
          <p className="text-xs text-ink-500 mt-1">{achievement.description}</p>
          <p className="text-xs font-medium text-brand-500 mt-2">+{achievement.xp_award} XP</p>
          {achievement.earned_at && (
            <p className="text-[10px] text-ink-500 mt-1">
              Earned {new Date(achievement.earned_at).toLocaleDateString()}
            </p>
          )}
          <button onClick={() => setShowDetail(false)} className="text-[10px] text-ink-500 mt-2">
            Close
          </button>
        </motion.div>
      )}
    </>
  );
}
