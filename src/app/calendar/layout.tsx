import "~/styles/globals.css";

import { ModalContext } from "~/components/ui/modal";
import { getMyTasks } from "~/server/queries";
import { LoadDnDState } from "./page";

export const metadata = {
  title: "Calendar",
  description: "Good looking calendar",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  // this is broken setup
  // do a login redirect check
  // if not logged in, redirect to /login

  const myTasks = await getMyTasks();
  return (
    <LoadDnDState myTasks={myTasks}>
      <ModalContext>
        {children}
        {modal}
        <div id="modal-root" />
      </ModalContext>
    </LoadDnDState>
  );
}
