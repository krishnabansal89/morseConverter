import Markdown from "react-markdown";

export default function Faq() {
  const content = `

\
### **1\. What is Morse Code?**

Morse code is a method of encoding text using dots (.) and dashes (-) to represent letters and numbers. Originally developed for telegraphy, it remains an essential tool for emergency communication.

### **2\. How do I use a Morse Code Translator?**

Simply enter text or Morse code in the input box, click ‘Translate,’ and receive instant results in either English or Morse code format.

### **3\. Can I listen to Morse Code audio?**

Yes\! Our **Morse Code Generator** allows you to hear Morse code beeps, making learning and practice easier.

### **4\. Is Morse Code still used today?**

Yes\! Morse code is still actively used in aviation, amateur radio (ham radio), and emergency signaling worldwide.

### **5\. Can I decode Morse code manually?**

Yes, but it requires memorizing Morse code symbols for each letter and number. Our **Morse Code Decoder** simplifies this by providing instant text conversion.

`;
  return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg py-20 rounded-b-none rounded-t-none shadow-lg  font-lexend">
            <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center mb-10 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 font-[lexend]">FAQs            </h2>
      <Markdown components={{
        h3: ({ children }) => <h3 className="text-xl font-medium my-4 text-[#2d2d2d]">{children}</h3>,
        body: ({ children }) => <p className="mt-2 text-[#2d2d2d] font-extralight">{children}</p>,
        br: () => <br />,
      }} >{content}</Markdown>
    </div>
  );
}
