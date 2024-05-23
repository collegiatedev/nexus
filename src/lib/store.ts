import { add } from "@dnd-kit/utilities";
import { create } from "zustand";

interface DnDState {
  // { containerId: [itemIds] }
  containers: {
    [containerId: string]: string[];
  };
  addContainer: (containerId: string) => void;
  addItem: (containerId: string, itemId: string) => void;

  //   swapItemOrder: (itemId: string, containerId: string) => void;

  //   switchContainer: (itemId: string, containerId: string) => void;
}

// check performance for this
export const useDnDStore = create<DnDState>((set) => ({
  containers: {},
  addContainer: (containerId: string) =>
    set((state) => ({
      containers: { ...state.containers, [containerId]: [] },
    })),
  addItem: (containerId: string, itemId: string) => {
    set((state) => ({
      containers: {
        ...state.containers,
        [containerId]: [...(state.containers[containerId] || []), itemId],
      },
    }));
  },
}));
