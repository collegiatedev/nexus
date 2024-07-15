import dayjs, { type Dayjs } from "dayjs";
import { StateCreator } from "zustand";

// calendar nav bar stuff, probably should renamed it lmao

export interface MonthSlice {
  // task filter stuff
  taskSearch?: string; // the search string for the calendar
  // taskFilter: some type; // the filter for the calendar
  calendarMonths: Month[]; // the months that are being displayed in the calendar
  navMonth: Month; // nav state for toggling between months

  getTaskSearch: () => string | undefined;
  setTaskSearch: (search?: string) => void;

  getCalendarMonths: () => Month[];
  setCalendarMonths: (months: Month[]) => void;
  loadNextCalendarMonth: () => void;

  setNavMonth: (dayjsMonth: Dayjs) => void;
  getNavMonthString: () => string;

  setCurrentMonth: () => void;
  setPreviousMonth: () => void;
  setNextMonth: () => void;
}
type Month = {
  month: number;
  year: number;
  daysMatrix: Dayjs[][];
};

export const createMonthSlice: () => StateCreator<
  MonthSlice,
  [],
  [],
  MonthSlice
> = () => (set, get) => {
  const createDaysMatrix = (
    month: number,
    year: number,
    // if previousMatrix exists, we make sure to not add days that are already in the previous matrix
    previousMatrix?: Dayjs[][],
  ) => {
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
  const currentMonth: Month = {
    month: dayjs().month(),
    year: dayjs().year(),
    daysMatrix: createDaysMatrix(dayjs().month(), dayjs().year()),
  };

  const lastMonth = (current: Month) => {
    return {
      month: (current.month - 1 + 12) % 12,
      year: current.year - (current.month === 0 ? 1 : 0),
      daysMatrix: createDaysMatrix(
        (current.month - 1 + 12) % 12,
        current.year - (current.month === 0 ? 1 : 0),
      ),
    } as Month;
  };
  const nextMonth = (current: Month) => {
    return {
      month: (current.month + 1) % 12,
      year: current.year + (current.month === 11 ? 1 : 0),
      daysMatrix: createDaysMatrix(
        (current.month + 1) % 12,
        current.year + (current.month === 11 ? 1 : 0),
      ),
    } as Month;
  };

  return {
    taskSearch: undefined,
    navMonth: currentMonth,
    calendarMonths: [currentMonth],

    getTaskSearch: () => get().taskSearch,
    setTaskSearch: (search?: string) => set({ taskSearch: search }),

    getCalendarMonths: () => get().calendarMonths,
    setCalendarMonths: (months: Month[]) => set({ calendarMonths: months }),
    loadNextCalendarMonth: () => {
      const months = get().calendarMonths;
      const prevMonthData = months[months.length - 1]!;
      const month = (prevMonthData.month + 1) % 12;
      const year = prevMonthData.year + (month === 0 ? 1 : 0);
      const daysMatrix = createDaysMatrix(
        month,
        year,
        prevMonthData.daysMatrix,
      );

      set({
        calendarMonths: [...months, { month, year, daysMatrix }],
      });
    },

    setNavMonth: (dayjsMonth: Dayjs) => {
      const month = {
        month: dayjsMonth.month(),
        year: dayjsMonth.year(),
        daysMatrix: createDaysMatrix(dayjsMonth.month(), dayjsMonth.year()),
      };
      set({ navMonth: month });
    },
    getNavMonthString: () =>
      dayjs(new Date(get().navMonth.year, get().navMonth.month)).format(
        "MMMM YYYY",
      ),

    setCurrentMonth: () =>
      set({ navMonth: currentMonth, calendarMonths: [currentMonth] }),
    setPreviousMonth: () => {
      const current = get().navMonth;
      const navMonth = lastMonth(current);
      set({
        navMonth,
        calendarMonths: [navMonth],
      });
    },
    setNextMonth: () => {
      const current = get().navMonth;
      const navMonth = nextMonth(current);
      set({
        navMonth,
        calendarMonths: [navMonth],
      });
    },
  };
};
