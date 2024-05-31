"use client";

import { useEffect, useState } from "react";
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

  const { getTask, moveTask, moveTaskIntoColumn } = useMyStore(
    (state) => state,
  );

  // need to wait till client is loaded to access document.body in createPortal
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, [isClient]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  return (
    <div className="h-full w-full">
      <DndContext
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

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Task") {
      setDraggingTaskId(event.active.id as string);
      return;
    }
  }

  function onDragEnd(_event: DragEndEvent) {
    setDraggingTaskId(null);
  }

  function onDragOver(event: DragOverEvent) {
    console.log(event);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    const isActiveATask = active.data.current?.type === "Task";

    if (activeId === overId || !isActiveATask) return;
    const isOverType = over.data.current?.type;
    if (isOverType === "Task") moveTask(activeId.toString(), overId.toString());
    else moveTaskIntoColumn(activeId.toString(), overId.toString()); // overId is a columnId
  }
};
