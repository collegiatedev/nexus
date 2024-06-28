"use client";

import { useInView } from "react-intersection-observer";
import { DnDBoard } from "./dnd/board";
import { currentMonth, getMonth, MonthData } from "../_utils/month";
import { Month } from "./month";
import { useEffect, useState } from "react";
import React from "react";
import dayjs from "dayjs";

// can't use sticky since parent have no fixed height
// so need to define a fixed height for navbar, fixed positioning
const NAVBAR_HEIGHT = "100px";

export const Calendar = () => {
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
    <>
      <DnDBoard>
        <CalendarNav setMonths={setMonths} />
        <div className={`pt-[${NAVBAR_HEIGHT}]`}>
          {months.map((month, idx) => (
            <React.Fragment key={idx}>
              <Month month={month.daysMatrix} />
              <div ref={scrollTrigger} className="relative bottom-[50vh]" />
            </React.Fragment>
          ))}
        </div>
      </DnDBoard>
    </>
  );
};

const CalendarNav = ({
  setMonths,
}: {
  setMonths: React.Dispatch<React.SetStateAction<MonthData[]>>;
}) => {
  return (
    // z-index, top layer
    <nav
      className={`fixed top-0 flex flex-wrap items-center justify-between p-6 h-[${NAVBAR_HEIGHT}] z-50 w-full border-b bg-background`}
    >
      <div className="mr-6 flex flex-shrink-0 items-center">
        <span className="text-xl font-semibold tracking-tight">
          {dayjs().format("MMMM YYYY")}
        </span>
      </div>
      <div className="mr-6 flex flex-shrink-0 items-center text-xl font-medium tracking-tight">
        <button className="text-gray-400">{"<"}</button>
        <button className="px-3" onClick={() => setMonths([currentMonth])}>
          Today
        </button>
        <button className="text-gray-400">{">"}</button>
      </div>
    </nav>
  );
};
