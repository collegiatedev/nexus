import {
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import { RouteChangeComplete } from "~/components/routeChangeComplete";
import { getMyTask } from "~/server/queries";

export default async function TaskModal({
  params: { id: taskId },
}: {
  params: { id: string };
}) {
  const numTaskId = Number(taskId);
  if (isNaN(numTaskId)) throw new Error("Invalid image id");

  const task = await getMyTask(numTaskId);
  return (
    // will adjust later to be more generalized
    <RouteChangeComplete targetUrl={`/calendar/task/${taskId}`}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.name}</DialogTitle>
          {/* <img src={image.url} className="w-48" /> */}
          hello world
          <DialogDescription>
            Created at: {task.createdAt.toString()}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </RouteChangeComplete>
  );
}
