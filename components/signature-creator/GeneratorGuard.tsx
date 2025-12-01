"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignatureCreator } from "@/components/signature-creator/SignatureCreator";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles } from "lucide-react";

export function GeneratorGuard() {
  const [loading, setLoading] = useState(true);
  const [canCreate, setCanCreate] = useState(true);
  const [signatureCount, setSignatureCount] = useState(0);
  const [plan, setPlan] = useState("free");
  const router = useRouter();

  useEffect(() => {
    checkLimit();
  }, []);

  const checkLimit = async () => {
    try {
      const response = await fetch("/api/signatures");
      const data = await response.json();
      
      setPlan(data.plan || "free");
      setSignatureCount(data.count || 0);
      
      // Allow if premium or under limit
      const isPremium = data.plan === "premium" || data.plan === "lifetime";
      const underLimit = data.count < data.limit;
      
      setCanCreate(isPremium || underLimit);
    } catch (error) {
      console.error("Error checking signature limit:", error);
      // Allow on error to avoid blocking users
      setCanCreate(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async () => {
    try {
      const response = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error starting checkout:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!canCreate) {
    return (
      <div className="min-h-screen bg-cream-200 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-cream-300 shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-sage-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Signature Limit Reached
          </h2>
          
          <p className="text-gray-600 mb-2">
            You've created <span className="font-semibold text-sage-600">{signatureCount} signatures</span> on the Free plan.
          </p>
          
          <p className="text-gray-600 mb-6">
            Upgrade to Premium for unlimited signatures and email analytics.
          </p>

          <div className="bg-sage-50 border border-sage-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3 text-left">
              <Sparkles className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-sage-800">
                <p className="font-medium mb-1">Premium Benefits:</p>
                <ul className="space-y-1">
                  <li>✓ Unlimited signatures</li>
                  <li>✓ Email open & click tracking</li>
                  <li>✓ Advanced analytics dashboard</li>
                  <li>✓ Priority support</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleUpgrade}
              className="w-full bg-sage-600 hover:bg-sage-700 text-white"
              size="lg"
            >
              Upgrade to Premium - $4.99/month
            </Button>
            
            <Button 
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="w-full"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <SignatureCreator />;
}
