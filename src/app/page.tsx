import { SignedIn, SignedOut } from "@clerk/nextjs";
import { TopNav } from "./_components/topnav";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="h-dvh">
      <TopNav />
      <SignedOut>
        <p className="text-center">Please sign in</p>
      </SignedOut>

      <SignedIn>
        {/* <Calendar /> */}
        <div className="flex h-dvh flex-col items-center justify-center text-4xl">
          <p>Pages:</p>
          <Link href="/calendar" className="text-blue-500">
            Calendar
          </Link>
        </div>
      </SignedIn>
    </main>
  );
}
