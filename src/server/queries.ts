import "server-only";

import { db } from "./db";
import { userAuth } from "./wrapper";
import { type Prisma } from "@prisma/client";

// todo: add request pagation and month filter
export const getMyTasks = userAuth(async (authContext) => {
  const { userId } = authContext;

  return await db.task.findMany({
    orderBy: {
      dueDate: "asc",
    },
    // where: {
    //   userId: userId,
    // },
    include: {
      taskTags: true,
    },
  });
});
export type MyTasks = Awaited<ReturnType<typeof getMyTasks>>;

export const getMyTask = userAuth(async (authContext, imgId: number) => {
  const { userId } = authContext;
  const task = await db.task.findFirst({
    where: {
      id: imgId,
    },
    include: {
      taskTags: true,
    },
  });

  if (!task) throw new Error("Image not found");
  // if (task.userId !== userId) throw new Error("Unauthorized");

  return task;
});

export const updateTaskDueDate = userAuth(
  async (_authContext, taskId: number, newDueDate: Date) => {
    await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        dueDate: newDueDate,
      },
    });
  },
);

export const createTask = userAuth(
  async (_authContext, _res, task: Prisma.TaskCreateInput) => {
    await db.task.create({
      data: task,
    });
  },
);

export const deleteMyTaskTag = userAuth(async (authContext, tagId: number) => {
  const { userId } = authContext;
  //   await db.taskTag.delete({
  //     where: {
  //       id: tagId,
  //     },
  //   });
});
