
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
  title: "Morsecode-Übersetzer – Englisch in Morsecode umwandeln & entschlüsseln",
  description: "Übersetze Englisch in Morsecode und umgekehrt – sofort und kostenlos mit unserem Morsecode-Übersetzer. Einfach umwandeln, entschlüsseln und Morse-Signale mit Audio-Wiedergabe und Sharing-Funktion generieren",
  alternates: {
    canonical: `${PUBLIC_URL}/de`,
  }
};




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${maitree.variable}`}>
      <body className="bg-white">        
        {children}
      </body>
    </html>
  );
}

