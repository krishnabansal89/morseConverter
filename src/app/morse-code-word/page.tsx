import { getWordsPages } from "@/app/sitemap";  
import { WordGlossary } from "./anchorTags";
import { SlugType } from "@/types/modelsTypes";
import Breadcrumb from "@/components/breadcrumb"; // Assuming this component exists
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { FAQSchemaLD } from "@/components/FAQSchemaLD"; // Assuming this component exists

export async function generateMetadata() {
    const PUBLIC_URL = process.env.NEXT_PUBLIC_URL

    return {
        title: "Morse Code Words Glossary - From A-Z Explore all words and their meaning in morse",
        description: "Discover Morse code words, meanings, examples like SOS & HELP, and how to learn them easily. Great for beginners, ham radio, and emergency use.",
        openGraph: {
        title: "Morse Code Words Glossary - From A-Z Explore all words and their meaning in morse",
        description: "Discover Morse code words, meanings, examples like SOS & HELP, and how to learn them easily. Great for beginners, ham radio, and emergency use.",
    },
    alternates: {
        canonical: `${PUBLIC_URL}/morse-code-word`,
    },
};
}

const mainContentMarkdown = `

# Morse Code Words Glossary

Morse code is a time-tested method of communication using dots and dashes to represent letters, numbers, and punctuation. Beyond just individual characters, Morse code can also be used to represent full words, making it especially valuable in emergency communication, military signaling, amateur (ham) radio, and aviation. In this guide, we dive deep into Morse code words, their meanings, and how they are constructed and used.

### What Are Morse Code Words?

Morse code words are **strings of Morse characters** formed by combining individual Morse symbols for letters and numbers to make actual words. For example, the word **"HELP"** in Morse code is written as:

* **H** = .... (four short signals)
* **E** = . (one short signal)  
* **L** = .-.. (short-long-short-short)
* **P** = .--. (short-long-long-short)

These words are often used in specific communication scenarios, including maritime distress signals, tactical radio transmissions, and amateur radio conversations. The use of whole words in Morse code enhances **clarity**, **speed**, and **context** during transmission.

### Popular Examples of Morse Code Words

Here are some common Morse code words and their corresponding Morse representations:

| Word | Morse Code | Usage |
|------|------------|-------|
| [SOS](/SOS-in-morse-code) | ... --- ... | Universal distress signal |
| [OK](/OK-in-morse-code) | --- -.- | Confirmation/acknowledgment |
| [YES](/YES-in-morse-code) | -.-- . ... | Affirmative response |
| [NO](/NO-in-morse-code) | -. --- | Negative response |
| [LOVE](/LOVE-in-morse-code) | .-.. --- ...- . | Personal messages/symbolic |
| [HELP](/HELP-in-morse-code) | .... . .-.. .--. | Emergency assistance |

### SOS - The Most Famous Morse Code Word

**SOS** is the most well-known Morse code word, universally recognized as a distress signal. Its simplicity and symmetry (three short, three long, three short) make it easy to recognize and transmit even by beginners. Despite popular belief, SOS doesn't stand for "Save Our Ship" or "Save Our Souls" - it was chosen purely for its distinctive pattern.

### How Morse Code Words Are Constructed

To build Morse code words, each letter of the alphabet is translated into Morse code using a system of **dots (.)** and **dashes (-)**. The timing is crucial:

* Each **dot or dash** is one unit
* **Space between dots/dashes** in the same letter: 1 unit
* **Space between letters**: 3 units  
* **Space between words**: 7 units

#### Example: Building "MORSE"

* **M** = -- (dash-dash)
* **O** = --- (dash-dash-dash)  
* **R** = .-. (dot-dash-dot)
* **S** = ... (dot-dot-dot)
* **E** = . (dot)

So "MORSE" becomes: \`-- --- .-. ... .\`

### Morse Code Words in Modern Communication

While Morse code is no longer the **primary form of communication**, it continues to play a crucial role in many areas:

* **Amateur (ham) radio operators** still use Morse code for contests and long-range communication
* **Emergency beacons** transmit coded messages automatically
* **Pilots and navigators** decode radio signals embedded in Morse for navigation
* **Military communications** use it for covert or backup communication
* **Survival training** often includes learning essential Morse code words

Additionally, Morse code words are used symbolically in **tattoos**, **jewelry**, and **art** to convey hidden or personal messages. Many couples use "LOVE" in Morse code for romantic gestures.

### Learning Morse Code Words Easily

If you want to learn Morse code words quickly and effectively, here are proven strategies:

1. **Start with basic words**: Learn common short words like "HELP," "YES," "NO," and "SOS"
2. **Use mnemonic devices**: Associate sounds or visuals with letter patterns
3. **Practice daily**: Consistency is key - even 10 minutes daily helps
4. **Learn by listening**: Familiarize yourself with the rhythm and spacing
5. **Try spaced repetition**: Review words at increasing intervals for better retention
6. **Practice with real scenarios**: Imagine emergency situations where you'd need these words

Many learners find it easier to memorize **full words or phrases** rather than individual characters, as it improves **real-time comprehension** and makes the learning process more practical.

### Emergency Use of Morse Code Words

In survival situations, knowing key Morse code words can be lifesaving:

* **SOS**: Universal distress signal
* **HELP**: Direct request for assistance  
* **YES/NO**: Respond to rescuer questions
* **OK**: Indicate you're alright
* **MAYDAY**: Aviation emergency (though usually spoken)

These can be transmitted through various methods: tapping on walls, flashing lights, or using sound signals.

##### FAQs 
`;

