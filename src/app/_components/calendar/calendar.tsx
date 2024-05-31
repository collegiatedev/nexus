import { getMyTasks } from "~/server/queries";
import { Month } from "./month";
import { SelectTask } from "~/server/db/schema";
import { dateAsId } from "~/lib/utils";
import { Container, DnDProps, TaskRef } from "~/lib/store/dnd";
import { MyStoreProvider } from "~/lib/store/provider";

export const dynamic = "force-dynamic";

type DayTasks = {
  date: Date;
  tasks: Array<SelectTask>;
};
export type MonthTasks = Array<Array<DayTasks>>;

export const Calendar = async () => {
  const myTasks = await getMyTasks();
  const initStore = formatStoreProps(myTasks);

  return (
    <MyStoreProvider params={initStore}>
      <Month initStore={initStore} />
    </MyStoreProvider>
  );
};

// tasksRef logic really shouldn't be handled by consumer
// in refractor, this should be handled by class initializer
const formatStoreProps = (tasks: Array<SelectTask>): DnDProps => {
  const containers = new Map<string, Container>();
  const tasksRef = new Map<string, TaskRef>();

  tasks.forEach((task) => {
    if (task.dueDate) {
      const columnId = dateAsId(task.dueDate);

      if (!containers.has(columnId)) {
        containers.set(columnId, {
          column: { id: columnId, date: task.dueDate },
          tasks: [],
        });
      }

      const index = containers.get(columnId)!.tasks.length;
      containers.get(columnId)!.tasks.push({
        id: task.id.toString(),
        columnId,
        name: task.name as string,
      });
      tasksRef.set(task.id.toString(), { index, containerId: columnId });
    }
  });
  return { containers, tasksRef };
};
