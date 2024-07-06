import "~/styles/globals.css";

import { ModalContext } from "~/components/ui/modal";
import { MyStoreProvider } from "~/lib/store/provider";
// import { SelectTask } from "~/server/db/schema";
import { getMyTasks } from "~/server/queries";

export const metadata = {
  title: "Calendar",
  description: "Generated by create-t3-app",
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
    <MyStoreProvider params={myTasks}>
      <ModalContext>
        {children}
        {modal}
        <div id="modal-root" />
      </ModalContext>
    </MyStoreProvider>
  );
}
