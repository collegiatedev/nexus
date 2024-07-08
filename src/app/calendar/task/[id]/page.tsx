import Link from "next/link";
import { BackArrowSVG } from "~/components/icons";
import { getMyTask, MyTasks } from "~/server/queries";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { FieldsTable } from "./_components/fields/fieldsTable";

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
      <div className="flex w-full flex-col gap-4 bg-black pl-10">
        <h1 className="text-6xl font-normal">{task.name}</h1>
        <FieldsTable task={task} />
        <p className="w-full text-3xl">{task.description}</p>
      </div>
    </div>
  );
}
