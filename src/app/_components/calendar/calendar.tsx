import { getMyTasks } from "~/server/queries";
import { Month } from "./month";
import { useRef } from "react";
import { createMyStore, StoreContext } from "~/lib/store/myStore";

export const dynamic = "force-dynamic";

export const Calendar = async () => {
  const store = useRef(createMyStore()).current;

  const tasks = await getMyTasks();
  return (
    <StoreContext.Provider value={store}>
      <Month initTasks={tasks} />;
    </StoreContext.Provider>
  );
};

// // create a matrix of days in a month, populate it with tasks
// // assume tasks query is sorted by dueDate, and first element starts on the same month
// const getMonth = (monthlyTasks: Array<SelectTask>, month = dayjs().month()) => {
//   month = Math.floor(month);
//   const year = dayjs().year();
//   const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
//   let currentMonthCount = 0 - firstDayOfTheMonth;

//   let taskPointer = 0;
//   const daysMatrix = new Array(5).fill([]).map(() => {
//     return new Array(7).fill(null).map(() => {
//       currentMonthCount++;
//       const date = dayjs(new Date(year, month, currentMonthCount));

//       // populate a particular day with tasks by iterating over monthlyTasks
//       const currentTasks: Array<SelectTask> = [];
//       while (
//         taskPointer < monthlyTasks.length &&
//         date.isSame(monthlyTasks[taskPointer]?.dueDate, "day")
//       ) {
//         currentTasks.push(monthlyTasks[taskPointer] as SelectTask);
//         taskPointer++;
//       }
//       return {
//         date: date.toDate(),
//         tasks: currentTasks,
//       };
//     });
//   });
//   return daysMatrix;
// };
