"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Sparkles, Brain, Flame, Eye } from "lucide-react";
import { currentUser } from "@/lib/mock-data";

// Derive learning rank from XP
function getMasteryRank(xp: number): { title: string; tier: string } {
  if (xp >= 5000) return { title: "Grand Architect", tier: "Diamond" };
  if (xp >= 3000) return { title: "Knowledge Weaver", tier: "Platinum" };
  if (xp >= 2000) return { title: "Rising Scholar", tier: "Gold" };
  if (xp >= 1000) return { title: "Curious Explorer", tier: "Silver" };
  return { title: "Fresh Mind", tier: "Bronze" };
}

// Derive learning style label
function getLearningStyle(modality: string): { label: string; icon: typeof Eye } {
  switch (modality) {
    case "visual": return { label: "Visual Architect", icon: Eye };
    case "auditory": return { label: "Audio Navigator", icon: Eye };
    case "reading": return { label: "Textual Scholar", icon: Eye };
    default: return { label: "Polymath Learner", icon: Brain };
  }
}

export default function LearningIdentityCard() {
  const { title: rankTitle, tier } = getMasteryRank(currentUser.total_xp);
  const { label: styleLabel } = getLearningStyle(currentUser.profile.learning_modality);
  const initials = currentUser.name.split(" ").map((n) => n[0]).join("");

  return (
    <Tilt
      tiltMaxAngleX={12}
      tiltMaxAngleY={12}
      glareEnable={true}
      glareMaxOpacity={0.45}
      glarePosition="all"
      glareBorderRadius="1.5rem"
      perspective={1000}
      scale={1.02}
      className="w-full max-w-sm mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-7 aspect-[3/4]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Holographic gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />

        {/* Animated shimmer overlay */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
        </motion.div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px, 40px 40px",
        }} />

        {/* Card content */}
        <div className="relative z-10 h-full flex flex-col justify-between text-white" style={{ transform: "translateZ(30px)" }}>
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-white/80" />
                <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">
                  The Adaptive Brain
                </span>
              </div>
              <Sparkles className="w-4 h-4 text-white/50" />
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <span className="font-display text-2xl font-bold">{initials}</span>
              </div>
              <div>
                <h2 className="font-display text-xl font-bold">{currentUser.name}</h2>
                <p className="text-sm text-white/70">{currentUser.email}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            {/* Learning Style */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
              <p className="text-[10px] uppercase tracking-widest text-white/50 mb-0.5">Learning Style</p>
              <p className="font-display font-bold text-lg">{styleLabel}</p>
            </div>

            {/* Rank & Stats row */}
            <div className="flex gap-3">
              <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2.5 border border-white/20">
                <p className="text-[10px] uppercase tracking-widest text-white/50 mb-0.5">Mastery Rank</p>
                <p className="font-display font-bold text-sm">{rankTitle}</p>
                <p className="text-[10px] text-white/60">{tier} Tier</p>
              </div>
              <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2.5 border border-white/20">
                <p className="text-[10px] uppercase tracking-widest text-white/50 mb-0.5">Total XP</p>
                <p className="font-display font-bold text-sm">{currentUser.total_xp.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Flame className="w-3 h-3 text-orange-300" />
                  <p className="text-[10px] text-white/60">{currentUser.current_streak}d streak</p>
                </div>
              </div>
            </div>

            {/* Mascot "Official Validator" stamp */}
            <div className="flex items-center justify-end gap-2 pt-1">
              <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-2.5 py-1 border border-white/20">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <circle cx="12" cy="11" r="7" fill="#E6B85C" />
                  <circle cx="12" cy="12" r="6" fill="#D4A04A" />
                  <ellipse cx="12" cy="14" rx="3" ry="2" fill="#F0D080" />
                  <circle cx="10" cy="10.5" r="1" fill="#3D2B1F" />
                  <circle cx="14" cy="10.5" r="1" fill="#3D2B1F" />
                  <circle cx="10" cy="10.5" r="2" stroke="#5A4A3A" strokeWidth="0.6" fill="none" />
                  <circle cx="14" cy="10.5" r="2" stroke="#5A4A3A" strokeWidth="0.6" fill="none" />
                  <line x1="12" y1="10.5" x2="12.5" y2="10.5" stroke="#5A4A3A" strokeWidth="0.6" />
                </svg>
                <span className="text-[9px] font-semibold text-white/60 uppercase tracking-wider">Verified Learner</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
}
