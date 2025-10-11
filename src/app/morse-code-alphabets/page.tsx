import AlphabetOverview from "../../components/alphabets/AlphabetOverview";
import InternalLinkingPanel from "@/components/ui/InternalLinkingPanel";
import { getPublicUrl } from "@/lib/env";

export async function generateMetadata() {
  const PUBLIC_URL = getPublicUrl()
  return {
    title: "Morse Code Alphabet: A Deep Dive into Letters, History, and Modern Uses",
    description: "Explore the Morse code alphabets, their history, structure, and modern-day applications. Learn how Morse code letters are used in communication, technology, and beyond.",
    openGraph: {
      title: "Morse Code Alphabet: A Deep Dive into Letters, History, and Modern Uses",
      description: "Explore the Morse code alphabets, their history, structure, and modern-day applications. Learn how Morse code letters are used in communication, technology, and beyond.",
    },
    alternates: {
      canonical: `${PUBLIC_URL}/morse-code-alphabets`,
    },
  };
}

export default function Home() {
  return (
    <div className="bg-background text-foreground h-full w-full m-0 p-0 ">
        <AlphabetOverview />
        <InternalLinkingPanel exclude={["alphabet"]}  />
    </div>
  );

}