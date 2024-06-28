import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalContext } from "~/components/ui/modal";
import { MyStoreProvider } from "~/lib/store/provider";
import { SelectTask } from "~/server/db/schema";
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
  const myTasks = (await getMyTasks()) as Array<SelectTask>;
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
