import NumberOverview from "../../components/numbers/NumbersOverview";
import InternalLinkingPanel from "@/components/ui/InternalLinkingPanel";

export async function generateMetadata() {
  const PUBLIC_URL = process.env.NEXT_PUBLIC_URL

  return {
    title: "The Evolution and Modern Uses of Morse Code Numbers",
    description: "Discover the history, development, and modern applications of Morse code numbers. Learn how this communication system remains relevant today, from emergency situations to aviation and cybersecurity.",
    openGraph: {
      title: "The Evolution and Modern Uses of Morse Code Numbers",
      description: "Discover the history, development, and modern applications of Morse code numbers. Learn how this communication system remains relevant today, from emergency situations to aviation and cybersecurity.",
    },
    alternates: {
      canonical: `${PUBLIC_URL}/morse-code-numbers`,
    },
  };
}


export default function Home() {

  return (
    <div className="bg-white h-full w-full m-0 p-0 ">
      <NumberOverview />
      <InternalLinkingPanel exclude={["numbers"]} />
    </div>
  );

}