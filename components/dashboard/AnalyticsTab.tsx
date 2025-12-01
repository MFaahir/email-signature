"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, MousePointer, Eye, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { TrackingCampaigns } from "@/components/tracking/TrackingCampaigns";

interface AnalyticsData {
  totalViews: number;
  totalClicks: number;
  ctr: number;
  topSignature?: {
    name: string;
    views: number;
    clicks: number;
  };
  recentActivity: {
    date: string;
    views: number;
    clicks: number;
  }[];
}

interface AnalyticsTabProps {
  initialView?: "overview" | "campaigns";
}

export function AnalyticsTab({ initialView = "overview" }: AnalyticsTabProps) {
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [activeView, setActiveView] = useState<"overview" | "campaigns">(initialView);
  const router = useRouter();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // First check user plan
      const userRes = await fetch("/api/signatures");
      const userData = await userRes.json();
      
      const premium = userData.plan === "premium" || userData.plan === "lifetime";
      setIsPremium(premium);

      if (premium) {
        // Fetch real analytics data
        const analyticsRes = await fetch("/api/analytics/summary");
        if (analyticsRes.ok) {
          const analyticsData = await analyticsRes.json();
          setData(analyticsData);
        }
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
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
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error("Error starting checkout:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-600"></div>
      </div>
    );
  }

  if (!isPremium) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-cream-300 bg-white shadow-sm">
        {/* Blurred Content Preview */}
        <div className="p-6 filter blur-sm opacity-50 pointer-events-none select-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-cream-50 border-cream-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">1,234</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="h-64 bg-cream-50 rounded-lg border border-cream-200"></div>
        </div>

        {/* Upgrade Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
          <div className="text-center max-w-md p-6">
            <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-sage-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Unlock Analytics</h3>
            <p className="text-gray-600 mb-6">
              Track who opens your emails and clicks your links. Get insights to improve your signature's performance.
            </p>
            <Button onClick={handleUpgrade} size="lg" className="bg-sage-600 hover:bg-sage-700 text-white">
              Upgrade to Premium
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const maxViews = data?.recentActivity && data.recentActivity.length > 0
    ? Math.max(...data.recentActivity.map(d => d.views))
    : 1;

  return (
    <div className="space-y-6">
      {/* Content */}
      {activeView === "campaigns" ? (
        <TrackingCampaigns />
      ) : (
        <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-cream-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-sage-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data?.totalViews || 0}</div>
            <p className="text-xs text-gray-500 mt-1">Email opens tracked</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-cream-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-sage-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data?.totalClicks || 0}</div>
            <p className="text-xs text-gray-500 mt-1">Link clicks tracked</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-cream-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Click Rate</CardTitle>
            <Activity className="h-4 w-4 text-sage-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data?.ctr.toFixed(1) || 0}%</div>
            <p className="text-xs text-gray-500 mt-1">Clicks per view</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-cream-200 shadow-sm">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Performance over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          {data?.recentActivity && data.recentActivity.length > 0 ? (
            <div className="h-[300px] w-full flex items-end justify-between gap-2 pt-4">
              {data.recentActivity.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                  <div className="w-full bg-cream-100 rounded-t-sm relative h-full flex items-end">
                    <div 
                      className="w-full bg-sage-500/80 hover:bg-sage-600 transition-colors rounded-t-sm"
                      style={{ height: `${Math.max((day.views / maxViews) * 100, 4)}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-gray-400 rotate-45 origin-left translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-0 left-1/2">
                    {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-400">
              No activity recorded yet
            </div>
          )}
        </CardContent>
      </Card>
        </>
      )}
    </div>
  );
}
