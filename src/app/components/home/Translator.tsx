"use client"

import { useState, useEffect, useRef } from "react"
import {
  Copy, Download, Trash2, HelpCircle, Volume2,
  Settings, ArrowLeftRight, Lightbulb
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export const morseCodeMap: Record<string, string> = {
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

const textToMorseMap: Record<string, string> = Object.entries(morseCodeMap).reduce(
  (acc, [morse, text]) => {
    if (text !== " ") {
      acc[text.toLowerCase()] = morse
    }
    return acc
  },
  {} as Record<string, string>,
)

export default function MorseConverter({
  initialText = "",
  textToMorse = false
}: {
  initialText?: string,
  textToMorse?: boolean
}) {
  const [isVisualPlaying, setIsVisualPlaying] = useState(false)
  const [inputText, setInputText] = useState(initialText || "")
  const [outputText, setOutputText] = useState("")
  const [mode, setMode] = useState<"morse-to-text" | "text-to-morse">(textToMorse ? "text-to-morse" : "morse-to-text")
  const [copied, setCopied] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isInputPlaying, setIsInputPlaying] = useState(false)
  const [audioSettings, setAudioSettings] = useState({
    wpm: 15,
    frequency: 700,
    volume: 0.5,
    soundType: 'cw' // Default to CW radio tone
  })

  const [typingPlaceholder, setTypingPlaceholder] = useState("")
  const [inputError, setInputError] = useState<string | null>(null)
  const [visualEffect, setVisualEffect] = useState({
    active: false,
    isDash: false
  })

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const converterRef = useRef<HTMLDivElement>(null)

  // Check if it's a single letter display mode
  const isSingleLetterMode = initialText.length === 1

  // Handle typing effect for placeholders
  useEffect(() => {
    const placeholder = mode === "morse-to-text"
      ? "Enter Morse code (use dots and dashes, spaces between characters and three spaces between words)"
      : "Type text to convert to Morse code"

    let currentIndex = 0
    let typingInterval: NodeJS.Timeout

    const typeChar = () => {
      if (currentIndex <= placeholder.length) {
        setTypingPlaceholder(placeholder.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        // Reset to start typing again after a pause
        setTimeout(() => {
          currentIndex = 0
          typingInterval = setInterval(typeChar, 70)
        }, 3000)
      }
    }

    typingInterval = setInterval(typeChar, 70)

    return () => clearInterval(typingInterval)
  }, [mode])

  // Set initial text and conversion
  useEffect(() => {
    if (initialText) {
      setInputText(initialText)
      // Perform the appropriate conversion based on mode
      if (mode === "morse-to-text") {
        convertMorseToText(initialText)
      } else {
        convertTextToMorse(initialText)
      }
    }
  }, [initialText])

  // Convert input based on selected mode whenever it changes
  useEffect(() => {
    if (mode === "morse-to-text") {
      convertMorseToText(inputText)
    } else {
      convertTextToMorse(inputText)
    }
  }, [inputText, mode])

  // Initialize audio context
  useEffect(() => {
    return () => {
      // Cleanup audio context when component unmounts
      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Convert morse code to text
  const convertMorseToText = (morse: string) => {
    if (!morse.trim()) {
      setOutputText("")
      return
    }

    const morseWords = morse.trim().split("   ")
    const textWords = morseWords.map((word) => {
      const morseChars = word.split(" ")
      return morseChars.map((char) => morseCodeMap[char] || "").join("")
    })
    setOutputText(textWords.join(" "))
  }

  // Convert text to morse code
  const convertTextToMorse = (text: string) => {
    if (!text.trim()) {
      setOutputText("")
      return
    }

    const words = text.toLowerCase().split(" ")
    const morseWords = words.map((word) => {
      return Array.from(word)
        .map((char) => textToMorseMap[char] || "")
        .filter((morse) => morse !== "")
        .join(" ")
    })
    setOutputText(morseWords.join("   "))
  }

  // Toggle conversion mode
  const toggleMode = () => {
    // Save current values before changing
    const currentInput = inputText
    const currentOutput = outputText

    // Clear any existing error message
    setInputError(null)

    // Update mode
    setMode((prev) => (prev === "morse-to-text" ? "text-to-morse" : "morse-to-text"))

    // Swap input and output (only if there is actual output to swap)
    if (currentOutput) {
      setInputText(currentOutput)
      setOutputText(currentInput)
    }
  }

  // Handle input change with validation for Morse code mode
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (mode === "morse-to-text") {
      // Only allow valid Morse code characters (dots, dashes, spaces)
      const sanitizedValue = value.replace(/[^.\- ]/g, "");

      if (sanitizedValue !== value) {
        // Show error message if invalid characters were removed
        setInputError("Only dots (.), dashes (-) and spaces are allowed in Morse code mode");
        // Clear error after 3 seconds
        setTimeout(() => setInputError(null), 3000);
      }

      setInputText(sanitizedValue);
    } else {
      // No restrictions in text-to-morse mode
      setInputText(value);
    }
  }

  // Initialize Audio Context
  const setupAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      oscillatorRef.current = audioContextRef.current.createOscillator()
      gainNodeRef.current = audioContextRef.current.createGain()

      oscillatorRef.current.frequency.value = audioSettings.frequency
      gainNodeRef.current.gain.value = 0

      oscillatorRef.current.connect(gainNodeRef.current)
      gainNodeRef.current.connect(audioContextRef.current.destination)

      oscillatorRef.current.start()
    }
  }
  const playVisualMorse = (morseText: string) => {
    if (!morseText) return

    setIsVisualPlaying(true)

    const dotDuration = 1.2 / audioSettings.wpm
    const dashDuration = dotDuration * 3
    const symbolSpaceDuration = dotDuration
    const letterSpaceDuration = dotDuration * 3
    const wordSpaceDuration = dotDuration * 7

    let t = 0 // Start time

    const playSymbols = async () => {
      const symbols = morseText.split('')

      for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i]

        if (symbol === '.' || symbol === '•') {
          // Show dot visual
          setTimeout(() => {
            setVisualEffect({ active: true, isDash: false })
          }, t * 1000)

          t += dotDuration

          // Hide visual
          setTimeout(() => {
            setVisualEffect({ active: false, isDash: false })
          }, t * 1000)

          t += symbolSpaceDuration
        }
        else if (symbol === '-' || symbol === '–' || symbol === '—') {
          // Show dash visual
          setTimeout(() => {
            setVisualEffect({ active: true, isDash: true })
          }, t * 1000)

          t += dashDuration

          // Hide visual
          setTimeout(() => {
            setVisualEffect({ active: false, isDash: false })
          }, t * 1000)

          t += symbolSpaceDuration
        }
        else if (symbol === ' ') {
          // Handle spaces
          if (i + 1 < symbols.length && symbols[i + 1] === ' ' && i + 2 < symbols.length && symbols[i + 2] === ' ') {
            t += wordSpaceDuration
            i += 2 // Skip the next two spaces
          } else {
            t += letterSpaceDuration
          }
        }
      }

      // Set a timeout to update playing state after visuals finish
      setTimeout(() => {
        setIsVisualPlaying(false)
      }, t * 1000)
    }

    playSymbols()
  }

  // Play morse code audio
  const playMorseAudio = (morseText: string, isInput = false) => {
    if (!morseText) return

    setupAudio()
    if (!audioContextRef.current || !gainNodeRef.current || !oscillatorRef.current) return

    isInput ? setIsInputPlaying(true) : setIsPlaying(true)

    const dotDuration = 1.2 / audioSettings.wpm
    const dashDuration = dotDuration * 3
    const symbolSpaceDuration = dotDuration
    const letterSpaceDuration = dotDuration * 3
    const wordSpaceDuration = dotDuration * 7

    const ac = audioContextRef.current
    const gain = gainNodeRef.current

    let t = ac.currentTime + 0.1

    // Set oscillator frequency
    oscillatorRef.current.frequency.value = audioSettings.frequency

    if (audioSettings.soundType === 'telegraph') {
      // Create different oscillator type for telegraph sound
      oscillatorRef.current.type = 'square'; // Square wave for more mechanical sound
    } else {
      // Default CW radio tone
      oscillatorRef.current.type = 'sine'; // Sine wave for smoother tone
    }


    const playSymbols = async () => {
      const symbols = morseText.split('')

      for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i]

        if (symbol === '.' || symbol === '•') {
          // Play dot
          if (audioSettings.soundType === 'telegraph') {
            // Add slight attack/decay for telegraph sound
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(audioSettings.volume, t + 0.01);
            // Rest of telegraph sound logic
          } else {
            // Original CW radio tone behavior
            gain.gain.setValueAtTime(audioSettings.volume, t);
          }

          // Activate visual effect for dot

          t += dotDuration
          gain.gain.setValueAtTime(0, t)

          // Deactivate visual effect


          t += symbolSpaceDuration
        }
        else if (symbol === '-' || symbol === '–' || symbol === '—') {
          // Play dash
          if (audioSettings.soundType === 'telegraph') {
            // Add slight attack/decay for telegraph sound
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(audioSettings.volume, t + 0.01);
            // Rest of telegraph sound logic
          } else {
            // Original CW radio tone behavior
            gain.gain.setValueAtTime(audioSettings.volume, t);
          }

          // Activate visual effect for dash


          t += dashDuration
          gain.gain.setValueAtTime(0, t)

          // Deactivate visual effect


          t += symbolSpaceDuration
        }
        else if (symbol === ' ') {
          // Check if it's part of a word space (3 spaces) or letter space
          if (i + 1 < symbols.length && symbols[i + 1] === ' ' && i + 2 < symbols.length && symbols[i + 2] === ' ') {
            t += wordSpaceDuration
            i += 2 // Skip the next two spaces
          } else {
            t += letterSpaceDuration
          }
        }
      }

      // Set a timeout to update playing state after audio finishes
      const totalDuration = (t - ac.currentTime) * 1000
      setTimeout(() => {
        isInput ? setIsInputPlaying(false) : setIsPlaying(false)
      }, totalDuration)
    }

    playSymbols()
  }

  // Text-to-speech for regular text
  const speakText = (text: string) => {
    if (text && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-US"
      window.speechSynthesis.speak(utterance)
    }
  }

  // Handle audio playback based on content type
  const handleAudioPlay = (text: string, isInput = false) => {
    // Determine if this is morse code or regular text
    const isMorse = /^[.\- ]+$/.test(text.replace(/\s+/g, ' '))

    if (isMorse) {
      playMorseAudio(text, isInput)
    } else {
      speakText(text)
    }
  }

  // Handle copy to clipboard
  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Handle download as text file
  const handleDownload = () => {
    if (outputText) {
      const element = document.createElement("a")
      const file = new Blob([outputText], { type: "text/plain" })
      element.href = URL.createObjectURL(file)
      element.download = `morse-conversion-${Date.now()}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }

  // Handle clear input
  const handleClear = () => {
    setInputText("")
    setOutputText("")
    setInputError(null)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div
      ref={converterRef}
      className={`
        flex flex-col font-lexend rounded-lg text-[#372824] transition-all duration-300
        ${visualEffect.active ? (visualEffect.isDash ? 'bg-[#456359] text-white pulse-dash' : 'bg-[#456359] text-white pulse-dot') : ''}
      `}
    >
      <div className="w-full mx-auto rounded-lg overflow-hidden border border-gray-200">
        <div className="grid md:grid-cols-2 relative">
          {/* Swap button in center */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-10 md:block hidden">
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
          </div>

          {/* Input section */}
          <div className="border-r border-gray-200">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="flex items-center">
                <span className="text-md font-semibold text-[#456359]">
                  {mode === "morse-to-text" ? "Morse Code" : "Text"}
                </span>
              </div>

              {/* Audio button for input */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleAudioPlay(inputText, true)}
                  variant="ghost"
                  size="sm"
                  className={`text-[#456359] ${isInputPlaying ? 'animate-pulse' : ''}`}
                  disabled={isInputPlaying || !inputText}
                >
                  <Volume2 size={18} />
                </Button>

                {/* Show swap button on mobile */}
                <Button
                  onClick={toggleMode}
                  variant="ghost"
                  size="sm"
                  className="md:hidden text-[#456359]"
                >
                  <ArrowLeftRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <Textarea
                ref={inputRef}
                value={inputText}
                onChange={handleInputChange}
                placeholder={typingPlaceholder}
                className={`
                  p-4 border-0 rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0
                  ${initialText.length === 0
                    ? "min-h-[200px] md:min-h-[300px]"
                    : "min-h-[100px] md:min-h-[200px]"}
                  ${isSingleLetterMode && inputText === initialText
                    ? "text-center text-4xl md:text-6xl"
                    : "text-base"}
                `}
              />

              {/* Error message */}
              {inputError && (
                <div className="absolute bottom-2 left-0 right-0 mx-4 p-2 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                  {inputError}
                </div>
              )}
            </div>

            <div className="p-3 border-t flex justify-between border-gray-200">
              <Button
                onClick={handleClear}
                variant="ghost"
                size="sm"
                className="text-[#372824] hover:text-black"
              >
                <Trash2 className="h-5 w-5" />
              </Button>

            </div>
          </div>

          {/* Output section */}
          <div>
            <div className="flex justify-between items-center p-4 border-b border-gray-200 text-[#372824]">
              <div className="flex items-center">
                <span className="text-md text-[#456359] font-semibold">
                  {mode === "morse-to-text" ? "Text" : "Morse Code"}
                </span>
              </div>

              <Button
                onClick={() => handleAudioPlay(outputText)}
                variant="ghost"
                size="sm"
                className={`text-[#456359] ${isPlaying ? 'animate-pulse' : ''}`}
                disabled={isPlaying || !outputText}
              >
                <Volume2 size={18} />
              </Button>


            </div>

            <div className={`
              p-4 text-gray-800 whitespace-pre-wrap
              ${initialText.length === 0
                ? "min-h-[200px] md:min-h-[300px]"
                : "min-h-[100px] md:min-h-[200px]"}
              ${isSingleLetterMode
                ? "text-center text-4xl md:text-6xl"
                : "text-base"}
            `}>
              {outputText || (
                <span className="text-gray-400 text-base">
                  {mode === "morse-to-text" ? "Converted text will appear here" : "Morse code will appear here"}
                </span>
              )}
            </div>

            <div className="p-3 border-t border-gray-200 flex justify-end space-x-2">
              <Button
                onClick={handleCopy}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
                disabled={!outputText}
              >
                <Copy className="h-5 w-5" />
                {copied && <span className="sr-only">Copied!</span>}
              </Button>
              <Button
                onClick={() => playVisualMorse(mode === "morse-to-text" ? inputText : outputText)}
                variant="ghost"
                size="sm"
                className={`text-[#456359] ${isVisualPlaying ? 'animate-pulse' : ''}`}
                disabled={isVisualPlaying || !inputText}
              >
                <Lightbulb size={18} />
              </Button>
              <Button
                onClick={handleDownload}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
                disabled={!outputText}
              >
                <Download className="h-5 w-5" />
              </Button>
              <Button
                onClick={handleClear}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
                disabled={!outputText}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
              {/* <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
                disabled={!outputText}
              >
                <Share2 className="h-5 w-5" />
              </Button> */}
            </div>
          </div>
        </div>

        {/* Audio Settings at the bottom */}
        <Collapsible className="border-t border-gray-200">
          <div className="flex justify-between items-center px-4 py-2">
            <span className="text-sm font-medium text-[#456359]">Audio Settings</span>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#456359]"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Toggle settings</span>
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
                    onChange={(e) => setAudioSettings({
                      ...audioSettings,
                      wpm: Number(e.target.value)
                    })}
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
                    onChange={(e) => setAudioSettings({
                      ...audioSettings,
                      frequency: Number(e.target.value)
                    })}
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
                    onChange={(e) => setAudioSettings({
                      ...audioSettings,
                      volume: Number(e.target.value)
                    })}
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
                        onChange={() => setAudioSettings({
                          ...audioSettings,
                          soundType: 'cw'
                        })}
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
                        onChange={() => setAudioSettings({
                          ...audioSettings,
                          soundType: 'telegraph'
                        })}
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

      {/* Add custom animation keyframes */}
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
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
        }
        
        .pulse-dash {
          animation: pulse-dash 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}