import { groq } from 'next-sanity'

export const getBlogs =  groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    metaDescription, // Fetch the meta description
    mainImage,       // Fetch the main image object
    "slug": slug.current, // Project the slug string directly
    publishedAt
  }`;

export const blogsQuery = groq`*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    metaDescription, // Include if you want to use it (e.g., for <meta> tags later)
    publishedAt,
    mainImage,
    body, // Fetch the Portable Text content
    faqs, // Fetch the FAQs array
    "slug": slug.current
  }`;


  
