"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
  const router = useRouter();

  const handleSubscribe = async () => {
    if (!userId) {
      router.push("/sign-in?redirect_url=/pricing");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/subscription/create", {
        method: "POST",
      });
      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      await (stripe as any)?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Failed to start subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">Choose the plan that's right for you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
            <div className="text-4xl font-bold text-gray-900 mb-6">
              $0 <span className="text-lg text-gray-500 font-normal">/month</span>
            </div>
            <p className="text-gray-600 mb-8">Perfect for individuals just getting started.</p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>3 Email Signatures</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>All 12 Templates</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Brand Auto-Detection</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span>Basic Support</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <X className="w-5 h-5" />
                <span>Analytics Dashboard</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <X className="w-5 h-5" />
                <span>Unlimited Signatures</span>
              </li>
            </ul>

            <Button variant="outline" className="w-full h-12 text-lg" disabled>
              Current Plan
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="bg-white p-8 rounded-2xl border-2 border-blue-600 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
              Recommended
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
            <div className="text-4xl font-bold text-gray-900 mb-6">
              $4.99 <span className="text-lg text-gray-500 font-normal">/month</span>
            </div>
            <p className="text-gray-600 mb-8">For professionals who want to track results.</p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Unlimited Signatures</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Analytics Dashboard</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-600" />
                <span>Track Opens & Clicks</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-600" />
                <span>Geographic & Device Data</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-600" />
                <span>Priority Support</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-600" />
                <span>Remove Branding</span>
              </li>
            </ul>

            <Button 
              onClick={handleSubscribe} 
              disabled={loading}
              className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Processing..." : "Upgrade to Premium"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
