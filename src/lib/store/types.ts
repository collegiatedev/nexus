import { arrayMove } from "@dnd-kit/sortable";
import { SelectTask } from "~/server/db/schema";
import { dateAsId } from "../utils";

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

export type DnDHandlerProps = DnDHandler | Array<SelectTask>;
export class DnDHandler {
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

  moveTaskIntoColumn = (taskId: string, columnId: string) => {
    console.log("--start moveTaskIntoColumn");
    const moveTaskRef = this.tasksRef.get(taskId);
    if (!moveTaskRef) return;

    const moveTask = this.containers.get(moveTaskRef.containerId)?.tasks[
      moveTaskRef.index
    ];
    if (!moveTask) return;

    const startContainer = this.containers.get(moveTaskRef.containerId);
    const destContainer = this.containers.get(columnId);
    if (!startContainer || !destContainer) return;

    // remove from current column, update taskRefs
    // remove task from container
    startContainer.tasks.splice(moveTaskRef.index, 1);
    // update taskRef indexes post task removal
    for (let i = moveTaskRef.index; i < startContainer.tasks.length; i++) {
      const task = startContainer.tasks[i];
      if (!task) continue;
      this.tasksRef.set(task.id, {
        index: i,
        containerId: startContainer.column.id,
      });
    }

    const destIndex = destContainer.tasks.length;
    destContainer.tasks.push({ ...moveTask, columnId: columnId });
    this.tasksRef.set(moveTask.id, {
      index: destIndex,
      containerId: columnId,
    });

    console.log("--finish moveTaskIntoColumn");
  };

  swapTasksInColumn = (fromTaskId: string, toTaskId: string) => {
    console.log("--start swapTasksInColumn");

    const fromTaskRef = this.tasksRef.get(fromTaskId);
    const toTaskRef = this.tasksRef.get(toTaskId);
    if (!fromTaskRef || !toTaskRef) return;

    // check tasks are within same column
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
      console.log("--finish swapTasksInColumn");
    }
  };

  moveTask = (fromTaskId: string, toTaskId: string) => {
    console.log("--start moveTask");
    const fromTaskRef = this.tasksRef.get(fromTaskId);
    const toTaskRef = this.tasksRef.get(toTaskId);
    if (!fromTaskRef || !toTaskRef) return;

    if (fromTaskRef.containerId === toTaskRef.containerId) {
      this.swapTasksInColumn(fromTaskId, toTaskId);
    } else {
      this.moveTaskIntoColumn(fromTaskId, toTaskRef.containerId);
      this.swapTasksInColumn(fromTaskId, toTaskId);
    }
    console.log("--finish moveTask");
  };
}
