import { create, StateCreator } from "zustand";

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
> = () => (set, get) => {
  return {
    isOpen: false,
    setOpen: () => set(() => ({ isOpen: true })),
    setClose: () => set(() => ({ isOpen: false })),
  };
};
