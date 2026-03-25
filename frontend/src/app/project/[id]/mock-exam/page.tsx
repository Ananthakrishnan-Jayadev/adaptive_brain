"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Clock, Flag, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { mockExam, quizQuestions } from "@/lib/mock-data";

type ExamPhase = "pre" | "during" | "complete";

export default function MockExamPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  const [phase, setPhase] = useState<ExamPhase>("pre");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const questions = quizQuestions.slice(0, 12);

  useEffect(() => {
    if (phase !== "during") return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0) { setPhase("complete"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const unanswered = questions.length - Object.keys(answers).length;

  // Pre-exam screen
  if (phase === "pre") {
    return (
      <div className="min-h-screen bg-surface-100 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md text-center">
          <h1 className="font-display text-2xl font-bold text-ink-900 mb-2">Mock Exam — Biology 101</h1>
          <p className="text-ink-500 mb-6">{questions.length} questions &middot; 60 minutes</p>

          <div className="bg-surface-100 rounded-xl p-5 shadow-soft border border-surface-200 mb-6 text-left">
            <h3 className="font-semibold text-sm text-ink-900 mb-3">Topic Breakdown</h3>
            {[
              { name: "Protein Synthesis", count: 6 },
              { name: "Cell Division", count: 6 },
            ].map((t) => (
              <div key={t.name} className="flex justify-between text-sm py-1.5 border-b border-surface-200 last:border-0">
                <span className="text-ink-500">{t.name}</span>
                <span className="text-ink-500">{t.count} questions</span>
              </div>
            ))}
          </div>

          <div className="bg-amber-100 rounded-xl p-4 text-left text-sm text-amber-700 mb-6">
            <p className="font-medium mb-1">Tips</p>
            <p>Simulates real exam conditions. Timer will count down. You can flag questions for review.</p>
          </div>

          <Button size="lg" onClick={() => setPhase("during")} className="px-10">Begin Exam</Button>
          <div className="mt-3">
            <button onClick={() => router.push(`/project/${projectId}`)} className="text-sm text-ink-600 hover:text-ink-500">
              Back to project
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Complete — redirect to results
  if (phase === "complete") {
    router.push(`/project/${projectId}/mock-exam/results`);
    return null;
  }

  // During exam
  const q = questions[currentQ];

  return (
    <div className="min-h-screen bg-surface-100">
      {/* Timer bar */}
      <header className="sticky top-0 z-20 bg-surface-100 border-b border-surface-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className={`font-mono text-lg font-bold ${timeLeft < 300 ? "text-rose-500" : "text-ink-800"}`}>
            {formatTime(timeLeft)}
          </span>
          <Button size="sm" onClick={() => setShowSubmitConfirm(true)}>
            Submit Exam
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 flex gap-4">
        {/* Question nav sidebar */}
        <div className="hidden md:block w-48 flex-shrink-0">
          <div className="sticky top-20 bg-surface-100 rounded-xl p-3 shadow-soft border border-surface-200">
            <p className="text-xs text-ink-500 font-medium mb-2">Questions</p>
            <div className="grid grid-cols-5 gap-1.5">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQ(i)}
                  className={`
                    w-8 h-8 rounded-xl text-xs font-medium flex items-center justify-center relative
                    ${i === currentQ ? "bg-brand-500 text-ink-800" :
                      answers[i] ? "bg-brand-100 text-brand-700" : "bg-surface-100 text-ink-600 hover:bg-surface-100"}
                  `}
                >
                  {i + 1}
                  {flagged.has(i) && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-coral-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Question area */}
        <div className="flex-1 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-surface-100 rounded-xl p-6 shadow-soft border border-surface-200"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-ink-500">Question {currentQ + 1} of {questions.length}</span>
                <button
                  onClick={() => {
                    const next = new Set(flagged);
                    flagged.has(currentQ) ? next.delete(currentQ) : next.add(currentQ);
                    setFlagged(next);
                  }}
                  className={`flex items-center gap-1 text-sm ${flagged.has(currentQ) ? "text-coral-500" : "text-ink-600 hover:text-coral-400"}`}
                >
                  <Flag className="w-4 h-4" /> {flagged.has(currentQ) ? "Flagged" : "Flag"}
                </button>
              </div>

              <h3 className="font-display text-lg font-semibold text-ink-900 mb-6">{q.question_text}</h3>

              {q.options && q.options.length > 0 ? (
                <div className="space-y-2 mb-6">
                  {q.options.map((opt: string, i: number) => (
                    <button
                      key={opt}
                      onClick={() => setAnswers({ ...answers, [currentQ]: opt })}
                      className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                        answers[currentQ] === opt ? "border-brand-400 bg-brand-100" : "border-surface-200 hover:border-surface-200"
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm font-bold ${
                        answers[currentQ] === opt ? "bg-brand-500 text-ink-800" : "bg-surface-100 text-ink-500"
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm text-ink-900">{opt}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={answers[currentQ] || ""}
                  onChange={(e) => setAnswers({ ...answers, [currentQ]: e.target.value })}
                  placeholder="Type your answer..."
                  className="w-full rounded-xl border-2 border-surface-200 px-4 py-3 text-ink-800 focus:outline-none focus:ring-2 focus:ring-brand-300 mb-6"
                />
              )}

              <div className="flex justify-between">
                <Button variant="ghost" onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0} icon={<ChevronLeft className="w-4 h-4" />}>
                  Previous
                </Button>
                <Button onClick={() => setCurrentQ(Math.min(questions.length - 1, currentQ + 1))} disabled={currentQ === questions.length - 1} icon={<ChevronRight className="w-4 h-4" />} iconPosition="right">
                  Next
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Submit confirmation */}
      <AnimatePresence>
        {showSubmitConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink-950/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-surface-100 rounded-xl p-6 max-w-sm">
              {unanswered > 0 && (
                <div className="flex items-center gap-2 text-amber-500 mb-3">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium text-sm">You have {unanswered} unanswered questions</span>
                </div>
              )}
              <h3 className="font-display font-bold text-lg mb-2">Submit exam?</h3>
              <p className="text-sm text-ink-500 mb-4">You won&apos;t be able to change your answers.</p>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setShowSubmitConfirm(false)} className="flex-1">Go back</Button>
                <Button onClick={() => setPhase("complete")} className="flex-1">Submit</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
