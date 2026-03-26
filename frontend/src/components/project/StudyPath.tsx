"use client";

import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Lock, Check, BookOpen, Sparkles } from "lucide-react";
import { topics, studyPlan } from "@/lib/mock-data";
import StudyPathMascot from "./StudyPathMascot";

// ─── Types ───────────────────────────────────────────────────
type TopicStatus = "mastered" | "in_progress" | "not_started" | "locked";

interface Topic {
  id: string;
  project_id: string;
  name: string;
  description: string;
  difficulty: "foundational" | "intermediate" | "advanced";
  status: TopicStatus;
  mastery_percentage: number;
  path_order: number;
  prerequisites: string[];
  estimated_minutes: number;
  time_spent_minutes: number;
  questions_answered: number;
  accuracy: number;
}

interface UnitDef {
  title: string;
  description: string;
  color: string;
  bgClass: string;
}

// ─── Unit definitions by difficulty ──────────────────────────
const unitMap: Record<string, UnitDef> = {
  foundational: {
    title: "Unit 1: Fundamentals",
    description: "Build your foundation — the core concepts everything else rests on.",
    color: "#FF6B35",
    bgClass: "from-coral-500 to-coral-600",
  },
  intermediate: {
    title: "Unit 2: Core Concepts",
    description: "Deepen your understanding with the heart of the subject.",
    color: "#6C63FF",
    bgClass: "from-brand-500 to-brand-600",
  },
  advanced: {
    title: "Unit 3: Advanced Topics",
    description: "Connect the dots and master the big picture.",
    color: "#337842",
    bgClass: "from-sage-500 to-sage-600",
  },
};

// ─── Zigzag positions ────────────────────────────────────────
// Pattern: left, center, right, center, left, center, right...
const zigzagPattern = [
  "left",
  "center",
  "right",
  "center",
] as const;

function getNodePosition(index: number): "left" | "center" | "right" {
  return zigzagPattern[index % zigzagPattern.length];
}

function getNodeXOffset(position: "left" | "center" | "right"): string {
  switch (position) {
    case "left": return "mr-auto ml-[15%] sm:ml-[20%] md:ml-[18%]";
    case "right": return "ml-auto mr-[15%] sm:mr-[20%] md:mr-[18%]";
    case "center": return "mx-auto";
  }
}

// ─── Today logic ─────────────────────────────────────────────
const today = new Date().toISOString().split("T")[0];
const todayTopicIds =
  studyPlan.days.find((d) => d.date === today)?.topic_ids || [];

