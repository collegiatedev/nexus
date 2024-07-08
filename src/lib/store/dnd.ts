import { StateCreator } from "zustand";
import { Column, Container, Task } from "~/types";
import { arrayMove } from "@dnd-kit/sortable";
import { MyTasks } from "~/server/queries";
import { dateAsId } from "../utils";

type TaskRef = {
  index: number;
  containerId: string;
};

export interface DnDProps {
  containers: Map<string, Container>;
  tasksRef: Map<string, TaskRef>;
}

export const myTasksToDnDProps = (myTasks: MyTasks): DnDProps => {
  const containers = new Map<string, Container>();
  const tasksRef = new Map<string, TaskRef>();
  myTasks.forEach((task) => {
    if (task.dueDate) {
      const columnId = dateAsId(task.dueDate);
      if (!containers.has(columnId)) {
        containers.set(columnId, {
          column: { id: columnId, date: task.dueDate },
          tasks: [],
        });
      }

      const index = containers.get(columnId)!.tasks.length;
      containers.get(columnId)!.tasks.push({
        id: task.id.toString(),
        columnId,
        name: task.name as string,
        assignedTo: task.assigned as string,
        isDone: task.done as boolean,
        tags: task.taskTags.map((tag) => tag.type),
      });
      tasksRef.set(task.id.toString(), {
        index,
        containerId: columnId,
      });
    }
  });
  return {
    containers,
    tasksRef,
  };
};

export interface DnDSlice extends DnDProps {
  // adds newly fetched tasks to the store
  addDndProps: (props: DnDProps) => void;

  getTasks: (containerId?: string) => Task[];
  getTask: (id: string) => Task | undefined;
  getColumn: (id: string) => Column | undefined;
  getContainer: (id: string) => Container | undefined;

  addTask: (task: Task) => void;
  addColumn: (column: Column) => void;
  addContainer: (container: Container) => void;

