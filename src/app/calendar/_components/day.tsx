"use client";

import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { DraggableTask } from "./dnd/task";
import { DroppableColumn } from "./dnd/column";
import { useMyStore } from "~/lib/store/provider";
import { type Container } from "~/lib/store/types";
import { InView } from "react-intersection-observer";
import { ViewportTop } from "~/components/viewportTop";
import { toNavMonth } from "../_utils/month";

export const Day = ({ dayId }: { dayId: string }) => {
  const dayContainer = useMyStore((state) => state.getContainer(dayId));
  const columnId = dayContainer?.column.id;

  const setHoveringContainer = useMyStore(
    (state) => state.setHoveringContainer,
  );

  if (!dayContainer || !columnId) return null;
  return (
    <div
      className="relative flex h-auto min-h-[200px] w-full flex-col items-center border"
      onMouseEnter={() => setHoveringContainer(columnId)}
    >
      <DayTitle dayContainer={dayContainer} columnId={columnId} />
      <DayTasks columnId={columnId} />
    </div>
  );
};

const DayTitle = ({
  dayContainer,
  columnId,
}: {
  dayContainer: Container;
  columnId: string;
}) => {
  const hoverContainer = useMyStore((state) => state.getHoveringContainer());
  const setNavMonth = useMyStore((state) => state.setNavMonth);
  const navToggleMonth = useMyStore((state) => state.getNavToggleMonth());
  const dateDayjs = dayjs(dayContainer.column.date!);

  return (
    <>
      {dateDayjs.format("D") === "1" && (
        <ViewportTop
          onReEnter={() => {
            // address case where month before the first is set as nav month
            // disgusting but works
            if (toNavMonth(navToggleMonth) !== dateDayjs.format("MMMM YYYY"))
              setNavMonth(dateDayjs.subtract(1, "month").format("MMMM YYYY"));
          }}
          onExit={() => setNavMonth(dateDayjs.format("MMMM YYYY"))}
        />
      )}
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
    </>
  );
};

const DayTasks = ({ columnId }: { columnId: string }) => {
  const tasks = useMyStore((state) => state.getTasks(columnId));
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
