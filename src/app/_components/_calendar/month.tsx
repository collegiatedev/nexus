import React from "react";
import { DailyTasks, Day } from "./day";
import { getMyTasks } from "~/server/queries";
import dayjs from "dayjs";
import { SelectTask } from "~/server/db/schema";
import { DroppableContainer } from "~/components/dnd/droppable";

export const Month = async () => {
  const tasks = await getMyTasks();
  const month = getMonth(tasks);

  return (
    <div className="grid h-[90%] flex-1 grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => {
            const containerId = day.date.toString();
            const itemIds = day.tasks.map((t) => t.id.toString());

            return (
              // <DroppableContainer
              //   key={idx}
              //   containerId={containerId}
              //   itemIds={itemIds}
              // >
              <Day day={day} key={idx} />
              // </DroppableContainer>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

// create a matrix of days in a month, populate it with tasks
// assume tasks query is sorted by dueDate, and first element starts on the same month
const getMonth = (monthlyTasks: Array<SelectTask>, month = dayjs().month()) => {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;

  let taskPointer = 0;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      const date = dayjs(new Date(year, month, currentMonthCount));

      // populate a particular day with tasks by iterating over monthlyTasks
      const currentTasks: Array<SelectTask> = [];
      while (
        taskPointer < monthlyTasks.length &&
        date.isSame(monthlyTasks[taskPointer]?.dueDate, "day")
      ) {
        currentTasks.push(monthlyTasks[taskPointer] as SelectTask);
        taskPointer++;
      }
      return {
        date,
        tasks: currentTasks,
      };
    });
  });
  return daysMatrix as DailyTasks[][];
};
