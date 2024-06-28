"use client";

import { useInView } from "react-intersection-observer";
import { DnDBoard } from "./dnd/board";
import { Month } from "./month";
import { useEffect, useState } from "react";
import React from "react";
import dayjs, { type Dayjs } from "dayjs";

export const Calendar = () => {
  type MonthData = {
    month: number;
    year: number;
    daysMatrix: Dayjs[][];
  };

  const currentMonth: MonthData = {
    month: dayjs().month(),
    year: dayjs().year(),
    daysMatrix: getMonth(dayjs().month(), dayjs().year()),
  };
  const [months, setMonths] = useState<MonthData[]>([currentMonth]);
  const [scrollTrigger, isInView] = useInView();

  useEffect(() => {
    if (isInView) {
      // Load the next month
      const prevMonthData = months[months.length - 1]!;
      const month = (prevMonthData.month + 1) % 12;
      const year = prevMonthData.year + (month === 0 ? 1 : 0);
      const daysMatrix = getMonth(month, year, prevMonthData.daysMatrix);

      setMonths((prevMonths) => [...prevMonths, { month, year, daysMatrix }]);
    }
  }, [isInView]);

  return (
    <DnDBoard>
      {months.map((month, idx) => (
        <React.Fragment key={idx}>
          <Month month={month.daysMatrix} />
          <div ref={scrollTrigger} className="relative bottom-[50vh]" />
        </React.Fragment>
      ))}
    </DnDBoard>
  );
};

const getMonth = (month: number, year: number, previousMatrix?: Dayjs[][]) => {
  month = Math.floor(month);
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 1 - firstDayOfTheMonth;

  const daysMatrix: Dayjs[][] = [];
  const previousDaysSet = previousMatrix
    ? new Set(previousMatrix.flat().map((day) => day.format("YYYY-MM-DD")))
    : new Set();

  for (let week = 0; week < 6; week++) {
    const weekArray: Dayjs[] = [];
    for (let day = 0; day < 7; day++) {
      const currentDay = dayjs(new Date(year, month, currentMonthCount));
      const formattedDay = currentDay.format("YYYY-MM-DD");
      if (!previousDaysSet.has(formattedDay)) {
        weekArray.push(currentDay);
      }
      currentMonthCount++;
    }
    if (weekArray.length > 0) {
      daysMatrix.push(weekArray);
    }
  }

  return daysMatrix;
};
