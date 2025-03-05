interface TranslationItem {
  text: string;
  code: string;
}

interface TranslationGroup {
  title: string;
  items: TranslationItem[];
}

export default function CommonTranslations() {
  const translations: TranslationGroup[] = [
    {
      title: "Common Phrases",
      items: [
        { text: "Hello", code: ".... . .-.. .-.. ---" },
        { text: "SOS", code: "... --- ..." },
        { text: "Love", code: ".-.. --- ...- ." },
        { text: "Yes", code: "-.-- . ..." },
        { text: "No", code: "-. ---" }
      ]
    },
    {
      title: "Military Codes & Signals",
      items: [
        { text: "Mayday", code: "-- .- -.-- -.. .- -.--" },
        { text: "Roger", code: ".-. --- --. . .-." },
        { text: "Over", code: "--- ...- . .-." },
        { text: "Wilco", code: ".-- .. .-.. -.-. ---" },
        { text: "Copy", code: "-.-. --- .--. -.--" }
      ]
    }
  ];

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  const numbers = Array.from({length: 10}, (_, i) => i);

  return (
    <section id="common-translations" className="py-20 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Common <span className="text-green-400">Morse Code Translations</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Familiarize yourself with these frequently used Morse code patterns. Learning these common translations will help you get started with Morse code communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          {translations.map((group) => (
            <div key={group.title} className="bg-neutral-800 rounded-lg border border-green-900/30 overflow-hidden">
              <div className="bg-gradient-to-r from-green-900/30 to-neutral-800 px-6 py-4 border-b border-green-900/30">
                <h3 className="font-bold text-xl flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  {group.title}
                </h3>
              </div>
              
              <div className="divide-y divide-green-900/20">
                {group.items.map((item) => (
                  <div key={item.text} className="px-6 py-4 transition-colors hover:bg-neutral-700/20 group">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-lg font-medium">{item.text}</span>
                        <button className="ml-2 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                      <div className="font-mono text-green-400">
                        <span className="morse-code">{item.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-neutral-800 rounded-lg border border-green-900/30 p-6 mb-16">
          <h3 className="font-bold text-xl mb-6 text-center">Complete Morse Code Alphabet & Numbers</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {alphabet.map((letter) => (
              <div key={letter} className="bg-neutral-900 rounded p-3 flex justify-between items-center">
                <span className="text-xl font-medium">{letter}</span>
                <span className="font-mono text-green-400">
                  {/* Morse code values would be added here */}
                </span>
              </div>
            ))}
            {numbers.map((number) => (
              <div key={number} className="bg-neutral-900 rounded p-3 flex justify-between items-center">
                <span className="text-xl font-medium">{number}</span>
                <span className="font-mono text-green-400">
                  {/* Morse code values would be added here */}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-900/30 to-neutral-800 rounded-lg p-8">
          <h3 className="text-xl font-bold mb-6 text-center">Learning Morse Code: Tips for Beginners</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-900/50 rounded-lg p-5 border border-green-900/30">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-green-900/20 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="font-bold">Start with Common Letters</h4>
              </div>
              <p className="text-gray-400">
                Begin by learning the most frequently used letters: E, T, A, O, I, N. E (.) and T (-) are the simplest codes and occur most often.
              </p>
            </div>
            
            <div className="bg-neutral-900/50 rounded-lg p-5 border border-green-900/30">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-green-900/20 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h4 className="font-bold">Listen More Than Write</h4>
              </div>
              <p className="text-gray-400">
                Train your ear to recognize sounds rather than counting dots and dashes. Use our audio playback feature to practice listening.
              </p>
            </div>
            
            <div className="bg-neutral-900/50 rounded-lg p-5 border border-green-900/30">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-green-900/20 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-bold">Practice Daily</h4>
              </div>
              <p className="text-gray-400">
                Short, regular practice sessions (15 minutes daily) are more effective than occasional long sessions for building Morse code proficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
