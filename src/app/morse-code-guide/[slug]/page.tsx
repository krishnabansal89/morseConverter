import MorseConverter from "@/components/home/Translator";
import Breadcrumb from "@/components/breadcrumb";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { FAQSchemaLD } from "@/components/FAQSchemaLD";

export const dynamicParams = true;

// Morse code mapping
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
    ' ': ''
};

// Reverse mapping for morse to character
const morseToCharacterMap: Record<string, string> = Object.entries(characterToMorseMap)
    .reduce((acc, [char, morse]) => {
        if (morse) acc[morse] = char;
        return acc;
    }, {} as Record<string, string>);

// Common tap/dot patterns to showcase


type tParams = Promise<{ slug: string[] }>;

export async function generateMetadata({ params }: { params: tParams }) {
    const { slug } = await params;
    const slugStr = slug as unknown as string;
    
    // Parse slug like "3-taps-morse-code" or "4-dots-morse-code"
    const match = slugStr.match(/^(\d+)-(taps|dots)-morse-code$/);
    if (!match) {
        return {
            title: "Morse Code Signals Explained",
            description: "Learn about Morse code signals and their meanings."
        };
    }
    
    const [, count, type] = match;
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
    
    const title = `What Does ${count} ${capitalizedType} Mean in Morse Code? | Morse Code Signals Explained`;
    const description = `Wondering what ${count} ${type} in Morse code signify? Discover the possible meanings, historical context, and emergency usage of ${count} ${type} in Morse code communication.`;
    
    const PUBLIC_URL = process.env.NEXT_PUBLIC_URL || "";
    
    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
        alternates: {
            canonical: `${PUBLIC_URL}/${slugStr}`,
        },
    };
}

export async function generateStaticParams() {
    return [];
}

function getMorsePattern(count: number): {
    morse: string;
    letter: string | null;
    soundString: string;
} {
    const morse = '.'.repeat(count);
    const letter = morseToCharacterMap[morse] || null;
    const soundString = 'dit '.repeat(count).trim();
    
    return { morse, letter, soundString };
}


export default async function TapsDotsInMorseCodePage({ params }: { params: tParams }) {
    const { slug } = await params;
    const slugStr = slug as unknown as string;
    
    // Parse slug like "3-taps-morse-code" or "4-dots-morse-code"
    const match = slugStr.match(/^(\d+)-(taps|dots)-morse-code$/);
    if (!match) {
        return <div>Invalid URL pattern</div>;
    }
    
    const [, countStr, type] = match;
    const count = parseInt(countStr, 10);
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
    
    const { morse, letter } = getMorsePattern(count);
    
    // Generate dynamic content
    const mainContentMarkdown = `
Morse code is a timeless form of communication used in emergencies, military, and covert messaging. But when someone ${type === 'taps' ? 'taps' : 'uses'} ${count} times—what does it mean? Whether it's for distress, communication, or symbolic messaging, the meaning can vary depending on context. Let's break down the significance of ${count} ${type} in Morse code and what it could be trying to convey.

## Morse Code Basics – How ${capitalizedType} Represent Letters

In Morse code, every letter and number is represented by a series of **dots (short sounds/${type})** and **dashes (long sounds/${type})**. A "${type.slice(0, -1)}" is often considered a dot, especially in improvised Morse code through sound, light, or knocking.

For example:
* **S = ... (three short ${type})**
* **O = --- (three long ${type})**

Together, **SOS = ... --- ...**, a common distress signal.

## What Do ${count} ${capitalizedType} Typically Represent?

When someone uses **${count} short ${type}**, it represents:

${letter ? `* **Letter ${letter}** in Morse code: \`${morse}\`` : `* **Pattern ${morse}** - This pattern doesn't correspond to a standard letter or number`}

${count === 3 ? `* Part of **SOS**: A universal distress call when combined with dashes and more dots.` : ''}

* A **signal** to get attention or to indicate life in emergencies (e.g., trapped person ${type === 'taps' ? 'tapping' : 'signaling'} on a wall).

## ${count} ${capitalizedType} in Survival or Emergency Situations

In survival scenarios or situations like being trapped in a collapsed building or confined space, **${count} distinct ${type}** can be a universal sign for:

* "I'm here" or "Help"
* An attempt to start communication
* Drawing attention in silence

This is why **search and rescue teams** often listen for rhythmic patterns of knocks or ${type}.

## How to Respond to ${count} ${capitalizedType} in Morse Code

If you hear ${count} ${type} and suspect Morse code:

