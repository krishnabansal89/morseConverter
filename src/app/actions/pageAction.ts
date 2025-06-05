"use server";

import db from "@/lib/db";
import PageData from "@/lib/models/pageData";
import Slug from "@/lib/models/slugsModel";
import { PageDataType, SlugType } from "@/types/modelsTypes";
const BASE_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export async function updatePageData() {
    await db();

    const pageData: PageDataType | null = await PageData.findOne({ type: "words" });
    if (!pageData) {
        console.error("Page data not found");
        return;
    }
    const slugs: SlugType[] = await Slug.find({}).sort({ createdAt: -1 });
    const incrementedLength = (pageData.totalPages - pageData.currentPosition) < pageData.incrementalSize ? (pageData.totalPages - pageData.currentPosition) : pageData.incrementalSize;
    const slugsToUpdate = slugs.slice(pageData.currentPosition, pageData.currentPosition + incrementedLength);
    if (slugsToUpdate.length === 0) {
        console.log("No slugs to update");
        return;
    }
    for (const slug of slugsToUpdate) {
        const updated = await buildPageData(slug.slug);
        if (updated) {
            console.log(`Page data updated for slug: ${slug.slug}`);
        } else {
            console.error(`Failed to update page data for slug: ${slug.slug}`);
        }
    }
    // Update the current position and last updated time
    pageData.currentPosition += incrementedLength;
    pageData.lastUpdated = new Date();
    await PageData.updateOne({ type: "words" },
        { currentPosition: pageData.currentPosition, lastUpdated: pageData.lastUpdated }
    );
    console.log(`Page data updated. Current position: ${pageData.currentPosition}, Last updated: ${pageData.lastUpdated}`);

}

