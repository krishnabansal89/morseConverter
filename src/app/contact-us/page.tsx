
import React from 'react';
import Breadcrumb from '@/components/breadcrumb';
import { Metadata } from 'next';

//make pages self-canonical

export const generateMetadata = async (): Promise<Metadata>    => {
  const PUBLIC_URL = process.env.NEXT_PUBLIC_URL || '';

  return {
    title: 'Contact Us | Morsecodeholistic.com',
    description: 'Contact Us for Morsecodeholistic.com',
    openGraph: {
      title: 'Contact Us | Morsecodeholistic.com',
      description: 'Contact Us for Morsecodeholistic.com',
    },
    alternates: {
      canonical: `${PUBLIC_URL}/contact-us`,
    },
  };
}


export default function ContactUsPage() {
  return (
    // Apply styling inspired by AboutUsPage/PrivacyPolicyPage
    <main className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none h-fit flex flex-col">
      {/* Breadcrumb navigation */}
      <div className='max-w-5xl mx-auto w-full '>
        <Breadcrumb />
      </div>
      {/* Main content container */}
      <div className="max-w-5xl mx-auto w-full py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#456359] mb-6">
          📬 Contact Us
        </h1>
        <div className="text-[#372824]">
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            Got a question, suggestion, or just want to say hello? We’d love to hear from you!
          </p>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            Feel free to reach out for:
          </p>
          <ul className="mb-4">
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Feedback or bug reports</li>
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Collaboration opportunities</li>
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Language support suggestions</li>
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">General inquiries</li>
          </ul>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium my-6">📧 Email</h2>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            <a href="mailto:hello@Morsecodeholistic" className="text-[#456359] hover:underline">hello@Morsecodeholistic</a>
          </p>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight">
            We usually respond within 7 business days.
          </p>
        </div>
      </div>
    </main>
  );
}
