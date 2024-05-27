"use client";

import React, { useEffect } from "react";
import dayjs from "dayjs";
import { SelectTask } from "~/server/db/schema";
import { Day } from "./day";
import { dateAsId } from "~/lib/utils";
import { DnDBoard } from "./dnd/board";
import { getStore } from "~/lib/store/myStore";
import { useStore } from "zustand";
import { MonthTasks } from "./calendar";

// TODO: useSyncExternalStore
interface MonthProps {
  month: MonthTasks;
}
export const Month = ({ month }: MonthProps) => {
  const store = getStore();

  const addColumn = useStore(store, (s) => s.addColumn);
  const addTask = useStore(store, (s) => s.addTask);

  useEffect(() => {
    month.forEach((row) =>
      row.forEach((col) => {
        const columnId = dateAsId(col.date);
        addColumn({ id: columnId, date: col.date });
        col.tasks.forEach((task) => {
          addTask({
            id: task.id.toString(),
            columnId,
            name: task.name as string,
          });
        });
      }),
    );
  }, []);

  return (
    <DnDBoard>
      <div className="grid min-h-[90%] flex-1 grid-cols-7 grid-rows-5">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day dayId={dateAsId(day.date)} key={idx} />
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
  return daysMatrix;
};
