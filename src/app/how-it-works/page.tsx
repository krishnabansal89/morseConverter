
import React from 'react';
import Breadcrumb from '@/components/breadcrumb';
import { Metadata } from 'next';

//make pages self-canonical

export const generateMetadata = async (): Promise<Metadata> => {
  const PUBLIC_URL = process.env.NEXT_PUBLIC_URL || '';

  return {
    title: 'How It Works | Morsecodeholistic.com',
    description: 'How It Works | Morsecodeholistic.com',
    openGraph: {
      title: 'How It Works | Morsecodeholistic.com',
      description: 'How It Works | Morsecodeholistic.com',
    },
    alternates: {
      canonical: `${PUBLIC_URL}/how-it-works`,
    },
  };
}


export default function HowItWorksPage() {
  return (
    // Apply styling inspired by AboutUsPage/PrivacyPolicyPage
    <main className="bg-background w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none h-fit flex flex-col">
      {/* Breadcrumb navigation */}
      <div className='max-w-5xl mx-auto w-full '>
        <Breadcrumb />
      </div>
      {/* Main content container */}
      <div className="max-w-5xl mx-auto w-full py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          How It Works
        </h1>
        <div className="text-foreground">
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            At Morsecodeholistic, we’ve designed a fast, accurate Morse code translator that’s simple enough for beginners and powerful enough for enthusiasts.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">1. Input Your Message</h2>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            Enter your text (in English or another supported language) or paste Morse code using dots (.) and dashes (-).
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">2. Automatic Detection</h2>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            Our tool automatically detects whether you’re entering plain text or Morse code and performs the correct translation.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">3. Instant Translation</h2>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            The translation appears immediately. You can copy it with a click, or even listen to the Morse code (if audio support is enabled).
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">4. Clean Output</h2>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            We format the output to reflect international Morse code standards, including spacing and accurate symbol representation.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium my-6">Bonus Features:</h2>
          <ul className="mb-4">
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Language toggling (where supported)</li>
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Copy to clipboard button</li>
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Real-time conversion</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
