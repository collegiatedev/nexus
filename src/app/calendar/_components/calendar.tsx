"use client";

import { useInView } from "react-intersection-observer";
import { DnDBoard } from "./dnd/board";
import {
  currentMonth,
  getMonth,
  lastMonth,
  MonthData,
  nextMonth,
  toNavMonth,
} from "../_utils/month";
import { Month } from "./month";
import { useEffect, useState } from "react";
import React from "react";
import { useMyStore } from "~/lib/store/provider";

// can't use sticky since parent have no fixed height
// so need to define a fixed height for navbar, fixed positioning
// const wasn't working either soo just hard coded it
// NAVBAR_HEIGHT = "100px";

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
    <DnDBoard>
      <CalendarNav setMonths={setMonths} />
      <div className={`pt-[100px]`}>
        {months.map((month, idx) => (
          <React.Fragment key={idx}>
            <Month month={month.daysMatrix} />
          </React.Fragment>
        ))}
      </div>
      <div ref={scrollTrigger} className="relative bottom-[50vh]" />
    </DnDBoard>
  );
};

const CalendarNav = ({
  setMonths,
}: {
  setMonths: React.Dispatch<React.SetStateAction<MonthData[]>>;
}) => {
  // the acutal month that is being displayed is controlled by the store
  const navMonth = useMyStore((state) => state.getNavMonth());
  const setNavMonth = useMyStore((state) => state.setNavMonth);
  // controlling state for switching between months
  const navToggleMonth = useMyStore((state) => state.getNavToggleMonth());
  const setNavToggleMonth = useMyStore((state) => state.setNavToggleMonth);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <nav
      className={`fixed top-0 z-50 flex h-[100px] w-full flex-wrap items-center justify-between border-b bg-background p-6`}
    >
      <div className="mr-6 flex flex-shrink-0 items-center">
        <span className="text-xl font-semibold tracking-tight">{navMonth}</span>
      </div>
      <div className="mr-6 flex flex-shrink-0 items-center text-xl font-medium tracking-tight">
        <button
          className="text-gray-400"
          onClick={() => {
            const month = lastMonth(navToggleMonth);
            setMonths([month]);
            setNavToggleMonth(month);
            setNavMonth(toNavMonth(month));
            scrollToTop();
          }}
        >
          {"<"}
        </button>
        <button
          className="px-3"
          onClick={() => {
            setMonths([currentMonth]);
            setNavToggleMonth(currentMonth);
            setNavMonth(toNavMonth(currentMonth));
            scrollToTop();
          }}
        >
          Today
        </button>
        <button
          className="text-gray-400"
          onClick={() => {
            const month = nextMonth(navToggleMonth);
            setMonths([month]);
            setNavToggleMonth(month);
            setNavMonth(toNavMonth(month));
            scrollToTop();
          }}
        >
          {">"}
        </button>
      </div>
    </nav>
  );
};
