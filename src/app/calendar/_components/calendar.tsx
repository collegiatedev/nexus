"use client";

import { useInView } from "react-intersection-observer";
import { DnDBoard } from "./dnd/board";
import { Month } from "./month";
import { useEffect } from "react";
import React from "react";
import { useMyStore } from "~/components/providers/store";

// can't use sticky since parent have no fixed height
// so need to define a fixed height for navbar, fixed positioning
// const wasn't working either soo just hard coded it
// NAVBAR_HEIGHT = "100px";

export const Calendar = () => {
  const [scrollTrigger, isInView] = useInView();

  const calendarMonths = useMyStore((state) => state.getCalendarMonths());
  const loadNextCalendarMonth = useMyStore(
    (state) => state.loadNextCalendarMonth,
  );

  useEffect(() => {
    if (isInView) {
      loadNextCalendarMonth();
    }
  }, [isInView]);

  return (
    <DnDBoard>
      <CalendarNav />
      <div className={`pt-[100px]`}>
        {calendarMonths.map((month, idx) => (
          <React.Fragment key={idx}>
            <Month month={month.daysMatrix} />
          </React.Fragment>
        ))}
      </div>
      <div ref={scrollTrigger} className="relative bottom-[50vh]" />
    </DnDBoard>
  );
};

const CalendarNav = () => {
  // the actual month that is being displayed is controlled by the store
  const navMonth = useMyStore((state) => state.getNavMonthString());
  const { setCurrentMonth, setPreviousMonth, setNextMonth } = useMyStore(
    (state) => state,
  );

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
            setPreviousMonth();
            scrollToTop();
          }}
        >
          {"<"}
        </button>
        <button
          className="px-3"
          onClick={() => {
            setCurrentMonth();
            scrollToTop();
          }}
        >
          Today
        </button>
        <button
          className="text-gray-400"
          onClick={() => {
            setNextMonth();
            scrollToTop();
          }}
        >
          {">"}
        </button>
      </div>
    </nav>
  );
};
