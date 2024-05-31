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

  const { getTask, swapTasks, moveToColumn } = useMyStore((state) => state);

  // need to wait till client is loaded to access document.body in createPortal
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    console.log("isClient", isClient);
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
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    const isActiveATask = active.data.current?.type === "Task";

    if (activeId === overId || !isActiveATask) return;

    console.log("activeId", activeId, "overId", overId);
    console.log("a", over.data.current?.type);

    const isOverType = over.data.current?.type;

    console.log("here");
    if (isOverType === "Task") {
      // setDraggingTaskId(null);
    } else {
      console.log(`moving task ${activeId} to column ${overId}`);
      moveToColumn(activeId.toString(), overId.toString());
    }

    // swapTasks(activeId.toString(), overId.toString());
  }
};
