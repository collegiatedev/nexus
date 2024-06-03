"use client";

import React, { use, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { Day } from "./day";
import { dateAsId } from "~/lib/utils";
import { DnDBoard } from "./dnd/board";
import { useMyStore } from "~/lib/store/provider";

interface MonthProps {
  whichMonth?: number;
}
// optimize me :(
export const Month = ({ whichMonth = dayjs().month() }: MonthProps) => {
  const month = getMonth(whichMonth);

  // initialize missing days in store (days without tasks)
  const [isReady, setIsReady] = useState(false);
  const { getColumn, addColumn } = useMyStore((state) => state);
  useEffect(() => {
    month.forEach((week) =>
      week.forEach((day) => {
        const dayId = dateAsId(day.toDate());
        if (!getColumn(dayId)) addColumn({ id: dayId, date: day.toDate() });
      }),
    );
    setIsReady(true);
  }, []);

  // use skeleton in future
  if (!isReady) return <div>Loading...</div>;
  return (
    <DnDBoard>
      <div className="grid min-h-[90%] flex-1 grid-rows-5">
        {month.map((row, i) => (
          <div className="grid h-auto grid-cols-7" key={i}>
            {row.map((day, idx) => (
              <Day dayId={dateAsId(day.toDate())} key={idx} />
            ))}
          </div>
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
