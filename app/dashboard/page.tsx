import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SignatureList } from "@/components/dashboard/SignatureList";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage your email signatures and track performance.</p>
        </div>

        <SignatureList />
      </main>
    </div>
  );
}
