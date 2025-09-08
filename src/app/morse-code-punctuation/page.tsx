// app/morse-code-punctuation/page.tsx
import Markdown from "react-markdown";
import Breadcrumb from "@/components/breadcrumb";
import { FAQSchemaLD } from "@/components/FAQSchemaLD";
import remarkGfm from "remark-gfm";

export async function generateMetadata() {
  const PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

  return {
    title:
      "Morse Code Punctuation – Complete Guide with Interactive Player & Reference",
    description:
      "Learn Morse code punctuation: period, comma, question mark, quotes, slash, plus, equals, hyphen, colon, semicolon and more. Includes an interactive player and quick-reference table.",
    openGraph: {
      title:
        "Morse Code Punctuation – Complete Guide with Interactive Player & Reference",
      description:
        "Learn Morse code punctuation with examples and an interactive player. Perfect for learners, students, and radio enthusiasts.",
    },
    alternates: {
      canonical: `${PUBLIC_URL}/morse-code-punctuation`,
    },
  };
}

const markdownContent = `
# **Morse Code Punctuation**

## **How to Add Clarity to Your Dots and Dashes**
When most people think of Morse code, they picture short and long beeps sending out secret messages across oceans. But Morse code isn’t just about letters and numbers—it also includes punctuation. Without punctuation, messages could get confusing very quickly. Imagine writing a letter or an email with no commas, no question marks, no periods—chaos, right? That’s exactly why Morse code punctuation was created.

In this article, we’ll explore what Morse code punctuation is, why it matters, and how to use it correctly. We’ll also answer common questions so that by the end, you’ll know exactly how to make your messages in dots and dashes crystal clear.

---

## **What Is Morse Code Punctuation?**

Morse code punctuation is a system of signals that represent symbols like periods, commas, question marks, and more. While the original Morse code was designed to send letters and numbers, operators quickly realized that real communication needs more than just words. You need ways to end sentences, ask questions, or show excitement—just like in everyday writing.

Each punctuation mark in Morse code is a unique sequence of dots (short signals) and dashes (long signals). For example:

* **Period (.)** is \`· – · – · –\`
* **Comma (,)** is \`– – · · – –\`
* **Question mark (?)** is \`· · – – · ·\`

These codes make it possible to transmit full, understandable sentences instead of a jumble of words.

---

## **Why Punctuation Matters in Morse Code**

Think about this sentence:

"Let's eat, grandma."

Now remove the comma:

“Let's eat grandma.”

See how a tiny mark completely changes the meaning? Morse code punctuation prevents these kinds of misunderstandings. Whether it's military communication, maritime navigation, or amateur radio enthusiasts sending messages, punctuation ensures that instructions or information are clear.

It’s not just about clarity—it’s also about speed. Skilled operators can send punctuation marks seamlessly, avoiding the need to explain pauses or intentions manually.

---

## **Common Morse Code Punctuation Marks**

Here’s a list of widely used punctuation marks and their codes:

* **Period (.)** – \`· – · – · –\`
* **Comma (,)** – \`– – · · – –\`
* **Question mark (?)** – \`· · – – · ·\`
* **Apostrophe (’)** – \`· – – – – ·\`
* **Colon (:)** – \`– – – · · ·\`
* **Semicolon (;)** – \`– · – · – ·\`
* **Hyphen (-)** – \`– · · · · –\`
* **Slash (/)** – \`– · · – ·\`
* **Quotation marks (")** – \`· – · · – ·\`
* **Equals (=)** – \`– · · · –\`
* **Plus (+)** – \`· – · – ·\`

While modern texting makes adding punctuation automatic, Morse code requires you to learn these patterns just like letters.

---

## **Tips for Learning Morse Code Punctuation**

1. **Learn the letters first** – Punctuation is easier once you're already fluent in A to Z and numbers.
2. **Practice with short messages** – Add punctuation gradually to avoid overwhelming yourself.
3. **Use flashcards or apps** – Many Morse code trainers include punctuation drills.
4. **Group similar patterns** – Notice how some marks have repeating rhythms (like the period vs. plus sign).
5. **Listen as well as read** – Morse code is both audible and visual. Hearing punctuation in real time helps you recognize it faster.

---

## **Bringing It All Together**

Morse code punctuation might seem like a small detail, but it makes a huge difference. Whether you’re using it for fun, study, or serious communication, knowing these symbols will take your Morse code skills to the next level.

Just like writing a proper sentence, adding punctuation to your dots and dashes shows precision and respect for the person receiving your message. So next time you send "HELLO HOW ARE YOU," remember—you can make it much friendlier with a simple \`· – · – · –\` at the end.

Learning Morse code punctuation is like adding seasoning to food. Without it, the message works, but with it, everything tastes—or rather, reads—so much better.

---

##### **FAQs**

### **1. Did the original Morse code include punctuation?**
Not at first. The earliest Morse code (developed in the 1830s and 1840s by Samuel Morse and Alfred Vail) focused on letters and numbers. As telegraph use expanded, punctuation was added to improve communication accuracy.

### **2. Which punctuation marks are used most often?**
The period, comma, and question mark are by far the most common. In military or maritime communication, you may also see the slash and hyphen frequently.

### **3. Do people still use Morse code punctuation today?**
Yes—especially among amateur (ham) radio operators and in aviation or maritime contexts. It’s less common in everyday communication, but enthusiasts and professionals still rely on it.

### **4. Is Morse code punctuation the same in all countries?**
Mostly yes. International Morse code standardized these symbols so that operators worldwide could communicate without confusion. However, small variations existed in early national systems.

### **5. How can I memorize Morse code punctuation faster?**
Start with the ones you'll use most (period, comma, question mark). Practice them in context by sending simple sentences like “HELLO. HOW ARE YOU?” until they feel natural.

### **6. Can punctuation be skipped in Morse code messages?**
Technically yes—but it can lead to misunderstandings. Skilled operators might use pauses instead of punctuation, but adding the actual marks keeps the message clear and professional.

---

`;

