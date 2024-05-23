"use client";

import dayjs, { Dayjs } from "dayjs";
import clsx from "clsx";
import { SelectTask } from "~/server/db/schema";
import { DraggableItem } from "~/components/dnd/draggable";
import { DroppableContainer } from "~/components/dnd/droppable";
import { useEffect, useState } from "react";
import { useDnDStore } from "~/lib/store";

export type DailyTasks = {
  date: Date;
  tasks: Array<SelectTask>;
};

// zustand for now, but react-server-actions in future?
// need to look into how these components integrate
// probably will need to duplicate store state
export const Day = ({ initDay }: { initDay: DailyTasks }) => {
  const containerId = initDay.date.toString();
  const itemIds = initDay.tasks.map((t) => t.id.toString());

  const addContainer = useDnDStore((state) => state.addContainer);
  useEffect(() => {
    addContainer(containerId, itemIds);
  }, [containerId, itemIds]);

  const getContainer = useDnDStore((state) => state.getContainer);
  const tasks = getContainer(containerId).map((itemId) =>
    initDay.tasks.find((task) => task.id.toString() === itemId),
  ) as Array<SelectTask>;

  return (
    <div className="flex flex-col items-center overflow-hidden border">
      <DayTitle date={initDay.date} />
      <DroppableContainer containerId={containerId}>
        <DayTasks tasks={tasks} />
      </DroppableContainer>
    </div>
  );
};

const DayTitle = ({ date }: { date: Date }) => {
  const dateDayjs = dayjs(date);
  return (
    <div className="flex w-full justify-between p-2 text-sm">
      <div className="flex h-auto items-center justify-center text-center">
        {/* todo: on click open parallel rendering modal */}
        <button className="hidden size-6 items-center justify-center rounded-md bg-gray-500 group-hover:flex">
          +
        </button>
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

const DayTasks = ({ tasks }: { tasks: Array<SelectTask> }) => {
  return (
    <>
      {tasks.map((task) => {
        const itemId = task.id.toString();
        return (
          <DraggableItem itemId={itemId}>
            <div key={task.id} className="flex flex-col items-center">
              <div className="flex h-auto items-center justify-center text-center">
                {task.name}
              </div>
            </div>
          </DraggableItem>
        );
      })}
    </>
  );
};
