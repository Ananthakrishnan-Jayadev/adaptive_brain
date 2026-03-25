import { create } from "zustand";

interface OnboardingState {
  currentStep: number;
  answers: (string | string[])[];
  completed: boolean;
  setAnswer: (step: number, answer: string | string[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  completeOnboarding: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  currentStep: 0,
  answers: [],
  completed: false,
  setAnswer: (step, answer) =>
    set((s) => {
      const newAnswers = [...s.answers];
      newAnswers[step] = answer;
      return { answers: newAnswers };
    }),
  nextStep: () => set((s) => ({ currentStep: s.currentStep + 1 })),
  prevStep: () => set((s) => ({ currentStep: Math.max(0, s.currentStep - 1) })),
  completeOnboarding: () => set({ completed: true }),
  reset: () => set({ currentStep: 0, answers: [], completed: false }),
}));
