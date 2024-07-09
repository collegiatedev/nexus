import { TaskContent } from "../../_components/taskContent";

export default async function TaskPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <TaskContent taskId={id} />;
}
