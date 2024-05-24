import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";
// todo, check performance for these

interface DnDState {
  // bidrectional mapping
  containers: {
    [containerId: string]: string[];
  };
  // { containerId: [itemIds] }
  items: {
    [itemId: string]: { index: number; containerId: string };
  };
  // { itemId: {index, containerId} }

  getContainer: (containerId: string) => string[];
  getItem: (
    itemId: string,
  ) => { index: number; containerId: string } | undefined;

  addContainer: (containerId: string, itemIds: string[]) => void;
  addItem: (containerId: string, itemId: string) => void;

  moveWithinContainer: (
    containerId: string,
    fromIndex: number,
    toIndex: number,
  ) => void;
  moveIntoContainer: (
    itemId: string,
    fromContainerId: string,
    toContainerId: string,
    toIndex: number,
  ) => void;
}

export const useDnDStore = create<DnDState>((set, get) => ({
  containers: {},
  items: {},

  getContainer: (containerId: string) => get().containers[containerId] || [],
  getItem: (itemId: string) => get().items[itemId],

  addContainer: (containerId: string, itemIds: string[] = []) => {
    const state = get();
    if (!state.containers[containerId]) {
      const newItems = { ...state.items };
      itemIds.forEach((itemId, index) => {
        newItems[itemId] = { index, containerId };
      });

      set((state) => ({
        containers: { ...state.containers, [containerId]: itemIds },
        items: newItems,
      }));
    }
  },
  addItem: (containerId: string, itemId: string) => {
    set((state) => {
      const containerItems = [...(state.containers[containerId] || []), itemId];
      const newItems = {
        ...state.items,
        [itemId]: { index: containerItems.length - 1, containerId },
      };
      return {
        containers: {
          ...state.containers,
          [containerId]: containerItems,
        },
        items: newItems,
      };
    });
  },

  moveWithinContainer: (
    containerId: string,
    fromIndex: number,
    toIndex: number,
  ) => {
    set((state) => {
      const container = state.containers[containerId];
      if (!container)
        throw new Error(`Container with ID ${containerId} does not exist.`);
      if (
        fromIndex < 0 ||
        fromIndex >= container.length ||
        toIndex < 0 ||
        toIndex >= container.length
      )
        throw new Error(
          `Invalid indices: fromIndex ${fromIndex}, toIndex ${toIndex}`,
        );

      const updatedContainer = arrayMove(container, fromIndex, toIndex);
      const updatedItems = { ...state.items };
      updatedContainer.forEach((itemId, index) => {
        updatedItems[itemId] = { index, containerId };
      });
      return {
        containers: {
          ...state.containers,
          [containerId]: updatedContainer,
        },
        items: updatedItems,
      };
    });
  },
  moveIntoContainer: (
    itemId: string,
    fromContainerId: string,
    toContainerId: string,
    toIndex: number,
  ) => {
    set((state) => {
      const fromContainer = state.containers[fromContainerId];
      const toContainer = state.containers[toContainerId];
      if (!fromContainer)
        throw new Error(
          `Source container with ID ${fromContainerId} does not exist.`,
        );
      if (!toContainer)
        throw new Error(
          `Target container with ID ${toContainerId} does not exist.`,
        );
      const itemIndex = fromContainer.indexOf(itemId);
      if (itemIndex === -1)
        throw new Error(
          `Item with ID ${itemId} does not exist in container ${fromContainerId}.`,
        );
      if (toIndex < 0 || toIndex > toContainer.length)
        throw new Error(`Invalid toIndex ${toIndex}`);

      fromContainer.splice(itemIndex, 1);
      toContainer.splice(toIndex, 0, itemId);

      const updatedItems = { ...state.items };
      updatedItems[itemId] = { index: toIndex, containerId: toContainerId };
      toContainer.forEach((id, index) => {
        updatedItems[id] = { index, containerId: toContainerId };
      });
      fromContainer.forEach((id, index) => {
        updatedItems[id] = { index, containerId: fromContainerId };
      });

      return {
        containers: {
          ...state.containers,
          [fromContainerId]: fromContainer,
          [toContainerId]: toContainer,
        },
        items: updatedItems,
      };
    });
  },
}));
