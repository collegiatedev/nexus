import React, { useState } from "react";
import { Dayjs } from "dayjs";
import { Day } from "./day";

export const Month = ({ month }: { month: Dayjs[][] }) => {
  return (
    <div className="grid h-[90%] flex-1 grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
