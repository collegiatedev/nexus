"use client";

import dayjs from "dayjs";
import clsx from "clsx";
import React, { useState } from "react";
import { DraggableTask } from "./dnd/task";
import { DroppableColumn } from "./dnd/column";
import { useMyStore } from "~/lib/store/provider";

export const Day = ({ dayId }: { dayId: string }) => {
  const dayContainer = useMyStore((state) => state.getContainer(dayId));
  if (!dayContainer) return null;

  const dateDayjs = dayjs(dayContainer.column.date!);

  const columnId = dayContainer.column.id;
  const tasks = useMyStore((state) => state.getTasks(columnId));

  const hoverContainer = useMyStore((state) => state.getHoveringContainer());
  const setHoveringContainer = useMyStore(
    (state) => state.setHoveringContainer,
  );
  const handleMouseEnter = () => setHoveringContainer(columnId);
  return (
    <div
      className="relative flex h-auto min-h-[100px] w-full flex-col items-center border"
      onMouseEnter={handleMouseEnter}
    >
      {/* Day Title */}
      <div className="flex h-[50px] w-full justify-between px-2 pb-1 pt-2 text-sm">
        <div className="flex h-auto items-center justify-center text-center">
          {hoverContainer === columnId && (
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
            className={clsx(
              "flex size-8 flex-row items-center justify-center",
              {
                "ml-3 rounded-full bg-blue-600 text-white":
                  dateDayjs.format("DD-MM-YY") === dayjs().format("DD-MM-YY"),
              },
            )}
          >
            {dateDayjs.format("D")}
          </p>
        </header>
      </div>

      {/* Day Tasks */}
      <DroppableColumn columnId={columnId}>
        {tasks.map((task) => {
          return (
            <div key={task.id} className="h-auto w-auto">
              <DraggableTask task={task} />
            </div>
          );
        })}
      </DroppableColumn>
    </div>
  );
};
