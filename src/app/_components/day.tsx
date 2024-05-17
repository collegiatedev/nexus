import dayjs, { Dayjs } from "dayjs";
import clsx from "clsx";

export const Day = ({ day }: { day: Dayjs }) => {
  return (
    <div className="group flex flex-col items-center border ">
      <DayTitle day={day} />
      <DayEvents day={day} />
    </div>
  );
};

const DayTitle = ({ day }: { day: Dayjs }) => {
  return (
    <div className="flex w-full justify-between p-2 text-sm">
      <div className="flex h-auto items-center justify-center text-center">
        {/* on click open parallel rendering modal */}
        <button className="hidden size-6 items-center justify-center rounded-md bg-gray-500 group-hover:flex">
          +
        </button>
      </div>

      <header className="flex">
        <p className="flex h-auto items-center justify-center text-center">
          {day.format("D") === "1" && day.format("MMM")}
        </p>
        <p
          className={clsx("flex size-8 flex-row items-center justify-center", {
            "ml-3 rounded-full bg-blue-600 text-white":
              day.format("DD-MM-YY") === dayjs().format("DD-MM-YY"),
          })}
        >
          {day.format("D")}
        </p>
      </header>
    </div>
  );
};

const DayEvents = async ({ day }: { day: Dayjs }) => {
  return (
    <>
      <div>hello world</div>
    </>
  );
};
