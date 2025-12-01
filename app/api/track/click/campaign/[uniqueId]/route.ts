import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import AnalyticsEvent from "@/models/AnalyticsEvent";
import TrackingCampaign from "@/models/TrackingCampaign";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ uniqueId: string }> }
) {
  try {
    const { uniqueId } = await params;
    const url = new URL(request.url);
    const destinationUrl = url.searchParams.get("url") || "/";

    await connectDB();

    // Find campaign by uniqueId
    const campaign = await TrackingCampaign.findOne({ uniqueId });
    
    if (campaign) {
      // Extract user agent and IP
      const userAgent = request.headers.get("user-agent") || "unknown";
      const forwarded = request.headers.get("x-forwarded-for");
      const ipAddress = forwarded ? forwarded.split(",")[0] : "unknown";

      // Parse device type from user agent
      let device = "unknown";
      if (userAgent.toLowerCase().includes("mobile")) {
        device = "mobile";
      } else if (userAgent.toLowerCase().includes("tablet")) {
        device = "tablet";
      } else if (userAgent.toLowerCase().includes("mozilla")) {
        device = "desktop";
      }

      // Parse browser
      let browser = "unknown";
      if (userAgent.includes("Chrome")) browser = "Chrome";
      else if (userAgent.includes("Firefox")) browser = "Firefox";
      else if (userAgent.includes("Safari")) browser = "Safari";
      else if (userAgent.includes("Edge")) browser = "Edge";

      // Parse OS
      let os = "unknown";
      if (userAgent.includes("Windows")) os = "Windows";
      else if (userAgent.includes("Mac")) os = "macOS";
      else if (userAgent.includes("Linux")) os = "Linux";
      else if (userAgent.includes("Android")) os = "Android";
      else if (userAgent.includes("iOS")) os = "iOS";

      // Create analytics event for click
      await AnalyticsEvent.create({
        signatureId: null,
        userId: campaign.userId,
        eventType: "click",
        linkType: "campaign-link",
        uniqueId,
        ipAddress,
        userAgent,
        device,
        browser,
        os,
      });
    }

    // Redirect to destination URL
    return NextResponse.redirect(destinationUrl);
  } catch (error) {
    console.error("Error tracking campaign click:", error);
    
    // Still redirect even on error
    const url = new URL(request.url);
    const destinationUrl = url.searchParams.get("url") || "/";
    return NextResponse.redirect(destinationUrl);
  }
}
