"use client";

import { Header } from "@/components/layout/Header";
import { ActionButtons } from "@/components/signature/ActionButtons";
import { SignatureForm } from "@/components/signature/SignatureForm";
import { SignaturePreview } from "@/components/signature/SignaturePreview";
import { Button } from "@/components/ui/button";
import { initialSignatureData, SignatureData } from "@/lib/types";
import { useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const templates = [
  { id: "simple", name: "Simple", category: "Classic" },
  { id: "minimal", name: "Minimal", category: "Classic" },
  { id: "colorful", name: "Colorful", category: "Classic" },
  { id: "corporate", name: "Corporate", category: "Professional" },
  { id: "elegant", name: "Elegant", category: "Professional" },
  { id: "bold", name: "Bold", category: "Modern" },
  { id: "creative", name: "Creative", category: "Modern" },
  { id: "modern-gradient", name: "Modern Gradient", category: "Modern" },
  { id: "rounded-icons", name: "Rounded Icons", category: "Friendly" },
  { id: "photo-left", name: "Photo Left", category: "Photo" },
  { id: "photo-top", name: "Photo Top", category: "Photo" },
  { id: "no-photo", name: "No Photo", category: "Minimal" },
];

function GeneratorContent() {
  const [data, setData] = useState<SignatureData>(initialSignatureData);
  const [template, setTemplate] = useState("simple");
  const previewRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {searchParams.get("success") === "true" && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-center font-medium">
                🎉 Payment successful! You can now export unlimited signatures.
              </p>
            </div>
          )}
          
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Email Signature Generator</h1>
            <p className="text-gray-600 mt-2">Choose from 12 professional templates and create your signature in seconds.</p>
          </header>

          {/* Template Selection */}
          <div className="mb-8 bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Select Template</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    template === t.id
                      ? "border-blue-600 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow"
                  }`}
                >
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{t.category}</div>
                </button>
              ))}
            </div>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Form */}
          <div className="space-y-6">
            <SignatureForm data={data} onChange={setData} />
          </div>

          {/* Right Column: Preview & Actions */}
          <div className="space-y-6 lg:sticky lg:top-8 h-fit">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Live Preview</h3>
              <SignaturePreview ref={previewRef} data={data} template={template} />
              <ActionButtons previewRef={previewRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default function GeneratorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <GeneratorContent />
    </Suspense>
  );
}

