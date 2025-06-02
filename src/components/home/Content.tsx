import Markdown from "react-markdown";

export default function Content() {
  const content = `## **The Ultimate Online Morse Code Translator & Generator \- Encode & Decode From Text to English**

Looking for the best Morse Code Translator? Our advanced Morse Code Generator converts English to Morse Code and vice versa with exceptional accuracy and speed. Whether you need a Morse Code Decoder to **decipher messages** or a Morse Translator to encode them, our tool is designed to meet your needs. With a user-friendly interface and instant processing, you can seamlessly translate Morse Code to English or convert Text to Morse Code in just seconds.

## **Why Choose Our Morse Code Translator?**

* **Instant & Accurate Conversion:** Easily translate **English to Morse Code** and back with precision.  
* **Simple & Intuitive Interface:** No technical knowledge required—just enter text and translate instantly.  
* **Supports All Morse Code Variants:** Includes international Morse code standards for accuracy.  
* **100% Free & Accessible:** Use our **Morse Code Generator** online without any cost.  
* **Mobile-Friendly & Fast:** Works flawlessly on all devices, ensuring accessibility anywhere.

## **How to Use the Morse Code Translator**

1. **Enter Text or Morse Code:** Input English text or Morse code symbols.  
2. **Click ‘Translate’:** Our advanced **Morse Code Decoder** will instantly convert your text.  
3. **Copy or Share:** Copy the translated output or share it with others with a single click.

## **Morse Code Generator \- Easily Create Morse Signals**

Need a tool to generate Morse code signals? Our **Morse Code Generator** converts text into Morse beeps in real time. Whether you’re learning Morse for ham radio, emergency communication, or personal interest, our tool provides an easy and efficient way to practice Morse code.

## **Convert Morse Code to English Instantly**

If you have a series of dots and dashes and need a **Morse Code Decoder**, our tool provides real-time conversion. Simply enter the Morse code, and our system will translate it back to English immediately.

## **Features of Our Morse Code Translator**

* **Bidirectional Translation:** Easily switch between **Morse Code to English** and **English to Morse Code**.  
* **Audio Playback:** Listen to Morse code beeps to reinforce learning.  
* **Copy & Share Functionality:** Easily share your Morse code translations.  
* **Educational & Practical Uses:** Ideal for learning, testing, and emergency communication.

## **Common Morse Code Translations**

Here are some quick Morse code conversions for commonly used words:

* **Hello:** …. . .-.. .-.. \---  
* **SOS:** … \--- …  
* **Love:** .-.. \--- …- .  
* **Yes:** \-.-- . …  
* **No:** \-. \---

`;
  return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg md:pt-20 pt-10 rounded-b-none rounded-t-none shadow-lg  font-poppins">
      <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center md:mb-12 mb-8 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 ">Morse Code Simplified </h2>
      <Markdown components={{
        h2: ({ children }) => <h2 className="md:text-2xl/relaxed text-xl/relaxed  text-[#2d2d2d] font-medium  my-6   ">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl  font-medium my-4 text-[#2d2d2d]">{children}</h3>,
        p: ({ children }) => <p className="mt-2 font-maitree  text-[#2d2d2d] ml-4 text-lg/relaxed font-extralight">{children}</p>,
        br: () => <br />,
        li: ({ children }) => <li className="text-[#2d2d2d] list-disc ml-10 font-maitree  text-lg/relaxed font-extralight">{children}</li>,
      }} >{content}</Markdown>
    </div>
  );
}
