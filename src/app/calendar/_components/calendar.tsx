"use client";

import { useInView } from "react-intersection-observer";
import { DnDBoard } from "./dnd/board";
import { Month } from "./month";
import { useEffect } from "react";
import React from "react";
import { useMyStore } from "~/lib/store/provider";
import { CalendarNav } from "./nav";

// can't use sticky since parent have no fixed height
// so need to define a fixed height for navbar, fixed positioning
// const wasn't working either soo just hard coded it
// NAVBAR_HEIGHT = "150px";

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
      <div className={`pt-[150px]`}>
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
