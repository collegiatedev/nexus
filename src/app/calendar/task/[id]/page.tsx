import { TaskPageContent } from "../../_components/task/page";

export default async function TaskPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <TaskPageContent taskId={id} />;
}
