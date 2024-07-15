"use client";

import dayjs, { type Dayjs } from "dayjs";
import React from "react";
import clsx from "clsx";
import { DraggableTaskCard } from "./dnd/draggable";
import { DroppableColumn } from "./dnd/droppable";
import { ViewportTop } from "~/components/viewportTop";
import { Container } from "~/types";
import { useMyStore } from "~/lib/store/provider";

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

const DayTasks = ({ columnId }: { columnId: string }) => {
  const tasks = useMyStore((state) => state.getTasks(columnId));
  return (
    <DroppableColumn columnId={columnId}>
      {tasks.map((task) => {
        return (
          <div key={task.id} className="h-auto w-auto">
            <DraggableTaskCard task={task} />
          </div>
        );
      })}
    </DroppableColumn>
  );
};

const InfiniteScrollDetector = ({ dateDayjs }: { dateDayjs: Dayjs }) => {
  const setNavMonth = useMyStore((state) => state.setNavMonth);
  const navMonth = useMyStore((state) => state.getNavMonthString());
  return (
    <ViewportTop
      onReEnter={() => {
        // address case where month before the first is set as nav month
        // disgusting hack but it works
        if (navMonth !== dateDayjs.format("MMMM YYYY"))
          setNavMonth(dateDayjs.subtract(1, "month"));
      }}
      onExit={() => setNavMonth(dateDayjs)}
    />
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
  const dateDayjs = dayjs(dayContainer.column.date!);

  return (
    <>
      {dateDayjs.format("D") === "1" && (
        <InfiniteScrollDetector dateDayjs={dateDayjs} />
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
