import MorseConverter from "@/components/home/Translator"; // Assuming this component exists
import Breadcrumb from "@/components/breadcrumb"; // Assuming this component exists
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { FAQSchemaLD } from "@/components/FAQSchemaLD"; // Assuming this component exists
import { getGuidePages } from "@/app/sitemap";
import { notFound } from "next/navigation";

export const dynamicParams = false; // Only allow pages defined in generateStaticParams

// Morse code mapping (reused)
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
    ' ': '' // Space handling
};

// Reverse map for sequence lookup (Morse to char)
const morseToCharacterMap: Record<string, string> = {};
Object.entries(characterToMorseMap).forEach(([char, code]) => {
    if (code) morseToCharacterMap[code] = char;
});



const numberWordsToNum: Record<string, number> = {
    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, // Add more if needed
};

type tParams = Promise<{ slug: string[] }>;

export async function generateMetadata({ params }: { params: tParams }) {
    const { slug } = await params;
    const fullSlug = (slug as unknown as string).toLowerCase();
    const { query, signalDescriptor } = parseSlug(fullSlug);

    const title = `What Does ${query} Mean in Morse Code? | Morse Code Signals Explained`;
    const description = `Wondering what ${query} in Morse code signify? Discover the possible meanings, historical context, and emergency usage of ${signalDescriptor} in Morse code communication.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_URL || ""}/${fullSlug}`,
        },
    };
}

export async function generateStaticParams() {
    // Only generate params for allowed guide pages from the database
    const guidePages = await getGuidePages();
    return guidePages.map(guide => ({
        slug: guide.slug
    }));
}

// Parse the slug to extract query, num, sequence, type, descriptor
function parseSlug(fullSlug: string): { query: string; num?: number; sequence?: string; signalType?: string; signalDescriptor: string } {
    // Remove common prefixes/suffixes and normalize
    let query = fullSlug
        .replace(/^what-does-/, '')
        .replace(/-mean-in-morse-code$/, '')
        .replace(/-sound-like$/, '') // For "a dot sound like"
        .replace(/-/g, ' ')
        .trim()
        .toLowerCase();

    // Normalize number words
    Object.entries(numberWordsToNum).forEach(([word, n]) => {
        query = query.replace(new RegExp(`\\b${word}\\b`, 'gi'), n.toString());
    });

    // Detect if it's a sequence (contains 'dot', 'dash', 'line')
    const parts = query.split(' ');
    const sequenceParts = parts.map(part => {
        if (['dot', 'a'].includes(part)) return '.';
        if (['dash', 'line'].includes(part)) return '-';
        return part; // For numbers or types
    });

    const signalType = parts.find(p => ['blinks', 'taps', 'knocks', 'dots'].includes(p)) || 'signals';
    let signalDescriptor = signalType === 'signals' ? 'this signal' : `${query.split(' ').slice(0, -1).join(' ')} ${signalType}`; // e.g., "triple tapping"

    if (sequenceParts.every(p => p === '.' || p === '-')) {
        // Pure sequence like "dot dot dash" → "..-"
        const sequence = sequenceParts.join('');
        signalDescriptor = sequence.split('').map(s => s === '.' ? 'short' : 'long').join(' ') + ' signals'; // For meta
        return { query, sequence, signalType, signalDescriptor };
    } else {
        // Count + type like "3 blinks"
        const numStr = parts.find(p => !isNaN(parseInt(p)));
        const num = numStr ? parseInt(numStr) : 1; // Default to 1 for "a dot"
        signalDescriptor = `${query.split(' ').slice(0, -1).join(' ')} ${signalType}ing`; // e.g., "triple tapping"
        return { query, num, signalType, signalDescriptor };
    }
}

