"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { CreditCard, ExternalLink, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function BillingPage() {
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await fetch("/api/signatures"); // Reusing this to get user plan info
      const data = await response.json();
      setSubscription(data);
    } catch (error) {
      console.error("Error fetching subscription:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleManageSubscription = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/subscription/portal", {
        method: "POST",
      });
      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        alert("Failed to redirect to billing portal");
      }
    } catch (error) {
      console.error("Portal error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const isPremium = subscription?.plan === "premium" || subscription?.plan === "lifetime";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Billing & Subscription</h1>

          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
                  <p className="text-gray-500 mt-1">
                    You are currently on the <span className="font-medium capitalize">{subscription?.plan}</span> plan.
                  </p>
                </div>
                <Badge variant={isPremium ? "default" : "secondary"} className={isPremium ? "bg-blue-600" : ""}>
                  {subscription?.plan?.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid gap-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-md border">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {isPremium ? "Premium Subscription" : "Free Plan"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {isPremium ? "$4.99/month" : "Limited features"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {isPremium ? (
                <Button 
                  onClick={handleManageSubscription} 
                  disabled={loading}
                  className="w-full sm:w-auto"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <ExternalLink className="w-4 h-4 mr-2" />
                  )}
                  Manage Subscription
                </Button>
              ) : (
                <Button 
                  onClick={() => router.push("/pricing")} 
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                >
                  Upgrade to Premium
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
