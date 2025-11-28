"use client";

import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Copy, Download, Lock } from "lucide-react";
import { RefObject, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface ActionButtonsProps {
  previewRef: RefObject<HTMLDivElement | null>;
}

export function ActionButtons({ previewRef }: ActionButtonsProps) {
  const [copying, setCopying] = useState(false);
  const [hasPaid, setHasPaid] = useState<boolean | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

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
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.primaryEmailAddress?.emailAddress,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL received");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      setLoading(false);
    }
  };

  const handleCopyHtml = () => {
    if (!hasPaid) {
      setShowPaywall(true);
      return;
    }

    if (previewRef.current) {
      setCopying(true);
      const html = previewRef.current.innerHTML;
      navigator.clipboard.writeText(html).then(() => {
        setTimeout(() => setCopying(false), 2000);
      });
    }
  };

  const handleDownloadPdf = async () => {
    if (!hasPaid) {
      setShowPaywall(true);
      return;
    }

    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("signature.pdf");
    }
  };

  return (
    <>
      <div className="flex gap-4 mt-4">
        <Button onClick={handleCopyHtml} variant="outline" className="flex-1">
          {!hasPaid && <Lock className="w-4 h-4 mr-2" />}
          {hasPaid && <Copy className="w-4 h-4 mr-2" />}
          {copying ? "Copied!" : "Copy HTML"}
        </Button>
        <Button onClick={handleDownloadPdf} className="flex-1">
          {!hasPaid && <Lock className="w-4 h-4 mr-2" />}
          {hasPaid && <Download className="w-4 h-4 mr-2" />}
          Download PDF
        </Button>
      </div>

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowPaywall(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Unlock Export Features
              </h3>
              <p className="text-gray-600">
                Pay once, export unlimited signatures forever
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-5xl font-bold text-gray-900">$4.99</span>
                <span className="text-gray-600 ml-2">one-time</span>
              </div>
              <p className="text-center text-sm text-gray-600">
                Lifetime access • No recurring fees
              </p>
            </div>

            <Button
              onClick={handlePayment}
              disabled={loading}
              className="w-full h-12 text-lg mb-4"
              size="lg"
            >
              {loading ? "Redirecting..." : "Pay $4.99 & Unlock"}
            </Button>

            <p className="text-xs text-center text-gray-500">
              Secure payment powered by Stripe
            </p>
          </div>
        </div>
      )}
    </>
  );
}

