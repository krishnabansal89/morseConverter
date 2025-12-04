
import Markdown from "react-markdown";
import Breadcrumb from "@/components/breadcrumb";
import { FAQSchemaLD } from '@/components/FAQSchemaLD';
import remarkGfm from 'remark-gfm'
import BinaryMorseConverter from "@/components/ui/binary-morse";


export async function generateMetadata() {
    const PUBLIC_URL = process.env.NEXT_PUBLIC_URL
  
    return {
      title: "Binary to Morse Code Converter – Free Online Tool to Convert Binary and Morse Code",
      description: "Use our free Binary to Morse Code Converter to translate binary code to Morse and vice versa. Fast, accurate, and easy-to-use converter for learning, coding, and communication purposes.",
      openGraph: {
        title: "Binary to Morse Code Converter – Free Online Tool to Convert Binary and Morse Code",
        description: "Use our free Binary to Morse Code Converter to translate binary code to Morse and vice versa. Fast, accurate, and easy-to-use converter for learning, coding, and communication purposes.",
      },
      alternates: {
        canonical: `${PUBLIC_URL}/binary-to-morse`,
      },
    };
  }

const markdownContent = `
##### Online Binary to Morse Code Converter – Convert Binary to Morse and Back in Seconds

####

## **What is a Binary to Morse Code Converter?**

A Binary to Morse Code Converter is a specialized digital tool that bridges two fundamental communication systems: binary code (the language of computers using 0s and 1s) and Morse code (the classic telecommunication system using dots and dashes). This converter translates binary representations of text into Morse code and vice versa, making it perfect for educational purposes, cryptography enthusiasts, and anyone exploring different encoding systems. Whether you're learning about data encoding or experimenting with historical communication methods, this tool provides seamless conversion between these two iconic systems.

---

## **How the Binary to Morse Code Converter Works**

Using this Binary to Morse Code Converter is simple and intuitive:

1. **Input your binary code** (space-separated 8-bit sequences) or **Morse code** (dots, dashes, and spaces).
2. **Choose your conversion direction** – binary to Morse or Morse to binary.
3. **View instant results** in the output box with live conversion.
4. **Copy or download** your converted message with one click.

The tool converts binary to ASCII text, then to Morse code (and vice versa), ensuring accurate translation following International Morse Code standards.

---

## **Key Features of Our Binary to Morse Converter**

* 🔄 **Bidirectional conversion** – Convert both binary to Morse and Morse to binary.
* ⚡ **Real-time processing** – Instant live conversion as you type.
* 🌐 **Fully online** – No downloads or installations required.
* 📱 **Mobile responsive** – Works perfectly on all devices.
* 🔊 **Audio feedback** – Hear Morse code as you convert with adjustable settings.
* 💡 **Visual effects** – See Morse code flashing with dots and dashes.
* 🎛️ **Customizable settings** – Adjust WPM, frequency, volume, and sound type.
* 🆓 **Completely free** – Unlimited usage with no sign-up needed.

---

## **Why Use This Binary to Morse Converter?**

This Binary to Morse Code Converter is perfect for various users:

* **Computer science students** learning about different encoding systems and data representation.
* **Cryptography enthusiasts** exploring multiple layers of message encoding.
* **Ham radio operators** who want to understand binary representations of Morse transmissions.
* **Educators and teachers** demonstrating how computers encode and decode information.
* **Hobbyists** interested in combining modern and historical communication methods.

Unlike other converters, this tool uniquely combines binary and Morse code conversion with live audio and visual feedback, making learning interactive and engaging.

---

###### FAQs – Binary to Morse Code Converter

**Q1: How does the Binary to Morse Code Converter work?**  
The converter first translates binary code (8-bit sequences) into ASCII text characters, then converts those characters into their corresponding Morse code representations. The reverse process works by converting Morse to text, then text to binary.

**Q2: What binary format does the converter support?**  
The converter accepts 8-bit binary sequences (standard ASCII representation) separated by spaces. Each 8-bit sequence represents one character.

**Q3: Can I hear the Morse code while converting?**  
Yes! The converter includes live audio feedback that plays the Morse code as you type. You can customize the speed (WPM), frequency, volume, and sound type in the settings.

**Q4: Is the Binary to Morse Converter accurate?**  
Absolutely. The converter follows International Morse Code standards and uses standard ASCII binary encoding, ensuring precise and reliable conversions.

**Q5: Can I use this converter on mobile devices?**  
Yes, the tool is fully responsive and works seamlessly on smartphones, tablets, and desktop computers.

**Q6: Does the converter support special characters?**  
It supports all letters, numbers, and common punctuation marks that exist in both ASCII and International Morse Code standards.

**Q7: Is my data private and secure?**  
Yes. All conversions happen instantly in your browser. No data is stored, transmitted, or shared, ensuring complete privacy and security.`

