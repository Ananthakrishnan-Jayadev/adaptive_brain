import { create } from "zustand";

interface SessionState {
  isActive: boolean;
  currentTopicIndex: number;
  elapsedMinutes: number;
  isPaused: boolean;
  showBreakPrompt: boolean;
  showWellbeingCheckin: boolean;
  contentPhase: "wellbeing" | "intro" | "content" | "quiz" | "wrapup";
  startSession: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  nextTopic: () => void;
  endSession: () => void;
  setElapsed: (minutes: number) => void;
  triggerBreak: () => void;
  dismissBreak: () => void;
  setContentPhase: (phase: SessionState["contentPhase"]) => void;
  completeWellbeing: () => void;
  reset: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  isActive: false,
  currentTopicIndex: 0,
  elapsedMinutes: 0,
  isPaused: false,
  showBreakPrompt: false,
  showWellbeingCheckin: true,
  contentPhase: "wellbeing",
  startSession: () => set({ isActive: true, contentPhase: "intro" }),
  pauseSession: () => set({ isPaused: true }),
  resumeSession: () => set({ isPaused: false }),
  nextTopic: () => set((s) => ({ currentTopicIndex: s.currentTopicIndex + 1, contentPhase: "content" })),
  endSession: () => set({ isActive: false, contentPhase: "wrapup" }),
  setElapsed: (minutes) => set({ elapsedMinutes: minutes }),
  triggerBreak: () => set({ showBreakPrompt: true }),
  dismissBreak: () => set({ showBreakPrompt: false }),
  setContentPhase: (phase) => set({ contentPhase: phase }),
  completeWellbeing: () => set({ showWellbeingCheckin: false, contentPhase: "intro" }),
  reset: () =>
    set({
      isActive: false,
      currentTopicIndex: 0,
      elapsedMinutes: 0,
      isPaused: false,
      showBreakPrompt: false,
      showWellbeingCheckin: true,
      contentPhase: "wellbeing",
    }),
}));
