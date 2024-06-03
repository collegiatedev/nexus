"use client";

import React from "react";
import dayjs from "dayjs";
import { Day } from "./day";
import { dateAsId } from "~/lib/utils";
import { DnDBoard } from "./dnd/board";
import { useMyStore } from "~/lib/store/provider";

interface MonthProps {
  whichMonth?: number;
}
export const Month = ({ whichMonth = dayjs().month() }: MonthProps) => {
  const { getColumn, addColumn } = useMyStore((state) => state);
  const month = getMonth(whichMonth);

  return (
    <DnDBoard>
      <div className="grid min-h-[90%] flex-1 grid-cols-7 grid-rows-5">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => {
              const dayId = dateAsId(day.toDate());
              // initalize any missing days (has no tasks)
              if (!getColumn(dayId))
                addColumn({ id: dayId, date: day.toDate() });

              return <Day dayId={dayId} key={idx} />;
            })}
          </React.Fragment>
        ))}
      </div>
    </DnDBoard>
  );
};

const getMonth = (month: number) => {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
};
