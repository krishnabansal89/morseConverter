import React from 'react';
import Link from "next/link"

const MorseCodeTranslator = () => {
  // Morse code mapping for numbers 0-9
  const morseCodeNumbers = [
    { number: '1', code: '•−−−−' },
    { number: '2', code: '••−−−' },
    { number: '3', code: '•••−−' },
    { number: '4', code: '••••−' },
    { number: '5', code: '•••••' },
    { number: '6', code: '−••••' },
    { number: '7', code: '−−•••' },
    { number: '8', code: '−−−••' },
    { number: '9', code: '−−−−•' },
    { number: '0', code: '−−−−−' }
  ];

  // Render individual Morse code symbol (dot or dash)
  const renderMorseSymbol = (symbol:string) => {
    const isShort = symbol === '•';
    return (
      <div 
        key={Math.random()} 
        className={`h-10 ${isShort ? 'w-8' : 'w-12'} md:text-3xl text-2xl`}
      >
        {symbol}
      </div>
    );
  };

  return (   
    <div className="w-full max-w-4xl mx-auto p-6 rounded-lg">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 bg-[#f5f5f5] rounded-2xl p-10 font-poppins" >
        {morseCodeNumbers.map((item) => (
          <Link 
            key={item.number} 
            href={`/numbers/${item.number}-in-morse-code`}
            className="flex items-center justify-between space-x-2 bg-opacity-20 p-2 rounded cursor-pointer"
          >
            <span className="text-[#2d2d2d] md:text-xl text-lg font-semibold w-8 text-center">
              {item.number}
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