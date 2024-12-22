import { create } from "zustand";

interface IModalStore {
  isModalOpen: boolean;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  modalContent: React.ReactNode | null;
}

export const useModalStore = create<IModalStore>()((set) => ({
  isModalOpen: false,
  openModal: (content: React.ReactNode) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
  modalContent: null,
}));
