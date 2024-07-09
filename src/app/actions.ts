"use server";

import { updateTaskDone, updateTaskDueDate } from "~/server/queries";

export const syncTaskDueDate = async (taskId: number, dueDate: Date) => {
  await updateTaskDueDate(taskId, dueDate);
};

export const syncTaskIsDone = async (taskId: number, isDone: boolean) => {
  await updateTaskDone(taskId, isDone);
};
