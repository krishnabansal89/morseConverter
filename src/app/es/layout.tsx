import { Metadata } from "next";

import { Geist, Geist_Mono, Poppins, Maitree } from "next/font/google";
import { getPublicUrl } from "@/lib/env";


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


const PUBLIC_URL = getPublicUrl();

export const metadata: Metadata = {
  title: "Código Morse Traductor - Convierte y Decodifica Inglés a Código Morse al Instante",
  description: "Traduce texto en inglés a código Morse y viceversa con nuestro traductor gratuito de código Morse. Convierte, decodifica y genera señales Morse fácilmente con reproducción de audio y opciones para compartir.",
  alternates: {
    canonical: `${PUBLIC_URL}/es`,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${maitree.variable}`}>
      <body className="bg-white">
        {children}
      </body>
    </html>
  );
}
