import { StateCreator } from "zustand";
import {
  type Column,
  type Task,
  type TaskRef,
  DnDHandler,
  DnDHandlerProps,
} from "./types";

// uses columnId as key
export type Container = {
  column: Column;
  tasks: Task[];
};

export interface DnDProps {
  handler: DnDHandler;
}

export interface DnDSlice extends DnDProps {
  getTasks: (containerId?: string) => Task[];
  // getColumns: () => Column[];

  getTask: (id: string) => Task | undefined;
  getColumn: (id: string) => Column | undefined;
  getContainer: (id: string) => Container | undefined;

  addTask: (task: Task) => void;
  addColumn: (column: Column) => void;
  addContainer: (container: Container) => void;

  // move task to end of the new column array
  moveTaskIntoColumn: (taskId: string, columnId: string) => void;
  // swap tasks within the same column
  swapTasksInColumn: (fromTaskIndex: string, toTaskIndex: string) => void;
  // insert Task into new container
  moveTask: (fromTaskId: string, toTaskId: string) => void;

  // remove is gonna fuck up the indexes
}

export const createDnDSlice: (
  initialState: DnDProps,
) => StateCreator<DnDSlice, [], [], DnDSlice> =
  (initialState: DnDProps) => (set, get) => {
    const DEFAULT_STATE: DnDProps = {
      handler: new DnDHandler(),
    };

    const updateStore = () => set({ handler: new DnDHandler(get().handler) });

    return {
      ...DEFAULT_STATE,
      ...initialState,

      getTasks: (containerId?: string) => get().handler.getTasks(containerId),
      getTask: (id: string) => get().handler.getTask(id),
      getColumn: (id: string) => get().handler.getColumn(id),
      getContainer: (id: string) => get().handler.getContainer(id),

      addTask: (task: Task) => {
        get().handler.addTask(task);
        updateStore();
      },
      addColumn: (column: Column) => {
        get().handler.addColumn(column);
        updateStore();
      },
      addContainer: (container: Container) => {
        get().handler.addContainer(container);
        updateStore();
      },

      moveTaskIntoColumn: (taskId: string, columnId: string) => {
        get().handler.moveTaskIntoColumn(taskId, columnId);
        updateStore();
      },
      swapTasksInColumn: (fromTaskId: string, toTaskId: string) => {
        get().handler.swapTasksInColumn(fromTaskId, toTaskId);
        updateStore();
      },
      moveTask: (fromTaskId: string, toTaskId: string) => {
        get().handler.moveTask(fromTaskId, toTaskId);
        updateStore();
      },
    };
  };
