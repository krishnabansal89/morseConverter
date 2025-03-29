import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';


const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId || !dataset) {
    throw new Error('Missing Sanity project ID or dataset. Check .env.local');
}


export const client = createClient({
    projectId: projectId,
    dataset: dataset,
    apiVersion: "2024-01-01",
    useCdn: process.env.NODE_ENV === 'production',
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
    // Check if the source is valid before passing to the builder
    if (!source || !source.asset) {
        // Return a placeholder URL or null, depending on your needs
        // console.warn("Invalid image source:", source);
        return null; // Or return a path to a default placeholder image
    }
    return builder.image(source);
}

export function getDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}