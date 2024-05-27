import { getMyTasks } from "~/server/queries";
import { Month } from "./month";
import { SelectTask } from "~/server/db/schema";
import { dateAsId } from "~/lib/utils";
import { Container, DnDProps, TaskRef } from "~/lib/store/dnd";

export const dynamic = "force-dynamic";

type DayTasks = {
  date: Date;
  tasks: Array<SelectTask>;
};
export type MonthTasks = Array<Array<DayTasks>>;

export const Calendar = async () => {
  const myTasks = await getMyTasks();
  const initStore = formatStoreProps(myTasks);

  return <Month initStore={initStore} />;
};

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
