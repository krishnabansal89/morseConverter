"use client"

import { useState, useEffect, useRef } from "react"
import {
  Copy, Download, Trash2, HelpCircle, Volume2, Lightbulb, Check,
  Settings, ArrowLeftRight, ArrowUpDown
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
    morseToTextPlaceholder: "Enter Morse code (use dots and dashes, space between characters, and three spaces between words)",
    textToMorsePlaceholder: "Enter text to convert to Morse code",
    onlyDotsAndDashesAllowed: "In Morse code mode, only dots (.), dashes (-), and spaces are allowed",
    copy: "Copy",
    copied: "Copied!",
    download: "Download",
    clear: "Clear",
    settings: "Settings",
    help: "Help",
    audio: "Audio",
    visual: "Visual",
    swap: "Swap",
    convertedTextWillAppearHere: "Converted text will appear here",
    morseCodeWillAppearHere: "Morse code will appear here",
    errorFailedToInitAudio: "Failed to initialize AudioContext:",
    headingMorseCode: "Morse Code",
    headingText: "Text",
    backspaceDisabled: "Backspace is disabled in live mode"
  }
}

// International Morse Code Map
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

// Build text-to-morse map
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

export default function MorseCodeMachine({
  initialText = "",
  textToMorse = true // Changed default to true
}: {
  initialText?: string,
  textToMorse?: boolean
}) {
  const strings = translations.en;
  const [inputText, setInputText] = useState(initialText || "")
  const [outputText, setOutputText] = useState("")
  const [mode, setMode] = useState<"morse-to-text" | "text-to-morse">(textToMorse ? "text-to-morse" : "morse-to-text")
  
  // Audio and visual settings
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
  const [audioEffectSelected, setAudioEffectSelected] = useState(true)
  const [visualEffectSelected, setVisualEffectSelected] = useState(false)
  const [typingPlaceholder, setTypingPlaceholder] = useState("")
  const [visualEffect, setVisualEffect] = useState({
    active: false,
    isDash: false
  })

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const converterRef = useRef<HTMLDivElement>(null)
  
  // Live processing refs
  const processedLengthRef = useRef(0)
  const liveProcessingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const audioQueueRef = useRef<{ char: string; delay: number }[]>([])
  const visualQueueRef = useRef<{ char: string; delay: number }[]>([])
  const audioProcessingRef = useRef(false)
  const visualProcessingRef = useRef(false)
  const previousTextRef = useRef("")

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
  const placeholder = mode === "morse-to-text"
    ? strings.morseToTextPlaceholder
    : strings.textToMorsePlaceholder

  let currentIndex = 0
  let typingInterval: NodeJS.Timeout | null = null
  let isActive = true

  const typeChar = () => {
    if (!isActive) return
    
    if (currentIndex <= placeholder.length) {
      setTypingPlaceholder(placeholder.slice(0, currentIndex))
      currentIndex++
    } else {
      // Reset and pause before restarting
      currentIndex = 0
      if (typingInterval) {
        clearInterval(typingInterval)
      }
      
      // Restart after delay
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
}, [mode, strings])


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

  // Convert morse code to text (character by character)
  const convertMorseToTextLive = (morse: string) => {
    if (!morse.trim()) {
      setOutputText("")
      return ""
    }

    // Process character by character from startIndex
    let result = ""
    let wordBuffer = ""
    
    for (let i = 0; i < morse.length; i++) {
      const char = morse[i]
      
      if (char === ' ') {
        // Check for word boundary (multiple spaces)
        if (i + 2 < morse.length && morse[i + 1] === ' ' && morse[i + 2] === ' ') {
          // Process current word buffer
          if (wordBuffer) {
            const morseChars = wordBuffer.split(' ').filter(c => c)
            const textChars = morseChars.map(c => internationalMorseCodeMap[c] || "")
            result += textChars.join("")
            wordBuffer = ""
          }
          result += " "
          i += 2 // Skip the next two spaces
        } else {
          wordBuffer += char
        }
      } else {
        wordBuffer += char
      }
    }
    
    // Process remaining buffer
    if (wordBuffer.trim()) {
      const morseChars = wordBuffer.split(' ').filter(c => c)
      const textChars = morseChars.map(c => internationalMorseCodeMap[c] || "")
      result += textChars.join("")
    }

    return result
  }

  // Convert text to morse code (character by character)
  const convertTextToMorseLive = (text: string) => {
    if (!text.trim()) {
      setOutputText("")
      return ""
    }

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

  // Process visual queue
  const processVisualQueue = async () => {
    if (visualProcessingRef.current || visualQueueRef.current.length === 0) return
    
    visualProcessingRef.current = true

    const dotDuration = 1.2 / audioSettings.wpm * 1000
    const dashDuration = dotDuration * 3
    const symbolSpaceDuration = dotDuration
    const letterSpaceDuration = dotDuration * 3
    const wordSpaceDuration = dotDuration * 7

    let totalDelay = 0

    while (visualQueueRef.current.length > 0) {
      const { char } = visualQueueRef.current.shift()!
      
      let symbolDuration = 0
      let spaceDuration = symbolSpaceDuration

      if (char === '.' || char === '•') {
        symbolDuration = dotDuration
        setTimeout(() => {
          setVisualEffect({ active: true, isDash: false })
        }, totalDelay)
        setTimeout(() => {
          setVisualEffect({ active: false, isDash: false })
        }, totalDelay + symbolDuration)
      } else if (char === '-' || char === '–' || char === '—') {
        symbolDuration = dashDuration
        setTimeout(() => {
          setVisualEffect({ active: true, isDash: true })
        }, totalDelay)
        setTimeout(() => {
          setVisualEffect({ active: false, isDash: false })
        }, totalDelay + symbolDuration)
      } else if (char === ' ') {
        spaceDuration = letterSpaceDuration
        symbolDuration = 0
      } else if (char === '   ') {
        spaceDuration = wordSpaceDuration
        symbolDuration = 0
      }

      totalDelay += symbolDuration + spaceDuration
    }
    
    visualProcessingRef.current = false
  }

  // Live processing function - processes new characters immediately
  const processNewCharacters = (newText: string) => {
    const currentLength = newText.length
    const previousLength = processedLengthRef.current
    
    if (currentLength <= previousLength) {
      // Text was deleted or cleared - reset everything
      processedLengthRef.current = 0
      audioQueueRef.current = []
      visualQueueRef.current = []
      setVisualEffect({ active: false, isDash: false })
      return
    }

    // Get only the new characters
    const newChars = newText.slice(previousLength)
    processedLengthRef.current = currentLength

    // Convert and update output
    let newOutput = ""
    if (mode === "morse-to-text") {
      newOutput = convertMorseToTextLive(newText)
      setOutputText(newOutput)
      
      // Queue new characters for audio/visual if they're morse
      if (audioEffectSelected || visualEffectSelected) {
        for (const char of newChars) {
          if (char === '.' || char === '-' || char === ' ') {
            if (audioEffectSelected) {
              audioQueueRef.current.push({ char, delay: 0 })
            }
            if (visualEffectSelected) {
              visualQueueRef.current.push({ char, delay: 0 })
            }
          }
        }
      }
    } else {
      newOutput = convertTextToMorseLive(newText)
      setOutputText(newOutput)
      
      // Queue new morse characters for audio/visual
      if (audioEffectSelected || visualEffectSelected) {
        const previousOutput = mode === "text-to-morse" ? convertTextToMorseLive(newText.slice(0, previousLength)) : ""
        const newMorseChars = newOutput.slice(previousOutput.length)
        
        for (const char of newMorseChars) {
          if (char === '.' || char === '-' || char === ' ') {
            if (audioEffectSelected) {
              audioQueueRef.current.push({ char, delay: 0 })
            }
            if (visualEffectSelected) {
              visualQueueRef.current.push({ char, delay: 0 })
            }
          }
        }
      }
    }

    // Process queues
    if (audioEffectSelected && audioQueueRef.current.length > 0) {
      processAudioQueue()
    }
    if (visualEffectSelected && visualQueueRef.current.length > 0) {
      processVisualQueue()
    }
  }

  // Handle keydown events to prevent backspace and delete
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Prevent backspace (keyCode 8) and delete (keyCode 46)
    if (e.key === 'Backspace' || e.key === 'Delete' || e.keyCode === 8 || e.keyCode === 46) {
      e.preventDefault()
      showAlert(strings.backspaceDisabled, 'warning', 2000)
      return false
    }
  }

  // Handle input change with immediate live processing and backspace prevention
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const previousValue = previousTextRef.current;

    // Check if text was deleted (shorter than previous)
    if (value.length < previousValue.length) {
      // Restore previous value to prevent deletion
      setInputText(previousValue);
      showAlert(strings.backspaceDisabled, 'warning', 2000);
      return;
    }

    if (alertMessage && alertMessage.text === "Enter text or morse code to enable audio/visual") {
      setAlertMessage(null);
    }

    if (mode === "morse-to-text") {
      const sanitizedValue = value.replace(/[^.\- ]/g, "");
      if (sanitizedValue !== value) {
        showAlert(strings.onlyDotsAndDashesAllowed, 'error', 3000);
      }
      setInputText(sanitizedValue);
      previousTextRef.current = sanitizedValue;
      // Process immediately
      processNewCharacters(sanitizedValue);
    } else {
      setInputText(value);
      previousTextRef.current = value;
      // Process immediately
      processNewCharacters(value);
    }
  }

  // Toggle conversion mode
  const toggleMode = () => {
    const currentInput = inputText
    const currentOutput = outputText

    const newMode = mode === "morse-to-text" ? "text-to-morse" : "morse-to-text"
    setMode(newMode)

    if (currentOutput) {
      setInputText(currentOutput)
      setOutputText(currentInput)
      previousTextRef.current = currentOutput
    }

    // Reset processing
    processedLengthRef.current = 0
    audioQueueRef.current = []
    visualQueueRef.current = []
    setVisualEffect({ active: false, isDash: false })
  }

  // Handle copy to clipboard
  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText)
      showFlashText("copy", strings.copied)
    } else {
      showAlert("Nothing to copy", 'warning', 2000)
    }
  }

  // Handle download
  const handleDownload = () => {
    if (outputText) {
      const element = document.createElement("a")
      const file = new Blob([outputText], { type: "text/plain" })
      element.href = URL.createObjectURL(file)
      element.download = `morse-conversion-${Date.now()}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      showFlashText("download", "Downloaded!")
    } else {
      showAlert("Nothing to download", 'warning', 2000)
    }
  }

  // Handle clear input
  const handleClear = () => {
    setInputText("")
    setOutputText("")
    previousTextRef.current = ""
    processedLengthRef.current = 0
    audioQueueRef.current = []
    visualQueueRef.current = []
    setVisualEffect({ active: false, isDash: false })
    
    if (inputRef.current) {
      inputRef.current.focus()
    }
    showAlert("Cleared all text", 'info', 2000)
  }

  // Handle help button click
  const handleHelp = () => {
    let helpMessage = "";

    if (!inputText && !outputText) {
      helpMessage = "Enter text/morse to see live conversion";
    } else if (mode === "morse-to-text") {
      helpMessage = "Type Morse code to hear/see it live";
    } else {
      helpMessage = "Type text to convert to live Morse";
    }

    showFlashText("help", helpMessage, 2500);
  }

  const toggleAudioEffect = () => {
    const newValue = !audioEffectSelected;
    setAudioEffectSelected(newValue);

    if (!newValue && !visualEffectSelected) {
      setVisualEffectSelected(true);
      showFlashText("visualeffect", "Visual effect enabled");
    } else if (newValue) {
      showFlashText("audioeffect", "Audio effect enabled");
    } else {
      showFlashText("audioeffect", "Audio effect disabled");
    }
  };

  const toggleVisualEffect = () => {
    const newValue = !visualEffectSelected;
    setVisualEffectSelected(newValue);

    if (!newValue && !audioEffectSelected) {
      setAudioEffectSelected(true);
      showFlashText("audioeffect", "Audio effect enabled");
    } else if (newValue) {
      showFlashText("visualeffect", "Visual effect enabled");
    } else {
      showFlashText("visualeffect", "Visual effect disabled");
    }
  };



  // Initialize previous text ref
  useEffect(() => {
    previousTextRef.current = inputText;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      if (liveProcessingTimeoutRef.current) {
        clearTimeout(liveProcessingTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={converterRef}
      className={`
        flex flex-col font-lexend rounded-lg text-[#372824] transition-colors duration-500 ease-in-out
        ${visualEffect.active ? (visualEffect.isDash ? 'bg-[#456359] text-white pulse-dash' : 'bg-[#456359] text-white pulse-dot') : ''}
      `}
    >
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
        <div className="grid md:grid-cols-2 relative">
          {/* Swap button in center */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-10 md:block hidden">
            <div className="flex flex-col items-center">
              <Button
                onClick={toggleMode}
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12 border-[#456359] bg-white shadow-md overflow-hidden"
              >
                <div className="swap-arrow-container">
                  <ArrowLeftRight className="h-6 w-6 text-[#456359]" />
                </div>
              </Button>
              <span className="text-xs mt-1 text-[#456359]">{strings.swap}</span>
            </div>
          </div>

          {/* Input section */}
          <div className="border-r border-gray-200">
            <div className="flex md:justify-between justify-around items-center p-4 border-b border-gray-200 md:w-full md:flex-row flex-col gap-y-2">
              <div className="flex items-center">
                <span className="md:text-lg text-2xl font-bold text-[#456359]">
                  {mode === "morse-to-text" ? strings.headingMorseCode : strings.headingText}
                </span>
              </div>

              {/* Live indicator */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">LIVE</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Textarea
                ref={inputRef}
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onClick={() => {
                  if (!inputText) {
                    showAlert("Start typing to see live conversion", 'info', 3000);
                  }
                }}
                placeholder={typingPlaceholder}
                className="p-4 border-0 rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[200px] md:min-h-[300px] text-xl/relaxed"
              />
            </div>

            <div className="p-3 md:border-t md:border-0 border-b flex md:justify-between md:w-full justify-center border-gray-200 my-3 md:my-0">
              <Button
                onClick={handleClear}
                variant="ghost"
                size="sm"
                className="text-[#372824] hover:text-black md:flex flex-col hidden"
                title="Clear Input"
              >
                <Trash2 className="h-5 w-5 p-0 m-0 -mb-2" />
                {strings.clear}
              </Button>
              <Button
                onClick={toggleMode}
                variant="ghost"
                size="sm"
                className="md:hidden bg-[#456359] hover:bg-[#456359] text-white hover:text-white flex -mb-7"
                title="Swap Modes"
              >
                <ArrowUpDown className="h-5 w-5 p-0 m-0" />
                {strings.swap}
              </Button>
            </div>
          </div>

          {/* Output section */}
          <div>
            <div className="flex md:justify-between justify-around items-center p-4 border-b border-gray-200 text-[#372824] md:w-full md:flex-row flex-col gap-y-2">
              <div className="flex items-center">
                <span className="md:text-lg text-2xl text-[#456359] font-bold">
                  {mode === "morse-to-text" ? strings.headingText : strings.headingMorseCode}
                </span>
              </div>

              {/* Live conversion indicator */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">AUTO</span>
                </div>
              </div>
            </div>

            <div className="p-4 text-gray-800 whitespace-pre-wrap min-h-[200px] md:min-h-[300px] text-xl">
              {outputText || (
                <span className="text-gray-400 text-md">
                  {mode === "morse-to-text"
                    ? strings.convertedTextWillAppearHere
                    : strings.morseCodeWillAppearHere
                  }
                </span>
              )}
            </div>

            <div className="p-3 border-t border-gray-200 flex flex-col md:flex-row md:justify-between space-x-2 md:w-full items-center gap-y-6 justify-center">
              {/* Effect selection buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  onClick={toggleAudioEffect}
                  variant="ghost"
                  size="sm"
                  className={`relative ${audioEffectSelected ? 'bg-[#456359] hover:bg-[#456359] text-white hover:text-white' : 'text-[#456359] hover:bg-white'} flex items-center gap-1 md:flex-row flex-col py-10 md:py-0`}
                  title={audioEffectSelected ? "Live Audio Enabled" : "Enable Live Audio"}
                >
                  {flashText.button === "audioeffect" && flashText.active && (
                    <span className={`${audioEffectSelected ? 'flash-text' : 'flash-text-inactive'}`}>{flashText.text}</span>
                  )}
                  <Volume2 className="h-5 w-5" />
                  {strings.audio}
                  <Check className={`h-5 w-5 ${audioEffectSelected ? 'text-white' : 'hidden'}`} />
                </Button>

                <Button
                  onClick={toggleVisualEffect}
                  variant="ghost"
                  size="sm"
                  className={`relative ${visualEffectSelected ? 'bg-[#456359] hover:bg-[#456359] text-white hover:text-white' : 'text-[#456359] hover:bg-white'} flex items-center gap-1 md:flex-row flex-col py-10 md:py-0`}
                  title={visualEffectSelected ? "Live Visual Enabled" : "Enable Live Visual"}
                >
                  {flashText.button === "visualeffect" && flashText.active && (
                    <span className={`${visualEffectSelected ? 'flash-text' : 'flash-text-inactive'}`}>{flashText.text}</span>
                  )}
                  <Lightbulb className="h-5 w-5" />
                  {strings.visual}
                  <Check className={`h-5 w-5 ${visualEffectSelected ? 'text-white' : 'hidden'}`} />
                </Button>
              </div>

              {/* Utility buttons */}
              <div className="flex items-center md:justify-end justify-around md:w-fit w-full md:mx-0 mx-auto">
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="sm"
                  className="relative text-gray-500 hover:text-gray-700 flex flex-col"
                  disabled={!outputText}
                  title={`${strings.copy} Output`}
                >
                  {flashText.button === "copy" && flashText.active && (
                    <span className="flash-text">{flashText.text}</span>
                  )}
                  <Copy className="h-5 w-5 p-0 m-0 -mb-2" />
                  {strings.copy}
                </Button>

                <Button
                  onClick={handleDownload}
                  variant="ghost"
                  size="sm"
                  className="relative text-gray-500 hover:text-gray-700 flex flex-col"
                  disabled={!outputText}
                  title="Download Output"
                >
                  {flashText.button === "download" && flashText.active && (
                    <span className="flash-text">Downloaded!</span>
                  )}
                  <Download className="h-5 w-5 p-0 m-0 -mb-2" />
                  {strings.download}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-gray-500 hover:text-gray-700 flex flex-col"
                  title="Help"
                  onClick={handleHelp}
                >
                  {flashText.button === "help" && flashText.active && (
                    <span className="flash-text help-flash-text">{flashText.text}</span>
                  )}
                  <HelpCircle className="h-5 w-5 p-0 m-0 -mb-2" />
                  {strings.help}
                </Button>

                <Button
                  onClick={handleClear}
                  disabled={!inputText}
                  variant="ghost"
                  size="sm"
                  className="text-[#372824] hover:text-black flex flex-col md:hidden"
                  title="Clear Input"
                >
                  <Trash2 className="h-5 w-5 p-0 m-0 -mb-2" />
                  {strings.clear}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Settings at the bottom */}
        <Collapsible className="border-t border-gray-200">
          <div className="flex justify-between items-center px-4 py-2">
            <span className="text-sm font-medium text-[#456359]">{strings.settings}</span>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#456359]"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Toggle {strings.settings.toLowerCase()}</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <div className="p-4 border-t border-gray-100 grid gap-4">
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
                      showAlert(`Live speed set to ${newValue} WPM`, 'info', 1500);
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
                      showAlert(`Tone frequency set to ${newValue} Hz`, 'info', 1500);
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
                          showAlert('Sound type set to CW Radio Tone', 'info', 2000);
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
                          showAlert('Sound type set to Telegraph Sounder', 'info', 2000);
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

      {/* Custom animation styles */}
      <style jsx global>{`
        @keyframes pulse-dot {
          0%, 100% { background-color: #456359; }
          50% { background-color: #5a7d73; }
        }
        
        @keyframes pulse-dash {
          0%, 100% { background-color: #456359; }
          50% { background-color: #3a534a; }
        }
        
        .pulse-dot {
          animation: pulse-dot 0.15s ease-in-out;
          transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
        }
        
        .pulse-dash {
          animation: pulse-dash 0.5s ease-in-out;
          transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
        }
        
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
