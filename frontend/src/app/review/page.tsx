"use client";

import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import EmptyState from "@/components/ui/EmptyState";
import SpacedReview from "@/components/review/SpacedReview";
import { spacedRepetitionCards, quizQuestions, currentUser } from "@/lib/mock-data";

const today = new Date().toISOString().split("T")[0];
const dueCards = spacedRepetitionCards.filter((c) => c.next_review_date <= today);

// Map spaced repetition cards to the ReviewCard format
const reviewCards = dueCards
  .map((card) => {
    const q = quizQuestions.find((qq) => qq.id === card.question_id);
    if (!q) return null;
    return {
      id: card.id,
      question: q.question_text,
      answer: q.correct_answer,
      explanation: q.explanation,
    };
  })
  .filter(Boolean) as { id: string; question: string; answer: string; explanation?: string }[];

export default function ReviewPage() {
  const router = useRouter();

  if (reviewCards.length === 0) {
    return (
      <AppShell>
        <EmptyState
          emoji="\u2705"
          title="All caught up!"
          description="Nothing to review right now. Come back later!"
          actionLabel="Go to Dashboard"
          onAction={() => router.push("/dashboard")}
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <SpacedReview
        cards={reviewCards}
        userName={currentUser.name.split(" ")[0]}
        onComplete={(results) => {
          router.push("/dashboard");
        }}
        onExit={() => router.push("/dashboard")}
      />
    </AppShell>
  );
}
