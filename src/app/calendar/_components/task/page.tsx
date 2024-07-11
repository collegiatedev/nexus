import Link from "next/link";
import { BackArrowSVG } from "~/components/icons";
import { getMyTask } from "~/server/queries";
import { FieldsTable } from "./fields/fieldsTable";
import { TaskTitle } from "./title";
import { MyEditor } from "./editor";

// page.tsx component used in both @modal/(.)/task/[id] and task/[id]
export const TaskPageContent = async ({ taskId }: { taskId: string }) => {
  const numImgId = Number(taskId);
  if (isNaN(numImgId)) throw new Error("Invalid task id");
  const task = await getMyTask(numImgId);

  return (
    <main className="vh-full">
      <div className="flex flex-col gap-4 p-4">
        <Link href="/calendar">
          <BackArrowSVG />
        </Link>
        <div className="flex w-full flex-col gap-4 pl-10">
          <TaskTitle title={task.name as string} taskId={task.id} />
          <FieldsTable task={task} />
          <MyEditor />
        </div>
      </div>
    </main>
  );
};
