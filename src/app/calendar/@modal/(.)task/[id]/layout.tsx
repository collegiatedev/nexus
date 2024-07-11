import "~/styles/globals.css";
import { TaskLayout } from "~/app/calendar/_components/task/layout";

export const metadata = {
  title: "Task Page",
  description: "Pretty Gamer",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function TaskModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TaskLayout>{children}</TaskLayout>;
}
