import dayjs, { type Dayjs } from "dayjs";

export type MonthData = {
  month: number;
  year: number;
  daysMatrix: Dayjs[][];
};

export const getMonth = (
  month: number,
  year: number,
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

export const currentMonth: MonthData = {
  month: dayjs().month(),
  year: dayjs().year(),
  daysMatrix: getMonth(dayjs().month(), dayjs().year()),
};

export const lastMonth = (current: MonthData) => {
  return {
    month: (current.month - 1 + 12) % 12,
    year: current.year - (current.month === 0 ? 1 : 0),
    daysMatrix: getMonth(
      (current.month - 1 + 12) % 12,
      current.year - (current.month === 0 ? 1 : 0),
    ),
  } as MonthData;
};

export const nextMonth = (current: MonthData) => {
  return {
    month: (current.month + 1) % 12,
    year: current.year + (current.month === 11 ? 1 : 0),
    daysMatrix: getMonth(
      (current.month + 1) % 12,
      current.year + (current.month === 11 ? 1 : 0),
    ),
  };
};
