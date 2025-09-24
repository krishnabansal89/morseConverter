const ALPHABET = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

const AnchorNavBar: React.FC<{letters: string[]}> = ({ letters }) => (
  <div className="flex flex-wrap w-full mx-auto md:justify-between gap-2 mb-6">
    {letters.map((letter) => (
      <a
        key={letter}
        href={`#${letter}`}
        className="text-primary hover:underline font-medium text-lg md:text-xl"
      >
        {letter}
      </a>
    ))}
  </div>
);



export const WordGlossary: React.FC<{ wordsByLetter: Record<string, string[]> }> = ({ wordsByLetter }) => {
  return (
    <div className="md:max-w-5xl w-[90%] mx-auto">
    <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r text-center my-12 from-green-500 to-teal-900 text-transparent bg-clip-text font-bold tracking-tight md:px-10">Word Glossary</h2>
      <AnchorNavBar letters={ALPHABET} />
      {Object.keys(wordsByLetter).map((letter) => (
        <div key={letter} id={letter} className="border-b-2 pb-4 mb-4 border-border/50">
          <h2 className="text-lg md:text-xl font-maitree mb-4 font-semibold">{letter}</h2>
          <div className="grid grid-cols-2 justify-items-center md:justify-items-normal md:grid-cols-4 gap-x-2 ">
            {wordsByLetter[letter]?.length? (
              wordsByLetter[letter].map((word) => (
                <a
                  key={word.toUpperCase()}
                  href={`/${encodeURIComponent(word.toLowerCase().replace(/ /g, "-"))}-in-morse-code`}
                  className="text-primary text-center md:text-start md:text-lg hover:underline font-poppins"
                >
                  {word.toUpperCase()}
                </a>
              ))
            ) : (
              <span className="text-muted-foreground">No entries</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
