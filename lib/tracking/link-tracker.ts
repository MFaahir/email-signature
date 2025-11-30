/**
 * Wrap a URL with tracking
 * @param originalUrl - The original destination URL
 * @param signatureId - The ID of the signature
 * @param linkType - The type of link (email, phone, website, etc.)
 * @param uniqueId - A unique identifier for this email instance
 * @returns The tracking URL
 */
export function wrapLinkWithTracking(
  originalUrl: string,
  signatureId: string,
  linkType: string,
  uniqueId: string
): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const trackingUrl = `${baseUrl}/api/track/click/${signatureId}/${linkType}/${uniqueId}`;
  
  // Encode the original URL to preserve it in the query string
  const encodedUrl = encodeURIComponent(originalUrl);
  
  return `${trackingUrl}?url=${encodedUrl}`;
}

/**
 * Extract the original URL from a tracking URL
 * @param trackingUrl - The tracking URL
 * @returns The original URL or null if not found
 */
export function extractOriginalUrl(trackingUrl: string): string | null {
  try {
    const url = new URL(trackingUrl);
    const originalUrl = url.searchParams.get("url");
    return originalUrl ? decodeURIComponent(originalUrl) : null;
  } catch {
    return null;
  }
}
