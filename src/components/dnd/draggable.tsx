"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect } from "react";

interface ItemProps {
  itemId: string;
  children: React.ReactNode;
  // function for updating the data for the item you're dragging
  updateDraggingItem: () => void;
}

export const DraggableItem = ({
  itemId,
  updateDraggingItem,
  children,
}: ItemProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: itemId,
    data: {
      type: "Task", // Change to Item later
    },
  });

  useEffect(() => {
    if (isDragging) updateDraggingItem();
  }, [isDragging]);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="cursor-grab border-2 border-rose-500 opacity-30"
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="h-full w-full cursor-grab hover:ring-2 hover:ring-inset hover:ring-rose-500"
    >
      {children}
    </div>
  );
};
