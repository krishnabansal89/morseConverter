import MorseConverter from "@/components/home/Translator"; // Assuming this component exists
import Breadcrumb from "@/components/breadcrumb"; // Assuming this component exists
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { FAQSchemaLD } from "@/components/FAQSchemaLD"; // Assuming this component exists

// Morse code mapping (from your provided file)
const characterToMorseMap: Record<string, string> = {
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '.': '.-.-.-', ',': '--..--', '?': '..--..',
    "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
    '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
    ' ': '' // Note: ' ' maps to empty, specific logic below handles word separation with '/'
};

// Predefined list of phrases for static generation and "Explore" section
const PREDEFINED_PHRASES = ["Hi", "Hello", "SOS", "Love", "Thank You", "Help", "Yes", "No", "Good Bye", "OpenAI"];

type tParams = Promise<{ slug: string[] }>;


export async function generateMetadata({ params }: { params: tParams }) {
    const { slug } = await params;
    
    const phrase = slug[0].replace(/-in-morse-code$/, '').replace(/-/g, ' ');
    const capitalizedPhrase = phrase.charAt(0).toUpperCase() + phrase.slice(1);
    const PUBLIC_URL = process.env.NEXT_PUBLIC_URL || "";

    // Using the title and description format from your markdown example
    const title = `${capitalizedPhrase} in Morse Code – Simple Guide for Beginners`;
    const description = `Learn how to say “${capitalizedPhrase}” in Morse code with this beginner-friendly guide. Discover its meaning, structure, and how to use it in creative or practical ways.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
        alternates: {
            canonical: `${PUBLIC_URL}/${slug[0]}`, // Adjust path if needed
        },
    };
}

export async function generateStaticParams() {
    return PREDEFINED_PHRASES.map(phrase => ({
        slug: `${phrase.toLowerCase().replace(/\s+/g, '-')}-in-morse-code`
    }));
}

function getMorseAndSoundForPhrase(phrase: string, map: Record<string, string>): {
    morseString: string; // e.g., ".... .."
    characterBreakdownMarkdown: string; // Markdown list, e.g., "* **H** = `....`\n* **I** = `..`"
    soundString: string; // e.g., "dit-dit-dit-dit dit-dit"
} {
    const phraseNormalized = phrase.toUpperCase();
    const morseParts: string[] = [];
    const breakdownLines: string[] = [];
    const soundPerLetter: string[] = [];

    for (let i = 0; i < phraseNormalized.length; i++) {
        const char = phraseNormalized[i];
        if (char === ' ') {
            // Add word separator if it's a meaningful space between words
            if (morseParts.length > 0 && morseParts[morseParts.length - 1] !== '/') {
                morseParts.push('/');
                soundPerLetter.push('/');
            }
        } else if (map[char]) {
            const charMorse = map[char];
            morseParts.push(charMorse);
            // Add character and its Morse code to breakdown
            breakdownLines.push(`* **${char}** = \`${charMorse}\``);
            
            const charSound = charMorse.split('').map(signal => (signal === '.' ? 'dit' : 'dah')).join('-');
            soundPerLetter.push(charSound);
        } else {
            // Handle unknown characters if necessary
            breakdownLines.push(`* **${char}** = Not Found in Morse Map`);
        }
    }

    // Join Morse parts with spaces, ensuring single spaces around '/' for word separation
    let finalMorseString = morseParts.join(' ').replace(/\s*\/\s*/g, ' / ').trim();
    // Join sound parts similarly
    let finalSoundString = soundPerLetter.join(' ').replace(/\s*\/\s*/g, ' / ').trim();
    
    // Ensure no leading/trailing slashes if the phrase starts/ends with spaces (already handled by trim)
    // or if the phrase was only spaces.
    if (finalMorseString === '/' || finalMorseString === ' /') finalMorseString = '';
    if (finalSoundString === '/' || finalSoundString === ' /') finalSoundString = '';


    return {
        morseString: finalMorseString,
        characterBreakdownMarkdown: breakdownLines.join('\n'),
        soundString: finalSoundString,
    };
}


function getPopularPhrases(allPhrases: string[], currentPhrase: string, count: number = 6): string[] {
    return allPhrases
        .filter(p => p.toLowerCase() !== currentPhrase.toLowerCase()) // Exclude current phrase
        .sort(() => 0.5 - Math.random()) // Basic shuffle for variety
        .slice(0, count);
}

