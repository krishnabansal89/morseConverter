"use server";

import db from "@/lib/db";
import PageData from "@/lib/models/pageData";
import Slug from "@/lib/models/slugsModel";
import { PageDataType, SlugType } from "@/types/modelsTypes";
const BASE_URL = "https://morsecodeholistic.com";

const getPath = (type: string) => {
    if (!type) {
        throw new Error("Type is required to build the path");
    }
    if (type === "words") {
        return `${BASE_URL}`;
    }
    if (type === "morse-code-guide") {
        return `${BASE_URL}/morse-code-guide`;
    }
    return `${BASE_URL}`;
};

export async function updatePageData(type: string) {
    await db();

    const pageData: PageDataType | null = await PageData.findOne({ type: type });
    if (!pageData) {
        console.error("Page data not found");
        return;
    }
    const slugs: SlugType[] = await Slug.find({ type: type }).sort({ createdAt: -1 });
    const incrementedLength = (pageData.totalPages - pageData.currentPosition) < pageData.incrementalSize ? (pageData.totalPages - pageData.currentPosition) : pageData.incrementalSize;
    const slugsToUpdate = slugs.slice(pageData.currentPosition, pageData.currentPosition + incrementedLength);
    if (slugsToUpdate.length === 0) {
        console.log("No slugs to update");
        return;
    }
    for (const slug of slugsToUpdate) {
        const path = getPath(slug.type);
        const updated = await buildPageData(path, slug.slug);
        if (updated) {
            console.log(`Page data updated for slug: ${slug.slug}`);
        } else {
            console.error(`Failed to update page data for slug: ${slug.slug}`);
        }
    }
    // Update the current position and last updated time
    pageData.currentPosition += incrementedLength;
    pageData.lastUpdated = new Date();
    await PageData.updateOne({ type: type },
        { currentPosition: pageData.currentPosition, lastUpdated: pageData.lastUpdated }
    );
    console.log(`Page data updated. Current position: ${pageData.currentPosition}, Last updated: ${pageData.lastUpdated}`);

}

export async function buildPageData(path: string , slugs: string) {

    const response = await fetch(`${path}/${slugs}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch page data");
    }

    //Retireve the status and if it is 200 then update the pageData
    if (response.status === 200) {
        return true;
    }
    return false;
}


export async function initializePageData() {
    await db();
    const existingPageData = await PageData.findOne({ type: "morse-code-guide" });
    if (existingPageData) {
        console.log("Page data already initialized");
        return;
    }

    const initialPageData = {
        type: "morse-code-guide",
        incrementalSize: 2,
        lastUpdated: new Date(),
        currentPosition: 0,
        totalPages: 0
    };

    await PageData.create(initialPageData);
    console.log("Page data initialized successfully");
}

export async function initializeSlugs() {
    await db();
    const existingSlugs = await Slug.find({type: "morse-code-guide" });
    if (existingSlugs.length > 0) {
        console.log("Slugs already initialized");
        return;
    }

    const initialSlugs = [
    { slug: "what-does-3-blinks-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-2-blinks-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-4-blinks-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-three-taps-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-4-taps-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-two-taps-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-5-taps-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-dot-dot-dash-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-dot-dash-dot-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-one-dot-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-dot-dash-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-a-dot-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-dot-dot-dot-dash-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-dot-line-dot-dot-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-dash-dot-dash-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-a-dot-sound-like-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-dash-dash-dot-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-dash-dot-dot-dash-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-dot-dash-dot-dot-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-dot-dot-dot-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-2-knocks-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-three-knocks-mean-in-morse-code", type: "morse-code-guide" },
    { slug: "what-does-3-knocks-mean-in-morse-code", type: "morse-code-guide" }
    ];

    await Slug.insertMany(initialSlugs);
    console.log("Slugs initialized successfully");
}