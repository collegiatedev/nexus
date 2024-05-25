"use client";

import React from "react";
import { DailyTasks, Day } from "./day";
import dayjs from "dayjs";
import { SelectTask } from "~/server/db/schema";
import { DnDBoard } from "~/components/dnd/dnd";
import { DraggingTask } from "./task";

export const Month = ({ tasks }: { tasks: Array<SelectTask> }) => {
  const month = getMonth(tasks);
  return (
    <DnDBoard DraggingItem={DraggingTask}>
      <div className="grid min-h-[90%] flex-1 grid-cols-7 grid-rows-5">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day initDay={day} key={idx} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </DnDBoard>
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
        date: date.toDate(),
        tasks: currentTasks,
      };
    });
  });
  return daysMatrix as DailyTasks[][];
};