export async function buildPageData(slugs: string) {
    const response = await fetch(`${BASE_URL}/${slugs}`, {
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
    const existingPageData = await PageData.findOne({ type: "words" });
    if (existingPageData) {
        console.log("Page data already initialized");
        return;
    }

    const initialPageData = {
        type: "words",
        incrementalSize: 10,
        lastUpdated: new Date(),
        currentPosition: 0,
        totalPages: 0
    };

    await PageData.create(initialPageData);
    console.log("Page data initialized successfully");
}

export async function initializeSlugs() {
    await db();
    const existingSlugs = await Slug.find({});
    if (existingSlugs.length > 0) {
        console.log("Slugs already initialized");
        return;
    }

    const initialSlugs = [
  { slug: "i-love-you-in-morse-code", type: "words" },
  { slug: "sos-in-morse-code", type: "words" },
  { slug: "help-in-morse-code", type: "words" },
  { slug: "what-in-morse-code", type: "words" },
  { slug: "hi-in-morse-code", type: "words" },
  { slug: "happy-birthday-in-morse-code", type: "words" },
  { slug: "fuck-you-in-morse-code", type: "words" },
  { slug: "fuck-off-in-morse-code", type: "words" },
  { slug: "help-me-in-morse-code", type: "words" },
  { slug: "yes-in-morse-code", type: "words" },
  { slug: "no-in-morse-code", type: "words" },
  { slug: "i-miss-you-in-morse-code", type: "words" },
  { slug: "stay-in-morse-code", type: "words" },
  { slug: "hello-in-morse-code", type: "words" },
  { slug: "bum-in-morse-code", type: "words" },
  { slug: "stop-in-morse-code", type: "words" },
  { slug: "start-in-morse-code", type: "words" },
  { slug: "bitch-in-morse-code", type: "words" },
  { slug: "morse-code-in-morse-code", type: "words" },
  { slug: "i-like-you-in-morse-code", type: "words" },
  { slug: "kys-in-morse-code", type: "words" },
  { slug: "lily-in-morse-code", type: "words" },
  { slug: "mom-in-morse-code", type: "words" },
  { slug: "dad-in-morse-code", type: "words" },
  { slug: "here-in-morse-code", type: "words" },
  { slug: "thank-you-in-morse-code", type: "words" },
  { slug: "bye-in-morse-code", type: "words" },
  { slug: "near-in-morse-code", type: "words" },
  { slug: "you-in-morse-code", type: "words" },
  { slug: "space-in-morse-code", type: "words" },
  { slug: "dash-in-morse-code", type: "words" },
  { slug: "i-am-sorry-in-morse-code", type: "words" },
  { slug: "sentence-in-morse-code", type: "words" },
  { slug: "question-mark-in-morse-code", type: "words" },
  { slug: "mama-in-morse-code", type: "words" },
  { slug: "love-love-in-morse-code", type: "words" },
  { slug: "sigma-in-morse-code", type: "words" },
  { slug: "kill-me-in-morse", type: "words" },
  { slug: "period-in-morse-code", type: "words" },
  { slug: "dot-in-morse-code", type: "words" },
  { slug: "fuck-cancer-in-morse-code", type: "words" },
  { slug: "clear-in-morse-code", type: "words" },
  { slug: "good-morning-in-morse-code", type: "words" },
  { slug: "good-night-in-morse-code", type: "words" },
  { slug: "kill-yourself-in-morse-code", type: "words" },
  { slug: "forever-in-morse-code", type: "words" },
  { slug: "ryan-in-morse-code", type: "words" },
  { slug: "jesus-in-morse-code", type: "words" },
  { slug: "cqd-in-morse-code", type: "words" },
  { slug: "die-in-morse-code", type: "words" },
  { slug: "comma-in-morse-code", type: "words" },
  { slug: "lol-in-morse-code", type: "words" },
  { slug: "exclamation-in-morse-code", type: "words" },
  { slug: "fuck-the-patriarchy-in-morse-code", type: "words" },
  { slug: "faggot-in-morse-code", type: "words" },
  { slug: "send-help-in-morse-code", type: "words" },
  { slug: "i-hate-you-in-morse-code", type: "words" },
  { slug: "merry-christmas-in-morse-code", type: "words" },
  { slug: "how-are-you-in-morse-code", type: "words" },
  { slug: "poop-in-morse-code", type: "words" },
  { slug: "why-in-morse-code", type: "words" },
  { slug: "me-in-morse-code", type: "words" },
  { slug: "goodbye-in-morse-code", type: "words" },
  { slug: "badass-in-morse-code", type: "words" },
  { slug: "stay-in-morse-code-tattoo", type: "words" },
  { slug: "heart-in-morse-code", type: "words" },
  { slug: "sister-in-morse-code", type: "words" },
  { slug: "anthony-in-morse-code", type: "words" },
  { slug: "apostrophe-in-morse-code", type: "words" },
  { slug: "never-give-up-in-morse-code", type: "words" },
  { slug: "adam-in-morse-code", type: "words" },
  { slug: "goodnight-in-morse-code", type: "words" },
  { slug: "mother-in-morse-code", type: "words" },
  { slug: "my-love-in-morse-code", type: "words" },
  { slug: "family-in-morse-code", type: "words" },
  { slug: "sophia-in-morse-code", type: "words" },
  { slug: "okay-in-morse-code", type: "words" },
  { slug: "base-in-morse-code", type: "words" },
  { slug: "john-in-morse-code", type: "words" },
  { slug: "peace-in-morse-code", type: "words" },
  { slug: "more-in-morse-code", type: "words" },
  { slug: "meow-in-morse-code", type: "words" },
  { slug: "yyz-in-morse-code", type: "words" },
  { slug: "home-in-morse-code", type: "words" },
  { slug: "jacob-in-morse-code", type: "words" },
  { slug: "luke-in-morse-code", type: "words" },
  { slug: "fuck-trump-in-morse-code", type: "words" },
  { slug: "emma-in-morse-code", type: "words" },
  { slug: "chris-in-morse-code", type: "words" },
  { slug: "shut-up-in-morse-code", type: "words" },
  { slug: "sarah-in-morse-code", type: "words" },
  { slug: "tomorrow-in-morse-code", type: "words" },
  { slug: "breathe-in-morse-code", type: "words" },
  { slug: "daniel-in-morse-code", type: "words" },
  { slug: "phrases-in-morse-code", type: "words" },
  { slug: "closing-in-morse-code", type: "words" },
  { slug: "ur-gay-in-morse-code", type: "words" },
  { slug: "soulmate-in-morse-code", type: "words" },
  { slug: "nigger-in-morse-code", type: "words" },
  { slug: "please-help-me-in-morse-code", type: "words" },
  { slug: "yes-and-no-in-morse-code", type: "words" },
  { slug: "warrior-in-morse-code", type: "words" },
  { slug: "faith-in-morse-code", type: "words" },
  { slug: "mww-in-morse-code", type: "words" },
  { slug: "say-it-in-morse-code-jewelry", type: "words" },
  { slug: "jay-in-morse-code", type: "words" },
  { slug: "jayden-in-morse-code", type: "words" },
  { slug: "wake-up-in-morse-code", type: "words" },
  { slug: "daughter-in-morse-code", type: "words" },
  { slug: "joseph-in-morse-code", type: "words" },
  { slug: "david-in-morse-code", type: "words" },
  { slug: "freedom-in-morse-code", type: "words" },
  { slug: "go-fuck-yourself-in-morse-code", type: "words" },
  { slug: "kevin-in-morse-code", type: "words" },
  { slug: "owen-in-morse-code", type: "words" },
  { slug: "red-in-morse-code", type: "words" },
  { slug: "hannah-in-morse-code", type: "words" },
  { slug: "dead-in-morse-code", type: "words" },
  { slug: "dylan-in-morse-code", type: "words" },
  { slug: "robert-in-morse-code", type: "words" },
  { slug: "best-friend-in-morse-code", type: "words" },
  { slug: "samuel-in-morse-code", type: "words" },
  { slug: "believe-in-morse-code", type: "words" },
  { slug: "zoey-in-morse-code", type: "words" },
  { slug: "i-am-strong-in-morse-code", type: "words" },
  { slug: "mason-in-morse-code", type: "words" },
  { slug: "beautiful-in-morse-code", type: "words" },
  { slug: "i-love-you-mom-in-morse-code", type: "words" },
  { slug: "sad-in-morse-code", type: "words" },
  { slug: "torture-in-morse-code", type: "words" },
  { slug: "elijah-in-morse-code", type: "words" },
  { slug: "brandon-in-morse-code", type: "words" },
  { slug: "i-dont-know-in-morse-code", type: "words" },
  { slug: "god-in-morse-code", type: "words" },
  { slug: "until-we-meet-again-in-morse-code", type: "words" },
  { slug: "blue-in-morse-code", type: "words" },
  { slug: "fat-in-morse-code", type: "words" },
  { slug: "jeremy-in-morse-code", type: "words" },
  { slug: "smile-in-morse-code", type: "words" },
  { slug: "happy-valentines-day-in-morse-code", type: "words" },
  { slug: "april-fools-in-morse-code", type: "words" },
  { slug: "mine-in-morse-code", type: "words" },
  { slug: "william-in-morse-code", type: "words" },
  { slug: "im-gonna-kms-in-morse-code", type: "words" },
  { slug: "food-in-morse-code", type: "words" },
  { slug: "bella-in-morse-code", type: "words" },
  { slug: "ella-in-morse-code", type: "words" },
  { slug: "i-want-to-die-in-morse-code", type: "words" },
  { slug: "i-am-enough-in-morse-code", type: "words" },
  { slug: "sean-in-morse-code", type: "words" },
  { slug: "i-miss-him-in-morse-code", type: "words" },
  { slug: "apple-in-morse-code", type: "words" },
  { slug: "shit-in-morse-code", type: "words" },
  { slug: "evan-in-morse-code", type: "words" },
  { slug: "what-hath-god-wrought-in-morse-code", type: "words" },
  { slug: "sam-in-morse-code", type: "words" },
  { slug: "sebastian-in-morse-code", type: "words" },
  { slug: "lucas-in-morse-code", type: "words" },
  { slug: "i-hate-myself-in-morse-code", type: "words" },
  { slug: "ashley-in-morse-code", type: "words" },
  { slug: "cool-in-morse-code", type: "words" },
  { slug: "bruh-in-morse-code", type: "words" },
  { slug: "noah-in-morse-code", type: "words" },
  { slug: "are-you-ok-in-morse-code", type: "words" },
  { slug: "zach-in-morse-code", type: "words" },
  { slug: "penis-in-morse-code", type: "words" },
  { slug: "ligma-balls-in-morse-code", type: "words" },
  { slug: "michael-in-morse-code", type: "words" },
  { slug: "travis-in-morse-code", type: "words" },
  { slug: "i-still-love-you-in-morse-code", type: "words" },
  { slug: "idiot-in-morse-code", type: "words" },
  { slug: "fish-in-morse-code", type: "words" },
  { slug: "kyle-in-morse-code", type: "words" },
  { slug: "isaac-in-morse-code", type: "words" },
  { slug: "dates-in-morse-code", type: "words" },
  { slug: "fuck-it-in-morse-code", type: "words" },
  { slug: "nathan-in-morse-code", type: "words" },
  { slug: "sofia-in-morse-code", type: "words" },
  { slug: "hamster-in-morse-code", type: "words" },
  { slug: "you-suck-in-morse-code", type: "words" },
  { slug: "one-day-at-a-time-in-morse-code", type: "words" },
  { slug: "carter-in-morse-code", type: "words" },
  { slug: "grace-in-morse-code", type: "words" },
  { slug: "eric-in-morse-code", type: "words" },
  { slug: "i-love-you-forever-in-morse-code", type: "words" },
  { slug: "how-to-say-run-in-morse-code", type: "words" },
  { slug: "safe-in-morse-code", type: "words" },
  { slug: "one-last-time-in-morse-code", type: "words" },
  { slug: "monkey-in-morse-code", type: "words" },
  { slug: "mayday-in-morse-code", type: "words" },
  { slug: "joy-in-morse-code", type: "words" },
  { slug: "mark-in-morse-code", type: "words" },
  { slug: "cheese-in-morse-code", type: "words" },
  { slug: "im-bored-in-morse-code", type: "words" },
  { slug: "enough-in-morse-code", type: "words" },
  { slug: "balls-in-morse-code", type: "words" },
  { slug: "sex-in-morse-code", type: "words" },
  { slug: "liam-in-morse-code", type: "words" },
  { slug: "skibidi-in-morse-code", type: "words" },
  { slug: "gavin-in-morse-code", type: "words" },
  { slug: "get-out-in-morse-code", type: "words" },
  { slug: "justin-in-morse-code", type: "words" },
  { slug: "emily-in-morse-code", type: "words" },
  { slug: "ivan-in-morse-code", type: "words" },
  { slug: "go-away-in-morse-code", type: "words" },
  { slug: "carlos-in-morse-code", type: "words" },
  { slug: "star-in-morse-code", type: "words" },
  { slug: "let-them-in-morse-code", type: "words" },
  { slug: "joe-in-morse-code", type: "words" },
  { slug: "time-in-morse-code", type: "words" },
  { slug: "daddy-in-morse-code", type: "words" },
  { slug: "2025-in-morse-code", type: "words" },
  { slug: "promise-in-morse-code", type: "words" },
  { slug: "ok-boomer-in-morse-code", type: "words" },
  { slug: "zachary-in-morse-code", type: "words" },
  { slug: "teacher-in-morse-code", type: "words" },
  { slug: "home-inspectors-in-morse", type: "words" },
  { slug: "locked-out-of-car-in-morse-mill-mo", type: "words" },
  { slug: "black-lives-matter-in-morse-code", type: "words" },
  { slug: "is-strange-in-morse", type: "words" },
  { slug: "babe-in-morse-code", type: "words" },
  { slug: "bible-verses-in-morse-code", type: "words" },
  { slug: "pulp-in-morse-code", type: "words" },
  { slug: "ur-mom-is-gay-in-morse-code", type: "words" },
  { slug: "yolo-in-morse-code", type: "words" },
  { slug: "ohana-in-morse-code", type: "words" },
  { slug: "pog-in-morse-code", type: "words" },
  { slug: "elizabeth-hurley-in-morse", type: "words" },
  { slug: "your-weird-in-morse-code", type: "words" },
  { slug: "nate-in-morse-code", type: "words" },
  { slug: "hoes-mad-in-morse-code", type: "words" },
  { slug: "survivor-in-morse-code", type: "words" },
  { slug: "fighter-in-morse-code", type: "words" },
  { slug: "july-in-morse-code", type: "words" },
  { slug: "christopher-in-morse-code", type: "words" },
  { slug: "timothy-in-morse-code", type: "words" },
  { slug: "aiden-in-morse-code", type: "words" },
  { slug: "call-me-in-morse-code", type: "words" },
  { slug: "calm-in-morse-code", type: "words" },
  { slug: "you-wasted-your-time-in-morse-code", type: "words" },
  { slug: "units-in-morse-code-crossword-clue", type: "words" },
  { slug: "mi-in-morse-code", type: "words" },
  { slug: "marry-me-in-morse-code", type: "words" },
  { slug: "eureka-in-morse-code", type: "words" },
  { slug: "grateful-in-morse-code", type: "words" },
  { slug: "courage-in-morse-code", type: "words" },
  { slug: "insults-in-morse-code", type: "words" },
  { slug: "natalie-in-morse-code", type: "words" },
  { slug: "twin-in-morse-code", type: "words" },
  { slug: "fun-in-morse-code", type: "words" },
  { slug: "frog-in-morse-code", type: "words" },
  { slug: "tea-in-morse-code", type: "words" },
  { slug: "moon-in-morse-code", type: "words" },
  { slug: "happy-mothers-day-in-morse-code", type: "words" },
  { slug: "nerd-in-morse-code", type: "words" },
  { slug: "texting-in-morse-code", type: "words" },
  { slug: "bozo-in-morse-code", type: "words" },
  { slug: "book-in-morse-code", type: "words" },
  { slug: "sus-in-morse-code", type: "words" },
  { slug: "cameron-in-morse-code", type: "words" },
  { slug: "matt-in-morse-code", type: "words" },
  { slug: "dumbass-in-morse-code", type: "words" },
  { slug: "bender-in-morse-code", type: "words" },
  { slug: "cunt-in-morse-code", type: "words" },
  { slug: "summer-in-morse-code", type: "words" },
  { slug: "usa-in-morse-code", type: "words" },
  { slug: "not-free-yet-in-morse-code", type: "words" },
  { slug: "water-in-morse-code", type: "words" },
  { slug: "rain-in-morse-code", type: "words" },
  { slug: "awesome-in-morse-code", type: "words" },
  { slug: "im-here-in-morse-code", type: "words" },
  { slug: "becky-in-morse-code", type: "words" },
  { slug: "coin-in-morse-code", type: "words" }
];


    await Slug.insertMany(initialSlugs);
    console.log("Slugs initialized successfully");
}