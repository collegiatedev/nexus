"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Calendar } from "./_components/calendar";
import { MyTasks } from "~/server/queries";
import { myTasksToDnDProps } from "~/lib/store/dnd";
import { useEffect } from "react";
import { useMyStore } from "~/components/providers/store";

export default async function Home() {
  return (
    <main className="h-dvh">
      {/* <Navbar /> */}
      <SignedOut>
        <p className="text-center">Please sign in</p>
      </SignedOut>

      <SignedIn>
        <Calendar />
      </SignedIn>
    </main>
  );
}

// loads into store, needed cuz client vs server component
// used in layout.tsx
export const LoadDnDState = ({
  myTasks,
  children,
}: {
  myTasks: MyTasks;
  children: React.ReactNode;
}) => {
  const { addDndProps } = useMyStore((state) => state);
  useEffect(() => {
    const tasks = myTasksToDnDProps(myTasks);
    addDndProps(tasks);
  }, [myTasks, addDndProps]);
  return children;
};
