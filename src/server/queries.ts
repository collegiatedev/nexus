import "server-only";

import { db } from "./db";
import { userAuth } from "./wrapper";
import type { TaskTagTypes, Prisma } from "@prisma/client";

// todo: add request pagation and month filter
export const getMyTasks = userAuth(async (authContext) => {
  const { userId } = authContext;
  return await db.task.findMany({
    orderBy: {
      dueDate: "asc",
    },
    include: {
      taskTags: true,
    },
    // where: {
    //   userId: userId,
    // },
  });
});
export type MyTasks = Prisma.PromiseReturnType<typeof getMyTasks>;

export const getMyTask = userAuth(async (authContext, taskId: number) => {
  const { userId } = authContext;
  const task = await db.task.findFirst({
    where: {
      id: taskId,
    },
    include: {
      taskTags: true,
    },
  });

  if (!task) throw new Error("Task not found");

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

export const updateTaskDone = userAuth(
  async (_authContext, taskId: number, isDone: boolean) => {
    await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        done: isDone,
      },
    });
  },
);

export const updateTaskTags = userAuth(
  async (_authContext, taskId: number, taskTags: TaskTagTypes[]) => {
    // just write the sql for this, prisma queries are ugly and inefficent
    await db.taskTag.deleteMany({
      where: {
        taskId,
      },
    });
    await db.taskTag.createMany({
      data: taskTags.map((type) => ({
        taskId,
        type,
      })),
    });
  },
);

export const updateTaskTitle = userAuth(
  async (_authContext, taskId: number, name: string) => {
    await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        name,
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

export const deleteMyTaskTag = userAuth(
  async (authContext, { taskId, type }: { taskId: number; type: string }) => {
    const { userId } = authContext;
    await db.taskTag.delete({
      where: {
        taskId_type: {
          taskId,
          type: type as TaskTagTypes,
        },
      },
    });
  },
);
