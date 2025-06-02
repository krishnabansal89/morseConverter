import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Maitree } from "next/font/google";
import { Navbar } from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["600"],
  style: "normal",
  variable: "--font-poppins",
  subsets: ["latin"],
  preload: true,
});

const maitree = Maitree({
  weight: ["400", "700"],
  style: "normal",
  variable: "--font-maitree",
  subsets: ["latin"],
  preload: true,
});

const PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

export const metadata: Metadata = {
  title: "Morse Code Translator - Convert & Decode English to Morse Code Instantly",
  description: "Translate English to Morse code and vice versa instantly with our free Morse Code Translator. Convert, decode, and generate Morse signals easily with audio playback and sharing options.",
  alternates: {
    canonical: `${PUBLIC_URL}/`,
  }
};

const languages = ['de', 'es', 'it', 'fr', 'tr', 'pt', 'vi', 'ru'];
const alternateLinks = languages.map((lang) => {
  return {
    href: `${PUBLIC_URL}/${lang}`,
    hrefLang: lang,
  };
});

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Morse Code",
  "alternateName": "Morse Code Translator",
  "url": "https://www.morsecodeholistic.com/",
  "logo": "https://www.morsecodeholistic.com/_next/image?url=%2Flogo.png&w=128&q=75",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "9702371374",
    "contactType": "technical support",
    "contactOption": "TollFree",
    "areaServed": ["US", "GB", "CA"],
    "availableLanguage": ["en", "es", "fr", "tr", "pt", "vi", "ru", "Hindi"]
  },
  "sameAs": [
    "http://www.youtube.com/@LearnMorseCode-l4u",
    "https://www.pinterest.com/morsecodde/",
    "https://www.reddit.com/user/Western_Hunter821/"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
        <link
          rel="canonical"
          hrefLang="en"
          href={`${process.env.NEXT_PUBLIC_URL}`}
        />
        {alternateLinks.map((link) => (
          <link
            key={link.hrefLang}
            href={link.href}
            rel="alternate"
            hrefLang={link.hrefLang}
          />
        ))}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${maitree.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <GoogleAnalytics gaId="G-FVT0DZM79K" />
      </body>
    </html>
  );
}