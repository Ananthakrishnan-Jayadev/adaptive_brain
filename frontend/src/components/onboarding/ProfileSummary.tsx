"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Headphones, Clock, Gamepad2, Globe, Brain, Moon, BarChart3, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

const traits = [
  { icon: Headphones, label: "Learning Style", value: "Mixed", description: "You learn best through a mix of formats. We'll vary content delivery to keep things fresh." },
  { icon: Clock, label: "Focus Window", value: "~20 minutes", description: "We'll keep sessions snappy with natural break points." },
  { icon: Gamepad2, label: "Engagement", value: "Gamified", description: "Challenges, XP, and streaks keep you going. Let's make studying feel rewarding." },
  { icon: Globe, label: "Language", value: "Comfortable", description: "You're confident with academic English. No dumbing down needed." },
  { icon: Brain, label: "Profile", value: "ADHD", description: "We'll keep content short, varied, and snappy. Frequent context switches to stay engaged." },
  { icon: Moon, label: "Study Time", value: "Evening", description: "Night owl vibes. We'll schedule reminders for your peak hours." },
  { icon: BarChart3, label: "Motivation", value: "Progress Stats", description: "Seeing the numbers go up keeps you going. We'll make your progress impossible to miss." },
];

export default function ProfileSummary() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-brand-100 mb-4"
        >
          <Sparkles className="w-8 h-8 text-brand-500" />
        </motion.div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">
          Here&apos;s what I learned about you
        </h2>
        <p className="text-ink-500 mt-2">Your learning profile is ready. Let&apos;s make it work for you.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {traits.map((trait, i) => {
          const Icon = trait.icon;
          return (
            <motion.div
              key={trait.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-surface-100 rounded-xl p-4 border border-surface-200 shadow-soft"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-brand-100 flex items-center justify-center text-brand-500">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-xs text-ink-500 font-medium">{trait.label}</p>
                  <p className="text-sm font-semibold text-ink-900">{trait.value}</p>
                </div>
              </div>
              <p className="text-xs text-ink-500 leading-relaxed">{trait.description}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center space-y-3">
        <Button size="lg" onClick={() => router.push("/dashboard")} className="px-12">
          Looks good, let&apos;s go!
        </Button>
        <p className="text-sm text-ink-600 hover:text-brand-500 cursor-pointer transition-colors">
          Want to adjust anything?
        </p>
      </div>
    </motion.div>
  );
}