const faqMarkdownForPage = `

### **1. What is the most famous Morse code word?**

The most famous Morse code word is **SOS (... --- ...)**, universally recognized as a distress signal and still used today in emergencies. It was chosen for its distinctive, easy-to-recognize pattern rather than as an acronym.

### **2. Can Morse code be used to send full sentences?**

Yes, Morse code can represent **full sentences** by stringing together words and letters. Each word is separated by a longer pause (7 units) for clarity, making complex communication possible.

### **3. Are Morse code words still relevant today?**

Absolutely. While not used in commercial telecommunication, **military, aviation, amateur radio, and emergency services** still use Morse code words, especially in low-bandwidth or critical communication situations.

### **4. How do you read Morse code words quickly?**

To read Morse code words efficiently, practice recognizing common letter patterns and word shapes rather than decoding letter by letter. Start with short, frequent words and build up your vocabulary gradually.

### **5. What are the best tools to learn Morse code words?**

Effective learning tools include **mobile apps** (like Morse Trainer), **online translators**, **audio practice tracks**, and **flashcards**. Many ham radio websites also offer interactive Morse code learning programs.

### **6. Can I use Morse code words for personal messages?**

Yes! Many people use Morse code words in **jewelry**, **tattoos**, **art**, and **personal notes**. Popular choices include "LOVE," names, or meaningful phrases.
`;

export default async function MorseCodeWordsPage() {
    const getWords = await getWordsPages();
    // Transform getWords (array) to Record<string, string[]>
    // Assuming each word object has a 'word' property and a 'letter' property
    let wordsByLetter: Record<string, string[]> = {};
    getWords.forEach((item: SlugType) => {
        const letter = item.slug.charAt(0).toUpperCase(); // Assuming slug starts with the letter
        const word = item.slug.split('-in-morse')[0].replace(/-/g, ' '); 
        if (letter && word) {
            if (!wordsByLetter[letter]) {
                wordsByLetter[letter] = [];
            }
            wordsByLetter[letter].push(word);
        }
    });
    //sort getwords on alphabetically
    wordsByLetter = Object.fromEntries(
        Object.entries(wordsByLetter).sort(([a], [b]) => a.localeCompare(b))
    );

    return (
        <div className="hero bg-background w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none h-fit flex flex-col">
            <div className="md:px-14 flex items-start">
                <Breadcrumb />
            </div>
            <div className="w-full mx-auto p-4 md:px-10 rounded-lg md:pt-20">
                <Markdown remarkPlugins={[remarkGfm]} components={{
                    strong: ({ children }) => <strong style={{ fontWeight: 'bold' }}>{children}</strong>,
                    h1: ({ children }) =>  <h1 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-bold tracking-tight md:px-10"> {children}</h1>,
                    h2: ({ children }) => <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-medium my-4 text-foreground">{children}</h3>,
                    h5: ({ children }) => <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-bold tracking-tight md:px-10"> {children}</h2>,
                    p: ({ children }) => <p className="mt-2 font-maitree mx-auto text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight">{children}</p>,
                    br: () => <br />,
                    li: ({ children }) => <li className="text-foreground mx-auto list-disc md:ml-10 ml-4 my-2 font-maitree text-lg/relaxed font-extralight">{children}</li>,
                    table: ({ children }) => <div className="overflow-x-auto my-10"><table className="table-auto w-full md:w-2/3 mx-auto border-collapse border border-border text-sm md:text-base">{children}</table></div>,
                    thead: ({ children }) => <thead className="bg-primary text-primary-foreground">{children}</thead>,
                    tbody: ({ children }) => <tbody>{children}</tbody>,
                    tr: ({ children }) => <tr className="border-b border-border hover:bg-muted/50">{children}</tr>,
                    th: ({ children }) => <th className="px-2 md:px-4 py-2 md:py-3 text-left font-medium text-xs md:text-sm">{children}</th>,
                    td: ({ children }) => <td className="border px-2 md:px-4 py-1 md:py-2 text-foreground font-maitree text-xs md:text-lg">{children}</td>,
                }}>
                    {mainContentMarkdown + faqMarkdownForPage}
                </Markdown>
            </div>

            <FAQSchemaLD markup={faqMarkdownForPage} />
            <WordGlossary wordsByLetter={wordsByLetter} />
        </div>
    );
}