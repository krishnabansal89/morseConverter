
import React from 'react';
import Breadcrumb from '@/components/breadcrumb';
import { Metadata } from 'next';

//make pages self-canonical

export const generateMetadata = async (): Promise<Metadata> => {
  const PUBLIC_URL = process.env.NEXT_PUBLIC_URL || '';

  return {
    title: 'About Us | Morsecodeholistic',
    description: 'Learn more about Morsecodeholistic and our mission.',
    openGraph: {
      title: 'About Us | Morsecodeholistic',
      description: 'Learn more about Morsecodeholistic and our mission.',
    },
    alternates: {
      canonical: `${PUBLIC_URL}/about-us`,
    },
  };
}

export default function AboutUsPage() {
  return (
    // Apply styling inspired by PrivacyPolicyPage
    <main className="bg-background w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none h-fit flex flex-col">
      {/* Breadcrumb navigation */}
      <div className='max-w-5xl mx-auto w-full '>
        <Breadcrumb />
      </div>
      {/* Main content container */}
      <div className="max-w-5xl mx-auto w-full py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          About Us
        </h1>
        <div className="text-foreground">
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            Welcome to Morsecodeholistic — your go-to destination for quick and accurate Morse code translation.
          </p>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            Whether you&apos;re a hobbyist, a student, a radio enthusiast, or simply curious about Morse code, our tool is designed to make the process of encoding and decoding as smooth as possible. With just a few clicks, you can convert English or other supported languages into Morse code, or decode Morse messages back into readable text.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">Why We Built This Tool</h2>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            Morse code is one of the oldest and most fascinating methods of communication. Even in the digital age, it still finds relevance in aviation, amateur radio, and survival training. However, translating Morse code by hand can be time-consuming and prone to error — that’s where we come in.
          </p>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            We created Morsecodeholistic to simplify Morse code translation for everyone. Whether you&apos;re working on a school project, sending a secret message to a friend, or brushing up on communication methods, our intuitive tool makes it easy to:
          </p>
          <ul className="mb-4">
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Convert text to Morse code</li>
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Decode Morse code into plain text</li>
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Support multiple languages (where applicable)</li>
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Learn and practice Morse with accuracy and speed</li>
          </ul>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">What Makes Us Different</h2>
          <ul className="mb-4">
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight"><strong>Fast & Easy to Use</strong> – Just type, paste, or tap, and get instant results.</li>
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight"><strong>Clean Interface</strong> – No distractions. Just pure functionality.</li>
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight"><strong>Free Access</strong> – No login, no fees — just tools that work.</li>
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight"><strong>Accurate Translations</strong> – Built with attention to the true structure of Morse code.</li>
          </ul>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">Our Mission</h2>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            To make Morse code accessible and understandable to everyone. Whether for learning, emergency preparedness, or just fun, Morsecodeholistic is here to help you connect with the past in a modern way.
          </p>
        </div>
      </div>
    </main>
  );
}
