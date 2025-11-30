import { Header } from "@/components/layout/Header";
import { SignatureCreator } from "@/components/signature-creator/SignatureCreator";
import { Suspense } from "react";

function GeneratorContent() {
  return (
    <div className="min-h-screen bg-cream-200">
      <Header />
      <SignatureCreator />
    </div>
  );
}

export default function GeneratorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading...</p>
        </div>
      </div>
    }>
      <GeneratorContent />
    </Suspense>
  );
}

