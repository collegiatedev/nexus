import { TaskTagTypes } from "@prisma/client";
import { AssignedUser } from "~/components/assignedUser";
import { DoneCheckbox } from "~/components/doneCheckbox";
import { TaskTag } from "~/components/taskTag";
import { Task } from "~/types";

export const TaskCard = ({ task }: { task: Task }) => {
  // css not synced with draggable.tsx
  // specifically, min-h-[130px]
  const taskId = Number(task.id);
  if (isNaN(taskId)) throw new Error("Invalid task");

  return (
    <div className="my-auto flex h-full min-h-[130px] w-full flex-col items-start overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
      <div className="h-[95%]">
        <span className="text-lg font-bold leading-tight">{task.name}</span>

        <div className="flex flex-col gap-2 py-3">
          <AssignedUser />
          <TagList tags={task.tags} />
        </div>
        <div className="flex w-full flex-row justify-end">
          <DoneCheckbox done={task.isDone} id={taskId} />
        </div>
      </div>
    </div>
  );
};

const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <TaskTag key={tag} type={tag as TaskTagTypes} className="text-xs" />
      ))}
    </div>
  );
};
