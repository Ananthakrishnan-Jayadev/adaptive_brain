import { create } from "zustand";

interface QuizAnswer {
  questionId: string;
  answer: string;
  correct: boolean;
  timeSpent: number;
  hintsUsed: number;
}

interface QuizState {
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  showFeedback: boolean;
  isCorrect: boolean | null;
  showHint: boolean;
  hintLevel: number;
  isRephrasing: boolean;
  rephraseLevel: number;
  answers: QuizAnswer[];
  totalQuestions: number;
  selectAnswer: (answer: string) => void;
  submitAnswer: (correct: boolean, questionId: string, timeSpent: number) => void;
  nextQuestion: () => void;
  requestHint: () => void;
  requestRephrase: () => void;
  resetQuiz: (totalQuestions?: number) => void;
  dismissFeedback: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentQuestionIndex: 0,
  selectedAnswer: null,
  showFeedback: false,
  isCorrect: null,
  showHint: false,
  hintLevel: 0,
  isRephrasing: false,
  rephraseLevel: 0,
  answers: [],
  totalQuestions: 0,
  selectAnswer: (answer) => set({ selectedAnswer: answer }),
  submitAnswer: (correct, questionId, timeSpent) =>
    set((s) => ({
      showFeedback: true,
      isCorrect: correct,
      answers: [
        ...s.answers,
        {
          questionId,
          answer: s.selectedAnswer || "",
          correct,
          timeSpent,
          hintsUsed: s.hintLevel,
        },
      ],
    })),
  nextQuestion: () =>
    set((s) => ({
      currentQuestionIndex: s.currentQuestionIndex + 1,
      selectedAnswer: null,
      showFeedback: false,
      isCorrect: null,
      showHint: false,
      hintLevel: 0,
      isRephrasing: false,
      rephraseLevel: 0,
    })),
  requestHint: () =>
    set((s) => ({
      showHint: true,
      hintLevel: Math.min(s.hintLevel + 1, 3),
    })),
  requestRephrase: () =>
    set((s) => ({
      isRephrasing: true,
      rephraseLevel: Math.min(s.rephraseLevel + 1, 3),
    })),
  resetQuiz: (totalQuestions) =>
    set({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      showFeedback: false,
      isCorrect: null,
      showHint: false,
      hintLevel: 0,
      isRephrasing: false,
      rephraseLevel: 0,
      answers: [],
      totalQuestions: totalQuestions || 0,
    }),
  dismissFeedback: () => set({ showFeedback: false }),
}));
