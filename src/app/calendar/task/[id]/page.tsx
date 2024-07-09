import Link from "next/link";
import { BackArrowSVG } from "~/components/icons";
import { getMyTask } from "~/server/queries";
import { FieldsTable } from "./_components/fields/fieldsTable";
import { TaskTitle } from "./_components/title";

export default async function TaskModal({
  params: { id: taskId },
}: {
  params: { id: string };
}) {
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
}
