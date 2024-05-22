import "server-only";
import { db } from "./db";
import { userAuth } from "./wrapper";
// import { and, eq } from "drizzle-orm";
// import { redirect } from "next/navigation";

// todo: add request pagation and month filter
export const getMyTasks = userAuth(async (authContext) => {
  const { userId } = authContext;

  return await db.query.tasks.findMany({
    orderBy: (model, { asc }) => asc(model.dueDate),
    // where: (model, { eq }) => eq(model.userId, userId),
  });
});
