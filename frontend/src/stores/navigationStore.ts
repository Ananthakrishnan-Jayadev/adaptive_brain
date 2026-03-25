import { create } from "zustand";

interface NavigationState {
  currentPage: string;
  sidebarOpen: boolean;
  modalOpen: boolean;
  modalContent: string | null;
  navigate: (page: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openModal: (content: string) => void;
  closeModal: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentPage: "/dashboard",
  sidebarOpen: false,
  modalOpen: false,
  modalContent: null,
  navigate: (page) => set({ currentPage: page }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  openModal: (content) => set({ modalOpen: true, modalContent: content }),
  closeModal: () => set({ modalOpen: false, modalContent: null }),
}));
