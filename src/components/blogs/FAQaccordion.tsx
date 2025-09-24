// components/FAQAccordion.tsx
"use client"

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { FAQSchemaLD } from '@/components/FAQSchemaLD';

// Define the ptComponents directly in the client component
const clientPtComponents = {
  // Simplified version that only includes what's needed for FAQs
  block: {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-lg font-bold my-3">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-md font-bold my-2">{children}</h3>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-border pl-4 italic my-4 text-muted-foreground">{children}</blockquote>
    ),
    normal: ({ children }: { children: React.ReactNode }) => <p className="my-2">{children}</p>,
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside my-4 pl-4">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside my-4 pl-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => <li className="mb-1">{children}</li>,
    number: ({ children }: { children: React.ReactNode }) => <li className="mb-1">{children}</li>,
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-primary hover:underline">
          {children}
        </a>
      );
    },
  },
};

const FAQAccordion = ({ faqs }: { faqs: any[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let FaqMarkup: string = "";

  faqs.map(faq => {
    FaqMarkup += "### **1. " + faq.question + "**  " +  "\n\n" + (faq?.answer?.[0]?.children?.[0]?.text || "") + "\n\n"
  })

  

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq._key || index}
            className="border border-border rounded-lg overflow-hidden bg-card text-foreground"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full p-4 text-left bg-muted hover:bg-muted/80 transition-colors duration-200"
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-4 bg-card prose prose-sm dark:prose-invert max-w-none text-foreground">
                {/* @ts-expect-error: Unresolved */}
                <PortableText value={faq.answer} components={clientPtComponents} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <FAQSchemaLD markup={FaqMarkup} /> 

    </div>
  );
};

export default FAQAccordion;
