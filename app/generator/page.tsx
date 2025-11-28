"use client";

import { Header } from "@/components/layout/Header";
import { ActionButtons } from "@/components/signature/ActionButtons";
import { SignatureForm } from "@/components/signature/SignatureForm";
import { SignaturePreview } from "@/components/signature/SignaturePreview";
import { Button } from "@/components/ui/button";
import { initialSignatureData, SignatureData } from "@/lib/types";
import { useRef, useState } from "react";

export default function GeneratorPage() {
  const [data, setData] = useState<SignatureData>(initialSignatureData);
  const [template, setTemplate] = useState("simple");
  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Email Signature Generator</h1>
            <p className="text-gray-600 mt-2">Create your professional email signature in seconds.</p>
          </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Form & Template Selection */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Select Template</h3>
              <div className="flex gap-2">
                {["simple", "minimal", "colorful"].map((t) => (
                  <Button
                    key={t}
                    variant={template === t ? "default" : "outline"}
                    onClick={() => setTemplate(t)}
                    className="capitalize"
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </div>

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
