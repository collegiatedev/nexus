"use client";

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useDnDStore } from "~/lib/store/dnd";

interface ContainerProps {
  containerId: string;
  children: React.ReactNode;
}

// todo, change items arg to be children based instead
// droppable container should only be a wrapper
export const DroppableContainer = ({
  containerId,
  children,
}: ContainerProps) => {
  // since this is an array, double check if rerenders properly when elements updated
  const getContainer = useDnDStore((state) => state.getContainer);

  const { setNodeRef } = useSortable({
    id: containerId,
    data: {
      type: "Column", // todo, change to "Container"
    },
  });

  return (
    <div ref={setNodeRef} className="h-full w-full rounded-lg p-2">
      <SortableContext items={getContainer(containerId)}>
        {children}
      </SortableContext>
    </div>
  );
};
