"use client";

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { DraggableItem } from "./draggable";

interface ContainerProps {
  containerId: string;
  itemIds: Array<string>;
  children: React.ReactNode;
}

// todo, change items arg to be children based instead
// droppable container should only be a wrapper
export const DroppableContainer = ({
  containerId,
  itemIds,
  children,
}: ContainerProps) => {
  // todo, check if this is how you use useMemo here
  // const tasksIds = useMemo(() => {
  //   return itemIds.map((id) => id);
  // }, [itemIds]);

  const { setNodeRef } = useSortable({
    id: containerId,
    data: {
      type: "Column", // todo, change to "Container"
    },
  });

  return (
    <div ref={setNodeRef}>
      {/* <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2"> */}
      <div>
        <SortableContext items={itemIds}>
          {itemIds.map((id) => (
            <DraggableItem key={id} itemId={id}>
              {children}
            </DraggableItem>
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
