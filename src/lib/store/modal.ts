import { StateCreator } from "zustand";

export interface ModalSlice {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
}

export const createModalSlice: () => StateCreator<
  ModalSlice,
  [],
  [],
  ModalSlice
> = () => (set, _get) => {
  return {
    isOpen: false,
    setOpen: () => set(() => ({ isOpen: true })),
    setClose: () => set(() => ({ isOpen: false })),
  };
};
