
import Markdown from "react-markdown";
import Breadcrumb from "@/components/breadcrumb";
import { FAQSchemaLD } from '@/components/FAQSchemaLD';
import remarkGfm from 'remark-gfm'
import MorseCodeMachine from "@/components/ui/machine";


export async function generateMetadata() {
    const PUBLIC_URL = process.env.NEXT_PUBLIC_URL
  
    return {
      title: "Morse Code Machine – Free Online Tool to Encode and Decode Morse Code Instantly",
      description: "Use our free Morse Code Machine to convert text to Morse code and vice versa. Fast, accurate, and easy-to-use Morse code translator for learning, hobby, or communication purposes.",
      openGraph: {
        title: "Morse Code Machine – Free Online Tool to Encode and Decode Morse Code Instantly",
        description: "Use our free Morse Code Machine to convert text to Morse code and vice versa. Fast, accurate, and easy-to-use Morse code translator for learning, hobby, or communication purposes.",
      },
      alternates: {
        canonical: `${PUBLIC_URL}/morse-code-machine`,
      },
    };
  }

const markdownContent = `
##### Online Morse Code Machine – Convert Text to Morse and Back in Seconds

####

## **What is a Morse Code Machine?**

A Morse Code Machine is a digital tool designed to encode and decode messages using the Morse code system. Morse code is a method of transmitting textual information through sequences of dots (.) and dashes (-), historically used in telecommunication. This online Morse Code Machine replicates the functionality of traditional telegraphs in a modern, user-friendly format. Whether you're exploring Morse as a hobby, for academic purposes, or as a survival communication method, this tool offers a simple and reliable solution.

---

## **How the Morse Code Machine Works**

Using this Morse Code Machine is quick and straightforward:

1. **Input your message** into the text box.
2. **Choose your action** – encode to Morse code or decode to plain text.
3. **View instant results** in the output box.
4. **Copy or share** your message with one click.

This tool supports the International Morse Code standard and translates instantly, making it perfect for learners, students, and radio enthusiasts.

---

## **Key Features of Our Morse Code Machine**

* 🔁 **Two-way translation** – Convert both to and from Morse code.
* ⚡ **Real-time conversion** – Instant output with zero delay.
* 🌐 **Fully online** – No download or installation required.
* 📱 **Mobile responsive** – Seamlessly works on all devices.
* 🔤 **Standard-compliant** – Supports letters, numbers, and common punctuation.
* 🆓 **Completely free** – Unlimited usage with no sign-up needed.

---

## **Why Use This Morse Code Machine?**

This Morse Code Machine is ideal for a wide range of users:

* **Hobbyists and learners** practicing Morse code for fun or self-improvement.
* **Students and educators** using it as a learning tool in coding or history lessons.
* **Radio operators and preppers** needing a fast and accurate conversion tool.
* **Cryptography enthusiasts** exploring classic communication systems.

Unlike other Morse code converters, this machine is optimized for speed, accuracy, and ease of use—no technical knowledge required.

---

###### FAQs – Morse Code Machine

**Q1: What does a Morse Code Machine do?**  
A Morse Code Machine translates text into Morse code and vice versa. It uses dots and dashes to represent letters, numbers, and symbols, enabling message conversion in both directions.

**Q2: Is this Morse Code Machine accurate?**  
Yes, it follows the International Morse Code standards and ensures accurate encoding and decoding. It's regularly tested for precision across multiple browsers and devices.

**Q3: Can I use this Morse Code Machine on mobile?**  
Absolutely. The tool is fully mobile-responsive and works flawlessly on smartphones and tablets, as well as desktops.

**Q4: Does the Morse Code Machine support special characters?**  
It supports most common letters, numbers, and basic punctuation. Characters not in the Morse code system are ignored to maintain output accuracy.

**Q5: Is this Morse Code Machine safe and private?**  
Yes. No data is stored or shared. All conversions happen instantly in your browser for complete privacy and security.`

export default function Page() {

    return (
        <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none  h-fit flex flex-col ">


            <div className="max-w-5xl mx-auto mb-20">
                <Breadcrumb />

                <Markdown remarkPlugins={[remarkGfm]} components={{
                    h1: ({ }) => <div />,
                    h2: ({ children }) => <h2 className="md:text-2xl/relaxed text-xl/relaxed  text-[#2d2d2d] font-medium  my-6   ">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl  font-medium my-4 text-[#2d2d2d]">{children}</h3>,
                    h4: ({ }) =>
                        <div className="editor-container  w-[98%] md:px-4 mx-auto h-fit flex justify-center items-center ">                <div className="editor-window w-full h-full bg-white rounded-lg shadow-lg mb-10">
                            <MorseCodeMachine />                                    </div>
                        </div>,
                    h5: ({ children }) => <h1 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-bold   tracking-tight md:px-10 "> {children}</h1>,
                    h6: ({ children }) => <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 "> <strong> {children} </strong></h2>,

                    p: ({ children }) => <p className="mt-2 font-maitree  text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight">{children}</p>,
                    br: () => <br />,
                    li: ({ children }) => <li className="text-[#2d2d2d] list-disc md:ml-10 ml-4 my-2 font-maitree  text-lg/relaxed font-extralight">{children}</li>,
                    table: ({ children }) => <table className="table-auto md:w-2/3 w-[90%] mx-auto my-10">{children}</table>,
                    thead: ({ children }) => <thead className="bg-[#456359] text-white">{children}</thead>,
                    tbody: ({ children }) => <tbody>{children}</tbody>,
                    tr: ({ children }) => <tr className="  ">{children}</tr>,
                    th: ({ children }) => <th className="px-4 py-2">{children}</th>,
                    td: ({ children }) => <td className="border px-4 py-2">{children}</td>,
                    strong: ({ children }) => <strong className="font-bold text-[#2d2d2d]">{children}</strong>,

                }} >{markdownContent}</Markdown>
            </div>
            <FAQSchemaLD markup={`### **1\. What does a Morse Code Machine do?**  

A Morse Code Machine translates text into Morse code and vice versa. It uses dots and dashes to represent letters, numbers, and symbols, enabling message conversion in both directions.

### **2\. Is this Morse Code Machine accurate?**  

Yes, it follows the International Morse Code standards and ensures accurate encoding and decoding. It's regularly tested for precision across multiple browsers and devices.

### **3\. Can I use this Morse Code Machine on mobile?**  

Absolutely. The tool is fully mobile-responsive and works flawlessly on smartphones and tablets, as well as desktops.

### **4\. Does the Morse Code Machine support special characters?** 
 
It supports most common letters, numbers, and basic punctuation. Characters not in the Morse code system are ignored to maintain output accuracy.

### **5\. Is this Morse Code Machine safe and private?**  

Yes. No data is stored or shared. All conversions happen instantly in your browser for complete privacy and security.
`} />
        </div>

    );
}