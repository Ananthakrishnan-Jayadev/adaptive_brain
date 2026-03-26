"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { Heart, RotateCcw, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import ReviewMascot from "./ReviewMascot";
import BrainBreakModal from "./BrainBreakModal";

// ─── Types ───────────────────────────────────────────────────
interface ReviewCard {
  id: string;
  question: string;
  answer: string;
  explanation?: string;
}

interface SpacedReviewProps {
  cards: ReviewCard[];
  userName?: string;
  onComplete: (results: { correct: number; total: number; xpEarned: number }) => void;
  onExit?: () => void;
}

// ─── Constants ───────────────────────────────────────────────
const MAX_HEARTS = 5;
const SWIPE_THRESHOLD = 100;
const STREAK_THRESHOLD = 3;

// ─── Heart display component ────────────────────────────────
function HeartsBar({
  hearts,
  maxHearts,
  shakingIndex,
}: {
  hearts: number;
  maxHearts: number;
  shakingIndex: number | null;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: maxHearts }).map((_, i) => {
        const isActive = i < hearts;
        const isShaking = shakingIndex === i;

        return (
          <motion.div
            key={i}
            animate={
              isShaking
                ? { scale: [1, 1.3, 0.8, 0], rotate: [0, -15, 15, -10, 0], opacity: [1, 1, 0.5, 0] }
                : {}
            }
            transition={isShaking ? { duration: 0.6 } : {}}
          >
            <Heart
              className={`w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 ${
                isActive
                  ? "text-rose-500 fill-rose-500 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]"
                  : "text-surface-300 fill-surface-200"
              }`}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Swipeable flashcard ────────────────────────────────────
function SwipeCard({
  card,
  onSwipeRight,
  onSwipeLeft,
  showAnswer,
  onShowAnswer,
}: {
  card: ReviewCard;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  showAnswer: boolean;
  onShowAnswer: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-12, 0, 12]);
  const greenOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const redOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (!showAnswer) return;
    if (info.offset.x > SWIPE_THRESHOLD) {
      onSwipeRight();
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      style={{ x, rotate }}
      drag={showAnswer ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      className="relative w-full max-w-md mx-auto cursor-grab active:cursor-grabbing"
    >
      {/* Swipe glow overlays */}
      <motion.div
        style={{ opacity: greenOpacity }}
        className="absolute -inset-2 rounded-[28px] bg-[#22C55E]/20 border-2 border-[#22C55E]/50 pointer-events-none z-10"
      />
      <motion.div
        style={{ opacity: redOpacity }}
        className="absolute -inset-2 rounded-[28px] bg-[#EF4444]/20 border-2 border-[#EF4444]/50 pointer-events-none z-10"
      />

      {/* Swipe hint labels */}
      {showAnswer && (
        <>
          <motion.div
            style={{ opacity: greenOpacity }}
            className="absolute top-6 right-6 z-20 px-3 py-1 rounded-lg bg-[#22C55E] text-white font-bold text-sm rotate-12"
          >
            KNEW IT
          </motion.div>
          <motion.div
            style={{ opacity: redOpacity }}
            className="absolute top-6 left-6 z-20 px-3 py-1 rounded-lg bg-[#EF4444] text-white font-bold text-sm -rotate-12"
          >
            FORGOT
          </motion.div>
        </>
      )}

      {/* Card body — Duolingo 3D style */}
      <div className="bg-white rounded-3xl border-2 border-surface-200 border-b-[5px] border-b-surface-300 p-6 sm:p-8 shadow-soft relative overflow-hidden">
        {/* Question */}
        <p className="text-xs uppercase tracking-widest text-ink-400 font-semibold mb-4">
          Question
        </p>
        <p className="font-display text-lg sm:text-xl font-bold text-ink-900 leading-relaxed mb-6">
          {card.question}
        </p>

        {/* Show Answer button or answer reveal */}
        {!showAnswer ? (
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.97, y: 2 }}
            onClick={onShowAnswer}
            className="w-full py-3.5 rounded-2xl bg-brand-500 border-b-4 border-b-brand-700 text-white font-bold text-base
              hover:bg-brand-400 active:border-b-0 active:mt-1 transition-all"
          >
            Show Answer
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="bg-sage-50 rounded-2xl p-4 sm:p-5 border border-sage-200 mb-4">
              <p className="font-semibold text-sage-700 text-base mb-1">{card.answer}</p>
              {card.explanation && (
                <p className="text-sm text-ink-500 leading-relaxed mt-2">{card.explanation}</p>
              )}
            </div>

            <p className="text-xs text-ink-400 text-center mb-3 font-medium">
              Swipe or tap below
            </p>

            {/* Tap buttons fallback */}
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.95, y: 2 }}
                onClick={onSwipeLeft}
                className="flex-1 py-3 rounded-2xl bg-rose-100 border-b-4 border-b-rose-300 text-rose-600 font-bold text-sm
                  hover:bg-rose-200 active:border-b-0 active:mt-1 transition-all"
              >
                I Forgot
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95, y: 2 }}
                onClick={onSwipeRight}
                className="flex-1 py-3 rounded-2xl bg-sage-100 border-b-4 border-b-sage-300 text-sage-600 font-bold text-sm
                  hover:bg-sage-200 active:border-b-0 active:mt-1 transition-all"
              >
                I Knew It
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Screen border flash ────────────────────────────────────
function ScreenFlash({ color }: { color: "green" | "red" | null }) {
  if (!color) return null;
  const borderColor = color === "green" ? "border-[#22C55E]" : "border-[#EF4444]";
  const shadowColor =
    color === "green"
      ? "shadow-[inset_0_0_60px_rgba(34,197,94,0.15)]"
      : "shadow-[inset_0_0_60px_rgba(239,68,68,0.15)]";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className={`fixed inset-0 z-40 pointer-events-none border-4 ${borderColor} ${shadowColor} rounded-lg`}
    />
  );
}

