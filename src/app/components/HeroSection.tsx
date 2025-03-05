export default function HeroSection() {
  return (
    <section className="bg-neutral-900 text-white  flex items-center">
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-green-500">
              Morse Code Translator
            </h1>
            <h2 className="text-xl md:text-2xl font-light mb-6">
              Convert & Decode English to Morse Code Instantly
            </h2>
            <p className="text-neutral-300 mb-8 max-w-xl">
              Translate English to Morse code and vice versa instantly with our free Morse Code Translator. 
              Convert, decode, and generate Morse signals easily with audio playback and sharing options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#translator" className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center">
                <span>Start Translating</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#features" className="border border-green-600 text-green-500 hover:bg-green-600 hover:text-white py-3 px-6 rounded-md font-medium transition duration-300 ease-in-out flex items-center justify-center">
                <span>Learn More</span>
              </a>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-neutral-800 p-6 rounded-lg border border-green-500/30 shadow-lg shadow-green-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2" />
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                  </div>
                  <div className="text-xs text-neutral-400">Morse Translator</div>
                </div>

                <div className="space-y-2 font-mono">
                  {['S', 'O', 'S'].map((char, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-neutral-400 mr-2">{char}</span>
                      <span className="text-green-500">
                        {char === 'S' ? '• • •' : '— — —'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="h-6 w-1 bg-green-500 mt-4 animate-pulse" />

                <div className="flex items-center justify-center h-16 mt-6 gap-1">
                  {[
                    { height: 'h-4', delay: '0s' },
                    { height: 'h-8', delay: '0.1s' },
                    { height: 'h-12', delay: '0.2s' },
                    { height: 'h-16', delay: '0.3s' },
                    { height: 'h-10', delay: '0.4s' },
                    { height: 'h-8', delay: '0.5s' },
                    { height: 'h-14', delay: '0.6s' },
                    { height: 'h-6', delay: '0.7s' },
                  ].map((style, index) => (
                    <div
                      key={index}
                      className={`${style.height} w-1 bg-green-600 animate-[wave_1s_ease-in-out_infinite]`}
                      
                    />
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-green-500/30" />
              <div className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-green-500/30" />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16 overflow-hidden">
          <div className="flex items-center animate-marquee">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <span className="text-green-500 text-2xl mx-1">•</span>
                {i === 2 && (
                  <>
                    <span className="text-green-500 text-2xl mx-1 font-bold">—</span>
                    <span className="text-green-500 text-2xl mx-1 font-bold">—</span>
                    <span className="text-green-500 text-2xl mx-1 font-bold">—</span>
                  </>
                )}
              </div>
            ))}
            <span className="text-neutral-500 mx-4">|</span>
          </div>
        </div>
      </div>
    </section>
  );
}
