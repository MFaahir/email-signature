"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Copy, Check, Eye, MousePointer, Calendar } from "lucide-react";

interface Campaign {
  _id: string;
  name: string;
  description: string;
  uniqueId: string;
  createdAt: string;
}

interface CampaignStats {
  opens: number;
  clicks: number;
}

export function TrackingCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [stats, setStats] = useState<Record<string, CampaignStats>>({});
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [newCampaign, setNewCampaign] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("/api/tracking-campaigns");
      const data = await response.json();
      setCampaigns(data.campaigns || []);
      
      // Fetch stats for each campaign
      data.campaigns?.forEach(async (campaign: Campaign) => {
        const statsRes = await fetch(`/api/tracking-campaigns/${campaign._id}/stats`);
        const statsData = await statsRes.json();
        setStats(prev => ({
          ...prev,
          [campaign._id]: statsData.stats
        }));
      });
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newCampaign.name.trim()) return;

    setCreating(true);
    try {
      const response = await fetch("/api/tracking-campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCampaign),
      });

      if (response.ok) {
        setNewCampaign({ name: "", description: "" });
        setShowDialog(false);
        fetchCampaigns();
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
    } finally {
      setCreating(false);
    }
  };

  const generatePixelCode = (uniqueId: string) => {
    const baseUrl = window.location.origin;
    return `<img src="${baseUrl}/api/track/open/campaign/${uniqueId}" width="1" height="1" style="display:none;opacity:0;visibility:hidden;" alt="" />`;
  };

  const handleCopyPixel = (campaignId: string, uniqueId: string) => {
    const pixelCode = generatePixelCode(uniqueId);
    navigator.clipboard.writeText(pixelCode);
    setCopiedId(campaignId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Email Tracking Campaigns</h2>
          <p className="text-gray-600 mt-1">Create tracking pixels for individual emails or campaigns</p>
        </div>
        
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="bg-sage-600 hover:bg-sage-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Tracking Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">Campaign Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Q4 Sales Outreach"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="e.g., Tracking for quarterly sales emails"
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                />
              </div>
              <Button
                onClick={handleCreate}
                disabled={creating || !newCampaign.name.trim()}
                className="w-full bg-sage-600 hover:bg-sage-700"
              >
                {creating ? "Creating..." : "Create Campaign"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {campaigns.length === 0 ? (
        <Card className="border-cream-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mb-4">
              <Eye className="w-8 h-8 text-sage-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No campaigns yet</h3>
            <p className="text-gray-600 text-center mb-4">
              Create your first tracking campaign to start monitoring email opens
            </p>
            <Button onClick={() => setShowDialog(true)} className="bg-sage-600 hover:bg-sage-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {campaigns.map((campaign) => {
            const campaignStats = stats[campaign._id] || { opens: 0, clicks: 0 };
            
            return (
              <Card key={campaign._id} className="border-cream-300 hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      {campaign.description && (
                        <CardDescription className="mt-1">{campaign.description}</CardDescription>
                      )}
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(campaign.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleCopyPixel(campaign._id, campaign.uniqueId)}
                      variant="outline"
                      size="sm"
                      className="border-sage-300"
                    >
                      {copiedId === campaign._id ? (
                        <>
                          <Check className="w-4 h-4 mr-2 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Pixel
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-cream-100 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">Opens</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{campaignStats.opens}</div>
                    </div>
                    <div className="bg-cream-100 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <MousePointer className="w-4 h-4" />
                        <span className="text-sm">Clicks</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{campaignStats.clicks}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
