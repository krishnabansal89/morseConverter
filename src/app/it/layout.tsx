
import { Metadata } from "next";

import { Geist, Geist_Mono, Poppins, Maitree } from "next/font/google";

import { Navbar } from "../components/home/Navbar";

import Footer from "../components/home/Footer";

import "../globals.css";

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
  title: "Codice Morse Traduttor - Converti e Decodifica Inglese in Codice Morse Istantaneamente",
  description: "Traduci istantaneamente dall’inglese al codice Morse e viceversa con il nostro Codice Morse Traduttor gratuito. Converti, decodifica e genera segnali Morse facilmente, con riproduzione audio e opzioni di condivisione.",
  alternates: {
    canonical: `${PUBLIC_URL}/it`,
  }
};


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
    "areaServed": ["US","GB","CA"],
    "availableLanguage": ["en","es","fr","Hindi"]
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${maitree.variable}`}>
      <body className="bg-[rgb(236,232,228)]">
        {children}
      </body>
    </html>
  );
}

