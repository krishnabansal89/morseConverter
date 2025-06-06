import type { MetadataRoute } from 'next'

const PUBLIC_URL = process.env.NEXT_PUBLIC_URL || "https://www.morsecodeholistic.com"

export default function robots(): MetadataRoute.Robots {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: `${PUBLIC_URL}/sitemap.xml`,
    };
  }
  