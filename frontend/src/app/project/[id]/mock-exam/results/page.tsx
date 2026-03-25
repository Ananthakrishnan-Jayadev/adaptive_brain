"use client";

import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import CircularProgress from "@/components/ui/CircularProgress";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { mockExam } from "@/lib/mock-data";

export default function MockExamResultsPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-2xl font-bold text-ink-900 mb-6">Exam Results</h1>
          <CircularProgress value={mockExam.score_percentage} size={140} strokeWidth={12} />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 font-display text-3xl font-bold text-ink-900"
          >
            {mockExam.grade}
          </motion.p>
          <p className="text-ink-500 mt-1">
            {mockExam.time_taken_minutes} minutes of {mockExam.time_allowed_minutes} allowed
          </p>
        </motion.div>

        {/* Topic breakdown */}
        <div>
          <h2 className="font-display text-lg font-semibold text-ink-900 mb-3">Per-Topic Breakdown</h2>
          <div className="space-y-2">
            {mockExam.topic_breakdown.map((tb, i) => {
              const color = tb.percentage >= 70 ? "bg-sage-500" : tb.percentage >= 40 ? "bg-amber-500" : "bg-rose-500";
              return (
                <motion.div
                  key={tb.topic_id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-surface-100 rounded-xl p-4 border border-surface-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm text-ink-900">{tb.topic_name}</span>
                    <span className="text-sm text-ink-500">{tb.correct}/{tb.total}</span>
                  </div>
                  <ProgressBar value={tb.percentage} color={color} size="sm" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Focus areas */}
        <Card variant="highlighted" padding="md">
          <h3 className="font-display font-semibold text-ink-900 mb-2">Focus Areas</h3>
          <p className="text-sm text-ink-500">
            You should review <span className="font-semibold">Protein Synthesis</span> and{" "}
            <span className="font-semibold">Cell Division</span> — these scored below 60%.
          </p>
        </Card>

        {/* Question review */}
        <div>
          <h2 className="font-display text-lg font-semibold text-ink-900 mb-3">Question Review</h2>
          <div className="space-y-2">
            {mockExam.questions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.02 }}
              >
                <button
                  onClick={() => setExpandedQ(expandedQ === i ? null : i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    q.is_correct ? "bg-sage-100/50 border-sage-200" : "bg-rose-100/50 border-rose-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {q.is_correct ? (
                      <Check className="w-5 h-5 text-sage-500 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-rose-500 flex-shrink-0" />
                    )}
                    <span className="text-sm text-ink-800 flex-1">{q.question_text}</span>
                    <ChevronDown className={`w-4 h-4 text-ink-500 transition-transform ${expandedQ === i ? "rotate-180" : ""}`} />
                  </div>

                  {expandedQ === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 pt-3 border-t border-surface-200 space-y-2"
                    >
                      <p className="text-sm"><span className="text-ink-500">Your answer:</span> <span className={q.is_correct ? "text-sage-500" : "text-rose-500"}>{q.user_answer}</span></p>
                      {!q.is_correct && (
                        <p className="text-sm"><span className="text-ink-500">Correct answer:</span> <span className="text-sage-500">{q.correct_answer}</span></p>
                      )}
                      <p className="text-sm text-ink-500">{q.explanation}</p>
                    </motion.div>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center pb-8">
          <Button variant="secondary" onClick={() => router.push(`/project/${projectId}/mock-exam`)}>
            Retake Exam
          </Button>
          <Button onClick={() => router.push(`/project/${projectId}`)}>
            Back to Project
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
