'use client';
import { useState, useEffect } from 'react';

// Morse code dictionary type
type MorseDictionary = { [key: string]: string };

export default function Translator() {
  const [activeTab, setActiveTab] = useState<'text' | 'morse'>('text');
  const [inputText, setInputText] = useState('');
  const [inputMorse, setInputMorse] = useState('');
  const [outputText, setOutputText] = useState('');
  const [outputMorse, setOutputMorse] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const morseCodeDict: MorseDictionary = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
    'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
    '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
    ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-',
    '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
  };

  const reverseMorseDict: MorseDictionary = Object.entries(morseCodeDict)
    .reduce((acc, [key, value]) => ({ ...acc, [value]: key }), {});

  useEffect(() => {
    // Initialize audio context on client side
    setAudioContext(new (window.AudioContext || window.AudioContext)());
  }, []);

  const handleTextTranslate = () => {
    const text = inputText.trim().toUpperCase();
    let morse = '';
    
    for (const char of text) {
      if (char === ' ') {
        morse += '/ ';
      } else if (morseCodeDict[char]) {
        morse += `${morseCodeDict[char]} `;
      }
    }
    
    setOutputMorse(morse.trim());
  };

  const handleMorseTranslate = () => {
    const morse = inputMorse.trim();
    const words = morse.split(' / ');
    let text = '';
    
    for (const word of words) {
      const letters = word.split(' ');
      for (const letter of letters) {
        text += reverseMorseDict[letter] || '';
      }
      text += ' ';
    }
    
    setOutputText(text.trim());
  };

  const playMorse = async () => {
    if (!audioContext || !outputMorse) return;

    const dotDuration = 60 / playbackSpeed;
    let currentTime = audioContext.currentTime;

    for (const symbol of outputMorse) {
      switch(symbol) {
        case '.': 
          beep(currentTime, dotDuration / 1000);
          currentTime += (dotDuration + 60) / 1000;
          break;
        case '-':
          beep(currentTime, (dotDuration * 3) / 1000);
          currentTime += (dotDuration * 3 + 60) / 1000;
          break;
        case ' ':
          currentTime += (dotDuration * 3) / 1000;
          break;
        case '/':
          currentTime += (dotDuration * 7) / 1000;
          break;
      }
    }
  };

  const beep = (startTime: number, duration: number) => {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(700, startTime);

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.5, startTime + 0.01);
    gainNode.gain.setValueAtTime(0.5, startTime + duration - 0.01);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className="bg-neutral-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              The Ultimate Online Morse Code Translator
            </h2>
            <p className="text-neutral-600">
              Convert text to Morse code and vice versa instantly with our free translator
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg border border-green-500/20 overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-neutral-200">
              <button
                onClick={() => setActiveTab('text')}
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  activeTab === 'text' 
                    ? 'text-green-600 bg-neutral-50 border-b-2 border-green-500'
                    : 'text-neutral-500 hover:text-green-600'
                }`}
              >
                Text to Morse Code
              </button>
              <button
                onClick={() => setActiveTab('morse')}
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  activeTab === 'morse'
                    ? 'text-green-600 bg-neutral-50 border-b-2 border-green-500'
                    : 'text-neutral-500 hover:text-green-600'
                }`}
              >
                Morse Code to Text
              </button>
            </div>

            {/* Content Areas */}
            {activeTab === 'text' ? (
              <div className="p-6">
                <div className="mb-4">
                  <label htmlFor="input-text" className="block text-sm font-medium text-neutral-700 mb-1">
                    Enter Text
                  </label>
                  <textarea
                    id="input-text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    placeholder="Type your message here..."
                  />
                </div>

                <div className="flex justify-center mb-6">
                  <button
                    onClick={handleTextTranslate}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md font-medium transition-transform hover:scale-105"
                  >
                    Translate
                  </button>
                </div>

                <div className="mb-4">
                  <label htmlFor="output-morse" className="block text-sm font-medium text-neutral-700 mb-1">
                    Morse Code Output
                  </label>
                  <div className="w-full min-h-[100px] p-3 border border-neutral-300 rounded-md bg-neutral-50 font-mono overflow-x-auto">
                    {outputMorse}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 p-4 bg-neutral-50 rounded-md border border-neutral-200">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <button 
                      onClick={playMorse}
                      className="flex items-center justify-center bg-neutral-800 hover:bg-neutral-900 text-white rounded-full w-10 h-10 mr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="text-sm text-neutral-700">Listen to Morse Code</div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-neutral-700">Speed:</div>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="2" 
                      step="0.1" 
                      value={playbackSpeed}
                      onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                      className="w-24 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer" 
                    />
                    <span className="text-sm font-mono text-neutral-700">
                      {playbackSpeed.toFixed(1)}×
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => copyToClipboard(outputMorse)}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Copy
                  </button>
                  <button
                    onClick={playMorse}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Play Audio
                  </button>
                  <button
                    onClick={() => { setInputText(''); setOutputMorse(''); }}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                  >
                    Clear
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="mb-4">
                  <label htmlFor="input-morse" className="block text-sm font-medium text-neutral-700 mb-1">
                    Enter Morse Code
                  </label>
                  <textarea
                    id="input-morse"
                    value={inputMorse}
                    onChange={(e) => setInputMorse(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    placeholder="Enter dots (.) and dashes (-) separated by spaces..."
                  />
                </div>

                <div className="flex justify-center mb-6">
                  <button
                    onClick={handleMorseTranslate}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md font-medium transition-transform hover:scale-105"
                  >
                    Translate
                  </button>
                </div>

                <div className="mb-4">
                  <label htmlFor="output-text" className="block text-sm font-medium text-neutral-700 mb-1">
                    Text Output
                  </label>
                  <div className="w-full min-h-[100px] p-3 border border-neutral-300 rounded-md bg-neutral-50 overflow-x-auto">
                    {outputText}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => copyToClipboard(outputText)}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => { setInputMorse(''); setOutputText(''); }}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
