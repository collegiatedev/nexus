"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskTag } from "~/components/taskTag";
import { OpenModal } from "~/components/ui/modal";
import { Task } from "~/types";
import { TaskCard } from "./card";

export const DraggableTaskCard = ({ task }: { task: Task }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative flex min-h-[130px] cursor-pointer items-center rounded-xl border-2 border-rose-500 bg-[#0D1117] p-2.5 text-left opacity-30"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task relative m-1 min-h-[130px] cursor-pointer items-center rounded-xl bg-[#505c6f] p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-rose-500"
    >
      {/* check if you can add this to day instead */}
      <OpenModal url={`/calendar/task/${task.id}`}>
        <TaskCard task={task} />
      </OpenModal>
    </div>
  );
};
