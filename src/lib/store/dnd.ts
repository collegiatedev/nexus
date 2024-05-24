import { create } from "zustand";
// check performance for these

interface DnDState {
  // { containerId: [itemIds] }
  containers: {
    [containerId: string]: string[];
  };
  addContainer: (containerId: string, itemIds: string[]) => void;
  addItem: (containerId: string, itemId: string) => void;
  getContainer: (containerId: string) => string[];

  //   swapItemOrder: (itemId: string, containerId: string) => void;
  //   switchContainer: (itemId: string, containerId: string) => void;
}
export const useDnDStore = create<DnDState>((set, get) => ({
  containers: {},
  addContainer: (containerId: string, itemIds: string[] = []) => {
    const state = get();
    if (!state.containers[containerId]) {
      set((state) => ({
        containers: { ...state.containers, [containerId]: itemIds },
      }));
    }
  },
  addItem: (containerId: string, itemId: string) => {
    set((state) => ({
      containers: {
        ...state.containers,
        [containerId]: [...(state.containers[containerId] || []), itemId],
      },
    }));
  },
  getContainer: (containerId: string) => {
    const state = get();
    return state.containers[containerId] || [];
  },
}));
