"use client";

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useStore } from "zustand";
import { getStore } from "~/lib/store/myStore";
interface ColumnProps {
  columnId: string;
  children: React.ReactNode;
}
export const DroppableColumn = ({ columnId, children }: ColumnProps) => {
  const store = getStore();

  const tasks = useStore(store, (s) => s.getTasks(columnId));
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
