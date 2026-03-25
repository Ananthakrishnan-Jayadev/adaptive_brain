import { create } from "zustand";

interface GamificationState {
  showCelebration: boolean;
  celebrationType: "small" | "medium" | "large" | null;
  showAchievement: boolean;
  currentAchievement: { name: string; description: string; icon: string; xp: number } | null;
  xpPopup: { amount: number; x: number; y: number } | null;
  showXPBar: boolean;
  triggerCelebration: (type: "small" | "medium" | "large") => void;
  triggerAchievement: (achievement: { name: string; description: string; icon: string; xp: number }) => void;
  showXPGain: (amount: number, x: number, y: number) => void;
  dismiss: () => void;
  dismissXP: () => void;
}

export const useGamificationStore = create<GamificationState>((set) => ({
  showCelebration: false,
  celebrationType: null,
  showAchievement: false,
  currentAchievement: null,
  xpPopup: null,
  showXPBar: true,
  triggerCelebration: (type) => set({ showCelebration: true, celebrationType: type }),
  triggerAchievement: (achievement) => set({ showAchievement: true, currentAchievement: achievement }),
  showXPGain: (amount, x, y) => set({ xpPopup: { amount, x, y } }),
  dismiss: () => set({ showCelebration: false, celebrationType: null, showAchievement: false, currentAchievement: null }),
  dismissXP: () => set({ xpPopup: null }),
}));
