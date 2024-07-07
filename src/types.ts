import { TaskTagTypes } from "@prisma/client";
import { getMyTasks } from "./server/queries";
// used by dnd store
export type Column = {
  id: string;
  date?: Date;
};
// only store fields relevant for displaying on the calendar
export type Task = {
  id: string;
  columnId: string;
  name: string;
  assignedTo?: string; // id??
  isDone: boolean;
  tags: TaskTagTypes[];
};
// uses columnId as key
export type Container = {
  column: Column;
  tasks: Task[];
};

// MyTasks with type guard
// delete later
export type MyTasks = Awaited<ReturnType<typeof getMyTasks>>;
export const isMyTasks = (arg: any): arg is MyTasks => {
  return (
    Array.isArray(arg) &&
    arg.every(
      (task) =>
        typeof task.id === "number" &&
        (typeof task.name === "string" || task.name === null) &&
        (typeof task.description === "string" || task.description === null) &&
        (typeof task.isDone === "boolean" || task.isDone === null) &&
        (typeof task.assignedTo === "string" || task.assignedTo === null) &&
        task.createdAt instanceof Date &&
        (task.updatedAt instanceof Date || task.updatedAt === null) &&
        (task.dueDate instanceof Date || task.dueDate === null) &&
        Array.isArray(task.tags) &&
        task.tags.every(
          (tag: any) =>
            typeof tag.taskId === "number" && typeof tag.type === "string",
        ),
    )
  );
};
