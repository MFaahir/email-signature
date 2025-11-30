"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <Link href="/" className="text-xl font-bold text-blue-600">
        SignatureGen
      </Link>
      <div className="flex items-center gap-4">
        <SignedIn>
          <Link href="/generator">
            <Button variant="ghost">Create Signature</Button>
          </Link>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
