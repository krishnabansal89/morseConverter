/**
 * Environment configuration for handling different deployment environments
 */

export const MAIN_DOMAIN = "https://morsecodeholistic.com";
export const MAIN_DOMAIN_WWW = "https://www.morsecodeholistic.com";

/**
 * Get the public URL based on environment
 * - Production: uses main domain
 * - Vercel Preview/Development: uses VERCEL_URL or localhost
 */
export function getPublicUrl(): string {
  // Always use main domain for canonical URLs and meta tags
  return MAIN_DOMAIN;
}

/**
 * Check if running on Vercel preview deployment
 */
export function isVercelPreview(): boolean {
  return (
    process.env.VERCEL === "1" &&
    process.env.VERCEL_ENV !== "production"
  );
}

/**
 * Get current deployment URL (for reference only, not for canonical)
 */
export function getCurrentUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return MAIN_DOMAIN;
}

