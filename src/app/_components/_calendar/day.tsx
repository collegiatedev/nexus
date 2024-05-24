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

export type DailyTasks = {
  date: Date;
  tasks: Array<SelectTask>;
};

export const Day = ({ initDay }: { initDay: DailyTasks }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const containerId = initDay.date.toString();
  const itemIds = initDay.tasks.map((t) => t.id.toString());

  const addContainer = useDnDStore((state) => state.addContainer);
  useEffect(() => {
    addContainer(containerId, itemIds);
  }, [containerId, itemIds]);

  const getContainer = useDnDStore((state) => state.getContainer);
  const tasks = useMemo(() => {
    return getContainer(containerId).map((itemId) =>
      initDay.tasks.find((task) => task.id.toString() === itemId),
    ) as Array<SelectTask>;
  }, [containerId, initDay.tasks, getContainer]);

  return (
    <div
      className="flex flex-col items-center overflow-hidden border"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DayTitle date={initDay.date} showAddButton={isHovered} />
      <DroppableContainer containerId={containerId}>
        <DayTasks tasks={tasks} />
      </DroppableContainer>
    </div>
  );
};

const DayTitle = ({
  date,
  showAddButton,
}: {
  date: Date;
  showAddButton: boolean;
}) => {
  const dateDayjs = dayjs(date);
  return (
    <div className="flex w-full justify-between border border-indigo-600 p-2 text-sm">
      <div className="flex h-auto items-center justify-center text-center">
        {showAddButton && (
          <button className="size-6 items-center justify-center rounded-md bg-gray-500">
            +
          </button>
        )}
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

const DayTasks = React.memo(({ tasks }: { tasks: Array<SelectTask> }) => {
  const updateActiveTask = useActiveDayStore((state) => state.updateActiveTask);
  console.log("tasks", tasks);

  return (
    <div className="h-full w-full border border-green-600">
      {tasks.map((task) => {
        const itemId = task.id.toString();
        return (
          <DraggableItem
            key={task.id}
            itemId={itemId}
            updateDraggingItem={() => updateActiveTask(task.name as string)}
          >
            <div key={task.id} className="flex flex-col items-center">
              <div className="flex h-auto items-center justify-center text-center">
                {task.name}
              </div>
            </div>
          </DraggableItem>
        );
      })}
    </div>
  );
});

export default Day;
