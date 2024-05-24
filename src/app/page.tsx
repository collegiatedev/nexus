import { Navbar } from "./_components/_calendar/navbar";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyTasks } from "~/server/queries";
import { Calendar } from "./_components/_calendar/calendar";

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