// Find matches for count (X dots) or exact sequence
function findMatches(num?: number, sequence?: string): { primaryMatch?: string; primaryCode: string; isExactChar: boolean; additionalNotes: string[] } {
    let primaryMatch: string | undefined;
    let primaryCode = sequence || '.'.repeat(num || 1);
    let isExactChar = false;
    const additionalNotes: string[] = [];

    if (sequence) {
        primaryMatch = morseToCharacterMap[sequence];
        if (primaryMatch) {
            isExactChar = true;
        } else {
            additionalNotes.push('No exact single character match. Could be part of a larger message (e.g., SOS).');
        }
    } else if (num) {
        const dotSequence = '.'.repeat(num);
        primaryMatch = morseToCharacterMap[dotSequence];
        if (primaryMatch) {
            primaryCode = dotSequence;
            isExactChar = true;
        } else {
            additionalNotes.push(`No exact matches for ${num} short signals.`);
        }
    }

    // Common additional notes
    if (primaryCode.startsWith('...')) {
        additionalNotes.push('Part of **SOS**: A universal distress call.');
    }
    additionalNotes.push('A **signal** to get attention or to indicate life in emergencies (e.g., trapped person tapping on a wall).');

    return { primaryMatch, primaryCode, isExactChar, additionalNotes };
}


export default async function SignalsInMorseCodePage({ params }: { params: tParams }) {
    const { slug } = await params;
    const slugString = slug as unknown as string;
    
    // Check if the slug is lowercase, if not return 404
    if (slugString !== slugString.toLowerCase()) {
        notFound();
    }
    
    const fullSlug = slugString.toLowerCase();
    const { query, num, sequence, signalType = 'signals', signalDescriptor } = parseSlug(fullSlug);
    const capitalizedQuery = query.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const { primaryMatch, primaryCode, additionalNotes } = findMatches(num, sequence);

    const countDescriptor = num ? `${query.split(' ')[0]} ${signalType}` : capitalizedQuery.toLowerCase(); // e.g., "three taps"
    const shortLongDescriptor = sequence ? (sequence.split('').every(s => s === '.') ? 'short' : 'mixed short and long') : 'short';
    const exampleSignalType = signalType === 'signals' ? 'signals' : signalType.slice(0, -1); // e.g., "tap" from "taps"

    // Build dynamic markdown sticking closely to the provided structure
    const mainContentMarkdown = `
### What Does ${capitalizedQuery} Mean in Morse Code?

Morse code is a timeless form of communication used in emergencies, military, and covert messaging. But when someone ${signalType} ${query.split(' ')[0]} times—what does it mean? Whether it’s for distress, communication, or symbolic messaging, the meaning can vary depending on context. Let’s break down the significance of ${countDescriptor} in Morse code and what it could be trying to convey.

### Morse Code Basics – How ${signalType.charAt(0).toUpperCase() + signalType.slice(1)} Represent Letters

In Morse code, every letter and number is represented by a series of **dots (short sounds/${signalType})** and **dashes (long sounds/${signalType})**. A "${exampleSignalType}" is often considered a dot, especially in improvised Morse code through sound, light, or knocking.

For example:
* **S = ... (three short ${signalType})**
* **O = --- (three long ${signalType})**  
Together, **SOS = ... --- ...**, a common distress signal.

### What Do ${capitalizedQuery} Typically Represent?

When someone uses **${query.split(' ')[0]} ${shortLongDescriptor} ${signalType}**, it can mean several things:
${primaryMatch ? `* **Letter ${primaryMatch}** in Morse code: \`${primaryCode}\`` : ''}
${additionalNotes.map(note => `* ${note}`).join('\n')}

### ${capitalizedQuery} in Survival or Emergency Situations

In survival scenarios or situations like being trapped in a collapsed building or confined space, **${query.split(' ')[0]} distinct ${signalType}** can be a universal sign for:
* "I’m here" or "Help"
* An attempt to start communication
* Drawing attention in silence

This is why **search and rescue teams** often listen for rhythmic patterns of knocks or ${signalType}.

### How to Respond to ${capitalizedQuery} in Morse Code

If you hear ${query.split(' ')[0]} ${signalType} and suspect Morse code:
1. **Pause and listen** for repetition or pattern.
2. Respond with **${query.split(' ')[0]} ${signalType} back** to signal you've received it.
3. If possible, start sending basic Morse letters like **S (...)**, or **YES (-.-- . ...)**.

