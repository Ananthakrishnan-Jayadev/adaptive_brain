"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { onboardingQuestions } from "@/lib/mock-data";
import { useOnboardingStore } from "@/stores/onboardingStore";
import QuestionCard from "@/components/onboarding/QuestionCard";
import ProfileSummary from "@/components/onboarding/ProfileSummary";
import ProgressBar from "@/components/ui/ProgressBar";

export default function OnboardingPage() {
  const { currentStep, answers, setAnswer, nextStep, prevStep } = useOnboardingStore();
  const [direction, setDirection] = useState(1);
  const totalSteps = onboardingQuestions.length;
  const showSummary = currentStep >= totalSteps;

  const handleNext = () => {
    setDirection(1);
    nextStep();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevStep();
  };

  const progress = showSummary ? 100 : ((currentStep + 1) / (totalSteps + 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-brand-50/30 to-surface-50 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-coral-100/30 rounded-full blur-3xl"
        />
      </div>

      {/* Progress bar */}
      <div className="sticky top-0 z-10 bg-surface-100/90 backdrop-blur-md border-b border-surface-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <span className="text-sm font-medium text-ink-500 whitespace-nowrap">
            {showSummary ? "Done!" : `${currentStep + 1} of ${totalSteps}`}
          </span>
          <ProgressBar value={progress} color="bg-brand-500" size="sm" className="flex-1" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-72px)] p-6">
        {showSummary ? (
          <ProfileSummary />
        ) : (
          <QuestionCard
            question={onboardingQuestions[currentStep].question}
            description={onboardingQuestions[currentStep].description}
            options={onboardingQuestions[currentStep].options}
            multiSelect={onboardingQuestions[currentStep].multiSelect}
            currentAnswer={answers[currentStep]}
            onAnswer={(answer) => setAnswer(currentStep, answer)}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={currentStep === 0}
            direction={direction}
          />
        )}
      </div>
    </div>
  );
}
