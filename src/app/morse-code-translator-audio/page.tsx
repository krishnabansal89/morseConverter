import Markdown from "react-markdown";
import Breadcrumb from "@/components/breadcrumb";
import { FAQSchemaLD } from '@/components/FAQSchemaLD';
import remarkGfm from 'remark-gfm'
import MorseCodeAudioPlayer from "@/components/ui/audioTool";

export async function generateMetadata() {
  const PUBLIC_URL = process.env.NEXT_PUBLIC_URL

  return {
    title: "Morse Code Audio Translator – Convert Text to Morse Code Audio Instantly",
    description: "Use our free Morse Code Audio Translator to convert text to Morse code audio. Fast, accurate, and easy-to-use Morse code translator for learning, hobby, or communication purposes.",
    openGraph: {
      title: "Morse Code Audio Translator – Convert Text to Morse Code Audio Instantly",
      description: "Use our free Morse Code Audio Translator to convert text to Morse code audio. Fast, accurate, and easy-to-use Morse code translator for learning, hobby, or communication purposes.",
    },
    alternates: {
      canonical: `${PUBLIC_URL}/morse-code-translator-audio`,
    },
  };
}

const markdownContent = `
##### Online Morse Code Translator with Audio Playback

####

## **What is a Morse Code Translator with Sound?**

Learn how this tool helps convert English text or Morse code into audible dots and dashes (dits and dahs), making it easier to learn and recognize Morse code through hearing.

---

## **How to Use the Morse Code Audio Tool**

Step-by-step guide on entering text, decoding Morse, and playing the audio.

* Type or paste your message
* Click "Translate"
* Listen to the Morse Code sound

---

## **Features of Our Morse Code Audio Converter**

* Real-time audio output
* Adjustable speed (WPM)
* Copy/paste functionality
* Supports both encoding and decoding

---

## **Why Use an Audio Morse Code Translator?**

Using sound helps train your ear to identify Morse signals, which is essential for ham radio operators, survivalists, and hobby learners.

---

## **Common Use Cases and Learning Tips**

* Ham radio practice (CW mode)
* Navy & military history education
* Puzzle-solving & escape rooms
* Memorization through audio repetition

---

###### Frequently Asked Questions (FAQs)

### **1\. Can I decode Morse code from sound using this tool?**  

No, this tool converts text into Morse code *audio*. For decoding from sound, you'll need an audio decoder or spectrum analyzer.

### **2\. Is this Morse Code translator tool free to use?**  

Yes! Our web tool is 100% free and requires no signup or downloads.

### **3\. What speed does the audio play at?**  

By default, the speed is around 20 WPM (words per minute), but many tools allow you to adjust the speed for better learning.

### **4\. Can I use this tool on mobile devices?**  

Absolutely. This Morse Code audio converter is fully responsive and works on phones, tablets, and desktops.
`;

export default function Page() {
  return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none h-fit flex flex-col ">
      <div className="max-w-5xl mx-auto mb-20">
        <Breadcrumb />
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ }) => <div />,
            h2: ({ children }) => <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium my-6">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-medium my-4 text-[#2d2d2d]">{children}</h3>,
            h4: ({ }) => (
              <div className="editor-container w-[90%] md:px-4 mx-auto h-fit flex justify-center items-center">
                <div className="editor-window w-full h-full bg-white rounded-lg shadow-lg mb-10">
                  <MorseCodeAudioPlayer />
                </div>
              </div>
            ),
            h5: ({ children }) => <h1 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-bold tracking-tight md:px-10">{children}</h1>,
            h6: ({ children }) => <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium tracking-tight md:px-10"><strong>{children}</strong></h2>,
            p: ({ children }) => <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight">{children}</p>,
            br: () => <br />,
            li: ({ children }) => <li className="text-[#2d2d2d] list-disc md:ml-10 ml-4 my-2 font-maitree text-lg/relaxed font-extralight">{children}</li>,
            table: ({ children }) => <table className="table-auto md:w-2/3 w-[90%] mx-auto my-10">{children}</table>,
            thead: ({ children }) => <thead className="bg-[#456359] text-white">{children}</thead>,
            tbody: ({ children }) => <tbody>{children}</tbody>,
            tr: ({ children }) => <tr className="">{children}</tr>,
            th: ({ children }) => <th className="px-4 py-2">{children}</th>,
            td: ({ children }) => <td className="border px-4 py-2">{children}</td>,
            strong: ({ children }) => <strong className="font-bold text-[#2d2d2d]">{children}</strong>,
          }}
        >
          {markdownContent}
        </Markdown>
      </div>
      <FAQSchemaLD
        markup={`### **1\. Can I decode Morse code from sound using this tool?**  

No, this tool converts text into Morse code *audio*. For decoding from sound, you'll need an audio decoder or spectrum analyzer.

### **2\. Is this Morse Code translator tool free to use?**  

Yes! Our web tool is 100% free and requires no signup or downloads.

### **3\. What speed does the audio play at?**  

By default, the speed is around 20 WPM (words per minute), but many tools allow you to adjust the speed for better learning.

### **4\. Can I use this tool on mobile devices?**  

Absolutely. This Morse Code audio converter is fully responsive and works on phones, tablets, and desktops.
        `}
      />
    </div>
  );
}
