import { DialogContent } from "~/components/ui/dialog";
import { RouteChangeComplete } from "~/components/routeChangeComplete";
import { TaskContent } from "~/app/calendar/_components/task";

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
