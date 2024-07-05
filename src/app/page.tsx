// import { Calendar } from "./_components/calendar/calendar";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { TopNav } from "./_components/topnav";

export default async function Home() {
  return (
    <main className="h-dvh">
      <TopNav />
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
