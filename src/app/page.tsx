"use client";

import { useState } from "react";
import { getMonth } from "~/lib/utils";
import { Month } from "./_components/month";
import { Navbar } from "./_components/navbar";

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  return (
    <main className="h-dvh">
      {/* <Navbar /> */}
      <Month month={currentMonth} />
    </main>
  );
}
