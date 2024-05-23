"use client";
import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

// context wrapper for dnd
export const DnDBoard = ({ children }: { children: React.ReactNode }) => {
  // const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [activeTaskId, setActiveTaskId] = useState<UniqueIdentifier | null>(
    null,
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  return (
    <div>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
      >
        {children}
        {/* {createPortal(
          <DragOverlay>
            {activeTaskId && (
              // <TaskCard task={activeTask} />
              <p>hello</p>
            )}
          </DragOverlay>,
          document.body,
        )} */}
      </DndContext>
    </div>
  );

  function onDragStart(event: DragStartEvent) {
    // todo: rename to "Item"
    if (event.active.data.current?.type === "Task") {
      console.log("onDragStart", event.active.data.current);
      const activeId = event.active.id;
      setActiveTaskId(activeId);
      return;
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    // todo, rename to item
    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    // if (isActiveATask && isOverATask) {
    //   setTasks((tasks) => {
    //     const activeIndex = tasks.findIndex((t) => t.id === activeId);
    //     const overIndex = tasks.findIndex((t) => t.id === overId);

    //     if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
    //       tasks[activeIndex].columnId = tasks[overIndex].columnId;
    //       return arrayMove(tasks, activeIndex, overIndex - 1);
    //     }

    //     return arrayMove(tasks, activeIndex, overIndex);
    //   });
    // }

    // const isOverAColumn = over.data.current?.type === "Column";

    // // Dropping a task over a column
    // if (isActiveATask && isOverAColumn) {
    //   setTasks((tasks) => {
    //     const activeIndex = tasks.findIndex((t) => t.id === activeId);
    //     tasks[activeIndex].columnId = overId;
    //     return arrayMove(tasks, activeIndex, activeIndex);
    //   });
    // }
  }
};
