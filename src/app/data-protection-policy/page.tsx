
import React from 'react';
import Breadcrumb from '@/components/breadcrumb';
import { Metadata } from 'next';

//make pages self-canonical

export const generateMetadata  = async (): Promise<Metadata> => {
  const PUBLIC_URL = process.env.NEXT_PUBLIC_URL || '';

  return {
    title: 'Data Protection Policy | Morsecodeholistic.com',
    description: 'Data Protection Policy for Morsecodeholistic.com',
    openGraph: {
      title: 'Data Protection Policy | Morsecodeholistic.com',
      description: 'Data Protection Policy for Morsecodeholistic.com',
    },
    alternates: {
      canonical: `${PUBLIC_URL}/data-protection-policy`,
    },
  };
}

export default function DataProtectionPolicyPage() {
  return (
    // Apply styling inspired by previous pages
    <main className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none h-fit flex flex-col">
      {/* Breadcrumb navigation */}
      <div className='max-w-5xl mx-auto w-full '>
        <Breadcrumb />
      </div>
      {/* Main content container */}
      <div className="max-w-5xl mx-auto w-full py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#456359] mb-6">
          🛡️ Data Protection Policy
        </h1>
        <div className="text-[#372824]">
          <p className="mb-4 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight">Effective Date: April 16, 2025</p>

          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            At MorseCod.de, we are committed to protecting the privacy, integrity, and security of your data. This Data Protection Policy explains how we handle, store, and safeguard any information related to your use of our website and services.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium my-6">1. Our Commitment to Data Protection</h2>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            We value your trust and aim to:
          </p>
          <ul className="mb-4">
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Limit the collection of data to the bare minimum needed for functionality and performance.</li>
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Never store personal data unnecessarily.</li>
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Ensure any data processing is secure, transparent, and respectful of your privacy.</li>
          </ul>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium my-6">2. Minimal Data Collection</h2>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            MorseCod.de is designed with privacy by default. We do not:
          </p>
          <ul className="mb-4">
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Collect personal data (such as names, emails, or addresses)</li>
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Track users across websites</li>
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Require account creation</li>
          </ul>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            The only information collected is non-identifiable technical data (such as browser type or device) to improve website performance and user experience.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium my-6">3. Legal Basis for Processing Data</h2>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            In line with GDPR and other global data protection laws, we process any technical data on the basis of:
          </p>
          <ul className="mb-4">
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Legitimate interest – to ensure our site functions properly</li>
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Consent – when optional cookies or analytics are enabled (where applicable)</li>
          </ul>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            We never use your data for profiling, advertising, or any unrelated purpose.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium my-6">4. Data Storage and Retention</h2>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            We do not store user-submitted content (e.g., Morse code inputs or translations). All translations are processed in real time and are not saved or logged.
          </p>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            Technical logs (like server errors or analytics data) may be stored temporarily to improve stability and detect issues. These are automatically deleted after a limited time.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium my-6">5. Data Security Measures</h2>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            We use up-to-date security practices to protect any technical or system-related data, including:
          </p>
          <ul className="mb-4">
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">HTTPS encryption</li>
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Secure server environments</li>
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Regular software updates and patches</li>
          </ul>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium my-6">6. User Rights Under GDPR</h2>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            If you are located in the EU/EEA, you have the right to:
          </p>
          <ul className="mb-4">
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Know what data is collected (right to access)</li>
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Request correction or deletion of your data (right to rectification and erasure)</li>
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Object to or restrict processing (right to object)</li>
            <li className="text-[#2d2d2d] list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Withdraw consent (if applicable)</li>
          </ul>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            To exercise any of these rights, contact us at <a href="mailto:hello@morsecod.de" className="text-[#456359] hover:underline">hello@morsecod.de</a>.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-[#2d2d2d] font-medium my-6">7. Contact Us</h2>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            For questions, concerns, or data access requests, please reach out to:
          </p>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            📧 Email: <a href="mailto:hello@morsecod.de" className="text-[#456359] hover:underline">hello@morsecod.de</a>
          </p>
          <p className="mt-2 font-maitree text-[#2d2d2d] md:ml-4 ml-2 text-lg/relaxed font-extralight">
            We will respond to all inquiries within 30 days, as required by applicable data protection laws.
          </p>
        </div>
      </div>
    </main>
  );
}
