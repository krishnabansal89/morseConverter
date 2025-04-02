import React from 'react';
import Link from "next/link"


const MorseCodeTranslator = () => {
  // Original Morse code mapping
  const morseCodeNumbers = [
    { number: '0', code: '−−−−−' },
    { number: '1', code: '•−−−−' },
    { number: '2', code: '••−−−' },
    { number: '3', code: '•••−−' },
    { number: '4', code: '••••−' },
    { number: '5', code: '•••••' },
    { number: '6', code: '−••••' },
    { number: '7', code: '−−•••' },
    { number: '8', code: '−−−••' },
    { number: '9', code: '−−−−•' },
  ];

  // Create pairs of letters (A,N), (B,O), (C,P), etc.
  

  // Render individual Morse code symbol (dot or dash)
  const renderMorseSymbol = (symbol: string, index: number) => {
    const isShort = symbol === '•';
    return (
      <div 
        key={index} 
        className={`${isShort ? 'h-6 w-6' : 'h-6 md:w-10 w-6'} flex items-center  text-[#6c6860] justify-center text-lg md:text-2xl  mb-1`}
      >
        {symbol}
      </div>
    );
  };

  // Create letter pairs

  return (   
    <div className="w-full md:max-w-4xl mx-auto md:p-6 pt-6 rounded-lg">
      <div className="grid grid-cols-1 md:gap-6 gap-2 bg-[#f5f5f5]/60 rounded-2xl md:p-8 p-2 font-poppins">
      
        {morseCodeNumbers.map((item) => (
              item && (
                <Link 
                  key={item.number} 
                  href={`/morse-code-numbers/number-${item.number}-in-morse-code`}
                  className="flex flex-row md:space-x-6 items-start p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                >
                  <span className="text-[#6c6860] text-xl mr-2 md:text-2xl font-semibold mb-2">
                    {item.number}
                  </span>
                  <div className="flex flex-row items-center justify-start">
                    {item.code.split('').map((symbol, index) => renderMorseSymbol(symbol, index))}
                  </div>
                </Link>
              )
            ))}
          </div>
      
      </div>
    
  );
};

export default MorseCodeTranslator;
