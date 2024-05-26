"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "~/lib/store/dnd";

export const DraggableTask = ({ task }: { task: Task }) => {
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
      // <div
      //   ref={setNodeRef}
      //   style={style}
      //   className="h-full w-full cursor-grab hover:ring-2 hover:ring-inset hover:ring-rose-500"
      // />
      <div
        ref={setNodeRef}
        style={style}
        className="
        relative
      flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 border-rose-500 bg-[#0D1117] p-2.5 text-left opacity-30
      "
      />
    );
  }

  return (
    // <div
    //   ref={setNodeRef}
    //   style={style}
    //   {...attributes}
    //   {...listeners}
    //   className="h-full w-full cursor-grab hover:ring-2 hover:ring-inset hover:ring-rose-500"
    // >
    //   <p>{task.name}</p>
    // </div>
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task relative m-1 flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-[#505c6f] p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-rose-500"
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.name}
      </p>
      <p>id: {task.id}</p>
    </div>
  );
};
