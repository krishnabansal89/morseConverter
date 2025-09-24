import InternationalMorseCode from "../../components/international/InternationalMorseCode";

export async function generateMetadata() {
  const PUBLIC_URL = process.env.NEXT_PUBLIC_URL

  return {
    title: "International Morse Code Translator | Convert Text to Morse Code",
    description: "Use our International Morse Code Translator to instantly convert text to Morse code and vice versa. Features audio playback, visual signals, and supports special characters.",
    openGraph: {
      title: "International Morse Code Translator | Convert Text to Morse Code",
      description: "Use our International Morse Code Translator to instantly convert text to Morse code and vice versa. Features audio playback, visual signals, and supports special characters.",
    },
    alternates: {
      canonical: `${PUBLIC_URL}/international-morse-code-translator`,
    },
  };
}

export default function InternationalMorseCodePage() {
  return (
    <div className="bg-background text-foreground h-full w-full m-0 p-0">
      <InternationalMorseCode />
    </div>
  );
}
