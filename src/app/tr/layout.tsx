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


const PUBLIC_URL = https://morsecodeholistic.com;

export const metadata: Metadata = {
  title: "Mors Alfabesi Çeviri - İngilizceyi Anında Mors Koduna Dönüştürün ve Çözün",
  description: "Ücretsiz Mors Alfabesi Çeviri aracımızla İngilizceyi anında mors koduna çevirin veya mors kodunu çözün. Sesli oynatma ve paylaşım seçenekleriyle kolayca mors sinyalleri üretin, dönüştürün ve okuyun.",
  alternates: {
    canonical: `${PUBLIC_URL}/tr`,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${maitree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
