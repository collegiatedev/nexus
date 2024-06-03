import { getMyTasks } from "~/server/queries";
import { Month } from "./month";
import { SelectTask } from "~/server/db/schema";
import { MyStoreProvider } from "~/lib/store/provider";

export const dynamic = "force-dynamic";

type DayTasks = {
  date: Date;
  tasks: Array<SelectTask>;
};
export type MonthTasks = Array<Array<DayTasks>>;

export const Calendar = async () => {
  const myTasks = (await getMyTasks()) as Array<SelectTask>;
  return (
    <MyStoreProvider params={myTasks}>
      <Month />
    </MyStoreProvider>
  );
};
