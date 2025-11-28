"use client";

import { Header } from "@/components/layout/Header";
import { ActionButtons } from "@/components/signature/ActionButtons";
import { SignatureForm } from "@/components/signature/SignatureForm";
import { SignaturePreview } from "@/components/signature/SignaturePreview";
import { PaymentGate } from "@/components/payment/PaymentGate";
import { Button } from "@/components/ui/button";
import { initialSignatureData, SignatureData } from "@/lib/types";
import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function GeneratorPage() {
  const [data, setData] = useState<SignatureData>(initialSignatureData);
  const [template, setTemplate] = useState("simple");
  const previewRef = useRef<HTMLDivElement>(null);
  const [hasPaid, setHasPaid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    checkPaymentStatus();
  }, []);

  const checkPaymentStatus = async () => {
    try {
      const response = await fetch("/api/payment/check");
      const data = await response.json();
      setHasPaid(data.hasPaid);
    } catch (error) {
      console.error("Error checking payment status:", error);
      setHasPaid(false);
    } finally {
      setLoading(false);
    }
  };

  // Show success message if redirected from successful payment
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      // Recheck payment status after successful payment
      checkPaymentStatus();
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasPaid) {
    return <PaymentGate />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {searchParams.get("success") === "true" && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-center font-medium">
                🎉 Payment successful! Welcome to Email Signature Generator.
              </p>
            </div>
          )}
          
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
