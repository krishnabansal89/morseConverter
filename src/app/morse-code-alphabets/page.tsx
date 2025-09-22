import AlphabetOverview from "../../components/alphabets/AlphabetOverview";
import InternalLinkingPanel from "@/components/ui/InternalLinkingPanel";

export async function generateMetadata() {
  const PUBLIC_URL = process.env.NEXT_PUBLIC_URL
  return {
    title: "Morse Code Alphabets: A Deep Dive into Letters, History, and Modern Uses",
    description: "Explore the Morse code alphabets, their history, structure, and modern-day applications. Learn how Morse code letters are used in communication, technology, and beyond.",
    openGraph: {
      title: "Morse Code Alphabets: A Deep Dive into Letters, History, and Modern Uses",
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