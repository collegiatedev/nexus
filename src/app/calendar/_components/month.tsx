"use client";

import React, { useEffect, useState } from "react";
import { type Dayjs } from "dayjs";
import { Day } from "./day";
import { dateAsId } from "~/lib/utils";
import { DnDBoard } from "./dnd/board";
import { useMyStore } from "~/lib/store/provider";

export const Month = ({ month }: { month: Dayjs[][] }) => {
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
    <div className="grid flex-1 grid-rows-5">
      {month.map((row, i) => (
        <div className="grid h-auto grid-cols-7" key={i}>
          {row.map((day, idx) => (
            <Day dayId={dateAsId(day.toDate())} key={idx} />
          ))}
        </div>
      ))}
    </div>
  );
};
