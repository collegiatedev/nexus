export enum TaskTagTypes {
  Deadline = "deadline",
  Logistics = "logistics",
  Meeting = "meeting",
  Exam = "exam",
  School = "school",
  Activity = "activity",
  Project = "project",
  Essays = "essays",
}

// used by task store
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
