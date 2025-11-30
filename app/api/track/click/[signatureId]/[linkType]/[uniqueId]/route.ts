import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import AnalyticsEvent from "@/models/AnalyticsEvent";
import Signature from "@/models/Signature";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ signatureId: string; linkType: string; uniqueId: string }> }
) {
  try {
    const { signatureId, linkType, uniqueId } = await params;
    
    // Get the original URL from query params
    const url = request.nextUrl.searchParams.get("url");
    
    if (!url) {
      return NextResponse.json({ error: "Missing URL parameter" }, { status: 400 });
    }

    await connectDB();

    // Get signature to find userId
    const signature = await Signature.findById(signatureId);
    
    if (signature) {
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
        signatureId,
        userId: signature.userId,
        eventType: "click",
        linkType,
        uniqueId,
        ipAddress,
        userAgent,
        device,
        browser,
        os,
      });
    }

    // Redirect to the original URL
    return NextResponse.redirect(decodeURIComponent(url));
  } catch (error) {
    console.error("Error tracking link click:", error);
    
    // Try to redirect to the original URL even on error
    const url = request.nextUrl.searchParams.get("url");
    if (url) {
      return NextResponse.redirect(decodeURIComponent(url));
    }
    
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 });
  }
}
