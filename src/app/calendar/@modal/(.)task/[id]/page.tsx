import { DialogContent } from "~/components/ui/dialog";
import { RouteChangeComplete } from "~/components/routeChangeComplete";
import { TaskPageContent } from "~/app/calendar/_components/task/page";

export default async function TaskModal({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <RouteChangeComplete targetUrl={`/calendar/task/${id}`}>
      <DialogContent>
        {/* todo, fix modal pop up issues */}
        <TaskPageContent taskId={id} />
      </DialogContent>
    </RouteChangeComplete>
  );
}
