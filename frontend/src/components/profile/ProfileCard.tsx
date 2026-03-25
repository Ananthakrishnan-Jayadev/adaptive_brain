"use client";

import { motion } from "framer-motion";
import { Headphones, Clock, Gamepad2, Globe, Brain, Moon, BarChart3 } from "lucide-react";

const traits = [
  { icon: Headphones, label: "Learning Style", value: "Mixed", emoji: "🎧", description: "You learn best through a mix of formats. We'll vary content delivery to keep things fresh." },
  { icon: Clock, label: "Focus Window", value: "~20 minutes", emoji: "⏱️", description: "We'll keep sessions snappy with natural break points around 20 minutes." },
  { icon: Gamepad2, label: "Engagement", value: "Gamified", emoji: "🎮", description: "Challenges keep you going. XP, streaks, and achievements are your fuel." },
  { icon: Globe, label: "Language", value: "Comfortable with academic English", emoji: "🌐", description: "You handle academic text well. No simplification needed." },
  { icon: Brain, label: "Profile", value: "ADHD", emoji: "🧠", description: "We'll keep things short and snappy. Frequent variety to maintain engagement." },
  { icon: Moon, label: "Study Time", value: "Evening owl", emoji: "🌙", description: "You peak in the evenings. We'll schedule accordingly." },
  { icon: BarChart3, label: "Motivation", value: "Seeing progress in stats", emoji: "📊", description: "Numbers going up = dopamine. We'll make your progress impossible to miss." },
];

export default function ProfileCard() {
  return (
    <div className="space-y-3">
      {traits.map((trait, i) => {
        const Icon = trait.icon;
        return (
          <motion.div
            key={trait.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-surface-100 rounded-xl p-4 border border-surface-200 shadow-soft"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-500">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-ink-500 font-medium">{trait.emoji} {trait.label}</p>
                <p className="text-sm font-semibold text-ink-900">{trait.value}</p>
              </div>
            </div>
            <p className="text-xs text-ink-500 leading-relaxed ml-[52px]">{trait.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
