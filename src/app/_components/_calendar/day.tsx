import dayjs, { Dayjs } from "dayjs";
import clsx from "clsx";
import { SelectTask } from "~/server/db/schema";
import { DraggableItem } from "~/components/dnd/draggable";
import { DroppableContainer } from "~/components/dnd/droppable";

export type DailyTasks = {
  date: dayjs.Dayjs;
  tasks: Array<SelectTask>;
};

export const Day = ({ day }: { day: DailyTasks }) => {
  const containerId = day.date.toString();
  const itemIds = day.tasks.map((t) => t.id.toString());
  return (
    <div className="flex flex-col items-center overflow-hidden border">
      <DayTitle date={day.date} />
      <DroppableContainer containerId={containerId} itemIds={itemIds}>
        <DayTasks tasks={day.tasks} />
      </DroppableContainer>
    </div>
  );
};

const DayTitle = ({ date }: { date: Dayjs }) => {
  return (
    <div className="flex w-full justify-between p-2 text-sm">
      <div className="flex h-auto items-center justify-center text-center">
        {/* todo: on click open parallel rendering modal */}
        <button className="hidden size-6 items-center justify-center rounded-md bg-gray-500 group-hover:flex">
          +
        </button>
      </div>

      <header className="flex">
        <p className="flex h-auto items-center justify-center text-center">
          {date.format("D") === "1" && date.format("MMM")}
        </p>
        <p
          className={clsx("flex size-8 flex-row items-center justify-center", {
            "ml-3 rounded-full bg-blue-600 text-white":
              date.format("DD-MM-YY") === dayjs().format("DD-MM-YY"),
          })}
        >
          {date.format("D")}
        </p>
      </header>
    </div>
  );
};

const DayTasks = ({ tasks }: { tasks: Array<SelectTask> }) => {
  return (
    <>
      {tasks.map((task) => {
        const itemId = task.id.toString();
        return (
          <DraggableItem itemId={itemId}>
            <div key={task.id} className="flex flex-col items-center">
              <div className="flex h-auto items-center justify-center text-center">
                {task.name}
              </div>
            </div>
          </DraggableItem>
        );
      })}
    </>
  );
};
