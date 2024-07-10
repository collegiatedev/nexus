import { TaskContent } from "../../_components/task";

export default async function TaskPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <TaskContent taskId={id} />;
}