##### FAQs 
`;

    // Dynamic FAQs sticking to the structure
    const faqMarkdownForPage = `

### **1. Is ${countDescriptor} always Morse code for SOS?**  

Not necessarily. While \`${primaryCode}\` ${primaryMatch ? `is the letter ${primaryMatch}` : 'may represent a signal'} in Morse, ${countDescriptor} alone are not a full SOS. It depends on the pattern and context.

### **2. What should I do if I hear ${countDescriptor} repeatedly?**  

Respond with ${countDescriptor} and try to establish a rhythm. It could be a call for help or someone attempting communication.

### **3. Can ${signalType.slice(0, -1)}ing be used as real Morse code?**  

Yes. Morse can be adapted using ${signalType}, lights, or sounds. Timing and rhythm are crucial to convey accurate letters.
`;


    return (
        <div className="hero bg-background w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none h-fit flex flex-col">
            <div className="md:px-14 flex items-start">
                <Breadcrumb /> {/* Dynamic breadcrumb */}
            </div>
            <div className="w-full h-fit md:my-20 my-10 grid md:px-10 md:grid-cols-[65%_35%] grid-cols-1 justify-center">
                <div className="flex items-center">
                    <h1 className="xl:text-5xl/relaxed lg:text-4xl/relaxed text-3xl/relaxed font-medium text-foreground tracking-tight md:px-4 font-poppins">
                        What Does {capitalizedQuery} Mean in Morse Code? <br />
                        <span className="bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text xl:text-4xl/relaxed lg:text-3xl/relaxed text-2xl/relaxed">
                            Morse Code Signals Explained
                        </span>
                    </h1>
                </div>
                <div className="flex-col flex justify-center h-full px-2">
                    <div className="my-4">
                        <p className="text-foreground tracking-tight w-[100%] font-medium text-lg/relaxed font-maitree">
                            Wondering what {query} signifies in Morse code? Discover the possible meanings, historical context, and emergency usage of {signalDescriptor} in Morse code communication.
                        </p>
                    </div>
                </div>
            </div>

            <div className="editor-container w-[98%] md:px-4 mx-auto h-fit flex justify-center items-center">
                <div className="editor-window lg:w-4/5 w-full h-[full] bg-card rounded-lg shadow-lg">
                    <MorseConverter initialText={sequence || '.'.repeat(num || 1)} textToMorse={false} /> {/* Show converter with sequence */}
                </div>
            </div>

            <div className="w-full mx-auto p-4 md:px-10 rounded-lg md:pt-20">
                <Markdown remarkPlugins={[remarkGfm]} components={{
                    // strong: ({ children }) => <strong style={{ fontWeight: 'bold' }}>{children}</strong>,
                    h1: ({ children }) => <h1 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">{children}</h1>,
                    h2: ({ children }) => <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-medium my-4 text-foreground">{children}</h3>,
                    h5: ({ children }) => <h1 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-bold   tracking-tight md:px-10 "> {children}</h1>,
                    p: ({ children }) => <p className="mt-2 font-maitree mx-auto text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight">{children}</p>,
                    br: () => <br />,
                    li: ({ children }) => <li className="text-foreground mx-auto list-disc md:ml-10 ml-4 my-2 font-maitree text-lg/relaxed font-extralight">{children}</li>,
                    table: ({ children }) => <table className="table-auto md:w-2/3 w-[90%] mx-auto my-10">{children}</table>,
                    thead: ({ children }) => <thead className="bg-primary text-primary-foreground">{children}</thead>,
                    tbody: ({ children }) => <tbody>{children}</tbody>,
                    tr: ({ children }) => <tr>{children}</tr>,
                    th: ({ children }) => <th className="px-4 py-2">{children}</th>,
                    td: ({ children }) => <td className="border px-4 py-2">{children}</td>,
                }}>
                    {mainContentMarkdown + faqMarkdownForPage}
                </Markdown>
            </div>

            <FAQSchemaLD markup={faqMarkdownForPage} />
        </div>
    );
}
