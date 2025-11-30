"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-cream-300 bg-white shadow-sm">
      <Link href="/" className="text-xl font-bold text-sage-700">
        SignatureGen
      </Link>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline" className="border-sage-300 text-sage-700 hover:bg-sage-50">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard">
            <Button variant="ghost" className="text-gray-700 hover:text-sage-700 hover:bg-sage-50">Dashboard</Button>
          </Link>
          <Link href="/generator">
            <Button variant="ghost" className="text-gray-700 hover:text-sage-700 hover:bg-sage-50">Generator</Button>
          </Link>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
