"use client";

import { useEffect, useState, useCallback, useId, useRef } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import { DraggableTaskCard } from "./draggable";
import { syncTaskDueDate } from "~/app/actions";
import { useMyStore } from "~/lib/store/provider";
import dayjs from "dayjs";

export const DnDBoard = ({ children }: { children: React.ReactNode }) => {
  // const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  const draggingTaskId = useRef<string | null>(null); // useRef is used to avoid re-render, access value in
  const {
    setHoveringContainer,
    getTask,
    addTaskIntoColumn,
    swapTasksWithinColumn,
    insertTaskIntoColumn,
  } = useMyStore((state) => state);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const onDragStart = useCallback((event: DragStartEvent) => {
    setHoveringContainer(null);
    if (event.active.data.current?.type === "Task") {
      draggingTaskId.current = event.active.id as string;
    }
  }, []);

  // generalize later
  const onDragEnd = useCallback(async (_event: DragEndEvent) => {
    if (draggingTaskId.current) {
      const task = getTask(draggingTaskId.current);
      const taskId = Number(task?.id);
      if (!task || isNaN(taskId)) throw new Error("Invalid task");
      const dueDate = dayjs(task.columnId).toDate();

      await syncTaskDueDate(taskId, dueDate);
    }
    draggingTaskId.current = null;
  }, []);

  const onDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeId = active.id;
      const overId = over.id;
      const isActiveATask = active.data.current?.type === "Task";
      if (activeId === overId || !isActiveATask) return;

      const activeTask = getTask(activeId.toString());
      const isOverType = over.data.current?.type;
      if (isOverType === "Task") {
        const overTask = getTask(overId.toString());
        if (activeTask?.columnId === overTask?.columnId)
          swapTasksWithinColumn(activeId.toString(), overId.toString());
        else insertTaskIntoColumn(activeId.toString(), overId.toString());
      } else {
        // overId is the columnId
        if (activeTask?.columnId !== overId.toString())
          addTaskIntoColumn(activeId.toString(), overId.toString());
      }
    },
    [swapTasksWithinColumn, insertTaskIntoColumn, addTaskIntoColumn, getTask],
  );
  const id = useId();
  return (
    <div className="h-full w-full">
      <DndContext
        id={id}
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        {children}
        {isClient &&
          createPortal(
            <DragOverlay>
              {draggingTaskId.current &&
                (() => {
                  const task = getTask(draggingTaskId.current);
                  return task ? <DraggableTaskCard task={task} /> : null;
                })()}
            </DragOverlay>,
            document.body,
          )}
      </DndContext>
    </div>
  );
};
