import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import AnalyticsEvent from "@/models/AnalyticsEvent";
import TrackingCampaign from "@/models/TrackingCampaign";

// 1x1 transparent GIF
const TRANSPARENT_GIF = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64"
);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ uniqueId: string }> }
) {
  try {
    const { uniqueId } = await params;

    await connectDB();

    // Find campaign by uniqueId
    const campaign = await TrackingCampaign.findOne({ uniqueId });
    
    if (!campaign) {
      // Still return the pixel even if campaign not found
      return new NextResponse(TRANSPARENT_GIF, {
        headers: {
          "Content-Type": "image/gif",
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      });
    }

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

    // Create analytics event
    await AnalyticsEvent.create({
      signatureId: null, // Campaign tracking doesn't use signatureId
      userId: campaign.userId,
      eventType: "open",
      uniqueId,
      ipAddress,
      userAgent,
      device,
      browser,
      os,
    });

    // Return 1x1 transparent GIF
    return new NextResponse(TRANSPARENT_GIF, {
      headers: {
        "Content-Type": "image/gif",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Error tracking campaign open:", error);
    
    // Always return the pixel, even on error
    return new NextResponse(TRANSPARENT_GIF, {
      headers: {
        "Content-Type": "image/gif",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  }
}
