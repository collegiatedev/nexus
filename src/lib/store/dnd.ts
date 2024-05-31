import { arrayMove } from "@dnd-kit/sortable";
import { StateCreator } from "zustand";

export type Column = {
  id: string;
  date?: Date;
};
export type Task = {
  id: string;
  columnId: string;
  name: string;
};
export type TaskRef = {
  index: number;
  containerId: string;
};

// uses columnId as key
export type Container = {
  column: Column;
  tasks: Task[];
};

export interface DnDProps {
  // { columnId: Container }
  containers: Map<string, Container>;
  // tbh initalization of tasksRef should be done in the store (rather than being passed as a prop)
  tasksRef: Map<string, TaskRef>;
}

export interface DnDSlice extends DnDProps {
  getTasks: (containerId?: string) => Task[];
  getColumns: () => Column[];

  getTask: (id: string) => Task | undefined;
  getColumn: (id: string) => Column | undefined;
  getContainer: (id: string) => Container | undefined;

  addTask: (task: Task) => void;
  addColumn: (column: Column) => void;
  addContainer: (container: Container) => void;

  // move task to end of the new column array
  moveToColumn: (taskId: string, columnId: string) => void;

  swapTasks: (fromTaskIndex: string, toTaskIndex: string) => void;

  // remove is gonna fuck up the indexes
}

