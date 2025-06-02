
import { Metadata } from "next";

import { Geist, Geist_Mono, Poppins, Maitree } from "next/font/google";


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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${maitree.variable}`}>
      <body className="bg-white">
        {children}
      </body>
    </html>
  );
}

