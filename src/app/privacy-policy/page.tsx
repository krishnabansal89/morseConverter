import React from 'react';
import Breadcrumb from '@/components/breadcrumb';
import { Metadata } from 'next';
//make pages self-canonical

export const generateMetadata = async (): Promise<Metadata> => {
  const PUBLIC_URL = "https://morsecodeholistic.com";

  return {
    title: 'Privacy Policy | Morsecodeholistic.com',
    description: 'Privacy Policy for Morsecodeholistic.com',
    openGraph: {
      title: 'Privacy Policy | Morsecodeholistic.com',
      description: 'Privacy Policy for Morsecodeholistic.com',
    },
    alternates: {
      canonical: `${PUBLIC_URL}/privacy-policy`,
    },
  };
}

export default function PrivacyPolicyPage() {
  return (
    // Apply styling inspired by AlphabetOverview.tsx
    <main className="bg-background w-[98%] mx-auto p-4 md:px-10 rounded-lg rounded-b-none h-fit flex flex-col">
        {/* Breadcrumb navigation */}
      {/* Add max-width container like in AlphabetOverview */}
      <div className='max-w-5xl mx-auto w-full '>
                <Breadcrumb />

      </div>
      <div className="max-w-5xl mx-auto w-full py-8 md:py-12">
        
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Privacy Policy
        </h1>
        {/* Remove prose class and apply specific styles */}
        <div className="text-foreground">
          {/* Corrected conflicting classes: removed text-sm and text-gray-500 */}
          <p className="mb-4 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight">Effective Date: April 16, 2025</p>

          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            At Morsecodeholistic, your privacy is important to us. This Privacy Policy outlines how we handle your information when you use our website and tools.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">1. Information We Collect</h2>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            We do not collect any personally identifiable information (PII) when you use Morsecodeholistic. We also do not require you to create an account or share any personal data.
          </p>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            However, like most websites, we may collect non-personal information such as:
          </p>
          <ul className="mb-4">
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Browser type and version</li>
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Device type</li>
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Referring website</li>
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Time and date of access</li>
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Pages visited</li>
          </ul>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            This information is collected anonymously and is used solely to improve the performance and usability of our website.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">2. Use of Cookies</h2>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            We may use cookies (small text files stored in your browser) to:
          </p>
          <ul className="mb-4">
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Understand how visitors interact with our site</li>
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Improve speed and performance</li>
            <li className="text-foreground list-disc md:ml-10 ml-6 my-2 font-maitree text-lg/relaxed font-extralight">Remember language preferences or settings</li>
          </ul>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            You can choose to disable cookies through your browser settings. Disabling cookies will not prevent you from using our Morse code tools.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">3. Third-Party Services</h2>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            We may use trusted third-party services such as Google Analytics or similar tools to analyze traffic and improve our site experience. These services may set their own cookies and collect anonymous usage data.
          </p>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            We do not sell, rent, or share your data with advertisers or third-party marketers.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">4. Data Security</h2>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            Morsecodeholistic uses HTTPS encryption to ensure a secure connection between your browser and our servers. Your input is not saved or stored after your session ends.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">5. Links to External Sites</h2>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            Our website may contain links to other websites. Please note that we are not responsible for the content or privacy practices of these external sites.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">6. Changes to This Policy</h2>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            We may update this Privacy Policy from time to time. Any changes will be posted here with an updated effective date.
          </p>

          <h2 className="md:text-2xl/relaxed text-xl/relaxed text-foreground font-medium my-6">7. Contact Us</h2>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight mb-4">
            If you have any questions about this Privacy Policy, feel free to reach out:
          </p>
          <p className="mt-2 font-maitree text-foreground md:ml-4 ml-2 text-lg/relaxed font-extralight">
            📧 <a href="mailto:hello@Morsecodeholistic" className="text-primary hover:underline">hello@Morsecodeholistic</a>
          </p>
        </div>
      </div>
    </main>
  );
}
