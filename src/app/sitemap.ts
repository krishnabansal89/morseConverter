import type { MetadataRoute , } from 'next'

import { blogSlugsForSiteMap } from "@/sanity/queries";
import { client } from "@/sanity/client"
import PageData from '@/lib/models/pageData';
import Slug from '@/lib/models/slugsModel';
import connectDB from '@/lib/db';

export const revalidate = 86400; // 24 hours

const getBlogPosts = async ()=> {
  const slugs: Array<{slug:string , publishedAt:Date}> = await client.fetch(blogSlugsForSiteMap)
  return slugs
}

// Export helper function to get allowed words page slugs
export const getWordsPages = async () => {
  await connectDB();
  const words = await Slug.find({ type: 'words' }).sort({ createdAt: -1 });
  if (!words || words.length === 0) {
    console.error("No words found in the database");
    return [];
  }
  const wordsData = await PageData.findOne({ type: 'words' });

  const pages = words.slice(0, 
    wordsData.currentPosition);

  return pages;
}

// Export helper function to get allowed guide page slugs
export const getGuidePages = async () => {
  await connectDB();
  const guides = await Slug.find({ type: 'morse-code-guide' }).sort({ createdAt: -1 });
  if (!guides || guides.length === 0) {
    console.error("No guides found in the database");
    return [];
  }
  const guidesData = await PageData.findOne({ type: 'morse-code-guide' });

  const pages = guides.slice(0,
    guidesData.currentPosition);

  return pages;
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
        url: `${baseUrl}/morse-code-machine`,
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
      {
        url: `${baseUrl}/morse-code-translator-audio`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/morse-code-translator-picture`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/morse-code-punctuation`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/morse-code-tattoo`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/morse-code-keyer`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/morse-code-game`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/morse-code-word`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
    ];

    const wordsPages = await getWordsPages();
    const wordsUrls:MetadataRoute.Sitemap = wordsPages.map(word => ({
      url: `${baseUrl}/${word.slug}`,
      lastModified: new Date(word.createdAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

    const guidePages = await getGuidePages();
    const guideUrls:MetadataRoute.Sitemap = guidePages.map(guide => ({
      url: `${baseUrl}/morse-code-guide/${guide.slug}`,
      lastModified: new Date(guide.createdAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

    return [...staticPages, ...alphabetUrls, ...numberUrls, ...blogUrls, ...languageUrls, ...wordsUrls, ...guideUrls];
  }
