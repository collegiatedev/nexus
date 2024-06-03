// import { Navbar } from "./_components/_calendar/navbar";
// import { Calendar } from "./_components/calendar/calendar";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default async function Home() {
  return (
    <main className="h-dvh">
      {/* <Navbar /> */}

      <SignedOut>
        <p className="text-center">Please sign in</p>
      </SignedOut>

      <SignedIn>
        {/* <Calendar /> */}
        hello world
      </SignedIn>
    </main>
  );
}
