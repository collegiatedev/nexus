"use server";

import type { TaskTagTypes } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  deleteMyTaskTag,
  updateTaskDone,
  updateTaskDueDate,
} from "~/server/queries";

export const syncTaskDueDate = async (taskId: number, dueDate: Date) => {
  await updateTaskDueDate(taskId, dueDate);
};

export const syncTaskIsDone = async (taskId: number, isDone: boolean) => {
  await updateTaskDone(taskId, isDone);
};

export const deleteTaskTag = async (taskId: number, type: TaskTagTypes) => {
  await deleteMyTaskTag({ taskId, type });
  // don't call server, just have optimistic updates via state hooks
  // this way it seems a lot more responsive
  // revalidatePath("/tasks/[id]");
};
