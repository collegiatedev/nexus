import {
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import { RouteChangeComplete } from "~/components/routeChangeComplete";
import { getMyTask } from "~/server/queries";
import { TaskContent } from "~/app/calendar/_components/taskContent";

export default async function TaskModal({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <RouteChangeComplete targetUrl={`/calendar/task/${id}`}>
      <DialogContent>
        {/* todo, fix modal pop up issues */}
        <TaskContent taskId={id} />
      </DialogContent>
    </RouteChangeComplete>
  );
}
