import { GoogleAnalytics } from '@next/third-parties/google'

import type { Metadata } from "next";
import { Geist, Geist_Mono , Poppins , Maitree } from "next/font/google";
import { Navbar } from "./components/home/Navbar";
import Footer from "./components/home/Footer";
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
  weight: [ "600"],
  style: "normal",
  variable:"--font-poppins",
  subsets:["latin"],
  preload: true,

});

const maitree = Maitree({
  weight: ["400" ,"700"],
  style: "normal",
  variable: "--font-maitree",
  subsets: ["latin"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Morse Code Translator - Convert & Decode English to Morse Code Instantly",
  description: "Translate English to Morse code and vice versa instantly with our free Morse Code Translator. Convert, decode, and generate Morse signals easily with audio playback and sharing options.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Navbar />
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${maitree.variable} antialiased  `}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-FVT0DZM79K" />
    </html>
    <Footer />
    </>
  );
}
