import AmericanMorseCode from "../../components/american/AmericanMorseCode";

export async function generateMetadata() {
  const PUBLIC_URL = https://morsecodeholistic.com

  return {
    title: "American Morse Code Translator – Accurate Railroad Morse Converter Tool",
    description: "Use our free American Morse Code Translator to convert text into accurate Railroad Morse Code. Ideal for historians, radio operators, and telegraphy enthusiasts.",
    openGraph: {
      title: "American Morse Code Translator – Accurate Railroad Morse Converter Tool",
      description: "Use our free American Morse Code Translator to convert text into accurate Railroad Morse Code. Ideal for historians, radio operators, and telegraphy enthusiasts.",
    },
    alternates: {
      canonical: `${PUBLIC_URL}/american-morse-code-translator`,
    },
  };
}

export default function AmericanMorseCodePage() {
  return (
    <div className="bg-background text-foreground h-full w-full m-0 p-0">
      <AmericanMorseCode />
    </div>
  );
}
