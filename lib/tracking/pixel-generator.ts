/**
 * Generate a tracking pixel URL for email open tracking
 * @param signatureId - The ID of the signature
 * @param uniqueId - A unique identifier for this email instance
 * @returns The tracking pixel URL
 */
export function generateTrackingPixel(signatureId: string, uniqueId: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${baseUrl}/api/track/open/${signatureId}/${uniqueId}`;
}

/**
 * Generate the HTML for a tracking pixel
 * @param signatureId - The ID of the signature
 * @param uniqueId - A unique identifier for this email instance
 * @returns HTML string for the tracking pixel
 */
export function generateTrackingPixelHTML(signatureId: string, uniqueId: string): string {
  const pixelUrl = generateTrackingPixel(signatureId, uniqueId);
  return `<img src="${pixelUrl}" alt="" width="1" height="1" style="display:block;width:1px;height:1px;border:0;opacity:0;" />`;
}

/**
 * Generate a unique ID for tracking
 * @returns A unique tracking ID
 */
export function generateUniqueId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
