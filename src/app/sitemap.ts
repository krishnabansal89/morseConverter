import type { MetadataRoute , } from 'next'

import { blogSlugsForSiteMap } from "@/sanity/queries";
import { client } from "@/sanity/client"

export const revalidate = 86400; // 24 hours

const getBlogPosts = async ()=> {
  const slugs: Array<{slug:string , publishedAt:Date}> = await client.fetch(blogSlugsForSiteMap)
  return slugs
}

const PUBLIC_URL = process.env.NEXT_PUBLIC_URL || "https://www.morsecodeholistic.com"
export default async function sitemap() :Promise<MetadataRoute.Sitemap>{
    const baseUrl = PUBLIC_URL;
    
    // Generate alphabet URLs
    const alphabetUrls:MetadataRoute.Sitemap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({
      url: `${baseUrl}/morse-code-alphabets/${letter.toLowerCase()}-in-morse-code`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));
    
    // Generate number URLs
    const numberUrls:MetadataRoute.Sitemap = '0123456789'.split('').map(number => ({
      url: `${baseUrl}/morse-code-numbers/number-${number}-in-morse-code`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));
    
    // Get blog posts (assuming you have a function to fetch them)
    const blogPosts = await getBlogPosts();
    const blogUrls:MetadataRoute.Sitemap = blogPosts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "weekly",
      priority: 0.9,
    }));
    
    // Language pages
    const languageUrls:MetadataRoute.Sitemap = [
      'de',
      'es',
      'fr',
      'it',
      'pt',
      'ru',
      'tr',
      'vi'
    ].map(lang => ({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
    
    // Static pages
    const staticPages:MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        priority: 1
      },
      {
        url: `${baseUrl}/morse-code-alphabets`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/morse-code-numbers`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
    ];
    
    return [...staticPages, ...alphabetUrls, ...numberUrls, ...blogUrls, ...languageUrls];
  }
