import { getMyTasks } from "~/server/queries";
import { Month } from "./month";

export const dynamic = "force-dynamic";

export const Calendar = async () => {
  const tasks = await getMyTasks();

  return <Month initTasks={tasks} />;
};