export default function Page() {

    return (
        <div className="bg-background text-foreground w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none  h-fit flex flex-col ">


            <div className="max-w-5xl mx-auto mb-20">
                <Breadcrumb />

                <Markdown remarkPlugins={[remarkGfm]} components={{
                    h1: ({ }) => <div />,
                    h2: ({ children }) => <h2 className="md:text-2xl/relaxed text-xl/relaxed  text-foreground font-medium  my-6   ">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl  font-medium my-4 text-foreground">{children}</h3>,
                    h4: ({ }) =>
                        <div className="editor-container  w-[98%] md:px-4 mx-auto h-fit flex justify-center items-center ">                <div className="editor-window w-full h-full bg-card rounded-lg shadow-lg mb-10">
                            <BinaryMorseConverter />                                    </div>
                        </div>,
                    h5: ({ children }) => <h1 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-bold   tracking-tight md:px-10 "> {children}</h1>,
                    h6: ({ children }) => <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 "> <strong> {children} </strong></h2>,

                    p: ({ children }) => <p className="mt-2 font-maitree  text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight">{children}</p>,
                    br: () => <br />,
                    li: ({ children }) => <li className="text-foreground list-disc md:ml-10 ml-4 my-2 font-maitree  text-lg/relaxed font-extralight">{children}</li>,
                    table: ({ children }) => <table className="table-auto md:w-2/3 w-[90%] mx-auto my-10">{children}</table>,
                    thead: ({ children }) => <thead className="bg-primary text-primary-foreground">{children}</thead>,
                    tbody: ({ children }) => <tbody>{children}</tbody>,
                    tr: ({ children }) => <tr className="  ">{children}</tr>,
                    th: ({ children }) => <th className="px-4 py-2">{children}</th>,
                    td: ({ children }) => <td className="border px-4 py-2">{children}</td>,
                    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,

                }} >{markdownContent}</Markdown>
            </div>
            <FAQSchemaLD markup={`### **1. How does the Binary to Morse Code Converter work?**  

The converter first translates binary code (8-bit sequences) into ASCII text characters, then converts those characters into their corresponding Morse code representations. The reverse process works by converting Morse to text, then text to binary.

### **2. What binary format does the converter support?**  

The converter accepts 8-bit binary sequences (standard ASCII representation) separated by spaces. Each 8-bit sequence represents one character.

### **3. Can I hear the Morse code while converting?**  

Yes! The converter includes live audio feedback that plays the Morse code as you type. You can customize the speed (WPM), frequency, volume, and sound type in the settings.

### **4. Is the Binary to Morse Converter accurate?**  

Absolutely. The converter follows International Morse Code standards and uses standard ASCII binary encoding, ensuring precise and reliable conversions.

### **5. Can I use this converter on mobile devices?**  

Yes, the tool is fully responsive and works seamlessly on smartphones, tablets, and desktop computers.

### **6. Does the converter support special characters?**  

It supports all letters, numbers, and common punctuation marks that exist in both ASCII and International Morse Code standards.

### **7. Is my data private and secure?**  

Yes. All conversions happen instantly in your browser. No data is stored, transmitted, or shared, ensuring complete privacy and security.
`} />
        </div>

    );
}

