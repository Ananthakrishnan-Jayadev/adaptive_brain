"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lightbulb, Check, X, ArrowRight } from "lucide-react";
import { useQuizStore } from "@/stores/quizStore";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface QuizInterfaceProps {
  questions: any[];
  onComplete: (results: { correct: number; total: number }) => void;
}

export default function QuizInterface({ questions, onComplete }: QuizInterfaceProps) {
  const {
    currentQuestionIndex, selectedAnswer, showFeedback, isCorrect,
    showHint, hintLevel, selectAnswer, submitAnswer, nextQuestion, requestHint,
  } = useQuizStore();
  const [startTime] = useState(Date.now());

  if (currentQuestionIndex >= questions.length) {
    const correct = useQuizStore.getState().answers.filter((a) => a.correct).length;
    onComplete({ correct, total: questions.length });
    return null;
  }

  const q = questions[currentQuestionIndex];
  const hintsRemaining = 3 - hintLevel;

  const handleSubmit = () => {
    const correct = selectedAnswer?.toLowerCase().trim() === q.correct_answer.toLowerCase().trim();
    submitAnswer(correct, q.id, Math.floor((Date.now() - startTime) / 1000));
  };

  const handleNext = () => {
    nextQuestion();
  };

  const difficultyColors = {
    foundational: "success" as const,
    intermediate: "warning" as const,
    advanced: "error" as const,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto py-6 px-4"
    >
      {/* Question counter */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-ink-500">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <Badge variant={difficultyColors[q.difficulty as keyof typeof difficultyColors]}>
          {q.difficulty}
        </Badge>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          <h3 className="font-display text-lg font-semibold text-ink-900 mb-6">
            {q.question_text}
          </h3>

          {/* MCQ or True/False */}
          {(q.type === "multiple_choice" || q.type === "true_false") && (
            <div className="space-y-2 mb-6">
              {q.options.map((opt: string, i: number) => {
                const letter = String.fromCharCode(65 + i);
                const isSelected = selectedAnswer === opt;
                const showResult = showFeedback;
                const isAnswer = opt === q.correct_answer;

                return (
                  <motion.button
                    key={opt}
                    whileTap={!showFeedback ? { scale: 0.98 } : undefined}
                    onClick={() => !showFeedback && selectAnswer(opt)}
                    disabled={showFeedback}
                    className={`
                      w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3
                      ${showResult && isAnswer ? "border-sage-400 bg-sage-100" : ""}
                      ${showResult && isSelected && !isAnswer ? "border-rose-400 bg-rose-100" : ""}
                      ${!showResult && isSelected ? "border-brand-400 bg-brand-100" : ""}
                      ${!showResult && !isSelected ? "border-surface-200 hover:border-surface-200" : ""}
                    `}
                  >
                    <span className={`
                      w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0
                      ${isSelected ? "bg-brand-500 text-ink-800" : "bg-surface-100 text-ink-500"}
                      ${showResult && isAnswer ? "bg-sage-500 text-ink-800" : ""}
                      ${showResult && isSelected && !isAnswer ? "bg-rose-500 text-ink-800" : ""}
                    `}>
                      {showResult && isAnswer ? <Check className="w-4 h-4" /> :
                       showResult && isSelected && !isAnswer ? <X className="w-4 h-4" /> :
                       letter}
                    </span>
                    <span className="text-sm text-ink-900">{opt}</span>
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Fill in blank */}
          {q.type === "fill_blank" && (
            <div className="mb-6">
              <input
                type="text"
                value={selectedAnswer || ""}
                onChange={(e) => selectAnswer(e.target.value)}
                disabled={showFeedback}
                placeholder="Type your answer..."
                className="w-full rounded-xl border-2 border-surface-200 px-4 py-3 text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 text-lg"
              />
            </div>
          )}

          {/* Short answer */}
          {q.type === "short_answer" && (
            <div className="mb-6">
              <textarea
                value={selectedAnswer || ""}
                onChange={(e) => selectAnswer(e.target.value)}
                disabled={showFeedback}
                placeholder="Write your answer..."
                rows={3}
                className="w-full rounded-xl border-2 border-surface-200 px-4 py-3 text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none"
              />
            </div>
          )}

          {/* Hints */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={requestHint}
              disabled={hintLevel >= 3 || showFeedback}
              className="flex items-center gap-1.5 text-sm text-amber-500 hover:text-amber-700 disabled:opacity-40"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{hintsRemaining} hints left</span>
            </button>
          </div>

          {showHint && hintLevel > 0 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-6 space-y-2">
              {q.hint_layers.slice(0, hintLevel).map((hint: string, i: number) => (
                <div key={i} className="bg-amber-100 border border-amber-200 rounded-xl p-3 text-sm text-amber-700">
                  💡 Hint {i + 1}: {hint}
                </div>
              ))}
            </motion.div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl p-5 mb-6 ${
                isCorrect ? "bg-sage-100 border border-sage-200" : "bg-rose-100 border border-rose-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <Check className="w-5 h-5 text-sage-500" />
                    <span className="font-display font-bold text-sage-700">Correct! +15 XP</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-rose-500" />
                    <span className="font-display font-bold text-rose-700">Not quite</span>
                  </>
                )}
              </div>
              <p className="text-sm text-ink-500">{q.explanation}</p>
            </motion.div>
          )}

          {/* Action buttons */}
          <div className="flex justify-end gap-3">
            {!showFeedback ? (
              <Button onClick={handleSubmit} disabled={!selectedAnswer} size="lg">
                Submit
              </Button>
            ) : (
              <Button onClick={handleNext} icon={<ArrowRight className="w-4 h-4" />} iconPosition="right" size="lg">
                {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