// ─── Main component ─────────────────────────────────────────
export default function SpacedReview({ cards, userName = "friend", onComplete, onExit }: SpacedReviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [shakingHeartIndex, setShakingHeartIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [flashColor, setFlashColor] = useState<"green" | "red" | null>(null);
  const [mascotMood, setMascotMood] = useState<"idle" | "encourage" | "streak" | "wrong" | "celebrate">("idle");
  const [showBrainBreak, setShowBrainBreak] = useState(false);
  const [shakeCard, setShakeCard] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentCard = cards[currentIndex];
  const isLastCard = currentIndex >= cards.length - 1;

  // Flash helper
  const triggerFlash = useCallback((color: "green" | "red") => {
    setFlashColor(color);
    setTimeout(() => setFlashColor(null), 400);
  }, []);

  // Advance to next card or complete
  const advance = useCallback(() => {
    setShowAnswer(false);
    if (isLastCard) {
      setCompleted(true);
      setMascotMood("celebrate");
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [isLastCard]);

  // Handle "I knew it" (swipe right)
  const handleCorrect = useCallback(() => {
    const newStreak = streak + 1;
    setCorrectCount((c) => c + 1);
    setStreak(newStreak);
    triggerFlash("green");

    if (newStreak >= STREAK_THRESHOLD && newStreak % STREAK_THRESHOLD === 0) {
      setMascotMood("streak");
    } else {
      setMascotMood("idle");
    }

    // Advance immediately — AnimatePresence handles the exit/enter transition
    advance();
  }, [streak, triggerFlash, advance]);

  // Handle "I forgot" (swipe left)
  const handleIncorrect = useCallback(() => {
    const newHearts = hearts - 1;
    setStreak(0);
    setHearts(newHearts);
    setShakingHeartIndex(newHearts); // shake the heart that's being lost
    setShakeCard(true);
    triggerFlash("red");
    setMascotMood("encourage");

    setTimeout(() => {
      setShakeCard(false);
      setShakingHeartIndex(null);
    }, 600);

    if (newHearts <= 0) {
      setTimeout(() => setShowBrainBreak(true), 700);
    } else {
      // Short delay for shake animation, then advance
      setTimeout(advance, 500);
    }
  }, [hearts, triggerFlash, advance]);

  // Brain break handlers
  const handleBrainBreakContinue = () => {
    setShowBrainBreak(false);
    setHearts(MAX_HEARTS);
    advance();
  };

  const handleBrainBreakPause = () => {
    setShowBrainBreak(false);
    onComplete({ correct: correctCount, total: currentIndex + 1, xpEarned: correctCount * 15 });
  };

  // Reset mascot mood after a delay
  useEffect(() => {
    if (mascotMood !== "idle" && mascotMood !== "celebrate") {
      const timer = setTimeout(() => setMascotMood("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [mascotMood]);

  // Completion screen
  if (completed) {
    const xpEarned = correctCount * 15;
    return (
      <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center px-4 bg-[#FCF9F1]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center max-w-sm"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
            className="text-6xl block mb-6"
          >
            {correctCount === cards.length ? "\uD83C\uDF1F" : "\uD83C\uDF89"}
          </motion.span>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 mb-2">
            {correctCount === cards.length ? "Perfect Score!" : "Session Complete!"}
          </h2>

          <p className="text-ink-500 mb-1">
            <span className="font-bold text-sage-600">{correctCount}</span> of{" "}
            <span className="font-bold">{cards.length}</span> recalled correctly
          </p>

          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-brand-500 font-bold mb-8"
          >
            +{xpEarned} XP earned
          </motion.p>

          {/* Hearts remaining */}
          <div className="flex justify-center mb-6">
            <HeartsBar hearts={hearts} maxHearts={MAX_HEARTS} shakingIndex={null} />
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              variant="secondary"
              onClick={() => {
                setCurrentIndex(0);
                setCompleted(false);
                setCorrectCount(0);
                setStreak(0);
                setHearts(MAX_HEARTS);
                setShowAnswer(false);
                setMascotMood("idle");
              }}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Review Again
            </Button>
            <Button onClick={() => onComplete({ correct: correctCount, total: cards.length, xpEarned })}>
              Done
            </Button>
          </div>
        </motion.div>

        <ReviewMascot mood="celebrate" userName={userName} />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-[#FCF9F1] flex flex-col relative">
      {/* Screen border flash */}
      <AnimatePresence>
        <ScreenFlash color={flashColor} />
      </AnimatePresence>

      {/* Top bar: back button + hearts + card counter */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        {onExit && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onExit}
            className="p-2 -ml-2 rounded-xl hover:bg-surface-200/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-ink-500" />
          </motion.button>
        )}
        <HeartsBar hearts={hearts} maxHearts={MAX_HEARTS} shakingIndex={shakingHeartIndex} />
        <p className="text-sm font-semibold text-ink-400">
          {currentIndex + 1}/{cards.length}
        </p>
      </div>

      {/* Main card area */}
      <div className="flex-1 flex items-center justify-center px-4 pb-24">
        <AnimatePresence mode="wait">
          {currentCard && (
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={
                shakeCard
                  ? { opacity: 1, y: 0, scale: 1, x: [0, -16, 16, -12, 12, -6, 0] }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full"
            >
              <SwipeCard
                card={currentCard}
                showAnswer={showAnswer}
                onShowAnswer={() => setShowAnswer(true)}
                onSwipeRight={handleCorrect}
                onSwipeLeft={handleIncorrect}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Segmented progress bar */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-4 pt-2 bg-gradient-to-t from-[#FCF9F1] via-[#FCF9F1] to-transparent">
        <div className="max-w-md mx-auto">
          <div className="flex gap-1">
            {cards.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full flex-1 transition-all duration-500 ${
                  i < currentIndex
                    ? "bg-sage-400"
                    : i === currentIndex
                    ? "bg-brand-400"
                    : "bg-surface-200"
                }`}
              />
            ))}
          </div>
          <p className="text-center text-xs text-ink-400 mt-1.5 font-medium">
            Card {currentIndex + 1} of {cards.length}
          </p>
        </div>
      </div>

      {/* Mascot coach */}
      <ReviewMascot mood={mascotMood} userName={userName} />

      {/* Brain break modal */}
      <AnimatePresence>
        {showBrainBreak && (
          <BrainBreakModal
            onBreathing={handleBrainBreakPause}
            onPause={handleBrainBreakPause}
            onContinue={handleBrainBreakContinue}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
