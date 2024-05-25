"use client";

import { useActiveDayStore } from "~/lib/store/task";
import { SelectTask } from "~/server/db/schema";

export const DraggingTask = () => {
  const activeTask = useActiveDayStore((state) => state.getActiveTask());
  return (
    <div className="flex cursor-grab flex-col items-center">
      <div className="flex h-auto items-center justify-center text-center">
        {activeTask}
      </div>
    </div>
  );
};

export const Task = ({ task }: { task: SelectTask }) => {
  return (
    <div className="m-2 h-24 rounded-lg bg-slate-800 p-5 pl-5 pr-5">
      <h1 className="text-lg font-semibold">{task.name}</h1>
    </div>
  );
};
