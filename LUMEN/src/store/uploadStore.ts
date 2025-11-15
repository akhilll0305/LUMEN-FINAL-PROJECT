import { create } from 'zustand';

interface UploadStore {
  isUploadModalOpen: boolean;
  openUploadModal: () => void;
  closeUploadModal: () => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  isUploadModalOpen: false,
  openUploadModal: () => set({ isUploadModalOpen: true }),
  closeUploadModal: () => set({ isUploadModalOpen: false }),
}));
