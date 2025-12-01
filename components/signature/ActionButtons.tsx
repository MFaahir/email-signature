"use client";

import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Copy, Download, Lock, BookOpen } from "lucide-react";
import { RefObject, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { InstallGuideModal } from "./InstallGuideModal";
import { type EmailClient } from "@/lib/email-client-guides";
import { injectTracking } from "@/lib/tracking/html-injector";

interface ActionButtonsProps {
  previewRef: RefObject<HTMLDivElement | null>;
  signatureId?: string;
  enableTracking?: boolean;
  userPlan?: string;
}

export function ActionButtons({ previewRef, signatureId, enableTracking = false, userPlan = "free" }: ActionButtonsProps) {
  const [copying, setCopying] = useState(false);
  const [hasPaid, setHasPaid] = useState<boolean | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [selectedClient, setSelectedClient] = useState<EmailClient | null>(null);
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
    // Allow copy if user has paid OR is on a valid plan (free/premium)
    // The paywall should only show if we want to gate specific features, 
    // but basic copy should be allowed for free users as per "3 signatures" limit
    const canCopy = hasPaid || userPlan === "free" || userPlan === "premium" || userPlan === "lifetime";

    if (!canCopy) {
      setShowPaywall(true);
      return;
    }

    if (previewRef.current) {
      setCopying(true);
      let html = previewRef.current.innerHTML;
      
      // Inject tracking if enabled and signatureId is provided
      if (signatureId && enableTracking) {
        console.log("🔍 Injecting tracking:", { signatureId, enableTracking });
        html = injectTracking(html, signatureId, true);
        console.log("✅ Tracking injected. HTML length:", html.length);
      } else {
        console.log("⚠️ Tracking NOT injected:", { 
          hasSignatureId: !!signatureId, 
          enableTracking,
          reason: !signatureId ? "No signature ID" : !enableTracking ? "Tracking disabled" : "Unknown"
        });
      }
      
      // Copy as HTML using the Clipboard API
      const blob = new Blob([html], { type: 'text/html' });
      const plainText = previewRef.current.innerText;
      
      navigator.clipboard.write([
        new ClipboardItem({
          'text/html': blob,
          'text/plain': new Blob([plainText], { type: 'text/plain' })
        })
      ]).then(() => {
        setTimeout(() => setCopying(false), 2000);
      }).catch((err) => {
        console.error('Failed to copy:', err);
        // Fallback to plain text if HTML copy fails
        navigator.clipboard.writeText(html).then(() => {
          setTimeout(() => setCopying(false), 2000);
        });
      });
    }
  };

  const handleDownloadPdf = async () => {
    // Allow download if user has paid OR is on a valid plan
    const canDownload = hasPaid || userPlan === "free" || userPlan === "premium" || userPlan === "lifetime";

    if (!canDownload) {
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

  const handleQuickInstall = async (client: EmailClient) => {
    // First, copy the HTML to clipboard
    if (previewRef.current) {
      let html = previewRef.current.innerHTML;
      
      // Inject tracking if enabled and signatureId is provided
      if (signatureId && enableTracking) {
        html = injectTracking(html, signatureId, true);
      }
      
      try {
        await navigator.clipboard.writeText(html);
        
        // Show brief success message
        setCopying(true);
        setTimeout(() => setCopying(false), 2000);
        
        // Then navigate to the appropriate settings page
        const urls: Record<EmailClient, string> = {
          gmail: 'https://mail.google.com/mail/u/0/#settings/general',
          outlookWeb: 'https://outlook.live.com/mail/0/options/mail/messageContent',
          outlook: '', // Desktop app - show guide instead
          appleMail: '', // Desktop app - show guide instead
          ios: '', // Mobile - show guide instead
          android: '', // Mobile - show guide instead
        };
        
        const url = urls[client];
        
        if (url) {
          // Open settings page in new tab
          window.open(url, '_blank');
        } else {
          // For desktop/mobile apps, show the guide
          setSelectedClient(client);
          setShowGuide(true);
        }
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  return (
    <>
      <div className="space-y-4 mt-4">
        {/* Export Buttons */}
        <div className="flex gap-4">
          <Button onClick={handleCopyHtml} variant="outline" className="flex-1">
            {!(hasPaid || userPlan === "free" || userPlan === "premium" || userPlan === "lifetime") && <Lock className="w-4 h-4 mr-2" />}
            {(hasPaid || userPlan === "free" || userPlan === "premium" || userPlan === "lifetime") && <Copy className="w-4 h-4 mr-2" />}
            {copying ? "Copied!" : "Copy HTML"}
          </Button>
          <Button onClick={handleDownloadPdf} className="flex-1">
            {!(hasPaid || userPlan === "free" || userPlan === "premium" || userPlan === "lifetime") && <Lock className="w-4 h-4 mr-2" />}
            {(hasPaid || userPlan === "free" || userPlan === "premium" || userPlan === "lifetime") && <Download className="w-4 h-4 mr-2" />}
            Download PDF
          </Button>
        </div>

        {/* Quick Install Buttons */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-gray-600" />
            <h4 className="font-semibold text-sm text-gray-700">Quick Install</h4>
            <span className="text-xs text-gray-500">(Auto-copy & navigate)</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickInstall("gmail")}
              className="justify-start"
            >
              <span className="mr-2">📧</span>
              Gmail
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickInstall("outlookWeb")}
              className="justify-start"
            >
              <span className="mr-2">🌐</span>
              Outlook Web
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickInstall("outlook")}
              className="justify-start"
            >
              <span className="mr-2">📨</span>
              Outlook Desktop
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickInstall("appleMail")}
              className="justify-start"
            >
              <span className="mr-2">✉️</span>
              Apple Mail
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickInstall("ios")}
              className="justify-start"
            >
              <span className="mr-2">📱</span>
              iPhone/iPad
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickInstall("android")}
              className="justify-start"
            >
              <span className="mr-2">🤖</span>
              Android
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            Click to copy signature & open settings page
          </p>
        </div>
      </div>

      {/* Installation Guide Modal */}
      <InstallGuideModal
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
        client={selectedClient}
      />

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
                Upgrade to Premium
              </h3>
              <p className="text-gray-600">
                Unlock unlimited signatures and advanced analytics
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-5xl font-bold text-gray-900">$4.99</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
              <p className="text-center text-sm text-gray-600">
                Cancel anytime • No commitment
              </p>
            </div>

            <Button
              onClick={handlePayment}
              disabled={loading}
              className="w-full h-12 text-lg mb-4"
              size="lg"
            >
              {loading ? "Redirecting..." : "Start Premium Subscription"}
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