1. **Pause and listen** for repetition or pattern.
2. Respond with **${count} ${type} back** to signal you've received it.
3. If possible, start sending basic Morse letters like **S (...)**, or **YES (-.-- . ...)**.

`;

    const faqMarkdownForPage = `
### **1. ${count === 3 ? `Is ${count} ${type} always Morse code for SOS?` : `What does ${count} ${type} mean in Morse code?`}**

${count === 3 ? `Not necessarily. While \`...\` is the letter S in Morse, ${count} ${type} alone are not a full SOS. It depends on the pattern and context.` : `${count} ${type} represent the pattern \`${morse}\`${letter ? ` which corresponds to the letter **${letter}**` : ` which doesn't correspond to a standard letter`} in Morse code.`}

### **2. What should I do if I hear ${count} ${type} repeatedly?**

Respond with ${count} ${type} and try to establish a rhythm. It could be a call for help or someone attempting communication.

### **3. Can ${type === 'taps' ? 'tapping' : 'dots'} be used as real Morse code?**

Yes. Morse can be adapted using ${type}, lights, or sounds. Timing and rhythm are crucial to convey accurate letters.

### **4. Are ${count} ${type} commonly used in emergency situations?**

${count === 3 ? 'Yes, three taps/dots are particularly significant as they represent the letter S, which is part of the SOS distress signal.' : `${count} ${type} can be used in emergencies, especially when trying to establish communication or signal for help.`}
`;

    return (
        <div className="hero bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none h-fit flex flex-col">
            <div className="md:px-14 flex items-start">
                <Breadcrumb />
            </div>
            <div className="w-full h-fit md:my-20 my-10 grid md:px-10 md:grid-cols-[65%_35%] grid-cols-1 justify-center">
                <div className="flex items-center">
                    <h1 className="xl:text-5xl/relaxed lg:text-4xl/relaxed text-3xl/relaxed font-medium text-[#2d2d2d] tracking-tight md:px-4 font-poppins">
                        What Does {count} {capitalizedType} Mean in Morse Code?
                        <br />
                        <span className="bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text xl:text-4xl/relaxed lg:text-3xl/relaxed text-2xl/relaxed">
                            Morse Code Signals Explained
                        </span>
                    </h1>
                </div>
                <div className="flex-col flex justify-center h-full px-2">
                    <div className="my-4">
                        <p className="text-[#2d2d2d] tracking-tight w-[100%] font-medium text-lg/relaxed font-maitree">
                            Wondering what {count} {type} in Morse code signify? Discover the possible meanings, historical context, and emergency usage of {count} {type} in Morse code communication.
                        </p>
                    </div>
                </div>
            </div>

            <div className="editor-container w-[98%] md:px-4 mx-auto h-fit flex justify-center items-center">
                <div className="editor-window lg:w-4/5 w-full h-[full] bg-white rounded-lg shadow-lg">
                    <MorseConverter initialText={morse} textToMorse={false} />
                </div>
            </div>



            <div className="w-full mx-auto p-4 md:px-10 rounded-lg md:pt-20">
                <Markdown remarkPlugins={[remarkGfm]} components={{
                    strong: ({ children }) => <strong style={{ fontWeight: 'bold' }}>{children}</strong>,
                    h1: ({ children }) => <h1 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium my-6">{children}</h1>,
                    h2: ({ children }) => <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium my-6">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-medium my-4 text-[#2d2d2d]">{children}</h3>,
                    h5: ({ children }) => <div className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium tracking-tight md:px-10">{children}</div>,
                    p: ({ children }) => <p className="mt-2 font-maitree mx-auto text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight">{children}</p>,
                    br: () => <br />,
                    li: ({ children }) => <li className="text-[#2d2d2d] mx-auto list-disc md:ml-10 ml-4 my-2 font-maitree text-lg/relaxed font-extralight">{children}</li>,
                    table: ({ children }) => <table className="table-auto md:w-2/3 w-[90%] mx-auto my-10">{children}</table>,
                    thead: ({ children }) => <thead className="bg-[#456359] text-white">{children}</thead>,
                    tbody: ({ children }) => <tbody>{children}</tbody>,
                    tr: ({ children }) => <tr>{children}</tr>,
                    th: ({ children }) => <th className="px-4 py-2">{children}</th>,
                    td: ({ children }) => <td className="border px-4 py-2">{children}</td>,
                }}>
                    {mainContentMarkdown + `##### **FAQs**` + faqMarkdownForPage}
                </Markdown>
            </div>

            <FAQSchemaLD markup={faqMarkdownForPage} />
        </div>
    );
}