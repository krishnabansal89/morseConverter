import Breadcrumb from "@/components/breadcrumb";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FAQSchemaLD } from "@/components/FAQSchemaLD";
import InternalLinkingPanel from "@/components/ui/InternalLinkingPanel";
import dynamic from "next/dynamic";

// Load client component only on the client
const ImageToMorse = dynamic(() => import("@/components/ImageToMorse"));

export async function generateMetadata() {
  const PUBLIC_URL = process.env.NEXT_PUBLIC_URL

  return {
    title: "Morse Code Translator Picture Tool – Convert Images to Morse Code Instantly",
    description:
      "Use our Morse Code Translator Picture Tool to extract and convert text from images into Morse Code. Fast, accurate, and ideal for learning, decoding, or secret messaging.",
  openGraph: {
    title: "Morse Code Translator Picture Tool – Convert Images to Morse Code Instantly",
    description:
      "Use our Morse Code Translator Picture Tool to extract and convert text from images into Morse Code. Fast, accurate, and ideal for learning, decoding, or secret messaging.",
  },
  alternates: {
    canonical: `${PUBLIC_URL}/morse-code-translator-picture`,
  },
};
}

const seoMarkdown = `
## **Morse Code Translator Picture Tool – Decode Images into Morse Code with Ease**

In today’s world of visual communication and cryptography, converting text within images into Morse code has become more accessible and fun. Our Morse Code Translator Picture Tool lets you upload any image containing text, automatically extracts the text (using OCR), and translates it into Morse code instantly. Whether you're learning Morse, sending secret messages, or just curious, this tool combines visual recognition with precise translation.

---

## **What is a Morse Code Translator Picture Tool?**

A **Morse Code Translator Picture Tool** is an online utility that uses **Optical Character Recognition (OCR)** to scan text from images and convert it into **Morse code**. This eliminates the need to manually type or decode messages, making it faster and more efficient for both beginners and enthusiasts.

**Semantic keywords:** image to morse converter, OCR morse code tool, picture to morse code, image text morse translator.

---

## **How It Works – From Image to Morse Code**

1. **Upload** your image (JPG, PNG, or even scanned handwritten notes).
2. The tool **extracts text** using OCR.
3. The extracted text is **instantly translated into Morse code**.
4. You can **copy, listen**, or **download the Morse code** output.

It’s that simple. No manual effort. 100% automated.

**Related phrases:** morse decoder image tool, morse code generator from image, image morse extractor.

---

## **Why Use an Image-Based Morse Code Translator?**

* **Fast & Automated:** No typing required. Just scan and convert.
* **Accessible Learning:** Ideal for students learning Morse with visuals.
* **Secret Communication:** Send image-based Morse messages discreetly.
* **Fun & Practical:** A new way to explore cryptography.

This tool is perfect for **hobbyists, educators, coders, and even puzzle creators**.

---

## **Best Use Cases for Image to Morse Conversion**

* Decoding **textual signs or photos** into Morse.
* Creating **puzzle challenges** using Morse code from images.
* Translating **handwritten notes** into Morse with ease.
* Archiving vintage Morse messages from historical images.
* Helping the **visually impaired** learn Morse via visual to sound mapping.

---

## **Start Translating Images to Morse Code Now**

No signup, no complex setup. Just upload your picture and get the Morse code instantly. This tool supports:

* Multiple languages (English alphabet-based text)
* Adjustable Morse playback speed
* Light and dark theme output

Let the magic of **Morse code and image AI** come together in one seamless experience.
##### FAQs
`;

const faqMarkdown = `

### **1. Can this tool read handwriting in pictures?**  

Yes, if the handwriting is clear and legible, our OCR engine can extract it and convert it into Morse code.

### **2. Is the Morse code output accurate?**

Absolutely. The tool uses a verified Morse code dictionary and precise OCR for high accuracy.

### **3. Do I need to install anything to use the tool?**  

No, it’s entirely web-based. Just upload your image and get results.

### **4. Can I download the Morse code as audio or text?**  

Yes, you can copy the Morse code as text or download it as an audio (.wav) signal.
`;

export default function ImageToMorsePage() {
  return (
    <div className="hero bg-background w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none h-fit flex flex-col">
      <div className="md:px-14 flex items-start">
        <Breadcrumb />
      </div>

      <div className="w-full h-fit md:my-20 my-10 grid md:px-10 md:grid-cols-[65%_35%] grid-cols-1 justify-center">
        <div className="flex items-center">
          <h1 className="xl:text-5xl/relaxed lg:text-4xl/relaxed text-3xl/relaxed font-medium text-foreground tracking-tight md:px-4 font-poppins">
            Morse Code Translator Picture {" "}
            <span className="bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text xl:text-5xl/relaxed lg:text-4xl/relaxed text-3xl/relaxed">
              Images to Morse Instantly
            </span>
          </h1>
        </div>
        <div className="flex-col flex justify-center h-full px-2">
          <div className="my-4">
            <p className="text-foreground tracking-tight w-[100%] font-medium text-lg/relaxed font-maitree">
              Upload a picture with text. We’ll run OCR in your browser and translate the extracted text into Morse code. Copy, listen, or download as audio.
            </p>
          </div>
        </div>
      </div>

      <div className="editor-container w-[98%] md:px-4 mx-auto h-full flex justify-center items-center">
        <div className="editor-window lg:w-4/5  w-full bg-card rounded-lg shadow-lg">
          <ImageToMorse />
        </div>
      </div>

      <div className="max-w-5xl mx-auto mb-20 rounded-lg md:pt-20">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => <h1 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">{children}</h1>,
            h2: ({ children }) => <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-medium my-4 text-foreground">{children}</h3>,
            h5: ({ children }) => <h1 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-bold tracking-tight md:px-10">{children}</h1>,
            h6: ({ children }) => <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium tracking-tight md:px-10"><strong>{children}</strong></h2>,
            p: ({ children }) => <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight">{children}</p>,
            br: () => <br />,
            li: ({ children }) => <li className="text-foreground list-disc md:ml-10 ml-4 my-2 font-maitree text-lg/relaxed font-extralight">{children}</li>,
            table: ({ children }) => <table className="table-auto md:w-2/3 w-[90%] mx-auto my-10">{children}</table>,
            thead: ({ children }) => <thead className="bg-primary text-primary-foreground">{children}</thead>,
            tbody: ({ children }) => <tbody>{children}</tbody>,
            tr: ({ children }) => <tr className="">{children}</tr>,
            th: ({ children }) => <th className="px-4 py-2">{children}</th>,
            td: ({ children }) => <td className="border px-4 py-2">{children}</td>,
          }}
        >
          {seoMarkdown + faqMarkdown}
        </Markdown>
      </div>

      <FAQSchemaLD markup={faqMarkdown} />
      <InternalLinkingPanel />
    </div>
  );
}
