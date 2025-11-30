import { load } from 'cheerio';

export interface BrandInfo {
  logo?: string;
  favicon?: string;
  companyName?: string;
  brandColors?: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
  };
}

export async function detectBrandFromUrl(url: string): Promise<BrandInfo> {
  try {
    // Validate and normalize URL
    const normalizedUrl = normalizeUrl(url);
    
    // Fetch the website HTML
    const response = await fetch(normalizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BrandDetector/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch website: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = load(html);

    const brandInfo: BrandInfo = {};

    // Extract logo/favicon
    brandInfo.logo = extractLogo($, normalizedUrl);
    brandInfo.favicon = extractFavicon($, normalizedUrl);

    // Extract company name
    brandInfo.companyName = extractCompanyName($);

    // Extract social links
    brandInfo.socialLinks = extractSocialLinks($);

    return brandInfo;
  } catch (error) {
    console.error('Error detecting brand:', error);
    throw error;
  }
}

function normalizeUrl(url: string): string {
  // Add https:// if no protocol specified
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  
  // Remove trailing slash
  url = url.replace(/\/$/, '');
  
  return url;
}

function extractLogo($: ReturnType<typeof load>, baseUrl: string): string | undefined {
  // Try Open Graph image
  let logo = $('meta[property="og:image"]').attr('content');
  if (logo) return resolveUrl(logo, baseUrl);

  // Try Twitter image
  logo = $('meta[name="twitter:image"]').attr('content');
  if (logo) return resolveUrl(logo, baseUrl);

  // Try common logo selectors
  const logoSelectors = [
    'img[class*="logo"]',
    'img[id*="logo"]',
    'a[class*="logo"] img',
    '.header img',
    '.navbar img',
  ];

  for (const selector of logoSelectors) {
    const img = $(selector).first();
    const src = img.attr('src');
    if (src) {
      return resolveUrl(src, baseUrl);
    }
  }

  return undefined;
}

function extractFavicon($: ReturnType<typeof load>, baseUrl: string): string | undefined {
  // Try various favicon link tags
  const faviconSelectors = [
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
    'link[rel="apple-touch-icon"]',
  ];

  for (const selector of faviconSelectors) {
    const href = $(selector).attr('href');
    if (href) {
      return resolveUrl(href, baseUrl);
    }
  }

  // Default favicon location
  try {
    const urlObj = new URL(baseUrl);
    return `${urlObj.protocol}//${urlObj.host}/favicon.ico`;
  } catch {
    return undefined;
  }
}

function extractCompanyName($: ReturnType<typeof load>): string | undefined {
  // Try Open Graph site name
  let name = $('meta[property="og:site_name"]').attr('content');
  if (name) return name;

  // Try title tag (clean it up)
  name = $('title').text();
  if (name) {
    // Remove common suffixes
    name = name.split('|')[0].split('-')[0].trim();
    return name;
  }

  // Try meta application name
  name = $('meta[name="application-name"]').attr('content');
  if (name) return name;

  return undefined;
}

function extractSocialLinks($: ReturnType<typeof load>): BrandInfo['socialLinks'] {
  const socialLinks: BrandInfo['socialLinks'] = {};

  // Find all links
  $('a[href]').each((_: number, element: any) => {
    const href = $(element).attr('href');
    if (!href) return;

    // Check for social media patterns
    if (href.includes('linkedin.com/')) {
      socialLinks.linkedin = href;
    } else if (href.includes('twitter.com/') || href.includes('x.com/')) {
      socialLinks.twitter = href;
    } else if (href.includes('github.com/')) {
      socialLinks.github = href;
    } else if (href.includes('facebook.com/')) {
      socialLinks.facebook = href;
    } else if (href.includes('instagram.com/')) {
      socialLinks.instagram = href;
    }
  });

  return socialLinks;
}

function resolveUrl(url: string, baseUrl: string): string {
  try {
    // If already absolute URL, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    // If protocol-relative URL
    if (url.startsWith('//')) {
      return 'https:' + url;
    }

    // Resolve relative URL
    const base = new URL(baseUrl);
    return new URL(url, base.origin).href;
  } catch {
    return url;
  }
}
