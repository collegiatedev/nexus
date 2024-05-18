"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const TopNav = () => {
  const router = useRouter();
  return (
    <nav className=" flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Top Nav</div>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};
