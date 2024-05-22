import React from "react";
import { Day } from "./day";
import { getMyTasks } from "~/server/queries";
import { getMonth } from "~/lib/utils";

export const Month = async () => {
  const month = getMonth();
  const tasks = await getMyTasks();
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
