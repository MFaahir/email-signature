import { NextResponse } from "next/server";
import { generateTrackingPixelHTML, generateUniqueId } from "@/lib/tracking/pixel-generator";
import { injectTracking } from "@/lib/tracking/html-injector";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const testSignatureId = "test-sig-123";
  const uniqueId = generateUniqueId();
  
  // Test 1: Generate tracking pixel
  const pixel = generateTrackingPixelHTML(testSignatureId, uniqueId);
  
  // Test 2: Inject tracking into sample HTML
  const sampleHtml = `
    <div style="font-family: Arial;">
      <h3>John Doe</h3>
      <p>Software Engineer</p>
      <a href="mailto:john@example.com">Email</a>
      <a href="https://linkedin.com/in/johndoe">LinkedIn</a>
    </div>
  `;
  
  const trackedHtml = injectTracking(sampleHtml, testSignatureId, true);
  
  return NextResponse.json({
    testResults: {
      uniqueId,
      pixelGenerated: !!pixel,
      pixelHtml: pixel,
      trackingInjected: trackedHtml !== sampleHtml,
      originalLength: sampleHtml.length,
      trackedLength: trackedHtml.length,
      trackedHtml: trackedHtml,
      pixelUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/track/open/${testSignatureId}/${uniqueId}`
    }
  });
}
