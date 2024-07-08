import { StateCreator } from "zustand";

export interface HoveringSlice {
  hoveringContainer: string | null; // container with the mouse is hovering over it
  getHoveringContainer: () => string | null;
  setHoveringContainer: (containerId: string | null) => void;
}

export const createHoveringSlice: () => StateCreator<
  HoveringSlice,
  [],
  [],
  HoveringSlice
> = () => (set, get) => {
  return {
    hoveringContainer: null,
    getHoveringContainer: () => get().hoveringContainer,
    setHoveringContainer: (containerId: string | null) =>
      set({ hoveringContainer: containerId }),
  };
};
