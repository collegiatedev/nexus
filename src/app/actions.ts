"use server";

import type { TaskTagTypes } from "@prisma/client";
import {
  updateTaskDone,
  updateTaskDueDate,
  updateTaskTags,
  updateTaskTitle,
} from "~/server/queries";

export const syncTaskDueDate = async (taskId: number, dueDate: Date) => {
  await updateTaskDueDate(taskId, dueDate);
};

export const syncTaskIsDone = async (taskId: number, isDone: boolean) => {
  await updateTaskDone(taskId, isDone);
};

export const syncTaskTags = async (taskId: number, tags: TaskTagTypes[]) => {
  await updateTaskTags(taskId, tags);
};

export const syncTaskTitle = async (taskId: number, title: string) => {
  await updateTaskTitle(taskId, title);
};
