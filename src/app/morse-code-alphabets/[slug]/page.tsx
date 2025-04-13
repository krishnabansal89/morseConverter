import MorseConverter from "@/app/components/home/Translator";
import Breadcrumb from "@/components/breadcrumb";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { FAQSchemaLD } from "@/components/FAQSchemaLD";

function getPopularLetters(parentArray: Array<string>, currentLetter: string) {
    const currentIndex = parentArray.indexOf(currentLetter)
    const popularLetters = []
    for (let i = currentIndex + 1; i <= 25; i++) {
        popularLetters.push(parentArray[i]);
        if (popularLetters.length === 6) break
        if (i === 25) i = 0;

    }
    return popularLetters
}
export async function generateMetadata({ params }: { params: tParams }) {
    const { slug } = await params;
    
    const letter = slug[0].replace('-in-morse-code', '');
    const PUBLIC_URL = process.env.NEXT_PUBLIC_URL

    return {
        title: `What is ${letter.toUpperCase()} in Morse Code? Meaning, Representation & Uses`,
        description: `Discover what  ${letter.toUpperCase()} in Morse Code is, its meaning, representation, and practical uses in communication, emergency signals, and technology. Learn how to decode and use Morse code effectively.
`,
        openGraph: {
            title: `What is ${letter.toUpperCase()} in Morse Code? Meaning, Representation & Uses`,
            description: `Discover what  ${letter.toUpperCase()} in Morse Code is, its meaning, representation, and practical uses in communication, emergency signals, and technology. Learn how to decode and use Morse code effectively.`,
        },
        alternates: {
            canonical: `${PUBLIC_URL}/morse-code-alphabets/${letter}-in-morse-code`,
        },
    };
}

export async function generateStaticParams() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return letters.map(letter => ({
        letter: `${letter.toLowerCase()}-in-morse-code`
    }));
}


const characterToMorseMap: Record<string, string> = {
    '0': '-----',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    'A': '.-',
    'B': '-...',
    'C': '-.-.',
    'D': '-..',
    'E': '.',
    'F': '..-.',
    'G': '--.',
    'H': '....',
    'I': '..',
    'J': '.---',
    'K': '-.-',
    'L': '.-..',
    'M': '--',
    'N': '-.',
    'O': '---',
    'P': '.--.',
    'Q': '--.-',
    'R': '.-.',
    'S': '...',
    'T': '-',
    'U': '..-',
    'V': '...-',
    'W': '.--',
    'X': '-..-',
    'Y': '-.--',
    'Z': '--..',
    '.': '.-.-.-',
    ',': '--..--',
    '?': '..--..',
    "'": '.----.',
    '!': '-.-.--',
    '/': '-..-.',
    '(': '-.--.',
    ')': '-.--.-',
    '&': '.-...',
    ':': '---...',
    ';': '-.-.-.',
    '=': '-...-',
    '+': '.-.-.',
    '-': '-....-',
    '_': '..--.-',
    '"': '.-..-.',
    '$': '...-..-',
    '@': '.--.-.',
    ' ': ''
}

function generateMorseMarkdown(character: string, morse: string): string {
    // Get uppercase version of the character to match the keys in our reverse map
    const upperChar = character;

    // Find the morse code for this character



    // Create a readable version replacing dots and dashes with proper symbols
    const readableMorse = morse.replace(/\./g, '·').replace(/\-/g, '−');

    // Create descriptions for each signal
    const signals = morse.split('').map(signal => {
        if (signal === '.') {
            return "A short signal (**dot** or **dit**)";
        } else if (signal === '-') {
            return "A longer signal (**dash** or **dah**)";
        }
        return "";
    });

    // Join the signals with appropriate formatting
    const signalsList = signals.map(signal => `* ${signal}`).join('\n');

    // Create the final markdown
    return `In Morse code, the letter **'${upperChar}'** is represented as **${readableMorse}** (${morse.replace(/\./g, 'dot').replace(/\-/g, 'dash')}). This means:\n${signalsList}`;
}

