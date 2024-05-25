"use client";

import dayjs from "dayjs";
import clsx from "clsx";
import React from "react";
import { Task, useDnDStore } from "~/lib/store";
import { DraggableTask } from "./dnd/task";
import { DroppableColumn } from "./dnd/column";

export const Day = ({ dayId }: { dayId: string }) => {
  const getTasks = useDnDStore((state) => state.getTasks);
  const dayContainer = useDnDStore((state) => state.getContainer(dayId));
  if (!dayContainer) return;

  // const [isHovered, setIsHovered] = useState(false);
  // const handleMouseEnter = () => setIsHovered(true);
  // const handleMouseLeave = () => setIsHovered(false);

  const columnId = dayContainer.column.id;
  return (
    <div
      className="relative flex h-full w-full flex-col items-center border"
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <DayTitle
        date={dayContainer.column.date!}
        // showAddButton={isHovered}
      />
      <DayTasks columnId={columnId} tasks={getTasks(columnId)} />
    </div>
  );
};

const DayTitle = ({
  date,
  // showAddButton,
}: {
  date: Date;
  // showAddButton: boolean;
}) => {
  const dateDayjs = dayjs(date);
  return (
    <div className="flex h-[50px] w-full justify-between px-2 pb-1 pt-2 text-sm">
      <div className="flex h-auto items-center justify-center text-center">
        {
          // showAddButton &&
          <button className="size-6 items-center justify-center rounded-md bg-gray-500">
            +
          </button>
        }
      </div>
      <header className="flex">
        <p className="flex h-auto items-center justify-center text-center">
          {dateDayjs.format("D") === "1" && dateDayjs.format("MMM")}
        </p>
        <p
          className={clsx("flex size-8 flex-row items-center justify-center", {
            "ml-3 rounded-full bg-blue-600 text-white":
              dateDayjs.format("DD-MM-YY") === dayjs().format("DD-MM-YY"),
          })}
        >
          {dateDayjs.format("D")}
        </p>
      </header>
    </div>
  );
};

const DayTasks = ({
  columnId,
  tasks,
}: {
  columnId: string;
  tasks: Array<Task>;
}) => {
  return (
    <DroppableColumn columnId={columnId}>
      {tasks.map((task) => {
        return (
          <div key={task.id} className="h-auto w-auto">
            <DraggableTask task={task} />
          </div>
        );
      })}
    </DroppableColumn>
  );
};