export default async function PhraseInMorseCodePage({ params }: { params: tParams }) {
    const { slug } = (await params);
    const phrase = slug[0].replace(/-in-morse-code$/, '').replace(/-/g, ' ');
    const capitalizedPhrase = phrase.charAt(0).toUpperCase() + phrase.slice(1);

    const { morseString, characterBreakdownMarkdown, soundString } = getMorseAndSoundForPhrase(phrase, characterToMorseMap);

    // Keywords for the template
    const keyword0 = phrase; // e.g., "hi"
    // const keyword1 = `"${capitalizedPhrase}" in morse code`; // Used in H1 and meta
    const keyword2_markdown = characterBreakdownMarkdown; // Markdown list of char=morse
    const keyword3 = soundString; // dit-dah representation

    const popularPhrasesToDisplay = getPopularPhrases(PREDEFINED_PHRASES, phrase, 6);

    // Dynamic content generation based on your template and output example
    const mainContentMarkdown = `


Morse code is a method of encoding text characters as sequences of dots and dashes. Each letter or number is represented by a unique combination, making it a compact and universal form of communication. Even in today’s digital world, where messaging apps and emails dominate, Morse code remains a fascinating, minimalist way to convey messages.

So, how do you say **“${capitalizedPhrase}”** in Morse code?

Let’s break it down:

${keyword2_markdown}

Put together, **“${capitalizedPhrase}”** in Morse code is:

**${morseString}**

That’s ${morseString.replace(/[\s/]/g, "").length} ${morseString.replace(/[\s/]/g, "").length === 1 ? "signal" : "signals"} in total. When tapping, blinking, or sounding it out, it would be a rhythmic: **${keyword3}**.

## Why Learn "${capitalizedPhrase}" in Morse Code?

While "${capitalizedPhrase}" is ${phrase.length <= 4 ? "a short and common phrase" : "one of many useful phrases"}, knowing how to express it in Morse code is a ${phrase.length <= 4 ? "fun and practical entry point" : "valuable skill"} into this timeless system of communication. It’s ${phrase.length <= 4 ? "often one of the first phrases beginners learn" : "a good phrase to add to your repertoire"}, and a ${phrase.length <= 4 ? "friendly signal" : "clear message"} in many contexts.

Whether you’re learning Morse code for hobbyist reasons, survival preparedness, or integrating it into digital projects, understanding "${capitalizedPhrase}" helps build your foundation by demonstrating how individual letter codes combine to form meaningful messages.

## Practical Uses

*   **Intro to Morse**: Learning **${keyword0}** gives you a foundation to expand your Morse vocabulary.
*   **Creative Communication**: Say **${keyword0}** with lights, sounds, vibrations, or even through design elements.
*   **Digital Tools**: Some productivity and communication apps now use Morse-style encoding for fun or accessibility—knowing **${keyword0}** can spark curiosity to explore further.

Even if you never use Morse code in an emergency or practical setting, understanding simple words and phrases like **${keyword0}** builds a connection to one of the oldest forms of long-distance communication.
`;

    

    // Generating FAQ markdown for the page and for SchemaLD
    const faqMarkdownForPage = `### **1\. How do I practice sending "${capitalizedPhrase}" in Morse code?**  

Use a flashlight, tapping surface, or Morse code app. Practice the sequence of dots and dashes for each letter in "${capitalizedPhrase}", then combine them with appropriate pauses: a short pause between signals of the same letter (if any), a medium pause between letters, and a longer pause between words (represented as '${soundString.includes('/') ? '/' : 'a longer pause'}' in our sound example).

### **2\. Is "${capitalizedPhrase}" a good word to start learning Morse code?**  

Absolutely. It's short, repetitive, and teaches you the basic rhythm of dots and spacing.

### **3\. Can Morse code be used on modern websites or tools?**  

Yes. Many web tools and coding platforms allow Morse-based design elements or interactive learning features.`
    

    // H1 based on your output example for "Hi"
    

    return (
        <div className="hero bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none h-fit flex flex-col">
            <div className="md:px-14 flex items-start">
                <Breadcrumb /> {/* Assuming Breadcrumb component handles dynamic path */}
            </div>
            <div className="w-full h-fit md:my-20 my-10 grid md:px-10 md:grid-cols-[65%_35%] grid-cols-1 justify-center">
                <div className="flex  items-center  ">
                    <h1 className="xl:text-5xl/relaxed lg:text-4xl/relaxed  text-3xl/relaxed  font-medium text-[#2d2d2d]  tracking-tight md:px-4 font-poppins">What is {capitalizedPhrase} in Morse Code ?   <br></br> <span className="bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text xl:text-4xl/relaxed lg:text-3xl/relaxed  text-2xl/relaxed "> Simple Guide for Beginners </span></h1>
                </div>
                <div className="flex-col flex justify-center h-full px-2">
                    <div className="my-4">
                        {/* Description for the hero section - can be derived from metadata or customized */}
                        <p className="text-[#2d2d2d] tracking-tight w-[100%] font-medium   text-lg/relaxed font-maitree ">
                            Learn how to say “{capitalizedPhrase}” in Morse code with this beginner-friendly guide. Discover its meaning, structure, and how to use it in creative or practical ways.
                        </p>
                    </div>
                </div>
            </div>

            <div className="editor-container w-[98%] md:px-4 mx-auto h-fit flex justify-center items-center">
                <div className="editor-window lg:w-4/5 w-full h-[full] bg-white rounded-lg shadow-lg">
                    <MorseConverter initialText={phrase} textToMorse={true} /> {/* Pass the phrase */}
                </div>
            </div>
                        {popularPhrasesToDisplay.length > 0 && (
                <div className="md:mt-20 mt-10">
                    <h2 className="md:text-4xl/snug text-3xl/snug bg-gradient-to-r mx-auto from-green-500 to-teal-900 text-transparent bg-clip-text font-medium text-center md:mb-12 mb-8 tracking-tight md:px-10 font-poppins">
                        Explore Other Common Phrases
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 w-[98%] p-4 md:px-10 mx-auto gap-4 ">
                        {popularPhrasesToDisplay.map((p) => (
                            <Link
                                key={p}
                                href={`/${p.toLowerCase().replace(/\s+/g, '-')}-in-morse-code`} // Adjust path if needed
                                className="border-2 border-gray-300 px-4 py-3 font-semibold text-[#2d2d2d] font-maitree text-center rounded-md hover:bg-gray-100 transition-colors"
                            >
                                {p} in Morse Code
                            </Link>
                        ))}
                    </div>
                </div>
            )}

                <div className=" w-full  mx-auto p-4 md:px-10 rounded-lg md:pt-20">
                    <Markdown remarkPlugins={[remarkGfm]} components={{
                        strong: ({ children }) => <strong style={{ fontWeight: 'bold' }}>{children}</strong>,
                        h1: ({ children }) => <h1 className="md:text-2xl/relaxed text-xl/relaxed  text-[#2d2d2d] font-medium  my-6   ">{children}</h1>,
                        h2: ({ children }) => <h2 className="md:text-2xl/relaxed text-xl/relaxed  text-[#2d2d2d] font-medium  my-6   ">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xl  font-medium my-4 text-[#2d2d2d]">{children}</h3>,
                        h5: ({ children }) => <div className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 "> {children}</div>,

                        p: ({ children }) => <p className="mt-2 font-maitree  mx-auto  text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight">{children}</p>,
                        br: () => <br />,
                        li: ({ children }) => <li className="text-[#2d2d2d]  mx-auto list-disc md:ml-10 ml-4 my-2 font-maitree  text-lg/relaxed font-extralight">{children}</li>,
                        table: ({ children }) => <table className="table-auto md:w-2/3 w-[90%] mx-auto my-10">{children}</table>,
                        thead: ({ children }) => <thead className="bg-[#456359] text-white">{children}</thead>,
                        tbody: ({ children }) => <tbody>{children}</tbody>,
                        tr: ({ children }) => <tr className="  ">{children}</tr>,
                        th: ({ children }) => <th className="px-4 py-2">{children}</th>,
                        td: ({ children }) => <td className="border px-4 py-2">{children}</td>,


                    }} >{mainContentMarkdown + `##### **FAQs** ` + faqMarkdownForPage}</Markdown>
                </div>
            


            <FAQSchemaLD markup={faqMarkdownForPage} /> {/* Pass structured FAQ data */}
        </div>
    );
}

