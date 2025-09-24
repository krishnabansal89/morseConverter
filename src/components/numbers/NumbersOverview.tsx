import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import MorseCodeTranslator from "./MorseNumberChartRenderer";
import Breadcrumb from "@/components/breadcrumb";
import { FAQSchemaLD } from '@/components/FAQSchemaLD';

export default function NumberOverview() {

    const overviewContent = `##### **Introduction to Morse Code Numbers**

**Morse code numbers** are a vital part of one of the world’s most iconic communication systems. While many people associate Morse code mainly with letters, the numerical side has been just as important. Morse code numbers enabled operators to quickly transmit dates, monetary values, and coordinates—making long-distance communication more accurate and reliable. This article explores the history, development, and ongoing uses of Morse code numbers, highlighting their continued relevance in modern times.
# 

## **The Origin of Morse Code Numbers**

Developed in the 1830s and 1840s by Samuel Morse and Alfred Vail, Morse code was designed for telegraphic communication. Alongside letters, **morse code numbers** were introduced to make the system practical for real-world use. They allowed operators to transmit essential numerical data efficiently.

The sequence of Morse code numbers follows a logical pattern:

#### 

This structured design made **morse code numbers** easy to memorize and transmit quickly, ensuring efficiency during the peak of telegraphy.

##  **The Modern and Future Uses of Morse Code Numbers**

Even with advanced technology, **morse code numbers** remain valuable today. Amateur radio operators, military personnel, and emergency responders still use them as a reliable backup communication method.

In aviation, navigation aids such as VOR stations broadcast identifiers that include Morse code numbers, allowing pilots to confirm locations accurately. In cybersecurity, morse code numbers have even been used to encode data, demonstrating their versatility in the digital era.

With the resurgence of retro technologies and DIY electronics, morse code numbers are also being incorporated into wearable tech, microcontroller projects, and educational tools.



###### **FAQs**

### **1\. What is the difference between Morse code letters and numbers?**

Morse code letters and numbers follow distinct patterns. Letters have a varying mix of short and long signals, whereas numbers follow a structured progression from “.----” (1) to “-----” (0).

### **2\. Is Morse code still used in military operations?**

Yes, Morse code is still taught to certain military personnel as a backup communication method, especially for covert and emergency transmissions.

### **3\. Can Morse code be used in cybersecurity?**

Yes, hackers have used Morse code to encode malicious scripts, demonstrating how it can be employed to bypass security filters.

### **4\. How are Morse code numbers used in aviation?**

Aviation navigation aids, such as VOR stations, transmit their identifiers in Morse code, including numbers, to help pilots confirm their location.
`

    return (
        <div className="bg-background w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none  h-fit flex flex-col ">


            <div className="max-w-5xl mx-auto">
                <Breadcrumb/>

                <Markdown remarkPlugins={[remarkGfm]} components={{
                    h1: ({}) =>             <Image
                    src={"/charts/numbers-chart.png"}
                    alt="Alphabet Chart"
                    width={1000}
                    height={1000}
                    className=" md:w-2/5  object-cover  my-10 rounded-lg shadow-lg mx-auto"
                />,
                    h2: ({ children }) => <h2 className="md:text-2xl/relaxed text-xl/relaxed  text-foreground font-medium  my-6   ">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl  font-medium my-4 text-foreground">{children}</h3>,
                    h4: ({}) => <MorseCodeTranslator/>,
                    h5:({children}) => <h1 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 "> {children}</h1>,
                    h6:({children}) => <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 "> {children}</h2>,

                    p: ({ children }) => <p className="mt-2 font-maitree  text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight">{children}</p>,
                    br: () => <br />,
                    li: ({ children }) => <li className="text-foreground list-disc md:ml-10 ml-4 my-2 font-maitree  text-lg/relaxed font-extralight">{children}</li>,
                    table: ({ children }) => <table className="table-auto md:w-2/3 w-[90%] mx-auto my-10">{children}</table>,
                    thead: ({ children }) => <thead className="bg-primary text-primary-foreground">{children}</thead>,
                    tbody: ({ children }) => <tbody>{children}</tbody>,
                    tr: ({ children }) => <tr className="  ">{children}</tr>,
                    th: ({ children }) => <th className="px-4 py-2">{children}</th>,
                    td: ({ children }) => <td className="border px-4 py-2">{children}</td>,

                }} >{overviewContent}</Markdown>
            </div>
            <FAQSchemaLD markup={`### **1\. What is the difference between Morse code letters and numbers?**

Morse code letters and numbers follow distinct patterns. Letters have a varying mix of short and long signals, whereas numbers follow a structured progression from “.----” (1) to “-----” (0).

### **2\. Is Morse code still used in military operations?**

Yes, Morse code is still taught to certain military personnel as a backup communication method, especially for covert and emergency transmissions.

### **3\. Can Morse code be used in cybersecurity?**

Yes, hackers have used Morse code to encode malicious scripts, demonstrating how it can be employed to bypass security filters.

### **4\. How are Morse code numbers used in aviation?**

Aviation navigation aids, such as VOR stations, transmit their identifiers in Morse code, including numbers, to help pilots confirm their location.
`} />
        </div>

    );

}