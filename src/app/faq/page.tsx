
import React from 'react';
import Breadcrumb from '@/components/breadcrumb';
import { Metadata } from 'next';

//make pages self-canonical

export const generateMetadata = async (): Promise<Metadata> => {
  const PUBLIC_URL = process.env.NEXT_PUBLIC_URL || '';

  return {
    title: 'Faq | Morsecodeholistic.com',
    description: 'Faq | Morsecodeholistic.com',
    openGraph: {
      title: 'Faq | Morsecodeholistic.com',
      description: 'Faq | Morsecodeholistic.com',
    },
    alternates: {
      canonical: `${PUBLIC_URL}/faq`,
    },
  };
}


export default function FaqPage() {
  return (
    // Apply styling inspired by previous pages (AboutUs, ContactUs, etc.)
    <main className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none h-fit flex flex-col">
      {/* Breadcrumb navigation */}
      <div className='max-w-5xl mx-auto w-full '>
        <Breadcrumb />
      </div>
      {/* Main content container */}
      <div className="max-w-5xl mx-auto w-full py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#456359] mb-6">
          FAQ – Frequently Asked Questions
        </h1>
        <div className="text-[#372824]">

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium mt-6 mb-3">🔹 What is Morse code?</h2>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            Morse code is a method of transmitting text using a series of dots (.) and dashes (–) to represent letters and numbers. It’s been used in telecommunication since the 1800s and is still popular among radio operators and survival enthusiasts.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium mt-6 mb-3">🔹 How do I use MorseCod.de?</h2>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            Just type your text into the input box, choose your language (if applicable), and our tool will instantly translate it to Morse code or decode Morse into readable text.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium mt-6 mb-3">🔹 Does this tool support non-English languages?</h2>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            Yes! While English is the default, we’re working to add support for other Latin-alphabet-based languages. Support for accented characters may vary, but we’re continuously updating.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium mt-6 mb-3">🔹 Can I use this tool offline?</h2>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            Currently, MorseCod.de is web-based. We may consider adding offline functionality or a mobile app in the future.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium mt-6 mb-3">🔹 Is this tool free to use?</h2>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            Absolutely! Our goal is to make Morse code accessible for everyone. No fees or sign-ups required.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium mt-6 mb-3">🔹 Is my data safe?</h2>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            Yes — we do not collect or store any user-entered data. Your privacy is important to us.
          </p>

        </div>
      </div>
    </main>
  );
}
