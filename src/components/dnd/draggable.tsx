"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Id = string | number;

export const DraggableTask = (props: {
  taskId: Id;
  containerId: Id;
  content: string;
}) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.taskId,
    data: {
      type: "Task",
      props,
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
        className="
        bg-mainBackgroundColor
      relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 border-rose-500 p-2.5 text-left opacity-30
      "
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-mainBackgroundColor task relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-rose-500"
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {props.content}
      </p>
    </div>
  );
};
