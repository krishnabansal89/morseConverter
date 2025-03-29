import React from 'react';
import Link from "next/link"

const MorseCodeTranslator = () => {
  // Morse code mapping with dot and dash details
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

  // Render individual Morse code symbol (dot or dash)
  const renderMorseSymbol = (symbol:string) => {
    console.log(symbol)
    const isShort = symbol === '•';
    return (
      <div 
        key={Math.random()} 
        className={`h-10 ${isShort ? 'w-8' : 'w-12'} md:text-3xl text-2xl  `}
      >
        {symbol}
        </div>
    );
  };

  return (   
    
    <div className="w-full max-w-4xl mx-auto p-6 rounded-lg">
      
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 bg-[#f5f5f5] rounded-2xl p-10 font-poppins" >
        {morseCodeAlphabet.map((item) => (
          <Link 
            key={item.letter} 
            href={`/letters/${item.letter}-in-morse-code`}
            className="flex items-center justify-between  space-x-2  bg-opacity-20 p-2 rounded cursor-pointer"
          >
            <span className="text-[#2d2d2d] md:text-xl text-lg font-semibold w-8 text-center">
              {item.letter}
            </span>
            <div className="flex w-[60%] mx-auto items-center space-x-1 bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text">
              {item.code.split('').map(renderMorseSymbol)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MorseCodeTranslator;