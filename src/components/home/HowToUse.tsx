"use client";

import { useTheme } from "next-themes";

export default function HowToUse() {
  const { theme, systemTheme } = useTheme();
  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const baseSrc = "https://app.supademo.com/embed/cmabd69i500pzzn0i3vzr85qo?embed_v=2";
  const iframeSrc = `${baseSrc}${resolvedTheme === "dark" ? "&theme=dark" : "&theme=light"}`;
  return (
    <div className="bg-background w-[98%] mx-auto p-4 md:px-20 rounded-lg rounded-b-none rounded-t-none shadow-lg h-fit flex flex-col">
      <div className="md:mt-20 mt-10 flex flex-col items-center justify-center text-center ">
        <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium  mb-4 tracking-tight md:px-10 font-poppins">How to use Morse Code Translator</h2>
        <p className="text-muted-foreground font-maitree">
          Watch the Morse Code Tool Exploration Video
        </p>
        <div className="bg-card border border-border rounded-lg overflow-hidden" style={{ position: 'relative', boxSizing: 'content-box', maxHeight: '80vh', width: '100%', aspectRatio: '2.1052631578947367', padding: '40px 0' }}>
          <iframe
            src={iframeSrc}
            loading="lazy"
            title="Morse Code Translator - Convert & Decode English to Morse Code Instantly"
            allow="clipboard-write"
            className={resolvedTheme === "dark" ? "invert hue-rotate-180" : undefined}
            style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'transparent', colorScheme: resolvedTheme === 'dark' ? 'dark' : 'light' }}
          />
          </div>
      </div>
    </div>
  )
}