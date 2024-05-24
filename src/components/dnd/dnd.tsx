"use client";
import { useEffect, useState } from "react";
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
import { createPortal } from "react-dom";
import { useDnDStore } from "~/lib/store/dnd";

// context wrapper for dnd

interface DnDBoardProps {
  children: React.ReactNode;
  DraggingItem: React.ComponentType;
}

export const DnDBoard = ({ children, DraggingItem }: DnDBoardProps) => {
  const moveWithinContainer = useDnDStore((state) => state.moveWithinContainer);
  const moveIntoContainer = useDnDStore((state) => state.moveIntoContainer);
  const getItem = useDnDStore((state) => state.getItem);

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
      <DndContext sensors={sensors} onDragOver={onDragOver}>
        {children}
        {isClient &&
          createPortal(
            <DragOverlay>
              <DraggingItem />
            </DragOverlay>,
            document.body,
          )}
      </DndContext>
    </div>
  );

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();
    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column";

    if (!isActiveATask) return;

    const activeItem = getItem(activeId);
    const overItem = getItem(overId);
    if (!activeItem || (!overItem && !isOverAColumn)) return;

    if (overItem && isActiveATask && isOverATask) {
      if (activeItem.containerId !== overItem.containerId) {
        moveIntoContainer(
          activeId,
          activeItem.containerId,
          overItem.containerId,
          overItem.index,
        );
      } else {
        moveWithinContainer(
          activeItem.containerId,
          activeItem.index,
          overItem.index,
        );
      }
    }

    if (isActiveATask && isOverAColumn) {
      moveIntoContainer(
        activeId,
        activeItem.containerId,
        overId,
        getItem(overId)?.index ?? 0,
      );
    }
  }
};
