import NumberOverview from "../../components/numbers/NumbersOverview";
import InternalLinkingPanel from "@/components/ui/InternalLinkingPanel";

export async function generateMetadata() {
  const PUBLIC_URL = "https://morsecodeholistic.com"

  return {
    title: "Morse Code Numbers: Evolution, History, and Modern Uses",
    description: "Discover the history, structure, and modern applications of Morse code numbers. Learn how these simple patterns of dots and dashes remain relevant today, from aviation and emergency communication to cybersecurity.",
    openGraph: {
      title: "Morse Code Numbers: Evolution, History, and Modern Uses",
      description: "Discover the history, structure, and modern applications of Morse code numbers. Learn how these simple patterns of dots and dashes remain relevant today, from aviation and emergency communication to cybersecurity.",
    },
    alternates: {
      canonical: `${PUBLIC_URL}/morse-code-numbers`,
    },
  };
}


export default function Home() {

  return (
    <div className="bg-background text-foreground h-full w-full m-0 p-0 ">
      <NumberOverview />
      <InternalLinkingPanel exclude={["numbers"]} />
    </div>
  );

}