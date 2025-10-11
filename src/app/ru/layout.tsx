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
  title: "Переводчик Азбуки Морзе — Мгновенное Преобразование и Расшифровка Текста",
  description: "Мгновенно переводите английский текст в азбуку Морзе и обратно с помощью бесплатного онлайн-переводчика. Генерируйте сигналы Морзе с озвучкой и функцией обмена.",
  alternates: {
    canonical: `${PUBLIC_URL}/ru`,
  }
};




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${maitree.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