export const createDnDSlice: (
  initialState: Partial<DnDProps>,
) => StateCreator<DnDSlice, [], [], DnDSlice> =
  (initialState: Partial<DnDProps>) => (set, get) => {
    const DEFAULT_STATE: DnDProps = {
      containers: new Map<string, Container>(),
      tasksRef: new Map<string, TaskRef>(),
    };

    return {
      ...DEFAULT_STATE,
      ...initialState,

      getTasks: (containerId?: string) => {
        // assumes valid containerId
        const containers = get().containers;
        if (!containerId) {
          const tasks: Task[] = [];
          containers.forEach((container) => {
            tasks.concat(container.tasks);
          });
          return tasks;
        }
        return containers.has(containerId)
          ? containers.get(containerId)!.tasks
          : [];
      },

      getColumns: () => {
        const columns: Column[] = [];
        get().containers.forEach((container) => {
          columns.push(container.column);
        });
        return columns;
      },
      getTask: (id: string) => {
        const task = get().tasksRef.get(id);
        if (!task) return undefined;
        return get().containers.get(task.containerId)!.tasks[task.index];
      },
      getColumn: (id: string) => get().containers.get(id)?.column,
      getContainer: (id: string) => get().containers.get(id),

      addTask: (task) => {
        const newContainers = new Map<string, Container>(get().containers);
        if (!newContainers.has(task.columnId)) {
          newContainers.set(task.columnId, {
            column: { id: task.columnId },
            tasks: [task],
          });

          // const newContainers = new Map<string, Container>(containers);
          const newTasksRef = new Map<string, TaskRef>(get().tasksRef);
          newTasksRef.set(task.id, { index: 0, containerId: task.columnId });

          set({ containers: newContainers, tasksRef: newTasksRef });
        } else {
          const container = newContainers.get(task.columnId) as Container;
          // adds task to container, then return new task index
          const index = container.tasks.push(task) - 1;
          const newTasksRef = new Map<string, TaskRef>(get().tasksRef);

          newTasksRef.set(task.id, { index, containerId: task.columnId });
          set({ containers: newContainers, tasksRef: newTasksRef });
        }
      },

      addColumn: (column) => {
        const newContainers = new Map<string, Container>(get().containers);
        if (!newContainers.has(column.id)) {
          newContainers.set(column.id, { column, tasks: [] });
          set({ containers: newContainers });
        }
      },

      addContainer: (container) => {
        const newContainers = new Map<string, Container>(get().containers);

        if (!newContainers.has(container.column.id)) {
          newContainers.set(container.column.id, container);
          const newTasksRef = new Map<string, TaskRef>(get().tasksRef);
          container.tasks.forEach((task, index) => {
            newTasksRef.set(task.id, {
              index,
              containerId: container.column.id,
            });
          });
          set({ containers: newContainers, tasksRef: newTasksRef });
        }
      },

      moveToColumn: (taskId: string, columnId: string) => {
        const newTasksRef = new Map<string, TaskRef>(get().tasksRef);
        const moveTaskRef = newTasksRef.get(taskId);
        if (!moveTaskRef) return;

        const moveTask = get().containers.get(moveTaskRef.containerId)?.tasks[
          moveTaskRef.index
        ];
        if (!moveTask) return;

        const newContainers = new Map<string, Container>(get().containers);

        const startContainer = newContainers.get(moveTaskRef.containerId);
        const destContainer = newContainers.get(columnId);
        if (!startContainer || !destContainer) return;

        // remove from current column, update taskRefs
        // remove task from container
        startContainer.tasks.splice(moveTaskRef.index, 1);
        // update taskRef indexes post task removal
        for (let i = moveTaskRef.index; i < startContainer.tasks.length; i++) {
          const task = startContainer.tasks[i];
          if (!task) continue;
          newTasksRef.set(task.id, {
            index: i,
            containerId: startContainer.column.id,
          });
        }

        const destIndex = destContainer.tasks.length;
        destContainer.tasks.push({ ...moveTask, columnId: columnId });
        newTasksRef.set(moveTask.id, {
          index: destIndex,
          containerId: columnId,
        });

        set({ tasksRef: newTasksRef, containers: newContainers });
      },

      swapTasks: (fromTaskId: string, toTaskId: string) => {
        // console.log("SWAP TASKS", fromTaskId, toTaskId);
        const tasksRef = get().tasksRef;

        const fromTaskRef = tasksRef.get(fromTaskId);
        const toTaskRef = tasksRef.get(toTaskId);
        if (!fromTaskRef || !toTaskRef) return;

        // move tasks within same container
        if (fromTaskRef.containerId === toTaskRef.containerId) {
          // console.log("MOVE TASKS WITHIN SAME CONTAINER");
          const container = get().containers.get(fromTaskRef.containerId);
          if (!container) return;

          container.tasks = arrayMove(
            container.tasks,
            fromTaskRef.index,
            toTaskRef.index,
          );

          tasksRef.set(fromTaskId, {
            index: toTaskRef.index,
            containerId: toTaskRef.containerId,
          });
          tasksRef.set(toTaskId, {
            index: fromTaskRef.index,
            containerId: fromTaskRef.containerId,
          });
          // console.log("here", get());
          set((state) => ({
            tasksRef,
            containers: new Map(state.containers).set(
              fromTaskRef.containerId,
              container,
            ),
          }));
          // console.log("here2", get());
          // move tasks between two containers
        } else {
          const fromContainer = get().containers.get(fromTaskRef.containerId);
          const toContainer = get().containers.get(toTaskRef.containerId);
          if (!fromContainer || !toContainer) return;

          const fromTask = get().containers.get(fromTaskRef.containerId)?.tasks[
            fromTaskRef.index
          ];
          const toTask = get().containers.get(toTaskRef.containerId)?.tasks[
            toTaskRef.index
          ];
          if (!fromTask || !toTask) return;

          fromContainer.tasks.splice(fromTaskRef.index, 1, toTask);
          toContainer.tasks.splice(toTaskRef.index, 1, fromTask);

          const newContainers = new Map(get().containers);
          newContainers.set(fromTaskRef.containerId, fromContainer);
          newContainers.set(toTaskRef.containerId, toContainer);

          tasksRef.set(fromTaskId, {
            index: toTaskRef.index,
            containerId: toTaskRef.containerId,
          });
          tasksRef.set(toTaskId, {
            index: fromTaskRef.index,
            containerId: fromTaskRef.containerId,
          });

          set({
            tasksRef,
            containers: newContainers,
          });
        }
      },
    };
  };
