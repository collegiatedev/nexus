import { arrayMove } from "@dnd-kit/sortable";
import { SelectTask } from "~/server/db/schema";
import { dateAsId } from "../utils";
import type { Column, Task, Container, TaskRef } from "~/types";

export type DnDHandlerProps = DnDHandler | Array<SelectTask>;
export class DnDHandler {
  // todo, clean up code with some helper functions in refractor
  private containers: Map<string, Container>;
  private tasksRef: Map<string, TaskRef>;

  constructor(); // default constructor
  constructor(handler: DnDHandler); // copy constructor
  constructor(calendarTasks: Array<SelectTask>); // for calendar tasks
  constructor(arg?: DnDHandlerProps) {
    if (arg instanceof DnDHandler) {
      this.containers = new Map(arg.getContainers());
      this.tasksRef = new Map(arg.getTaskRefs());
      return;
    } else if (arg instanceof Array) {
      // calendarTasks
      this.containers = new Map();
      this.tasksRef = new Map();
      arg.forEach((task) => {
        if (task.dueDate) {
          const columnId = dateAsId(task.dueDate);

          if (!this.containers.has(columnId)) {
            this.containers.set(columnId, {
              column: { id: columnId, date: task.dueDate },
              tasks: [],
            });
          }

          const index = this.containers.get(columnId)!.tasks.length;
          this.containers.get(columnId)!.tasks.push({
            id: task.id.toString(),
            columnId,
            name: task.name as string,
          });
          this.tasksRef.set(task.id.toString(), {
            index,
            containerId: columnId,
          });
        }
      });
      return;
    }
    this.containers = new Map();
    this.tasksRef = new Map();
  }

  getTaskRefs = () => this.tasksRef;
  getContainers = () => this.containers;

  getTasks = (containerId?: string) => {
    if (containerId)
      return this.containers.has(containerId)
        ? this.containers.get(containerId)!.tasks
        : [];

    const tasks: Task[] = [];
    this.containers.forEach((container) => {
      tasks.concat(container.tasks);
    });
    return tasks;
  };
  getTask = (id: string) => {
    const task = this.tasksRef.get(id);
    if (!task) return undefined;
    return this.containers.get(task.containerId)!.tasks[task.index];
  };
  getColumn = (id: string) => this.containers.get(id)?.column;
  getContainer = (columnId: string) => this.containers.get(columnId);

  addTask = (task: Task) => {
    if (!this.containers.has(task.columnId)) {
      this.containers.set(task.columnId, {
        column: { id: task.columnId },
        tasks: [task],
      });
      this.tasksRef.set(task.id, { index: 0, containerId: task.columnId });
    } else {
      const container = this.containers.get(task.columnId);
      if (!container) return;
      // adds task to container, then return new task index
      const index = container.tasks.push(task) - 1;
      this.tasksRef.set(task.id, { index, containerId: task.columnId });
    }
  };
  addColumn = (column: Column) => {
    if (!this.containers.has(column.id))
      this.containers.set(column.id, { column, tasks: [] });
  };

  addContainer = (container: Container) => {
    if (!this.containers.has(container.column.id)) {
      this.containers.set(container.column.id, container);
      container.tasks.forEach((task, index) => {
        this.tasksRef.set(task.id, {
          index,
          containerId: container.column.id,
        });
      });
    }
  };
  // adds task to the end of the column
  addTaskIntoColumn = (taskId: string, columnId: string) => {
    const fromTaskRef = this.tasksRef.get(taskId);
    if (!fromTaskRef) return;

    const fromTask = this.containers.get(fromTaskRef.containerId)?.tasks[
      fromTaskRef.index
    ];
    if (!fromTask) return;

    const fromContainer = this.containers.get(fromTaskRef.containerId);
    const toContainer = this.containers.get(columnId);
    if (!fromContainer || !toContainer) return;

    // remove from current column, update taskRefs
    // remove task from container
    fromContainer.tasks.splice(fromTaskRef.index, 1);
    // update taskRef indexes post task removal
    for (let i = fromTaskRef.index; i < fromContainer.tasks.length; i++) {
      const task = fromContainer.tasks[i];
      if (!task) continue;
      this.tasksRef.set(task.id, {
        index: i,
        containerId: fromContainer.column.id,
      });
    }
    // add to new column
    const toIndex = toContainer.tasks.length;
    toContainer.tasks.push({ ...fromTask, columnId: columnId });
    this.tasksRef.set(fromTask.id, {
      index: toIndex,
      containerId: columnId,
    });
  };
  // swaps taskswithin the same column
  swapTasksWithinColumn = (fromTaskId: string, toTaskId: string) => {
    const fromTaskRef = this.tasksRef.get(fromTaskId);
    const toTaskRef = this.tasksRef.get(toTaskId);
    if (!fromTaskRef || !toTaskRef) return;

    // tasks are within same column
    if (fromTaskRef.containerId === toTaskRef.containerId) {
      const container = this.containers.get(fromTaskRef.containerId);
      if (!container) return;

      container.tasks = arrayMove(
        container.tasks,
        fromTaskRef.index,
        toTaskRef.index,
      );

      this.tasksRef.set(fromTaskId, {
        index: toTaskRef.index,
        containerId: toTaskRef.containerId,
      });
      this.tasksRef.set(toTaskId, {
        index: fromTaskRef.index,
        containerId: fromTaskRef.containerId,
      });
      this.containers.set(fromTaskRef.containerId, container);
    }
  };
  // inserts fromTask into new column, after toTask
  insertTaskIntoColumn = (fromTaskId: string, toTaskId: string) => {
    const fromTaskRef = this.tasksRef.get(fromTaskId);
    const toTaskRef = this.tasksRef.get(toTaskId);
    if (!fromTaskRef || !toTaskRef) return;

    if (fromTaskRef.containerId !== toTaskRef.containerId) {
      const fromContainer = this.containers.get(fromTaskRef.containerId);
      const toContainer = this.containers.get(toTaskRef.containerId);
      if (!fromContainer || !toContainer) return;

      const fromTask = fromContainer.tasks[fromTaskRef.index];
      if (!fromTask) return;

      // update container task arrays, then update index refs of container
      fromContainer.tasks.splice(fromTaskRef.index, 1);
      for (let i = fromTaskRef.index; i < fromContainer.tasks.length; i++) {
        const task = fromContainer.tasks[i];
        if (!task) continue;
        this.tasksRef.set(task.id, {
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
        this.tasksRef.set(task.id, {
          index: i,
          containerId: toContainer.column.id,
        });
      }
      // finish task ref update
      this.tasksRef.set(fromTask.id, {
        index: toTaskRef.index,
        containerId: toContainer.column.id,
      });
    }
  };
}