// ─── Node component ──────────────────────────────────────────
function PathNode({
  topic,
  index,
  projectId,
  isCurrent,
}: {
  topic: Topic;
  index: number;
  projectId: string;
  isCurrent: boolean;
}) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const position = getNodePosition(index);
  const isClickable = topic.status !== "locked";

  const nodeSize = isCurrent ? "w-20 h-20 sm:w-24 sm:h-24" : "w-16 h-16 sm:w-20 sm:h-20";

  // Node colors by status
  const nodeStyles: Record<TopicStatus, { bg: string; border: string; borderBottom: string; shadow: string }> = {
    mastered: {
      bg: "bg-sage-400",
      border: "border-sage-500",
      borderBottom: "border-b-[6px] border-b-sage-600",
      shadow: "shadow-[0_4px_0_0_#286236]",
    },
    in_progress: {
      bg: "bg-brand-400",
      border: "border-brand-500",
      borderBottom: "border-b-[6px] border-b-brand-600",
      shadow: "shadow-[0_4px_0_0_#2e4590]",
    },
    not_started: {
      bg: "bg-brand-200",
      border: "border-brand-300",
      borderBottom: "border-b-[6px] border-b-brand-400",
      shadow: "shadow-[0_4px_0_0_#7a92d6]",
    },
    locked: {
      bg: "bg-surface-200",
      border: "border-surface-300",
      borderBottom: "border-b-[6px] border-b-surface-400",
      shadow: "shadow-[0_4px_0_0_#b8b0a4]",
    },
  };

  const styles = nodeStyles[topic.status];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: 0.05, type: "spring", stiffness: 200, damping: 20 }}
      className={`relative flex flex-col items-center ${getNodeXOffset(position)}`}
    >
      {/* "TODAY" / "START" tooltip for current node */}
      {isCurrent && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: [0, -4, 0] }}
          transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
          className="mb-2 px-4 py-1.5 bg-amber-400 text-amber-900 font-display font-bold text-xs sm:text-sm rounded-xl shadow-warm relative"
        >
          START
          {/* Tooltip arrow */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-400 rotate-45 rounded-sm" />
        </motion.div>
      )}

      {/* Mascot peeking for current node */}
      {isCurrent && (
        <div className="absolute -right-10 sm:-right-14 top-1/2 -translate-y-1/2 z-10">
          <StudyPathMascot variant="peek" size={48} />
        </div>
      )}

      {/* The 3D "clicky" circle button */}
      <motion.button
        whileHover={isClickable ? { scale: 1.05 } : undefined}
        whileTap={isClickable ? { scale: 0.95, y: 4 } : undefined}
        onClick={() =>
          isClickable && router.push(`/project/${projectId}/topic/${topic.id}`)
        }
        className={`
          relative ${nodeSize} rounded-full flex items-center justify-center
          ${styles.bg} ${styles.border} ${styles.borderBottom}
          border-2
          ${isClickable ? "cursor-pointer active:border-b-2 active:mt-1 active:shadow-none" : "cursor-default opacity-60"}
          transition-all duration-100
        `}
        style={{
          boxShadow: isClickable
            ? undefined
            : undefined,
        }}
      >
        {/* Pulse ring for current */}
        {isCurrent && (
          <>
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border-3 border-brand-400"
            />
            <motion.div
              animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="absolute inset-0 rounded-full border-2 border-brand-300"
            />
          </>
        )}

        {/* Mastery progress ring */}
        {topic.mastery_percentage > 0 && topic.status !== "locked" && (
          <svg className="absolute inset-0 -rotate-90 w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="4"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${(topic.mastery_percentage / 100) * 289} 289`}
            />
          </svg>
        )}

        {/* Icon */}
        {topic.status === "mastered" && (
          <Check className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={3} />
        )}
        {topic.status === "in_progress" && (
          <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        )}
        {topic.status === "not_started" && (
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/40" />
        )}
        {topic.status === "locked" && (
          <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-surface-500" />
        )}

        {/* Shine sweep for mastered */}
        {topic.status === "mastered" && (
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
          >
            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </motion.div>
        )}
      </motion.button>

      {/* Label below node */}
      <div className="mt-2 text-center max-w-[120px] sm:max-w-[140px]">
        <p
          className={`font-display font-semibold text-xs sm:text-sm leading-tight ${
            topic.status === "locked" ? "text-ink-400" : "text-ink-800"
          }`}
        >
          {topic.name}
        </p>
        {topic.mastery_percentage > 0 && topic.status !== "locked" && (
          <p className="text-[10px] sm:text-xs text-ink-500 mt-0.5">
            {topic.mastery_percentage}%
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── SVG connector between nodes ─────────────────────────────
function PathConnector({
  fromIndex,
  toIndex,
  isLocked,
}: {
  fromIndex: number;
  toIndex: number;
  isLocked: boolean;
}) {
  const fromPos = getNodePosition(fromIndex);
  const toPos = getNodePosition(toIndex);

  // Map positions to x coords in a 200-wide viewBox centered at 100
  const xMap = { left: 40, center: 100, right: 160 };
  const x1 = xMap[fromPos];
  const x2 = xMap[toPos];
  const cpX = (x1 + x2) / 2;

  return (
    <div className="w-48 sm:w-64 md:w-80 h-10 sm:h-14 mx-auto relative">
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 200 50"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d={`M ${x1} 2 Q ${cpX} 25 ${x2} 48`}
          stroke={isLocked ? "#d0c9be" : "#a8b8e6"}
          strokeWidth="3"
          fill="none"
          strokeDasharray={isLocked ? "6 8" : "none"}
          strokeLinecap="round"
          opacity={isLocked ? 0.5 : 0.6}
        />
      </svg>
    </div>
  );
}

// ─── Unit header card ────────────────────────────────────────
function UnitHeader({ unit, index }: { unit: UnitDef; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`
        w-full max-w-sm mx-auto rounded-2xl p-4 sm:p-5
        bg-gradient-to-br ${unit.bgClass}
        text-white shadow-warm
        my-6 sm:my-8
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-display font-bold text-base sm:text-lg">{unit.title}</h3>
          <p className="text-white/80 text-xs sm:text-sm mt-1 leading-relaxed">
            {unit.description}
          </p>
        </div>
        <button className="flex-shrink-0 ml-3 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main StudyPath component ────────────────────────────────
export default function StudyPath({ projectId }: { projectId: string }) {
  const projectTopics = topics
    .filter((t) => t.project_id === projectId)
    .sort((a, b) => a.path_order - b.path_order);

  // Find the current (first in_progress or first not_started) topic
  const currentTopicId =
    projectTopics.find((t) => t.status === "in_progress")?.id ||
    projectTopics.find((t) => t.status === "not_started")?.id ||
    null;

  // Group topics by difficulty for unit headers
  const shownUnits = new Set<string>();
  const pathElements: { type: "unit" | "node" | "connector"; data: unknown }[] = [];

  projectTopics.forEach((topic, i) => {
    // Insert unit header only the first time we see a difficulty level
    if (!shownUnits.has(topic.difficulty)) {
      const unit = unitMap[topic.difficulty];
      if (unit) {
        pathElements.push({
          type: "unit",
          data: { unit, index: Object.keys(unitMap).indexOf(topic.difficulty), difficulty: topic.difficulty },
        });
      }
      shownUnits.add(topic.difficulty);
    }

    // Insert connector (except before first node)
    if (i > 0) {
      pathElements.push({
        type: "connector",
        data: { fromIndex: i - 1, toIndex: i, isLocked: topic.status === "locked" },
      });
    }

    // Insert node
    pathElements.push({
      type: "node",
      data: { topic, index: i, isCurrent: topic.id === currentTopicId },
    });
  });

  return (
    <div className="relative py-6 sm:py-8">
      {/* Mascot at the top, waving */}
      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <StudyPathMascot variant="wave" size={80} />
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display font-bold text-ink-700 text-sm sm:text-base mt-2"
        >
          {getGreeting()}, let&apos;s learn!
        </motion.p>
      </div>

      {/* Path container */}
      <div className="relative flex flex-col">
        {pathElements.map((el, i) => {
          if (el.type === "unit") {
            const { unit, index, difficulty } = el.data as { unit: UnitDef; index: number; difficulty: string };
            return <UnitHeader key={`unit-${difficulty}-${i}`} unit={unit} index={index} />;
          }

          if (el.type === "connector") {
            const { fromIndex, toIndex, isLocked } = el.data as {
              fromIndex: number;
              toIndex: number;
              isLocked: boolean;
            };
            return (
              <PathConnector
                key={`conn-${fromIndex}-${toIndex}`}
                fromIndex={fromIndex}
                toIndex={toIndex}
                isLocked={isLocked}
              />
            );
          }

          if (el.type === "node") {
            const { topic, index, isCurrent } = el.data as {
              topic: Topic;
              index: number;
              isCurrent: boolean;
            };
            return (
              <PathNode
                key={topic.id}
                topic={topic}
                index={index}
                projectId={projectId}
                isCurrent={isCurrent}
              />
            );
          }

          return null;
        })}
      </div>

      {/* End of path decoration */}
      <div className="flex flex-col items-center mt-8 opacity-50">
        <div className="w-0.5 h-8 bg-surface-300 rounded-full" />
        <div className="w-3 h-3 rounded-full bg-surface-300 mt-1" />
        <p className="text-xs text-ink-400 mt-2 font-display">More coming soon...</p>
      </div>
    </div>
  );
}

// ─── Helper ──────────────────────────────────────────────────
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
