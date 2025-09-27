"use client"

import { useState, useEffect, useRef } from "react"
import {
  Trash2, HelpCircle,
  Settings
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const translations = {
  en: {
    textToMorsePlaceholder: "Type or paste your message here",
    clear: "Clear",
    settings: "Settings",
    help: "Help",
    audio: "Audio",
    translate: "Translate",
    errorFailedToInitAudio: "Failed to initialize AudioContext:",
    headingText: "Message",
    nothingToTranslate: "Enter a message to translate"
  }
}

// International Morse Code Map (from original[1])
export const internationalMorseCodeMap: Record<string, string> = {
  ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E",
  "..-.": "F", "--.": "G", "....": "H", "..": "I", ".---": "J",
  "-.-": "K", ".-..": "L", "--": "M", "-.": "N", "---": "O",
  ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T",
  "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y",
  "--..": "Z", ".----": "1", "..---": "2", "...--": "3", "....-": "4",
  ".....": "5", "-....": "6", "--...": "7", "---..": "8", "----.": "9",
  "-----": "0", ".-.-.-": ".", "--..--": ",", "..--..": "?", ".----.": "'",
  "-.-.--": "!", "-..-.": "/", "-.--.": "(", "-.--.-": ")", ".-...": "&",
  "---...": ":", "-.-.-.": ";", "-...-": "=", ".-.-.": "+", "-....-": "-",
  "..--.-": "_", ".-..-.": '"', "...-..-": "$", ".--.-.": "@", "": " ",
}

// Build text-to-morse map (from original[1])
const buildTextToMorseMap = (morseToTextMap: Record<string, string>): Record<string, string> => {
  return Object.entries(morseToTextMap).reduce(
    (acc, [morse, text]) => {
      if (text !== " ") {
        const normalizedChar = text.normalize('NFC').toLowerCase();
        acc[normalizedChar] = morse;
      }
      return acc
    },
    {} as Record<string, string>
  );
}

const textToInternationalMorseMap = buildTextToMorseMap(internationalMorseCodeMap);

export default function MorseCodeTranslator({
  initialText = ""
}: {
  initialText?: string
}) {
  const strings = translations.en;
  const [inputText, setInputText] = useState(initialText || "")
  const [audioSettings, setAudioSettings] = useState({
    wpm: 15,
    frequency: 700,
    volume: 0.5,
    soundType: 'cw'
  })
  
  const [flashText, setFlashText] = useState<{
    button: string;
    text: string;
    active: boolean;
  }>({
    button: "",
    text: "",
    active: false
  });

  const [alertMessage, setAlertMessage] = useState<{ text: string, type: 'info' | 'success' | 'error' | 'warning' } | null>(null)
  const [typingPlaceholder, setTypingPlaceholder] = useState("")

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const audioQueueRef = useRef<{ char: string; delay: number }[]>([])
  const audioProcessingRef = useRef(false)

  const showFlashText = (button: string, text: string, duration: number = 1500) => {
    setFlashText({
      button,
      text,
      active: true
    });

    setTimeout(() => {
      setFlashText(prev => ({
        ...prev,
        active: false
      }));
    }, duration);
  };

  const showAlert = (text: string, type: 'info' | 'success' | 'error' | 'warning' = 'info', duration: number = 3000) => {
    setAlertMessage({ text, type });

    if (duration > 0) {
      const timer = setTimeout(() => {
        const alertElement = document.querySelector('[role="alert"]');
        if (alertElement) {
          alertElement.classList.add('animate-fadeOut');
          alertElement.classList.remove('animate-fadeIn');
          setTimeout(() => {
            setAlertMessage(null);
          }, 300);
        } else {
          setAlertMessage(null);
        }
      }, duration - 300);

      return () => clearTimeout(timer);
    }
  };

  // Handle typing effect for placeholders
  useEffect(() => {
    const placeholder = strings.textToMorsePlaceholder

    let currentIndex = 0
    let typingInterval: NodeJS.Timeout | null = null
    let isActive = true

    const typeChar = () => {
      if (!isActive) return
      
      if (currentIndex <= placeholder.length) {
        setTypingPlaceholder(placeholder.slice(0, currentIndex))
        currentIndex++
      } else {
        currentIndex = 0
        if (typingInterval) {
          clearInterval(typingInterval)
        }
        
        setTimeout(() => {
          if (isActive) {
            typingInterval = setInterval(typeChar, 70)
          }
        }, 3000)
      }
    }

    typingInterval = setInterval(typeChar, 70)

    return () => {
      isActive = false
      if (typingInterval) {
        clearInterval(typingInterval)
      }
    }
  }, [strings])

  // Initialize audio context
  const setupAudio = () => {
    if (!audioContextRef.current && typeof window !== 'undefined') {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        oscillatorRef.current = audioContextRef.current.createOscillator();
        gainNodeRef.current = audioContextRef.current.createGain();

        oscillatorRef.current.frequency.value = audioSettings.frequency;
        gainNodeRef.current.gain.value = 0;

        oscillatorRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(audioContextRef.current.destination);

        oscillatorRef.current.start();
      } catch (error) {
        console.error(strings.errorFailedToInitAudio, error);
      }
    }
  }

  // Process audio queue
  const processAudioQueue = async () => {
    if (audioProcessingRef.current || audioQueueRef.current.length === 0) return
    
    audioProcessingRef.current = true
    setupAudio()
    
    const ac = audioContextRef.current
    const gain = gainNodeRef.current
    const osc = oscillatorRef.current
    
    if (!ac || !gain || !osc) {
      audioProcessingRef.current = false
      return
    }

    const dotDuration = 1.2 / audioSettings.wpm
    const dashDuration = dotDuration * 3
    const symbolSpaceDuration = dotDuration
    const letterSpaceDuration = dotDuration * 3
    const wordSpaceDuration = dotDuration * 7

    osc.frequency.setValueAtTime(audioSettings.frequency, ac.currentTime)
    osc.type = audioSettings.soundType === 'telegraph' ? 'square' : 'sine'

    let scheduleTime = ac.currentTime

    while (audioQueueRef.current.length > 0) {
      const { char } = audioQueueRef.current.shift()!
      
      let symbolDuration = 0
      let spaceDuration = symbolSpaceDuration

      if (char === '.' || char === '•') {
        symbolDuration = dotDuration
        gain.gain.setValueAtTime(audioSettings.volume, scheduleTime)
        gain.gain.setValueAtTime(0, scheduleTime + symbolDuration)
      } else if (char === '-' || char === '–' || char === '—') {
        symbolDuration = dashDuration
        gain.gain.setValueAtTime(audioSettings.volume, scheduleTime)
        gain.gain.setValueAtTime(0, scheduleTime + symbolDuration)
      } else if (char === ' ') {
        spaceDuration = letterSpaceDuration
        symbolDuration = 0
      } else if (char === '   ') {
        spaceDuration = wordSpaceDuration
        symbolDuration = 0
      }
      scheduleTime += symbolDuration + spaceDuration
    }
    
    audioProcessingRef.current = false
  }

  // Convert text to Morse code (full conversion)
  const convertTextToMorse = (text: string) => {
    if (!text.trim()) return ""
    
    const normalizedText = text.normalize('NFC').toLowerCase();
    const words = normalizedText.split(" ")
    const morseWords = words.map((word) => {
      return Array.from(word)
        .map((char) => textToInternationalMorseMap[char] || "")
        .filter((morse) => morse !== "")
        .join(" ")
    })
    
    return morseWords.join("   ")
  }

  // Handle translate button click
  const handleTranslate = () => {
    if (!inputText.trim()) {
      showAlert(strings.nothingToTranslate, 'warning', 2000)
      return
    }
    
    const morseCode = convertTextToMorse(inputText)
    
    // Queue the entire Morse code for audio
    audioQueueRef.current = []
    for (const char of morseCode) {
      if (char === '.' || char === '-' || char === ' ') {
        audioQueueRef.current.push({ char, delay: 0 })
      }
    }
    
    if (true && audioQueueRef.current.length > 0) {
      processAudioQueue()
      showAlert("Playing Morse code audio", 'success', 2000)
    } else {
      showAlert("Enable audio to hear the Morse code", 'info', 2000)
    }
  }

  // Handle input change (no live processing)
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }

  // Handle clear input
  const handleClear = () => {
    setInputText("")
    audioQueueRef.current = []
    
    if (inputRef.current) {
      inputRef.current.focus()
    }
    showAlert("Cleared message", 'info', 2000)
  }

  // Handle help button click
  const handleHelp = () => {
    const helpMessage = "Type your message, click Translate, and listen to the Morse code";
    showFlashText("help", helpMessage, 2500);
  }

  

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  return (
    <div className="flex flex-col font-lexend rounded-lg text-[#372824] transition-colors duration-500 ease-in-out">
      {/* Alert Message Component */}
      {alertMessage && (
        <div
          className={`
            mx-4 mt-4 p-3 rounded-md shadow-sm border text-sm flex items-center justify-between 
            animate-fadeIn transition-all duration-300 ease-in-out
            ${alertMessage.type === 'info' ? 'bg-green-50 border-green-200 text-green-700' : ''}
            ${alertMessage.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : ''}
            ${alertMessage.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : ''}
            ${alertMessage.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-700' : ''}
          `}
          role="alert"
        >
          <div className="flex items-center">
            <span className="mr-2">
              {alertMessage.type === 'info' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>}
              {alertMessage.type === 'success' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>}
              {alertMessage.type === 'error' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>}
              {alertMessage.type === 'warning' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>}
            </span>
            <span className="text-sm font-medium">{alertMessage.text}</span>
          </div>
          <button
            onClick={() => {
              const alertElement = document.querySelector('[role="alert"]');
              if (alertElement) {
                alertElement.classList.add('animate-fadeOut');
                alertElement.classList.remove('animate-fadeIn');
                setTimeout(() => {
                  setAlertMessage(null);
                }, 300);
              } else {
                setAlertMessage(null);
              }
            }}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      <div className="w-full mx-auto rounded-lg overflow-hidden border border-gray-200">
        <div className="grid">
          {/* Input section */}
          <div>
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="flex items-center">
                <span className="text-lg font-bold text-primary">
                  {strings.headingText}
                </span>
              </div>
            </div>

            <div className="relative">
              <Textarea
                ref={inputRef}
                value={inputText}
                onChange={handleInputChange}
                placeholder={typingPlaceholder}
                className="p-4 border-0 rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[200px] md:min-h-[200px] text-xl/relaxed dark:text-gray-100"
              />
            </div>

            <div className="p-3 border-t border-gray-200 flex flex-col space-x-2 items-center gap-y-6 justify-center">
              {/* Translate button */}
              <Button
                onClick={handleTranslate}
                variant="default"
                className="bg-[#456359] hover:bg-[#3a534a] text-white"
              >
                {strings.translate}
              </Button>

              {/* Effect selection and utilities */}
              {/* <div className="flex items-center space-x-2">
                <Button
                  onClick={toggleAudioEffect}
                  variant="ghost"
                  size="sm"
                  className={`relative ${audioEffectSelected ? 'bg-[#456359] hover:bg-[#456359] text-white hover:text-white' : 'text-primary hover:bg-white'} flex items-center gap-1 py-10 md:py-0`}
                  title={audioEffectSelected ? "Audio Enabled" : "Enable Audio"}
                >
                  {flashText.button === "audioeffect" && flashText.active && (
                    <span className={`${audioEffectSelected ? 'flash-text' : 'flash-text-inactive'}`}>{flashText.text}</span>
                  )}
                  <Volume2 className="h-5 w-5" />
                  {strings.audio}
                  <Check className={`h-5 w-5 ${audioEffectSelected ? 'text-white' : 'hidden'}`} />
                </Button>
              </div> */}

              <div className="flex items-center justify-around w-full md:w-fit">
                <Button
                  onClick={handleClear}
                  variant="ghost"
                  size="sm"
                  className="text-[#372824] dark:text-[#9ca3af] hover:text-black flex flex-col"
                  title="Clear Input"
                >
                  <Trash2 className="h-5 w-5 p-0 m-0 -mb-2" />
                  {strings.clear}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-gray-500 hover:text-gray-700 flex flex-col dark:text-[#9ca3af]"
                  title="Help"
                  onClick={handleHelp}
                >
                  {flashText.button === "help" && flashText.active && (
                    <span className="flash-text help-flash-text">{flashText.text}</span>
                  )}
                  <HelpCircle className="h-5 w-5 p-0 m-0 -mb-2" />
                  {strings.help}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Settings at the bottom */}
        <Collapsible className="border-t border-gray-200">
          <div className="flex justify-between items-center px-4 py-2">
            <span className="text-sm font-medium text-primary">{strings.settings}</span>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Toggle {strings.settings.toLowerCase()}</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <div className="p-4 border-t border-gray-100 grid gap-4 dark:text-[#9ca3af]">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-sm text-right col-span-1">
                  WPM:
                </label>
                <div className="col-span-2">
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={audioSettings.wpm}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      setAudioSettings({
                        ...audioSettings,
                        wpm: newValue
                      });
                      showAlert(`Speed set to ${newValue} WPM`, 'info', 1500);
                    }}
                    className="w-full accent-[#456359]"
                  />
                </div>
                <span className="col-span-1 text-sm">{audioSettings.wpm}</span>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-sm text-right col-span-1">
                  Frequency:
                </label>
                <div className="col-span-2">
                  <input
                    type="range"
                    min="400"
                    max="1000"
                    step="50"
                    value={audioSettings.frequency}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      setAudioSettings({
                        ...audioSettings,
                        frequency: newValue
                      });
                      showAlert(`Frequency set to ${newValue} Hz`, 'info', 1500);
                    }}
                    className="w-full accent-[#456359]"
                  />
                </div>
                <span className="col-span-1 text-sm">{audioSettings.frequency} Hz</span>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-sm text-right col-span-1">
                  Volume:
                </label>
                <div className="col-span-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={audioSettings.volume}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      setAudioSettings({
                        ...audioSettings,
                        volume: newValue
                      });
                      showAlert(`Volume set to ${Math.round(newValue * 100)}%`, 'info', 1500);
                    }}
                    className="w-full accent-[#456359]"
                  />
                </div>
                <span className="col-span-1 text-sm">{Math.round(audioSettings.volume * 100)}%</span>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-sm text-right col-span-1">
                  Sound Type:
                </label>
                <div className="col-span-3">
                  <div className="flex gap-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="soundType"
                        value="cw"
                        checked={audioSettings.soundType === 'cw'}
                        onChange={() => {
                          setAudioSettings({
                            ...audioSettings,
                            soundType: 'cw'
                          });
                          showAlert('Set to CW Radio Tone', 'info', 2000);
                        }}
                        className="mr-1 accent-[#456359]"
                      />
                      CW Radio Tone
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="soundType"
                        value="telegraph"
                        checked={audioSettings.soundType === 'telegraph'}
                        onChange={() => {
                          setAudioSettings({
                            ...audioSettings,
                            soundType: 'telegraph'
                          });
                          showAlert('Set to Telegraph Sounder', 'info', 2000);
                        }}
                        className="mr-1 accent-[#456359]"
                      />
                      Telegraph Sounder
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Custom animation styles (from original[1]) */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        .animate-fadeOut {
          animation: fadeOut 0.3s ease-in-out forwards;
        }
      `}</style>
    </div>
  )
}