  // adds task to the end of the column
  addTaskIntoColumn: (taskId: string, columnId: string) => void;
  // swaps taskswithin the same column
  swapTasksWithinColumn: (fromTaskIndex: string, toTaskIndex: string) => void;
  // inserts fromTask into new column, after toTask
  insertTaskIntoColumn: (fromTaskId: string, toTaskId: string) => void;
  // remove is gonna fuck up the indexes, update later
  // removeTask: (taskId: string) => void;
}
export const createDnDSlice: () => StateCreator<DnDSlice, [], [], DnDSlice> =
  () => (set, get) => {
    return {
      containers: new Map(),
      tasksRef: new Map(),

      addDndProps: (props: DnDProps) => {
        const newContainers = new Map(get().containers);
        props.containers.forEach((value, key) => {
          newContainers.set(key, value);
        });

        const newTasksRef = new Map(get().tasksRef);
        props.tasksRef.forEach((value, key) => {
          newTasksRef.set(key, value);
        });

        set({ containers: newContainers, tasksRef: newTasksRef });
      },

      getTasks: (containerId?: string) => {
        if (containerId)
          return get().containers.has(containerId)
            ? get().containers.get(containerId)!.tasks
            : [];

        const tasks: Task[] = [];
        get().containers.forEach((container) => {
          tasks.concat(container.tasks);
        });
        return tasks;
      },

      getTask: (id: string) => {
        const task = get().tasksRef.get(id);
        if (!task) return undefined;
        return get().containers.get(task.containerId)!.tasks[task.index];
      },

      getColumn: (id: string) => get().containers.get(id)?.column,

      getContainer: (columnId: string) => get().containers.get(columnId),

      addTask: (task: Task) => {
        if (!get().containers.has(task.columnId)) {
          get().containers.set(task.columnId, {
            column: { id: task.columnId },
            tasks: [task],
          });
          get().tasksRef.set(task.id, { index: 0, containerId: task.columnId });
        } else {
          const container = get().containers.get(task.columnId);
          if (!container) return;
          // adds task to container, then return new task index
          const index = container.tasks.push(task) - 1;
          get().tasksRef.set(task.id, { index, containerId: task.columnId });
        }
        set({ containers: get().containers, tasksRef: get().tasksRef });
      },
      addColumn: (column: Column) => {
        if (!get().containers.has(column.id)) {
          get().containers.set(column.id, { column, tasks: [] });
          set({ containers: get().containers });
        }
      },
      addContainer: (container: Container) => {
        if (!get().containers.has(container.column.id)) {
          get().containers.set(container.column.id, container);
          container.tasks.forEach((task, index) => {
            get().tasksRef.set(task.id, {
              index,
              containerId: container.column.id,
            });
          });
        }
        set({ containers: get().containers, tasksRef: get().tasksRef });
      },

      // adds task to the end of the column
      addTaskIntoColumn: (taskId: string, columnId: string) => {
        const fromTaskRef = get().tasksRef.get(taskId);
        if (!fromTaskRef) return;

        const fromTask = get().containers.get(fromTaskRef.containerId)?.tasks[
          fromTaskRef.index
        ];
        if (!fromTask) return;

        const fromContainer = get().containers.get(fromTaskRef.containerId);
        const toContainer = get().containers.get(columnId);
        if (!fromContainer || !toContainer) return;

        // remove from current column, update taskRefs
        // remove task from container
        fromContainer.tasks.splice(fromTaskRef.index, 1);
        // update taskRef indexes post task removal
        for (let i = fromTaskRef.index; i < fromContainer.tasks.length; i++) {
          const task = fromContainer.tasks[i];
          if (!task) continue;
          get().tasksRef.set(task.id, {
            index: i,
            containerId: fromContainer.column.id,
          });
        }
        // add to new column
        const toIndex = toContainer.tasks.length;
        toContainer.tasks.push({ ...fromTask, columnId: columnId });
        get().tasksRef.set(fromTask.id, {
          index: toIndex,
          containerId: columnId,
        });
        set({ containers: get().containers, tasksRef: get().tasksRef });
      },

      swapTasksWithinColumn: (fromTaskId: string, toTaskId: string) => {
        const fromTaskRef = get().tasksRef.get(fromTaskId);
        const toTaskRef = get().tasksRef.get(toTaskId);
        if (!fromTaskRef || !toTaskRef) return;

        // tasks are within same column
        if (fromTaskRef.containerId === toTaskRef.containerId) {
          const container = get().containers.get(fromTaskRef.containerId);
          if (!container) return;

          container.tasks = arrayMove(
            container.tasks,
            fromTaskRef.index,
            toTaskRef.index,
          );

          get().tasksRef.set(fromTaskId, {
            index: toTaskRef.index,
            containerId: toTaskRef.containerId,
          });
          get().tasksRef.set(toTaskId, {
            index: fromTaskRef.index,
            containerId: fromTaskRef.containerId,
          });
          get().containers.set(fromTaskRef.containerId, container);
        }
        set({ containers: get().containers, tasksRef: get().tasksRef });
      },

      // inserts fromTask into new column, after toTask
      insertTaskIntoColumn: (fromTaskId: string, toTaskId: string) => {
        const fromTaskRef = get().tasksRef.get(fromTaskId);
        const toTaskRef = get().tasksRef.get(toTaskId);
        if (!fromTaskRef || !toTaskRef) return;

        if (fromTaskRef.containerId !== toTaskRef.containerId) {
          const fromContainer = get().containers.get(fromTaskRef.containerId);
          const toContainer = get().containers.get(toTaskRef.containerId);
          if (!fromContainer || !toContainer) return;

          const fromTask = fromContainer.tasks[fromTaskRef.index];
          if (!fromTask) return;

          // update container task arrays, then update index refs of container
          fromContainer.tasks.splice(fromTaskRef.index, 1);
          for (let i = fromTaskRef.index; i < fromContainer.tasks.length; i++) {
            const task = fromContainer.tasks[i];
            if (!task) continue;
            get().tasksRef.set(task.id, {
              index: i,
              containerId: fromContainer.column.id,
            });
          }

          toContainer.tasks.splice(toTaskRef.index, 0, {
            ...fromTask,
            columnId: toContainer.column.id,
          });
          for (let i = toTaskRef.index; i < toContainer.tasks.length; i++) {
            const task = toContainer.tasks[i];
            if (!task) continue;
            get().tasksRef.set(task.id, {
              index: i,
              containerId: toContainer.column.id,
            });
          }
          // finish task ref update
          get().tasksRef.set(fromTask.id, {
            index: toTaskRef.index,
            containerId: toContainer.column.id,
          });
        }
        set({ containers: get().containers, tasksRef: get().tasksRef });
      },
    };
  };
