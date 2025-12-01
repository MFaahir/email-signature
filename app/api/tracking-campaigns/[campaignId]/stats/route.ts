import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import AnalyticsEvent from "@/models/AnalyticsEvent";
import TrackingCampaign from "@/models/TrackingCampaign";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ campaignId: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { campaignId } = await params;

    await connectDB();

    // Verify campaign belongs to user
    const campaign = await TrackingCampaign.findById(campaignId);

    if (!campaign || campaign.userId !== userId) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    // Get all events for this campaign's uniqueId
    const events = await AnalyticsEvent.find({ uniqueId: campaign.uniqueId })
      .sort({ createdAt: -1 })
      .lean();

    const opens = events.filter(e => e.eventType === "open").length;
    const clicks = events.filter(e => e.eventType === "click").length;

    return NextResponse.json({
      campaign: {
        _id: campaign._id,
        name: campaign.name,
        description: campaign.description,
        uniqueId: campaign.uniqueId,
        createdAt: campaign.createdAt,
      },
      stats: {
        opens,
        clicks,
        events: events.map(e => ({
          eventType: e.eventType,
          linkType: e.linkType,
          device: e.device,
          browser: e.browser,
          os: e.os,
          country: e.country,
          city: e.city,
          createdAt: e.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching campaign stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch campaign stats" },
      { status: 500 }
    );
  }
}
