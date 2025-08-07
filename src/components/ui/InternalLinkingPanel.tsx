import Link from "next/link";

export const TOOL_LINKS = [
  {
    title: "International Code Translator",
    desc: "Translate English to International Morse Code and back with precision.",
    url: "/international-morse-code-translator",
    category: "Translator"
  },
  {
    title: "American Code Translator",
    desc: "Translate English to American Morse Code and back with precision.",
    url: "/american-morse-code-translator",
    category: "Translator"
  },
  {
    title: "Morse Code Machine",
    desc: "Instantly convert typing to Morse Code with configurable speed and output.",
    url: "/morse-code-machine",
    category: "Generator"
  },
  {
    title: "Morse Code Translator Audio",
    desc: "Listen to Morse code audio signals for any text.",
    url: "/morse-code-translator-audio",
    category: "Audio"
  }
];

export const ALPHABET_LINKS = Array.from({ length: 26 }, (_, i) => {
  const letter = String.fromCharCode(65 + i);
  return {
    label: letter,
    url: `/morse-code-alphabets/${letter}-in-morse-code`
  };
});

export const NUMBER_LINKS = Array.from({ length: 10 }, (_, i) => ({
  label: i.toString(),
  url: `/morse-code-numbers/number-${i}-in-morse-code`
}));

interface Props {
  exclude?: ("tools" | "alphabet" | "numbers" | "words")[];
  currentPage?: string; // To avoid self-linking
}

export default function InternalLinkingPanel({ exclude = [], currentPage }: Props) {
  // Count how many sections we're showing
  const showAlphabet = !exclude.includes("alphabet");
  const showNumbers = !exclude.includes("numbers");
  const sectionsCount = (showAlphabet ? 1 : 0) + (showNumbers ? 1 : 0);

  return (
    <div className="w-[98%] mx-auto bg-[rgb(236,232,228)]  p-4 py-10 md:px-20">
      <h2 className="md:text-3xl text-2xl bg-gradient-to-r text-center mb-8 from-green-500 to-teal-900 text-transparent bg-clip-text font-bold tracking-tight">
        Explore More Morse Code Resources
      </h2>

      <div className="flex flex-col gap-8">
        {/* Alphabet & Numbers - Dynamic grid based on sections count */}
        {(showAlphabet || showNumbers) && (
          <div className={`grid gap-8 mx-auto ${sectionsCount === 1
              ? 'grid-cols-1 justify-items-center'
              : 'md:grid-cols-2'
            }`}>

            {/* Alphabet Morse Codes */}
            {showAlphabet && (
              <section className="">
                <h3 className="text-xl text-center font-semibold mb-4 text-[#2d2d2d] font-maitree">
                  A-Z Morse Code Reference
                </h3>
                <div className="flex flex-wrap justify-evenly gap-2">
                  {ALPHABET_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.url}
                      className="inline-block bg-white hover:bg-[#456359] text-[#456359] hover:text-white font-bold rounded-lg px-3 py-2 transition-all duration-200 border border-[#456359]/40 hover:shadow-md"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Number Morse Codes */}
            {showNumbers && (
              <section className="">
                <h3 className="text-xl text-center font-semibold mb-4 text-[#2d2d2d] font-maitree">
                  0-9 Morse Code Reference
                </h3>
                <div className="flex flex-wrap justify-evenly gap-2">
                  {NUMBER_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.url}
                      className="inline-block bg-white hover:bg-[#456359] text-[#456359] hover:text-white font-bold rounded-lg px-3 py-2 transition-all duration-200 border border-[#456359]/40 hover:shadow-md"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
        {/* Morse Code Tools */}
        {!exclude.includes("tools") && (
          <section>
            <h3 className="text-xl text-center font-semibold mb-4 text-[#2d2d2d] font-maitree">
              Morse Code Tools & Generators
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {TOOL_LINKS.filter(tool => tool.url !== currentPage).map((tool) => (
                <Link
                  href={tool.url}
                  key={tool.title}
                  className="bg-white hover:bg-gray-50 rounded-xl p-5 py-8 shadow-sm hover:shadow-md border border-gray-200 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-[#456359] text-white rounded-full">
                      {tool.category}
                    </span>
                    <span className="text-[#456359] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                  <h4 className="font-bold text-lg text-[#2d2d2d] mb-2 group-hover:text-[#456359] transition-colors">
                    {tool.title}
                  </h4>
                  <p className="text-sm text-gray-600 font-maitree font-extralight">
                    {tool.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}


      </div>
    </div>
  );
}