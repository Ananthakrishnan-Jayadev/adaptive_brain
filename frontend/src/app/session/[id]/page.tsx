"use client";

import { AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSessionStore } from "@/stores/sessionStore";
import { useQuizStore } from "@/stores/quizStore";
import { topics, contentBlocks, quizQuestions, studyPlan } from "@/lib/mock-data";
import CheckInModal from "@/components/wellbeing/CheckInModal";
import SessionHeader from "@/components/session/SessionHeader";
import SessionIntro from "@/components/session/SessionIntro";
import ContentDisplay from "@/components/session/ContentDisplay";
import QuizInterface from "@/components/session/QuizInterface";
import SessionWrapUp from "@/components/session/SessionWrapUp";
import BreakPrompt from "@/components/session/BreakPrompt";
import SessionNotes from "@/components/session/SessionNotes";
import BreathingExercise from "@/components/wellbeing/BreathingExercise";

const today = new Date().toISOString().split("T")[0];
const todayPlan = studyPlan.days.find((d) => d.date === today) || studyPlan.days[5];
const sessionTopics = topics.filter((t) => todayPlan.topic_ids.includes(t.id));
const sessionQuestions = quizQuestions.filter((q) =>
  todayPlan.topic_ids.includes(q.topic_id)
).slice(0, 5);

const contentTypeOrder = ["summary", "micro_lesson", "flashcard_deck", "concept_map", "comparison_table", "mnemonics", "audio_lesson"];

function getContentSequence() {
  const topicIds = todayPlan.topic_ids;
  const allBlocks = contentBlocks.filter((b) => topicIds.includes(b.topic_id));
  const sorted = [...allBlocks].sort((a, b) => {
    return contentTypeOrder.indexOf(a.content_type) - contentTypeOrder.indexOf(b.content_type);
  });
  return sorted.length > 0 ? sorted : [contentBlocks[0]];
}

export default function SessionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-50" />}>
      <SessionContent />
    </Suspense>
  );
}

function SessionContent() {
  const searchParams = useSearchParams();
  const requestedContentType = searchParams.get("contentType");

  const {
    contentPhase, currentTopicIndex, showBreakPrompt, elapsedMinutes,
    completeWellbeing, setContentPhase, nextTopic, endSession, triggerBreak, dismissBreak,
    reset: resetSession,
  } = useSessionStore();

  const resetQuiz = useQuizStore((s) => s.resetQuiz);

  // Reset session state on mount so each navigation starts fresh
  useEffect(() => {
    resetSession();
  }, [resetSession]);
  const [wellbeingNote, setWellbeingNote] = useState("");
  const [showBreathing, setShowBreathing] = useState(false);
  const [quizResults, setQuizResults] = useState({ correct: 0, total: 0 });

  const contentSequence = useMemo(() => getContentSequence(), []);

  // If a specific content type was requested (from topic detail page), start there
  const initialIndex = useMemo(() => {
    if (requestedContentType) {
      const idx = contentSequence.findIndex((c) => c.content_type === requestedContentType);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  }, [requestedContentType, contentSequence]);

  const [contentIndex, setContentIndex] = useState(initialIndex);

  // If user clicked a specific content type, skip wellbeing + intro and go straight to content
  const [skipIntro] = useState(!!requestedContentType);

  useEffect(() => {
    if (skipIntro && contentPhase === "wellbeing") {
      completeWellbeing();
    }
  }, [skipIntro, contentPhase, completeWellbeing]);

  useEffect(() => {
    if (skipIntro && contentPhase === "intro") {
      setContentPhase("content");
    }
  }, [skipIntro, contentPhase, setContentPhase]);

  const topicNames = sessionTopics.map((t) => t.name);
  const currentContent = contentSequence[contentIndex] || contentSequence[0];

  // Break prompt trigger
  useEffect(() => {
    if (elapsedMinutes > 0 && elapsedMinutes % 20 === 0 && contentPhase === "content") {
      triggerBreak();
    }
  }, [elapsedMinutes, contentPhase, triggerBreak]);

  const handleWellbeingComplete = (mood: string, energy: string) => {
    if (mood === "burnt_out" || (mood === "stressed" && energy === "low")) {
      setWellbeingNote("We're keeping it light today based on how you're feeling 🌿");
    } else if (mood === "great" && energy === "high") {
      setWellbeingNote("You're feeling great — let's make the most of it! 🚀");
    }
    completeWellbeing();
  };

  const handleContentComplete = () => {
    if (contentIndex < contentSequence.length - 1) {
      setContentIndex(contentIndex + 1);
    } else {
      resetQuiz(sessionQuestions.length);
      setContentPhase("quiz");
    }
  };

  const handleQuizComplete = (results: { correct: number; total: number }) => {
    setQuizResults(results);
    if (currentTopicIndex < sessionTopics.length - 1) {
      setContentIndex(0);
      nextTopic();
    } else {
      endSession();
    }
  };

  if (showBreathing) {
    return (
      <BreathingExercise
        onComplete={() => setShowBreathing(false)}
        onSkip={() => setShowBreathing(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-surface-50 relative">
      {contentPhase !== "wellbeing" && contentPhase !== "wrapup" && (
        <SessionHeader topicNames={topicNames} />
      )}

      <AnimatePresence mode="wait">
        {contentPhase === "wellbeing" && !skipIntro && (
          <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brand-50/50 to-surface-50">
            <CheckInModal onComplete={handleWellbeingComplete} />
          </div>
        )}

        {contentPhase === "intro" && !skipIntro && (
          <SessionIntro
            dayNumber={todayPlan.day_number}
            topicNames={topicNames}
            estimatedMinutes={todayPlan.estimated_minutes}
            wellbeingNote={wellbeingNote}
            onBegin={() => setContentPhase("content")}
          />
        )}

        {contentPhase === "content" && (
          <ContentDisplay
            key={`${currentContent.id}-${contentIndex}`}
            content={currentContent}
            onComplete={handleContentComplete}
          />
        )}

        {contentPhase === "quiz" && (
          <QuizInterface questions={sessionQuestions} onComplete={handleQuizComplete} />
        )}

        {contentPhase === "wrapup" && (
          <SessionWrapUp
            topicsCovered={topicNames}
            questionsCorrect={quizResults.correct}
            questionsTotal={quizResults.total}
            timeSpent={elapsedMinutes || 25}
            xpEarned={145}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBreakPrompt && (
          <BreakPrompt
            elapsedMinutes={elapsedMinutes}
            onContinue={dismissBreak}
            onBreathing={() => { dismissBreak(); setShowBreathing(true); }}
            onPause={dismissBreak}
          />
        )}
      </AnimatePresence>

      {contentPhase === "content" && sessionTopics[currentTopicIndex] && (
        <SessionNotes topicId={sessionTopics[currentTopicIndex].id} />
      )}
    </div>
  );
}
