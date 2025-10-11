import type { MetadataRoute } from 'next'
import { getPublicUrl } from '@/lib/env'

const PUBLIC_URL = getPublicUrl()

export default function robots(): MetadataRoute.Robots {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: `${PUBLIC_URL}/sitemap.xml`,
    };
  }
  