const faqMarkup = `
### **1\. Did the original Morse code include punctuation?**

Not at first. The earliest Morse code focused on letters and numbers. As telegraph use expanded, punctuation was added to improve communication accuracy.

### **2\. Which punctuation marks are used most often?**

Period, comma, and question mark are most common. In military or maritime communication, slash and hyphen are also frequent.

### **3\. Do people still use Morse code punctuation today?**

Yes—especially among amateur (ham) radio operators and in aviation/maritime contexts.

### **4\. Is Morse code punctuation the same in all countries?**

Mostly yes—International Morse code standardized these symbols, with minor historical variations.

### **5\. How can I memorize Morse code punctuation faster?**

Start with the most common ones and practice in context (e.g., "HELLO. HOW ARE YOU?").

### **6\. Can punctuation be skipped in Morse code messages?**

It can, but it risks ambiguity. Using the actual marks keeps messages clear and professional.
`;

export default function Page() {
  return (
    <div className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none h-fit flex flex-col">
      <div className="max-w-5xl mx-auto mb-20">
        <Breadcrumb />


        {/* Article */}
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) =><h1 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium   tracking-tight md:px-10 "> {children}</h1>,
            h2: ({ children }) => <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium my-6">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-medium my-4 text-[#2d2d2d]">{children}</h3>,
            h5: ({ children }) => <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-medium tracking-tight md:px-10">{children}</h2>,
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
            code: ({ children }) => (
              <code className="rounded bg-[#f2f2f2] px-1 py-0.5 text-sm">
                {children}
              </code>
            ),
          }}
        >
          {markdownContent}
        </Markdown>
      </div>

      {/* JSON-LD FAQ */}
      <FAQSchemaLD markup={faqMarkup} />
    </div>
  );
}
