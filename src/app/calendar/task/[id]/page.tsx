import Link from "next/link";
import { BackArrowSVG } from "~/components/icons";
import { getMyTask } from "~/server/queries";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { Checkbox } from "~/components/ui/checkbox";
import { TaskTag } from "~/components/taskTag";
import { TaskTagTypes } from "~/types";
// import { Button } from "~/components/ui/button";

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
        <TaskFieldsTable task={task} />
        <p className="w-full text-3xl">{task.description}</p>
      </div>
    </div>
  );
}

type Task = Awaited<ReturnType<typeof getMyTask>>;
const TaskFieldsTable = ({ task }: { task: Task }) => {
  return (
    <Table className="my-10 mb-16 border-b border-t">
      <TableBody className="text-xl">
        <TableRow key={`due date ${task.id}`}>
          <TableCell>Due</TableCell>
          <TableCell className="hover:bg-muted/50">
            {task.dueDate?.toLocaleDateString()}
          </TableCell>
        </TableRow>
        <TableRow key={`tags ${task.id}`}>
          <TableCell>Tags</TableCell>
          <TableCell className="flex flex-wrap gap-2 hover:bg-muted/50">
            {task.tags.length !== 0 ? (
              task.tags.map((tag) => (
                <TaskTag type={tag.type as TaskTagTypes} tagId={tag.id} />
              ))
            ) : (
              <div className="cursor-default opacity-50">Empty</div>
            )}
          </TableCell>
        </TableRow>
        <TableRow key={`is done ${task.id}`}>
          <TableCell>Done</TableCell>
          <TableCell>
            <Checkbox />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
