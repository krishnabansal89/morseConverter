import React from "react";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import MorseCodeTranslator from "./InternationTable";
import Breadcrumb from "@/components/breadcrumb";
import { FAQSchemaLD } from "@/components/FAQSchemaLD";
import MorseConverter from "../home/Translator";
// import MorseConverter from "../home/Translator";
export default function InternationalMorseCode() {

    const overviewContent = `
##### **International Morse Code Translator**


Unlock seamless communication across time and space with our **International Morse Code translator**. Whether you're a hobbyist, a student, or a professional working in security, aviation, or maritime industries, our tool offers an accurate and fast way to convert text to Morse code and vice versa. With an intuitive interface and real-time translation, this tool is designed to simplify Morse code usage for all skill levels.

#### 

# charts

## **What Is an International Morse Code Translator?**

An **International Morse Code translator** is a digital tool that converts plain text into Morse code and Morse code back into readable text. Morse code is a system of dots and dashes used to encode characters, originally designed for long-distance telecommunication. Our tool adheres strictly to **International Morse Code** standards, ensuring global compatibility and consistent results.

## **Why Use Our International Morse Code Translator?**

Our **International Morse Code translator** addresses a key challenge: making Morse code accessible and easy to use for modern audiences. Here's how our tool solves real-world problems:

* **Accuracy:** Converts characters exactly according to International Morse Code standards.

* **Real-Time Translation:** Instant feedback with both audio and visual Morse outputs.

* **Dual Direction:** Translate from text to Morse and Morse to text effortlessly.

* **Learning Aid:** Ideal for students or enthusiasts wanting to learn Morse code.

* **Use Anywhere:** Fully web-based, requiring no download or installation.

## **Key Features of Our International Morse Code Translator**

Our translator is more than just a basic converter. Here's what sets it apart:

* **Multi-language support**: Recognizes and translates common Latin-based alphabets.

* **Audio Playback**: Hear the Morse code in beeps—great for auditory learners and training.

* **Copy & Share Options**: Instantly copy translations or share them via messaging apps or email.

* **Clean Interface**: Designed with usability in mind—no clutter, just functionality.

* **Mobile-Friendly**: Works smoothly on smartphones and tablets.

## **Who Can Benefit From an International Morse Code Translator?**

The applications of our **International Morse Code translator** go far beyond simple curiosity:

* **Educators and Students**: Teach or learn Morse code interactively.

* **Amateur Radio Operators (HAM)**: Decode and encode messages quickly during communication.

* **Emergency Responders**: Use Morse in signal-limited scenarios (flashlight, sound, or tapping).

* **Historians and Enthusiasts**: Decode old documents or understand historical transmissions.

* **Tech Developers**: Integrate translations into apps or devices using our tool's outputs.

## **How Our Tool Solves a Common Communication Barrier**

The biggest problem with Morse code today is its complexity and lack of accessibility for beginners. Our **International Morse Code translator** breaks down that barrier. By translating text in real-time, offering audible outputs, and displaying results clearly, we make Morse code not only understandable but usable in practical scenarios—from learning environments to emergency situations.

###### **FAQs**

### **1\. What is the International Morse Code translator used for?**

It is used to convert regular text into Morse code and Morse code back into text, useful for communication, learning, and decoding.

### **2\. Is the International Morse Code translator accurate?**

Yes, it uses standardized International Morse Code definitions to ensure precise translation.

### **3\. Can I use this translator offline?**

Currently, it's web-based, but you can save or copy the translated Morse code for offline use.

### **4\. Does this work with numbers and special characters?**

Yes, it supports the full range of International Morse Code characters including numbers and punctuation.

### **5\. Can this International Morse Code translator play audio signals?**

Absolutely. Our tool includes a play button that outputs Morse in authentic audio beeps.
`

    return (
        <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none  h-fit flex flex-col ">
            <div className="max-w-5xl mx-auto">
                <Breadcrumb />
                <Markdown remarkPlugins={[remarkGfm]} components={{
                    h1: ({ }) => <MorseCodeTranslator />,
                    h2: ({ children }) => <h2 className="md:text-2xl/relaxed text-xl/relaxed  text-[#2d2d2d] font-medium  my-6   ">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl  font-medium my-4 text-[#2d2d2d]">{children}</h3>,
                    h4: ({ }) => <Image
                        src={"/charts/international-morse-code.jpg"}
                        alt="International Morse Code Chart"
                        width={1000}
                        height={1000}
                        className=" md:w-2/5  object-cover my-10 rounded-lg shadow-lg mx-auto"
                    />
                    ,
                    h5: ({ children }) => <div className="flex flex-col"> <h1 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 "> {children} </h1>
                        <div className="editor-window w-full overflow-x-clip h-full bg-white rounded-lg shadow-lg my-20">
                            <MorseConverter />
                        </div>

                    </div>,
                    h6: ({ children }) => <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 "> {children}</h2>,
                    p: ({ children }) => <p className="mt-2 font-maitree  text-[#6c6860] md:ml-4 ml-2 text-lg/relaxed font-extralight">{children}</p>,
                    br: () => <br />,
                    li: ({ children }) => <li className="text-[#2d2d2d] list-disc md:ml-10 ml-4 my-2 font-maitree  text-lg/relaxed font-extralight">{children}</li>,
                    table: ({ children }) => <table className="table-auto md:w-2/3 w-[90%] mx-auto my-10">{children}</table>,
                    thead: ({ children }) => <thead className="bg-[#456359] text-white">{children}</thead>,
                    tbody: ({ children }) => <tbody>{children}</tbody>,
                    tr: ({ children }) => <tr className="  ">{children}</tr>,
                    th: ({ children }) => <th className="px-4 py-2">{children}</th>,
                    td: ({ children }) => <td className="border px-4 py-2">{children}</td>,

                }} >{overviewContent}</Markdown>
            </div>
            <FAQSchemaLD markup={`### **1\. What is the International Morse Code translator used for?**

It is used to convert regular text into Morse code and Morse code back into text, useful for communication, learning, and decoding.

### **2\. Is the International Morse Code translator accurate?**

Yes, it uses standardized International Morse Code definitions to ensure precise translation.

### **3\. Can I use this translator offline?**

Currently, it's web-based, but you can save or copy the translated Morse code for offline use.

### **4\. Does this work with numbers and special characters?**

Yes, it supports the full range of International Morse Code characters including numbers and punctuation.

### **5\. Can this International Morse Code translator play audio signals?**

Absolutely. Our tool includes a play button that outputs Morse in authentic audio beeps.
`} />
        </div>
    );
}
