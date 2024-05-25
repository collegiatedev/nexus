"use client";

import dayjs from "dayjs";
import clsx from "clsx";
import { SelectTask } from "~/server/db/schema";
import { DraggableItem } from "~/components/dnd/draggable";
import { DroppableContainer } from "~/components/dnd/droppable";
import { useEffect, useMemo, useState } from "react";
import { useDnDStore } from "~/lib/store/dnd";
import { useActiveDayStore } from "~/lib/store/task";
import React from "react";
import { Task } from "./task";

export type DailyTasks = {
  date: Date;
  tasks: Array<SelectTask>;
};

export const Day = ({ initDay }: { initDay: DailyTasks }) => {
  // const [isHovered, setIsHovered] = useState(false);
  // const handleMouseEnter = () => setIsHovered(true);
  // const handleMouseLeave = () => setIsHovered(false);

  const containerId = initDay.date.toString(); // change me
  const itemIds = initDay.tasks.map((t) => t.id.toString());

  const addContainer = useDnDStore((state) => state.addContainer);
  useEffect(() => {
    addContainer(containerId, itemIds);
  }, []);

  const getContainer = useDnDStore((state) => state.getContainer);

  // console.log("z0: pre-mem updating; using containerId", containerId);
  // const tasks = useMemo(() => {
  //   console.log("z1: mem updating; using containerId", containerId);
  //   return getContainer(containerId).map((itemId) =>
  //     initDay.tasks.find((task) => task.id.toString() === itemId),
  //   ) as Array<SelectTask>;
  // }, [containerId, initDay.tasks, containers]);
  const tasks = getContainer(containerId).map((itemId) =>
    initDay.tasks.find((task) => task.id.toString() === itemId),
  ) as Array<SelectTask>;
  console.log("z2: tasks", containerId, tasks);
  return (
    <div
      className="relative flex h-full w-full flex-col items-center  border"
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <DayTitle
        date={initDay.date}
        // showAddButton={isHovered}
      />
      <DayTasks containerId={containerId} tasks={tasks} />
      container: {containerId}
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

const DayTasks = React.memo(
  ({
    containerId,
    tasks,
  }: {
    containerId: string;
    tasks: Array<SelectTask>;
  }) => {
    const updateActiveTask = useActiveDayStore(
      (state) => state.updateActiveTask,
    );

    return (
      <DroppableContainer containerId={containerId}>
        {tasks.map((task) => {
          console.log("z3:moment before disaster containerId", containerId);
          console.log("moment before disaster tasks", tasks);
          const itemId = task.id.toString();
          return (
            <div key={task.id} className="h-auto w-auto">
              <DraggableItem
                itemId={itemId}
                updateDraggingItem={() => updateActiveTask(task.name as string)}
              >
                <Task task={task} />
              </DraggableItem>
            </div>
          );
        })}
      </DroppableContainer>
    );
  },
);
