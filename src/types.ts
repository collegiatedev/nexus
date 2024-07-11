// used by dnd store
import { TaskTagTypes } from "@prisma/client";
export type Column = {
  id: string;
  date?: Date;
};
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
