"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <Link href="/" className="text-xl font-bold text-blue-600">
        SignatureGen
      </Link>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href="/generator">
            <Button variant="ghost">Generator</Button>
          </Link>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
