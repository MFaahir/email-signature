"use client";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SignatureList } from "@/components/dashboard/SignatureList";
import { useState } from "react";
import { AnalyticsTab } from "@/components/dashboard/AnalyticsTab";
import { Button } from "@/components/ui/button";
import { BarChart3, FileSignature, Settings, CreditCard } from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("signatures");

  const tabs = [
    { id: "signatures", label: "My Signatures", icon: FileSignature },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-cream-200">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your email signatures and track performance.</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border border-cream-300 shadow-sm mb-6">
          <div className="border-b border-cream-300">
            <nav className="flex -mb-px overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "border-sage-600 text-sage-700 bg-sage-50"
                        : "border-transparent text-gray-600 hover:text-gray-800 hover:border-sage-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "signatures" && <SignatureList />}
            {activeTab === "analytics" && <AnalyticsTab />}
            {activeTab === "settings" && <SettingsTab />}
            {activeTab === "billing" && <BillingTab />}
          </div>
        </div>
      </main>
    </div>
  );
}



// Settings Tab Component
function SettingsTab() {
  return (
    <div className="max-w-2xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
      
      <div className="space-y-4">
        <div className="bg-cream-100 p-6 rounded-xl border border-cream-300 hover:shadow-sm transition-shadow">
          <h4 className="font-medium text-gray-900 mb-2">Profile Information</h4>
          <p className="text-sm text-gray-600">
            Manage your account details and preferences.
          </p>
        </div>

        <div className="bg-cream-100 p-6 rounded-xl border border-cream-300 hover:shadow-sm transition-shadow">
          <h4 className="font-medium text-gray-900 mb-2">Notifications</h4>
          <p className="text-sm text-gray-600">
            Configure email notifications and alerts.
          </p>
        </div>

        <div className="bg-cream-100 p-6 rounded-xl border border-cream-300 hover:shadow-sm transition-shadow">
          <h4 className="font-medium text-gray-900 mb-2">Privacy & Security</h4>
          <p className="text-sm text-gray-600">
            Manage your privacy settings and security options.
          </p>
        </div>
      </div>
    </div>
  );
}

// Billing Tab Component
function BillingTab() {
  return (
    <div className="max-w-2xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing & Subscription</h3>
      
      <div className="bg-white rounded-xl border border-cream-300 p-6 mb-6 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">Current Plan</h4>
            <p className="text-gray-600 mt-1">You are currently on the Free plan.</p>
          </div>
          <span className="px-3 py-1 bg-cream-200 text-gray-700 rounded-full text-sm font-medium">
            FREE
          </span>
        </div>

        <div className="grid gap-4 mb-6">
          <div className="flex justify-between items-center p-4 bg-cream-100 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg border border-cream-300">
                <CreditCard className="w-5 h-5 text-sage-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Free Plan</div>
                <div className="text-sm text-gray-600">3 signatures limit</div>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={async () => {
            try {
              const response = await fetch("/api/checkout/create-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
              });
              const data = await response.json();
              if (data.url) window.location.href = data.url;
            } catch (error) {
              console.error("Error starting checkout:", error);
            }
          }}
          className="w-full sm:w-auto bg-sage-600 hover:bg-sage-700 text-white shadow-sm"
          size="lg"
        >
          Upgrade Now - $4.99/month
        </Button>
      </div>

      <div className="bg-sage-50 border border-sage-200 rounded-xl p-6">
        <h4 className="font-medium text-sage-900 mb-3">Premium Benefits</h4>
        <ul className="text-sm text-sage-800 space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-sage-600">✓</span>
            <span>Unlimited signatures</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-sage-600">✓</span>
            <span>Email analytics & tracking</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-sage-600">✓</span>
            <span>Advanced insights</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-sage-600">✓</span>
            <span>Priority support</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
