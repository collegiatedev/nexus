"use client";

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { DraggableTask } from "./draggable";

type Id = string | number;
interface Props {
  column: {
    id: Id;
    title: string;
  };
  tasks: {
    taskId: Id;
    containerId: Id;
    content: string;
  }[];
}

export const DroppableContainer = ({ column, tasks }: Props) => {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.taskId);
  }, [tasks]);

  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  return (
    <div ref={setNodeRef}>
      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <DraggableTask key={task.taskId} {...task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
