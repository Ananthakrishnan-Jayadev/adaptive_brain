"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { RotateCcw, Star } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { spacedRepetitionCards, quizQuestions } from "@/lib/mock-data";

const today = new Date().toISOString().split("T")[0];
const dueCards = spacedRepetitionCards.filter((c) => c.next_review_date <= today);

const ratingButtons = [
  { label: "Again", value: 1, color: "bg-rose-100 text-rose-600 hover:bg-rose-200 border border-rose-200" },
  { label: "Hard", value: 2, color: "bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200" },
  { label: "Good", value: 3, color: "bg-brand-50 text-brand-600 hover:bg-brand-100 border border-brand-200" },
  { label: "Easy", value: 4, color: "bg-sage-50 text-sage-600 hover:bg-sage-100 border border-sage-200" },
];

export default function ReviewPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentCard = dueCards[currentIndex];
  const question = currentCard ? quizQuestions.find((q) => q.id === currentCard.question_id) : null;

  const handleRate = (rating: number) => {
    if (rating >= 3) setCorrectCount((c) => c + 1);
    setShowAnswer(false);
    if (currentIndex + 1 >= dueCards.length) {
      setCompleted(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (dueCards.length === 0) {
    return (
      <AppShell>
        <EmptyState
          emoji="✅"
          title="All caught up!"
          description="Nothing to review right now. Come back later!"
          actionLabel="Go to Dashboard"
          onAction={() => {}}
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="relative min-h-[calc(100vh-120px)] flex flex-col items-center justify-center">
        {/* Decorative background star */}
        <motion.div
          initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
          animate={{ opacity: 0.08, rotate: 0, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-0 right-0 pointer-events-none"
        >
          <Star className="w-64 h-64 text-coral-500 fill-coral-500" strokeWidth={0.5} />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-900">
            Spaced Review
          </h1>
          <p className="text-ink-500 mt-2">
            {completed ? "Session complete!" : `${dueCards.length} cards due today`}
          </p>
        </motion.div>

        {/* Completed state */}
        {completed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="text-6xl block mb-6"
            >
              🎉
            </motion.span>
            <h2 className="font-display text-2xl font-bold text-ink-900 mb-2">All caught up!</h2>
            <p className="text-ink-500 mb-1">
              {correctCount} of {dueCards.length} recalled correctly
            </p>
            <p className="text-sm text-sage-500 font-semibold mb-8">+{dueCards.length * 10} XP earned</p>
            <div className="flex gap-3 justify-center">
              <Button variant="secondary" onClick={() => { setCurrentIndex(0); setCompleted(false); setCorrectCount(0); setShowAnswer(false); }}>
                Review Again
              </Button>
              <Button onClick={() => window.location.href = "/dashboard"}>
                Back to Dashboard
              </Button>
            </div>
          </motion.div>
        ) : question ? (
          <div className="w-full max-w-xl">
            {/* Counter */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-ink-400 text-center mb-4"
            >
              {currentIndex + 1} of {dueCards.length} reviewed
            </motion.p>

            {/* Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 200, damping: 22 }}
                className="relative"
              >
                {/* Outer glow border */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-coral-300 via-amber-300 to-coral-200 opacity-60" />

                {/* Card body */}
                <div className="relative bg-gradient-to-b from-surface-50 via-surface-100 to-amber-50/30 rounded-3xl p-8 sm:p-10 shadow-warm">
                  {/* Question */}
                  <p className="font-display text-xl sm:text-2xl font-bold text-ink-900 leading-snug mb-8">
                    {question.question_text}
                  </p>

                  {/* Show Answer / Answer + Rating */}
                  {!showAnswer ? (
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowAnswer(true)}
                      className="w-full py-3.5 rounded-2xl bg-surface-100 border border-surface-300 text-ink-700 font-semibold text-base hover:bg-surface-200 hover:border-surface-400 transition-all shadow-soft"
                    >
                      Show Answer
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 250, damping: 20 }}
                    >
                      {/* Answer reveal */}
                      <div className="bg-sage-50 rounded-2xl p-5 mb-6 border border-sage-200">
                        <p className="font-semibold text-sage-700 text-base mb-2">{question.correct_answer}</p>
                        <p className="text-sm text-ink-500 leading-relaxed">{question.explanation}</p>
                      </div>

                      {/* Rating */}
                      <p className="text-sm text-ink-400 text-center mb-3 font-medium">How well did you know this?</p>
                      <div className="grid grid-cols-4 gap-2">
                        {ratingButtons.map((btn) => (
                          <motion.button
                            key={btn.value}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRate(btn.value)}
                            className={`py-2.5 px-2 rounded-xl text-sm font-semibold transition-colors ${btn.color}`}
                          >
                            {btn.label}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="mt-6 flex gap-1">
              {dueCards.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full flex-1 transition-all duration-300 ${
                    i < currentIndex ? "bg-sage-400" : i === currentIndex ? "bg-coral-400" : "bg-surface-200"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
