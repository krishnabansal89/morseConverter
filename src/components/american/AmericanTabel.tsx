import React from 'react';

const AmericanMorseCodeTranslator = () => {
  // American Morse code mapping
  const americanMorseCodeAlphabet = [
    { letter: 'A', code: '.-' },
    { letter: 'B', code: '-...' },
    { letter: 'C', code: '.. .' },
    { letter: 'D', code: '-..' },
    { letter: 'E', code: '.' },
    { letter: 'F', code: '.-.' },
    { letter: 'G', code: '--.' },
    { letter: 'H', code: '....' },
    { letter: 'I', code: '..' },
    { letter: 'J', code: '-.-.' },
    { letter: 'K', code: '-.-' },
    { letter: 'L', code: '----' },
    { letter: 'M', code: '--' },
    { letter: 'N', code: '-.' },
    { letter: 'O', code: '. .' },
    { letter: 'P', code: '.....' },
    { letter: 'Q', code: '..-.' },
    { letter: 'R', code: '. ..' },
    { letter: 'S', code: '...' },
    { letter: 'T', code: '-' },
    { letter: 'U', code: '..-' },
    { letter: 'V', code: '...-' },
    { letter: 'W', code: '.--' },
    { letter: 'X', code: '.-..' },
    { letter: 'Y', code: '.. ..' },
    { letter: 'Z', code: '... .' },
    { letter: '1', code: '.---.' },
    { letter: '2', code: '..--..'},
    { letter: '3', code: '...-.'},
    { letter: '4', code: '....-'},
    { letter: '5', code: '---'},
    { letter: '6', code: '......'},
    { letter: '7', code: '--...'},
    { letter: '8', code: '-....'},
    { letter: '9', code: '--.-'},
    { letter: '0', code: '------'}
  ];

  // Create pairs of letters for display
  const createPairs = () => {
    const pairs = [];
    const lettersOnly = americanMorseCodeAlphabet.filter(item => 
      /^[A-Z]$/.test(item.letter)
    );
    const half = Math.ceil(lettersOnly.length / 2);
    
    for (let i = 0; i < half; i++) {
      pairs.push([
        lettersOnly[i],
        i + half < lettersOnly.length ? lettersOnly[i + half] : null
      ]);
    }
    
    return pairs;
  };

  // Create pairs of numbers for display
//   const createNumberPairs = () => {
//     const numbers = americanMorseCodeAlphabet.filter(item => 
//       /^[0-9]$/.test(item.letter)
//     );
//     const pairs = [];
//     const half = Math.ceil(numbers.length / 2);
    
//     for (let i = 0; i < half; i++) {
//       pairs.push([
//         numbers[i],
//         i + half < numbers.length ? numbers[i + half] : null
//       ]);
//     }
    
//     return pairs;
//   };

  // Render individual Morse code symbol (dot, dash or space)
  const renderMorseSymbol = (symbol: string, index: number) => {
    if (symbol === '.') {
      return (
        <div 
          key={index} 
          className="h-6 w-6 flex items-center text-[#2d2d2d] justify-center text-lg md:text-2xl mb-1"
        >
          •
        </div>
      );
    } else if (symbol === '-') {
      return (
        <div 
          key={index} 
          className="h-6 md:w-10 w-6 flex items-center text-[#2d2d2d] justify-center text-lg md:text-2xl mb-1"
        >
          −
        </div>
      );
    } else if (symbol === ' ') {
      return (
        <div 
          key={index} 
          className="h-6 w-3 flex items-center text-[#2d2d2d] justify-center text-lg md:text-2xl mb-1"
        >
        </div>
      );
    }
    return null;
  };

  // Create letter and number pairs
  const letterPairs = createPairs();
//   const numberPairs = createNumberPairs();

  return (   
    <div className="w-full md:max-w-4xl mx-auto md:p-6 pt-6 rounded-lg">
      <div className="grid grid-cols-1 md:gap-6 gap-2 bg-muted/60 rounded-2xl md:p-8 p-2 font-poppins">
        {letterPairs.map((pair, pairIndex) => (
          <div key={pairIndex} className="grid grid-cols-2 md:gap-10">
            {pair.map((item) => (
              item && (
                <div 
                  key={item.letter} 
                  className="flex flex-row md:space-x-6 items-start p-3 rounded-lg hover:bg-muted/80 transition-colors duration-200"
                >
                  <span className="text-foreground text-xl mr-2 md:text-2xl font-semibold mb-2">
                    {item.letter}
                  </span>
                  <div className="flex flex-row items-center justify-start">
                    {item.code.split('').map((symbol, index) => renderMorseSymbol(symbol, index))}
                  </div>
                </div>
              )
            ))}
          </div>
        ))}
      </div>
      
      {/* <h2 className="text-2xl font-bold my-6 text-center text-[#2d2d2d]">American Morse Code Numbers</h2>
      <div className="grid grid-cols-1 md:gap-6 gap-2 bg-[#f5f5f5]/60 rounded-2xl md:p-8 p-2 font-poppins">
        {numberPairs.map((pair, pairIndex) => (
          <div key={pairIndex} className="grid grid-cols-2 md:gap-10">
            {pair.map((item) => (
              item && (
                <Link 
                  key={item.letter} 
                  href={`/american-morse-code-numbers/${item.letter}-in-morse-code`}
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
      </div> */}
    </div>
  );
};

export default AmericanMorseCodeTranslator;