type tParams = Promise<{ slug: string[] }>;

export default async function LetterInMorseCode({ params }: { params: tParams }) {
    const { slug } = await params;
    const letter = slug[0].split("-")[0].toUpperCase()
    const alphabetsUppercase = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    const popularLetters = getPopularLetters(alphabetsUppercase, letter)
    const morseTraslation = characterToMorseMap[letter.toUpperCase()]

    const content = `
## What is '${letter}' in morse code?

Morse code is a method of communication that uses a series of dots and dashes to represent letters, numbers, and symbols. It was developed in the early 19th century by Samuel Morse and Alfred Vail and has since been widely used in telecommunication, military operations, and even modern-day learning applications.

${generateMorseMarkdown(letter, morseTraslation)}

When transmitted through sound, a dot is a quick, short beep, while a dash is a slightly longer one. Visually, it can also be represented as a flashing light, where the dot is a short blink and the dash is a longer blink.

## Understanding ${letter} in Morse Code in Context

The simplicity of **${letter}** in Morse code makes it one of the easiest letters to learn. In fact, it is often one of the first letters beginners memorize when learning Morse code. It serves as a foundation for understanding more complex letters and words in the system.

## Why is ${letter} in Morse Code Important?

1. **Widely Used in Communication** – Morse code was once essential for radio communication, and even today, ham radio operators and emergency responders use it as a backup method.  
2. **Used in Modern Digital Applications** – Morse code is still relevant in assistive technology, such as devices that help people with disabilities communicate through eye blinks or touch.

##### **FAQs**


**1\. How do you say ${letter} in Morse code out loud?**  
 **${letter}** is pronounced as ${((morseTraslation.replaceAll(".", "di ")).replaceAll("-", "dah "))} ,  with "di" representing the dot and "dah" for the dash.

**2\. How do I remember ${letter} in Morse code easily?**  
 A simple trick is to think of the letter ${letter} as an  ${morseTraslation.split('').map((signal, i) => {
        let data;
        if (signal === '.') {
            data = " A short signal (**dot** or **dit**) ";
        } else if (signal === '-') {
            data = " A longer signal (**dash** or **dah**) ";
        }
        if (i < morseTraslation.split('').length - 1) data += "followed by a"
        return data;
    })} 

**3\. Can Morse code for ${letter} be used in flashing lights?**  
 Yes\! You can communicate **${letter}** using a flashlight— ${morseTraslation.split('').map((signal, i) => {
        let data;
        if (signal === '.') {
            data = " A short blink";
        } else if (signal === '-') {
            data = " A long blink";
        }
        if (i < morseTraslation.split('').length - 1) data += " then "
        return data;
    })} 

`

const FaqMarkup = `
### **1\. How do you say ${letter} in Morse code out loud?**  


**${letter}** is pronounced as ${((morseTraslation.replaceAll(".", "di ")).replaceAll("-", "dah "))} ,  with "di" representing the dot and "dah" for the dash.

### **2\. How do I remember ${letter} in Morse code easily?**  


A simple trick is to think of the letter ${letter} as an  ${morseTraslation.split('').map((signal, i) => {
        let data;
        if (signal === '.') {
            data = " A short signal (**dot** or **dit**) ";
        } else if (signal === '-') {
            data = " A longer signal (**dash** or **dah**) ";
        }
        if (i < morseTraslation.split('').length - 1) data += "followed by a"
        return data;
    })} 

### **3\. Can Morse code for ${letter} be used in flashing lights?**  


Yes\! You can communicate **${letter}** using a flashlight— ${morseTraslation.split('').map((signal, i) => {
        let data;
        if (signal === '.') {
            data = " A short blink";
        } else if (signal === '-') {
            data = " A long blink";
        }
        if (i < morseTraslation.split('').length - 1) data += " then "
        return data;
    })} 

`


    return (
        <div className="hero bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-10 rounded-lg  rounded-b-none  h-fit flex flex-col ">
            <div className=" md:px-14 flex items-start "><Breadcrumb />            </div>
            <div className="w-full h-fit md:my-20 my-10  grid md:px-10  md:grid-cols-[65%_35%] grid-cols-1 justify-center ">
                <div className="flex  items-center  ">
                    <h1 className="xl:text-5xl/relaxed lg:text-4xl/relaxed  text-3xl/relaxed  font-medium text-[#2d2d2d]  tracking-tight md:px-4 font-poppins">What is {letter} in Morse Code ?   <br></br> <span className="bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text xl:text-4xl/relaxed lg:text-3xl/relaxed  text-2xl/relaxed "> Meaning, Representation & Uses </span></h1>
                </div>
                <div className=" flex-col flex justify-center h-full px-2  ">
                    <div className="my-4">
                        <p className="text-[#6c6860] tracking-tight w-[100%] font-medium   text-lg/relaxed font-maitree ">Discover what &apos;{letter}&apos; in Morse code is, its meaning, representation , and practical uses in communication, emergency signals, and technology. Learn how to decode and use Morse code effectively.

                        </p>
                    </div>


                </div>

            </div>
            <div className="editor-container  w-[98%] md:px-4 mx-auto h-fit flex justify-center items-center ">
                <div className="editor-window md:w-1/2 w-full h-[full] bg-white rounded-lg shadow-lg">
                    <MorseConverter initialText={letter} textToMorse={true} />
                </div>
            </div>
            <div className="md:mt-20 mt-10">
                <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r mx-auto from-green-500 to-teal-900 text-transparent bg-clip-text font-medium text-center md:mb-12 mb-8 tracking-tight md:px-10 font-poppins"> Explore popular letter</h2>
                <div className="grid grid-cols-3 w-[98%] p-4 md:px-10 mx-auto gap-y-4 ">
                    {popularLetters.map((letter) => (
                        <Link key={letter} href={`/morse-code-alphabets/${letter}-in-morse-code`} className="border-2 border-gray-300 px-4 py-2 font-semibold text-[#2d2d2d] font-maitree "> {letter} in Morse Code </Link>
                    ))}


                </div>
                <div className=" w-full  mx-auto p-4 md:px-10 rounded-lg md:pt-20">
                    <Markdown remarkPlugins={[remarkGfm]} components={{
                        strong: ({ children }) => <strong style={{ fontWeight: 'bold' }}>{children}</strong>,
                        h1: ({ children }) => <h1 className="md:text-2xl/relaxed text-xl/relaxed  text-[#2d2d2d] font-medium  my-6   ">{children}</h1>,
                        h2: ({ children }) => <h2 className="md:text-2xl/relaxed text-xl/relaxed  text-[#2d2d2d] font-medium  my-6   ">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xl  font-medium my-4 text-[#2d2d2d]">{children}</h3>,
                        h5: ({ children }) => <div className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 "> {children}</div>,

                        p: ({ children }) => <p className="mt-2 font-maitree  mx-auto  text-[#6c6860] md:ml-4 ml-2 text-lg/relaxed font-extralight">{children}</p>,
                        br: () => <br />,
                        li: ({ children }) => <li className="text-[#6c6860]  mx-auto list-disc md:ml-10 ml-4 my-2 font-maitree  text-lg/relaxed font-extralight">{children}</li>,
                        table: ({ children }) => <table className="table-auto md:w-2/3 w-[90%] mx-auto my-10">{children}</table>,
                        thead: ({ children }) => <thead className="bg-[#456359] text-white">{children}</thead>,
                        tbody: ({ children }) => <tbody>{children}</tbody>,
                        tr: ({ children }) => <tr className="  ">{children}</tr>,
                        th: ({ children }) => <th className="px-4 py-2">{children}</th>,
                        td: ({ children }) => <td className="border px-4 py-2">{children}</td>,


                    }} >{content}</Markdown>
                </div>
            </div>
            <FAQSchemaLD markup={FaqMarkup} /> 

        </div>
    )
}