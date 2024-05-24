import { create } from "zustand";

// used for rendering dnd context
// based on type SelectTask (what's needed for preview state)

// name, status conditions, tags

interface ActiveTaskState {
  name: string;

  getActiveTask: () => string;
  updateActiveTask: (name: string) => void;
}
export const useActiveDayStore = create<ActiveTaskState>((set, get) => ({
  name: "",
  getActiveTask: () => get().name,
  updateActiveTask: (name: string) => set({ name }),
}));
