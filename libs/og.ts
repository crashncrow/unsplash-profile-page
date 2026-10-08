// Recommended size for Open Graph / Twitter large cards (1.91:1)
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

// Unsplash photo URLs accept imgix params, so ask for a crop that fits the
// card instead of letting each platform crop a portrait photo on its own.
const ogImage = (url?: string | null): string | null => {
  if (!url) return null

  try {
    const parsed = new URL(url)
    parsed.searchParams.set('w', String(OG_IMAGE_WIDTH))
    parsed.searchParams.set('h', String(OG_IMAGE_HEIGHT))
    parsed.searchParams.set('fit', 'crop')
    return parsed.toString()
  } catch {
    return null
  }
}

// Base URL of the deployed site. NEXT_PUBLIC_SITE_URL wins (custom domains);
// otherwise use the production domain Vercel exposes to Next.js builds.
// Next only inlines NEXT_PUBLIC_* vars when they are referenced statically.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
const VERCEL_PRODUCTION_HOST = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL

export const pageUrl = (
  path: string,
  base: string | undefined = SITE_URL ||
    (VERCEL_PRODUCTION_HOST ? `https://${VERCEL_PRODUCTION_HOST}` : undefined)
): string | null => {
  if (!base) return null

  try {
    const url = new URL(path.split(/[?#]/)[0], base)
    return url.toString()
  } catch {
    return null
  }
}

export default ogImage
