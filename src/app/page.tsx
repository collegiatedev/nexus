// "use client";

import { useState } from "react";
import { getMonth } from "~/lib/utils";
import { Month } from "./_components/_calendar/month";
import { Navbar } from "./_components/_calendar/navbar";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyTasks } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main className="h-dvh">
      {/* <Navbar /> */}

      <SignedOut>
        <p className="text-center">Please sign in</p>
      </SignedOut>

      <SignedIn>
        <Month />
      </SignedIn>
    </main>
  );
}
