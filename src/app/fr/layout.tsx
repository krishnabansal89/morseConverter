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
  title: "Traducteur de Code Morse – Convertissez et Décodez l'Anglais en Code Morse Instantanément",
  description: "Traduisez instantanément l'anglais en code Morse et inversement avec notre traducteur morse gratuit. Convertissez, décodez et générez des signaux Morse facilement, avec lecture audio et options de partage.",
  alternates: {
    canonical: `${PUBLIC_URL}/fr`,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${maitree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
