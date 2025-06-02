import React from 'react';
import Link from "next/link";

const MorseCodeTranslator = () => {
  // Original Morse code mapping
  const morseCodeAlphabet = [
    { letter: 'A', code: '•−' },
    { letter: 'B', code: '−•••' },
    { letter: 'C', code: '−•−•' },
    { letter: 'D', code: '−••' },
    { letter: 'E', code: '•' },
    { letter: 'F', code: '••−•' },
    { letter: 'G', code: '−−•' },
    { letter: 'H', code: '••••' },
    { letter: 'I', code: '••' },
    { letter: 'J', code: '•−−−' },
    { letter: 'K', code: '−•−' },
    { letter: 'L', code: '•−••' },
    { letter: 'M', code: '−−' },
    { letter: 'N', code: '−•' },
    { letter: 'O', code: '−−−' },
    { letter: 'P', code: '•−−•' },
    { letter: 'Q', code: '−−•−' },
    { letter: 'R', code: '•−•' },
    { letter: 'S', code: '•••' },
    { letter: 'T', code: '−' },
    { letter: 'U', code: '••−' },
    { letter: 'V', code: '•••−' },
    { letter: 'W', code: '•−−' },
    { letter: 'X', code: '−••−' },
    { letter: 'Y', code: '−•−−' },
    { letter: 'Z', code: '−−••' }
  ];

  // Create pairs of letters (A,N), (B,O), (C,P), etc.
  const createPairs = () => {
    const pairs = [];
    const half = Math.ceil(morseCodeAlphabet.length / 2);
    
    for (let i = 0; i < half; i++) {
      pairs.push([
        morseCodeAlphabet[i],
        i + half < morseCodeAlphabet.length ? morseCodeAlphabet[i + half] : null
      ]);
    }
    
    return pairs;
  };

  // Render individual Morse code symbol (dot or dash)
  const renderMorseSymbol = (symbol: string, index: number) => {
    const isShort = symbol === '•';
    return (
      <div 
        key={index} 
        className={`${isShort ? 'h-6 w-6' : 'h-6 md:w-10 w-6'} flex items-center  text-[#2d2d2d] justify-center text-lg md:text-2xl  mb-1`}
      >
        {symbol}
      </div>
    );
  };

  // Create letter pairs
  const letterPairs = createPairs();

  return (   
    <div className="w-full md:max-w-4xl mx-auto md:p-6 pt-6 rounded-lg">
      <div className="grid grid-cols-1 md:gap-6 gap-2 bg-[#f5f5f5]/60 rounded-2xl md:p-8 p-2 font-poppins">
        {letterPairs.map((pair, pairIndex) => (
          <div key={pairIndex} className="grid grid-cols-2  md:gap-10">
            {pair.map((item) => (
              item && (
                <Link 
                  key={item.letter} 
                  href={`/morse-code-alphabets/${item.letter}-in-morse-code`}
                  className="flex flex-row md:space-x-6 items-start p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                >
                  <span className="text-[#2d2d2d] text-xl mr-2 md:text-2xl font-semibold mb-2">
                    {item.letter}
                  </span>
                  <div className="flex flex-row items-center justify-start">
                    {item.code.split('').map((symbol, index) => renderMorseSymbol(symbol, index))}
                  </div>
                </Link>
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MorseCodeTranslator;
