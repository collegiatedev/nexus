import "server-only";

import { db } from "./db";
import { userAuth } from "./wrapper";
// import { and, eq } from "drizzle-orm";
// import { redirect } from "next/navigation";

export const getMyTasks = userAuth(async (authContext) => {
  const { userId } = authContext;

  return await db.query.tasks.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
    // where: (model, { eq }) => eq(model.userId, userId),
  });
});
