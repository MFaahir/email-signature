"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-cream-300 bg-white shadow-sm">
      <Link href="/" className="text-xl font-bold text-sage-700">
        SignatureGen
      </Link>
      <div className="flex items-center gap-4">
        <SignedIn>
          <Link href="/generator">
            <Button variant="ghost" className="text-gray-700 hover:text-sage-700 hover:bg-sage-50">Create Signature</Button>
          </Link>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
