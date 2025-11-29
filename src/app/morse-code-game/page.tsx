import Markdown from "react-markdown";
import Breadcrumb from "@/components/breadcrumb";
import { FAQSchemaLD } from '@/components/FAQSchemaLD';
import remarkGfm from 'remark-gfm'
import MorseCodeGame from "@/components/ui/game";

export const metadata = {
  title: "Morse Code Game - Guess the Word | Learn & Practice CW",
  description: "Test your listening skills with our interactive Morse Code Game. Improve your WPM speed, learn to decode dots and dashes, and challenge yourself with adaptive difficulty levels.",
  keywords: ["Morse code game", "learn Morse code", "Morse code practice", "CW training", "guess the word", "audio game", "ham radio practice"],
  openGraph: {
    title: "Morse Code Game - Guess the Word | Learn & Practice CW",
    description: "Test your listening skills with our interactive Morse Code Game. Improve your WPM speed, learn to decode dots and dashes, and challenge yourself with adaptive difficulty levels.",
  },
}

const markdownContent = `
##### Master Morse Code Through Play

####

Welcome to the ultimate **Morse Code Game**, designed for both beginners and experienced enthusiasts. Whether you're an amateur radio operator (ham radio) looking to keep your CW skills sharp or a curious learner wanting to decode the secret language of dots and dashes, this game provides the perfect practice environment.

Unlike static charts or visual translators, our game focuses on **audio proficiency** - the most critical skill for real-world Morse code usage. By listening to words played at varying speeds, you train your brain to recognize rhythmic patterns instantly, moving beyond simple letter-by-letter translation.

---

## **Game Features**

### **1. Adaptive Speed**
Start at a challenging 20 WPM. If you struggle, the game intelligently slows down to match your pace, ensuring you're always learning, not just frustrated.

### **2. Audio-First Training**
Immerse yourself in high-quality CW tones. Our oscillator generates clear, crisp sounds that mimic real telegraph keys for an authentic experience.

### **3. Instant Feedback**
Get immediate visual cues as you type. Correct letters light up green, helping you confirm what you heard and correct mistakes in real-time.

---

## **How to Improve Your Scores**

1. **Stop Counting Dots** – Don't try to count "dit dit dit dah". Instead, learn to hear the rhythm as a whole sound or "song" for each letter.

2. **Use Head-Copying** – Try to hold the letters in your head and form the word before typing. This "buffer" is essential for high-speed copying.

3. **Guess Contextually** – If you miss a letter, leave a blank (\`_\`) and keep listening. Often, you can guess the word from the remaining letters.

---

## **Why Learn Morse Code?**

Invented by Samuel Morse in the 1830s, this binary communication method revolutionized the world. Today, it remains a vital skill for:

* **Emergency communication** when complex signals fail
* **Low-power, long-distance amateur radio contacts (DXing)**
* **Cognitive training** and memory improvement
* **A fun, challenging hobby** that connects you to history

---

###### FAQs – Morse Code Game

**Q1: Is this game suitable for complete beginners?**

Yes! While it helps to know the alphabet, the adaptive speed makes it accessible. Use our chart to learn the letters first if needed.

**Q2: Does the game work on mobile?**

Absolutely. The interface is fully responsive, allowing you to practice Morse code on your phone or tablet anywhere.

**Q3: What happens if I run out of tries?**

The game will reveal the correct word so you can learn from your mistake, and then you can start a new round.

**Q4: Can I track my progress?**

Yes, the game tracks your high score locally on your device, so you can challenge yourself to beat your personal best.
`

export default function GamePage() {
  return (
    <div className="bg-background text-foreground w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none h-fit flex flex-col">
      <div className="max-w-5xl mx-auto mb-20">
        <Breadcrumb />

        <Markdown remarkPlugins={[remarkGfm]} components={{
            h1: ({ }) => <div />,
            h2: ({ children }) => <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-medium my-4 text-foreground">{children}</h3>,
            h4: ({ }) =>
                <div className="editor-container w-[98%] md:px-4 mx-auto h-fit flex justify-center items-center">
                    <div className="editor-window w-full h-full bg-card rounded-lg shadow-lg mb-10">
                        <MorseCodeGame />
                    </div>
                </div>,
            h5: ({ children }) => <h1 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-bold tracking-tight md:px-10"> {children}</h1>,
            h6: ({ children }) => <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium tracking-tight md:px-10"> <strong> {children} </strong></h2>,
            p: ({ children }) => <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight">{children}</p>,
            br: () => <br />,
            li: ({ children }) => <li className="text-foreground list-disc md:ml-10 ml-4 my-2 font-maitree text-lg/relaxed font-extralight">{children}</li>,
            table: ({ children }) => <table className="table-auto md:w-2/3 w-[90%] mx-auto my-10">{children}</table>,
            thead: ({ children }) => <thead className="bg-primary text-primary-foreground">{children}</thead>,
            tbody: ({ children }) => <tbody>{children}</tbody>,
            tr: ({ children }) => <tr className="">{children}</tr>,
            th: ({ children }) => <th className="px-4 py-2">{children}</th>,
            td: ({ children }) => <td className="border px-4 py-2">{children}</td>,
            strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
        }} >{markdownContent}</Markdown>
      </div>
      
      <FAQSchemaLD markup={`### **1. Is this game suitable for complete beginners?**
Yes! While it helps to know the alphabet, the adaptive speed makes it accessible. Use our chart to learn the letters first if needed.

### **2. Does the game work on mobile?**
Absolutely. The interface is fully responsive, allowing you to practice Morse code on your phone or tablet anywhere.

### **3. What happens if I run out of tries?**
The game will reveal the correct word so you can learn from your mistake, and then you can start a new round.

### **4. Can I track my progress?**
Yes, the game tracks your high score locally on your device, so you can challenge yourself to beat your personal best.
`} />
    </div>
  )
}
