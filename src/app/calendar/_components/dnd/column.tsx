"use client";

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useMyStore } from "~/lib/store/provider";
interface ColumnProps {
  columnId: string;
  children: React.ReactNode;
}
export const DroppableColumn = ({ columnId, children }: ColumnProps) => {
  const { getTasks } = useMyStore((state) => state);
  const tasks = getTasks(columnId);
  const tasksIds = tasks.map((task) => task.id);

  const { setNodeRef } = useSortable({
    id: columnId,
    data: {
      type: "Column",
    },
  });

  return (
    <div ref={setNodeRef} className="h-full w-full">
      <SortableContext items={tasksIds}>{children}</SortableContext>
    </div>
  );
};
