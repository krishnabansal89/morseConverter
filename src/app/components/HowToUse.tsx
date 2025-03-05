interface Step {
  number: string;
  title: string;
  description: string;
}

export default function HowToUse() {
  const steps: Step[] = [
    {
      number: "1",
      title: "Enter Text or Morse Code",
      description: "Input English text or Morse code symbols in the appropriate field. Our system accepts all standard Morse code notations."
    },
    {
      number: "2",
      title: "Click 'Translate'",
      description: "Our advanced Morse Code Decoder will instantly convert your text. The translation happens in real-time with no delays."
    },
    {
      number: "3",
      title: "Copy or Share",
      description: "Copy the translated output or share it with others with a single click. Use the audio feature to hear the Morse code."
    }
  ];

  const details = [
    {
      title: "Morse Code Generator - Easily Create Morse Signals",
      icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h3",
      points: [
        "Adjustable playback speed for learning at your own pace",
        "Clear, precise audio tones optimized for Morse code clarity",
        "Works directly in your browser—no downloads needed"
      ]
    },
    {
      title: "Convert Morse Code to English Instantly",
      icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
      points: [
        "Supports standard Morse code format with dots, dashes, and spaces",
        "Accurately translates even complex Morse messages",
        "Handles special characters and international Morse code variants"
      ]
    }
  ];

  return (
    <section id="how-to-use" className="bg-neutral-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              How to Use the Morse Code Translator
            </h2>
            <p className="text-neutral-600">
              Follow these simple steps to convert between text and Morse code in seconds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div 
                key={step.title}
                className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-600 transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                    <span className="text-white font-bold">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800">{step.title}</h3>
                </div>
                <p className="text-neutral-600">{step.description}</p>
                {step.number === "1" && (
                  <div className="mt-4 bg-neutral-100 p-3 rounded border border-neutral-200">
                    <div className="font-mono text-sm text-neutral-600">Hello</div>
                    <div className="mt-1 w-6 bg-green-500 animate-pulse h-1"></div>
                  </div>
                )}
                {step.number === "2" && (
                  <div className="mt-4 flex justify-center">
                    <button className="bg-green-600 text-white py-2 px-4 rounded-md font-medium shadow-md transform transition duration-300 hover:bg-green-700 hover:scale-105 flex items-center">
                      <span>Translate</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
                {step.number === "3" && (
                  <div className="mt-4 flex justify-around">
                    <button className="text-green-600 border border-green-600 py-1 px-3 rounded flex items-center text-sm hover:bg-green-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                        <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                      </svg>
                      Copy
                    </button>
                    <button className="text-green-600 border border-green-600 py-1 px-3 rounded flex items-center text-sm hover:bg-green-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                      Share
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-12">
            {details.map((detail) => (
              <div key={detail.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-2/5 bg-neutral-800 p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-block p-4 bg-green-600/20 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={detail.icon} />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-3/5 p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-neutral-800 mb-4">{detail.title}</h3>
                    <ul className="space-y-2 text-neutral-600">
                      {detail.points.map((point) => (
                        <li key={point} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a href="#translator" className="inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-md font-medium transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              Start Using the Morse Code Translator Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
