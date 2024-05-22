"use client";

import { useState } from "react";
import { getMonth } from "~/lib/utils";
import { Month } from "./_components/calendar/month";
import { Navbar } from "./_components/calendar/navbar";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  return (
    <main className="h-dvh">
      {/* <Navbar /> */}

      <SignedOut>
        <p className="text-center">Please sign in</p>
      </SignedOut>

      <SignedIn>
        <Month month={currentMonth} />
      </SignedIn>
    </main>
  );
}
