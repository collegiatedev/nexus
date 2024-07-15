import { TaskTag } from "~/components/taskTag";
import { Task } from "~/types";

export const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div className="my-auto flex h-full w-full flex-col items-start overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
      <div className="h-[95%]">
        <span className="text-lg font-bold leading-tight">{task.name}</span>
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <TaskTag key={tag} type={tag} className="text-xs" />
          ))}
        </div>
      </div>
    </div>
  );
};
