"use client";

import { useEffect, useState, useCallback, useId } from "react";
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
import { DraggableTask } from "./task";
import { useMyStore } from "~/lib/store/provider";

export const DnDBoard = ({ children }: { children: React.ReactNode }) => {
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  const {
    getTask,
    addTaskIntoColumn,
    swapTasksWithinColumn,
    insertTaskIntoColumn,
  } = useMyStore((state) => state);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []); // Correct dependency array

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const onDragStart = useCallback((event: DragStartEvent) => {
    if (event.active.data.current?.type === "Task") {
      setDraggingTaskId(event.active.id as string);
    }
  }, []);

  const onDragEnd = useCallback((_event: DragEndEvent) => {
    setDraggingTaskId(null);
  }, []);

  const onDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeId = active.id;
      const overId = over.id;
      const isActiveATask = active.data.current?.type === "Task";
      if (activeId === overId || !isActiveATask) return;

      const here = getTask(activeId.toString());
      // console.log("-> premove", here?.id, here?.columnId);

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

      if (isOverType === "Task") {
        const here = getTask(overId.toString());
        // console.log("<- postmove Task", here?.id, here?.columnId);
      } else {
        // console.log("<-postmove Column");
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
              {draggingTaskId &&
                (() => {
                  const task = getTask(draggingTaskId);
                  return task ? <DraggableTask task={task} /> : null;
                })()}
            </DragOverlay>,
            document.body,
          )}
      </DndContext>
    </div>
  );
};
