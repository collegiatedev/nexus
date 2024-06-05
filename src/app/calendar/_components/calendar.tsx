"use client";

import { useInView } from "react-intersection-observer";
import { DnDBoard } from "./dnd/board";
import { Month } from "./month";
import { useEffect } from "react";
import React from "react";

export const Calendar = () => {
  const [scrollTrigger, isInView] = useInView();
  const months = [5];

  useEffect(() => {
    if (isInView) {
      // loadMoreMonths();
      console.log("scrolled");
    }
  }, [isInView]);
  return (
    <DnDBoard>
      <Month />
      {months.map((month, idx) => (
        <React.Fragment key={idx}>
          <Month whichMonth={month} />
          <div ref={scrollTrigger} className="relative bottom-[50vh]" />
        </React.Fragment>
      ))}
    </DnDBoard>
  );
};
