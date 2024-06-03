"use server";

import { updateTaskDueDate } from "~/server/queries";

export const syncTaskDueDate = async (taskId: number, dueDate: Date) => {
  await updateTaskDueDate(taskId, dueDate);
};
