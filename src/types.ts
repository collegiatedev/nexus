import { TaskTagTypes } from "@prisma/client";
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
