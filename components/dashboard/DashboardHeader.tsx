"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, BarChart3, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-xl text-blue-600">
            SignaturePro
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/dashboard")
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Signatures
            </Link>
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
