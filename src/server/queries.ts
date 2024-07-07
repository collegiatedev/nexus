import "server-only";

import { db } from "./db";
import { userAuth } from "./wrapper";
import { InsertTask, tasks, taskTags } from "./db/schema";
import { eq } from "drizzle-orm";

// todo: add request pagation and month filter
export const getMyTasks = userAuth(async (authContext) => {
  const { userId } = authContext;

  return await db.query.tasks.findMany({
    orderBy: (model, { asc }) => asc(model.dueDate),
    // where: (model, { eq }) => eq(model.userId, userId),
    with: {
      tags: true,
    },
  });
});
export type MyTasks = Awaited<ReturnType<typeof getMyTasks>>;

export const getMyTask = userAuth(async (authContext, imgId: number) => {
  const { userId } = authContext;
  const task = await db.query.tasks.findFirst({
    where: (model, { eq }) => eq(model.id, imgId),
    with: {
      tags: true,
    },
  });

  if (!task) throw new Error("Image not found");
  // if (task.userId !== userId) throw new Error("Unauthorized");

  return task;
});

export const updateTaskDueDate = userAuth(
  async (_authContext, taskId: number, newDueDate: Date) => {
    await db
      .update(tasks)
      .set({ dueDate: newDueDate })
      .where(eq(tasks.id, taskId));
  },
);

export const createTask = userAuth(
  async (_authContext, _res, task: InsertTask) => {
    await db.insert(tasks).values(task);
  },
);

export const deleteMyTaskTag = userAuth(async (authContext, tagId: number) => {
  const { userId } = authContext;
  // await db.delete(taskTags).where(eq(taskTags.id, tagId));

  // const currentPath = req.headers.referer || "/";
  // revalidatePath(currentPath);
  // res.status(200).json({ message: "Task tag deleted successfully" });
});
