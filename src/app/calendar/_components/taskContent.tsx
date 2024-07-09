import Link from "next/link";
import { BackArrowSVG } from "~/components/icons";
import { getMyTask } from "~/server/queries";
import { TaskTitle } from "../task/[id]/_components/title";
import { FieldsTable } from "../task/[id]/_components/fields/fieldsTable";

// used in both @modal/(.)/task/[id] and task/[id]
export const TaskContent = async ({ taskId }: { taskId: string }) => {
  const numImgId = Number(taskId);
  if (isNaN(numImgId)) throw new Error("Invalid task id");
  const task = await getMyTask(numImgId);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Link href="/calendar">
        <BackArrowSVG />
      </Link>
      <div className="flex w-full flex-col gap-4 pl-10">
        <TaskTitle title={task.name as string} taskId={task.id} />
        <FieldsTable task={task} />
        <p className="w-full text-3xl">{task.description}</p>
      </div>
    </div>
  );
};
