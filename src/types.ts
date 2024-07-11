// used by dnd store
import type { TaskTagTypes } from "@prisma/client";
import type { CustomEditor } from "./app/calendar/_components/task/editor/commands";
import type {
  CustomElement,
  CustomText,
} from "./app/calendar/_components/task/editor/elements";

// types for dnd store
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

// extend editor
declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
