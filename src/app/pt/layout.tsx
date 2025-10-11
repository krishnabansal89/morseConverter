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
  title: "Código Morse Tradutor – Converta e Decodifique Inglês para Código Morse Instantaneamente",
  description: "Traduza instantaneamente do inglês para código Morse e vice-versa com nosso Código Morse Tradutor gratuito. Converta, decodifique e gere sinais de Morse com reprodução de áudio e opções de compartilhamento.",
  alternates: {
    canonical: `${PUBLIC_URL}/pt`,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${maitree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
