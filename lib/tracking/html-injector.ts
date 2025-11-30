import { generateTrackingPixelHTML, generateUniqueId } from "./pixel-generator";
import { wrapLinkWithTracking } from "./link-tracker";

/**
 * Inject tracking into HTML signature
 * @param html - The original HTML
 * @param signatureId - The ID of the signature
 * @param enableTracking - Whether to enable tracking
 * @returns The HTML with tracking injected
 */
export function injectTracking(
  html: string,
  signatureId: string,
  enableTracking: boolean = false
): string {
  if (!enableTracking) {
    return html;
  }

  const uniqueId = generateUniqueId();
  let trackedHtml = html;

  // Inject tracking pixel at the end
  const trackingPixel = generateTrackingPixelHTML(signatureId, uniqueId);
  trackedHtml = trackedHtml + trackingPixel;

  // Wrap links with tracking
  trackedHtml = wrapLinksInHtml(trackedHtml, signatureId, uniqueId);

  return trackedHtml;
}

/**
 * Wrap all links in HTML with tracking
 * @param html - The HTML content
 * @param signatureId - The ID of the signature
 * @param uniqueId - The unique ID for this instance
 * @returns HTML with tracked links
 */
function wrapLinksInHtml(html: string, signatureId: string, uniqueId: string): string {
  let trackedHtml = html;

  // Track email links
  trackedHtml = trackedHtml.replace(
    /href="mailto:([^"]+)"/g,
    (match, email) => {
      const trackedUrl = wrapLinkWithTracking(`mailto:${email}`, signatureId, "email", uniqueId);
      return `href="${trackedUrl}"`;
    }
  );

  // Track phone links
  trackedHtml = trackedHtml.replace(
    /href="tel:([^"]+)"/g,
    (match, phone) => {
      const trackedUrl = wrapLinkWithTracking(`tel:${phone}`, signatureId, "phone", uniqueId);
      return `href="${trackedUrl}"`;
    }
  );

  // Track website links (but not mailto or tel)
  trackedHtml = trackedHtml.replace(
    /href="(https?:\/\/[^"]+)"/g,
    (match, url) => {
      // Determine link type based on URL
      let linkType = "website";
      if (url.includes("linkedin.com")) linkType = "linkedin";
      else if (url.includes("twitter.com") || url.includes("x.com")) linkType = "twitter";
      else if (url.includes("github.com")) linkType = "github";

      const trackedUrl = wrapLinkWithTracking(url, signatureId, linkType, uniqueId);
      return `href="${trackedUrl}"`;
    }
  );

  return trackedHtml;
}
