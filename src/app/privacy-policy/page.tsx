import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    // Apply styling inspired by morse-code-alphabets/page.tsx
    // Use bg-white, keep container padding and font styles for readability
    <main className="bg-[rgb(236,232,228)] w-[98%] mx-auto  container p-4 md:px-10 rounded-lg px-4 py-8 md:py-12 font-lexend text-[#372824]">
      <h1 className="text-3xl md:text-4xl font-bold text-[#456359] mb-6">
        Privacy Policy
      </h1>
      {/* Keep prose class for text content styling */}
      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="text-sm text-gray-500 mb-4">Effective Date: April 16, 2025</p>

        <p className="mb-4">
          At MorseCod.de, your privacy is important to us. This Privacy Policy outlines how we handle your information when you use our website and tools.
        </p>

        <h2 className="text-2xl font-semibold text-[#456359] mt-6 mb-3">1. Information We Collect</h2>
        <p className="mb-4">
          We do not collect any personally identifiable information (PII) when you use MorseCod.de. We also do not require you to create an account or share any personal data.
        </p>
        <p className="mb-4">
          However, like most websites, we may collect non-personal information such as:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Browser type and version</li>
          <li>Device type</li>
          <li>Referring website</li>
          <li>Time and date of access</li>
          <li>Pages visited</li>
        </ul>
        <p className="mb-4">
          This information is collected anonymously and is used solely to improve the performance and usability of our website.
        </p>

        <h2 className="text-2xl font-semibold text-[#456359] mt-6 mb-3">2. Use of Cookies</h2>
        <p className="mb-4">
          We may use cookies (small text files stored in your browser) to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Understand how visitors interact with our site</li>
          <li>Improve speed and performance</li>
          <li>Remember language preferences or settings</li>
        </ul>
        <p className="mb-4">
          You can choose to disable cookies through your browser settings. Disabling cookies will not prevent you from using our Morse code tools.
        </p>

        <h2 className="text-2xl font-semibold text-[#456359] mt-6 mb-3">3. Third-Party Services</h2>
        <p className="mb-4">
          We may use trusted third-party services such as Google Analytics or similar tools to analyze traffic and improve our site experience. These services may set their own cookies and collect anonymous usage data.
        </p>
        <p className="mb-4">
          We do not sell, rent, or share your data with advertisers or third-party marketers.
        </p>

        <h2 className="text-2xl font-semibold text-[#456359] mt-6 mb-3">4. Data Security</h2>
        <p className="mb-4">
          MorseCod.de uses HTTPS encryption to ensure a secure connection between your browser and our servers. Your input is not saved or stored after your session ends.
        </p>

        <h2 className="text-2xl font-semibold text-[#456359] mt-6 mb-3">5. Links to External Sites</h2>
        <p className="mb-4">
          Our website may contain links to other websites. Please note that we are not responsible for the content or privacy practices of these external sites.
        </p>

        <h2 className="text-2xl font-semibold text-[#456359] mt-6 mb-3">6. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Any changes will be posted here with an updated effective date.
        </p>

        <h2 className="text-2xl font-semibold text-[#456359] mt-6 mb-3">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, feel free to reach out:
        </p>
        <p>
          📧 <a href="mailto:hello@morsecod.de" className="text-[#456359] hover:underline">hello@morsecod.de</a>
        </p>
      </div>
    </main>
  );
}
