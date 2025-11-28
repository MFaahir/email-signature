"use client";

import { Button } from "@/components/ui/button";
import { CreditCard, Lock, Sparkles } from "lucide-react";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export function PaymentGate() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Unlock Email Signature Generator
          </h2>
          <p className="text-gray-600">
            Get lifetime access for a one-time payment
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
          <div className="flex items-baseline justify-center mb-4">
            <span className="text-5xl font-bold text-gray-900">$5</span>
            <span className="text-gray-600 ml-2">one-time</span>
          </div>
          <p className="text-center text-sm text-gray-600">
            Lifetime access • No recurring fees
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              Create unlimited professional email signatures
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              Choose from 3 beautiful templates
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              Download as HTML or PDF
            </p>
          </div>
        </div>

        <Button
          onClick={handlePayment}
          disabled={loading}
          className="w-full h-12 text-lg"
          size="lg"
        >
          {loading ? (
            "Redirecting..."
          ) : (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              Pay $5 Now
            </>
          )}
        </Button>

        <p className="text-xs text-center text-gray-500 mt-4">
          Secure payment powered by Stripe
        </p>
      </div>
    </div>
  );
}
