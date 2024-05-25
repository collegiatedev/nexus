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
import { Task, useDnDStore } from "~/lib/store";
import { DraggableTask } from "./task";

export const DnDBoard = ({ children }: { children: React.ReactNode }) => {
  const [draggingTask, setDraggingTask] = useState<Task | null>(null);
  const swapTasks = useDnDStore((state) => state.swapTasks);

  // need to wait till client is loaded to access document.body in createPortal
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
              {draggingTask && <DraggableTask task={draggingTask} />}
            </DragOverlay>,
            document.body,
          )}
      </DndContext>
    </div>
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Task") {
      setDraggingTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(_event: DragEndEvent) {
    setDraggingTask(null);
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask || !isOverATask) return;

    swapTasks(activeId.toString(), overId.toString());
  }
};
