"use client"

import { useState, useEffect, useRef } from "react"
import {
  Copy, Download, Trash2, HelpCircle, Volume2, Pause, // Added Pause
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
  const [inputText, setInputText] = useState(initialText || "")
  const [outputText, setOutputText] = useState("")
  const [mode, setMode] = useState<"morse-to-text" | "text-to-morse">(textToMorse ? "text-to-morse" : "morse-to-text")
  const [copied, setCopied] = useState(false)
  const [isVisualPlaying, setIsVisualPlaying] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isInputPlaying, setIsInputPlaying] = useState(false)
  const [isInputVisualPlaying, setIsInputVisualPlaying] = useState(false);
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

  // Refs for timeouts
  const inputAudioTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const outputAudioTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const inputVisualTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const outputVisualTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // --- Stop Functions ---
  const stopAudioPlayback = (isInput = false) => {
    const timeouts = isInput ? inputAudioTimeoutsRef.current : outputAudioTimeoutsRef.current;
    timeouts.forEach(clearTimeout);
    if (isInput) {
      inputAudioTimeoutsRef.current = [];
      setIsInputPlaying(false);
    } else {
      outputAudioTimeoutsRef.current = [];
      setIsPlaying(false);
    }

    // Stop audio context gain immediately
    if (audioContextRef.current && gainNodeRef.current) {
      const ac = audioContextRef.current;
      const gain = gainNodeRef.current;
      gain.gain.cancelScheduledValues(ac.currentTime);
      gain.gain.setValueAtTime(0, ac.currentTime);
    }
    // Also stop any text-to-speech
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      // Need to reset state if text-to-speech was stopped
      if (!isInput) setIsPlaying(false);
      // Assuming text-to-speech only happens for output, but handle input if needed
      // if (isInput) setIsInputPlaying(false);
    }
  };

  const stopVisualPlayback = (isInput = false) => {
    const timeouts = isInput ? inputVisualTimeoutsRef.current : outputVisualTimeoutsRef.current;
    timeouts.forEach(clearTimeout);
    if (isInput) {
      inputVisualTimeoutsRef.current = [];
      setIsInputVisualPlaying(false);
    } else {
      outputVisualTimeoutsRef.current = [];
      setIsVisualPlaying(false);
    }
    // Reset visual effect immediately
    setVisualEffect({ active: false, isDash: false });
  };

  // --- Modified Playback Functions ---

  const playVisualMorse = (morseText: string, isInput = false) => {
    if (!morseText) return

    // Stop any previous visual playback for this section
    stopVisualPlayback(isInput);

    const timeoutsRef = isInput ? inputVisualTimeoutsRef : outputVisualTimeoutsRef;
    const setState = isInput ? setIsInputVisualPlaying : setIsVisualPlaying;

    setState(true);

    const dotDuration = 1.2 / audioSettings.wpm
    const dashDuration = dotDuration * 3
    const symbolSpaceDuration = dotDuration
    const letterSpaceDuration = dotDuration * 3
    const wordSpaceDuration = dotDuration * 7

    let t = 0 // Start time
    const currentPlaybackTimeouts: NodeJS.Timeout[] = [];

    const playSymbols = async () => {
      const symbols = morseText.split('')

      for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i]
        let visualTimeoutId: NodeJS.Timeout;
        let hideTimeoutId: NodeJS.Timeout;

        if (symbol === '.' || symbol === '•') {
          visualTimeoutId = setTimeout(() => {
            setVisualEffect({ active: true, isDash: false })
          }, t * 1000)
          currentPlaybackTimeouts.push(visualTimeoutId);
          t += dotDuration
          hideTimeoutId = setTimeout(() => {
            setVisualEffect({ active: false, isDash: false })
          }, t * 1000)
          currentPlaybackTimeouts.push(hideTimeoutId);
          t += symbolSpaceDuration
        }
        else if (symbol === '-' || symbol === '–' || symbol === '—') {
          visualTimeoutId = setTimeout(() => {
            setVisualEffect({ active: true, isDash: true })
          }, t * 1000)
          currentPlaybackTimeouts.push(visualTimeoutId);
          t += dashDuration
          hideTimeoutId = setTimeout(() => {
            setVisualEffect({ active: false, isDash: false })
          }, t * 1000)
          currentPlaybackTimeouts.push(hideTimeoutId);
          t += symbolSpaceDuration
        }
        else if (symbol === ' ') {
          if (i + 1 < symbols.length && symbols[i + 1] === ' ' && i + 2 < symbols.length && symbols[i + 2] === ' ') {
            t += wordSpaceDuration
            i += 2
          } else {
            t += letterSpaceDuration
          }
        }
      }

      // Final timeout to reset state
      const finalTimeoutId = setTimeout(() => {
        setState(false);
        timeoutsRef.current = []; // Clear timeouts on natural completion
      }, t * 1000)
      currentPlaybackTimeouts.push(finalTimeoutId);

      // Store all timeouts for this playback instance
      timeoutsRef.current = currentPlaybackTimeouts;
    }

    playSymbols()
  }

  const playMorseAudio = (morseText: string, isInput = false) => {
    if (!morseText) return

    // Stop any previous audio playback for this section
    stopAudioPlayback(isInput);

    setupAudio()
    if (!audioContextRef.current || !gainNodeRef.current || !oscillatorRef.current) return

    const timeoutsRef = isInput ? inputAudioTimeoutsRef : outputAudioTimeoutsRef;
    const setState = isInput ? setIsInputPlaying : setIsPlaying;

    setState(true);

    const dotDuration = 1.2 / audioSettings.wpm
    const dashDuration = dotDuration * 3
    const symbolSpaceDuration = dotDuration
    const letterSpaceDuration = dotDuration * 3
    const wordSpaceDuration = dotDuration * 7

    const ac = audioContextRef.current
    const gain = gainNodeRef.current
    const osc = oscillatorRef.current;

    let t = ac.currentTime + 0.1
    const currentPlaybackTimeouts: NodeJS.Timeout[] = [];

    osc.frequency.value = audioSettings.frequency
    osc.type = audioSettings.soundType === 'telegraph' ? 'square' : 'sine';

    const playSymbols = async () => {
      const symbols = morseText.split('')

      for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i]

        if (symbol === '.' || symbol === '•') {
          if (audioSettings.soundType === 'telegraph') {
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(audioSettings.volume, t + 0.01);
          } else {
            gain.gain.setValueAtTime(audioSettings.volume, t);
          }
          t += dotDuration
          gain.gain.setValueAtTime(0, t)
          t += symbolSpaceDuration
        }
        else if (symbol === '-' || symbol === '–' || symbol === '—') {
          if (audioSettings.soundType === 'telegraph') {
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(audioSettings.volume, t + 0.01);
          } else {
            gain.gain.setValueAtTime(audioSettings.volume, t);
          }
          t += dashDuration
          gain.gain.setValueAtTime(0, t)
          t += symbolSpaceDuration
        }
        else if (symbol === ' ') {
          if (i + 1 < symbols.length && symbols[i + 1] === ' ' && i + 2 < symbols.length && symbols[i + 2] === ' ') {
            t += wordSpaceDuration
            i += 2
          } else {
            t += letterSpaceDuration
          }
        }
      }

      // Schedule state reset slightly after the last sound should end
      const totalDuration = (t - ac.currentTime) * 1000;
      const finalTimeoutId = setTimeout(() => {
        setState(false);
        timeoutsRef.current = []; // Clear timeouts on natural completion
      }, totalDuration + 50); // Add a small buffer
      currentPlaybackTimeouts.push(finalTimeoutId);

      // Store all timeouts (though only the last one matters for audio state)
      timeoutsRef.current = currentPlaybackTimeouts;
    }

    playSymbols()
  }

  const speakText = (text: string, isInput = false) => {
    if (text && window.speechSynthesis) {
      // Stop any previous speech
      stopAudioPlayback(isInput);

      const setState = isInput ? setIsInputPlaying : setIsPlaying;
      setState(true);

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-US"
      utterance.onend = () => {
        setState(false);
      };
      utterance.onerror = () => {
        console.error("Speech synthesis error");
        setState(false); // Reset state on error too
      };
      window.speechSynthesis.speak(utterance)
    }
  }

  // --- Modified Handler Functions ---
  const handleAudioPlay = (text: string, isInput = false) => {
    const isPlayingState = isInput ? isInputPlaying : isPlaying;

    if (isPlayingState) {
      stopAudioPlayback(isInput);
    } else {
      const isMorse = /^[.\- ]+$/.test(text.replace(/\s+/g, ' '));
      if (isMorse) {
        playMorseAudio(text, isInput);
      } else {
        speakText(text, isInput);
      }
    }
  }

  const handleVisualPlay = (text: string, isInput = false) => {
    const isVisualPlayingState = isInput ? isInputVisualPlaying : isVisualPlaying;

    if (isVisualPlayingState) {
      stopVisualPlayback(isInput);
    } else {
      const isMorse = /^[.\- ]+$/.test(text.replace(/\s+/g, ' '));
      if (isMorse) {
        playVisualMorse(text, isInput);
      } else {
        console.log("Visual effect not applicable for plain text.");
      }
    }
  };

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
                <span className="text-lg font-semibold text-[#456359]">
                  {mode === "morse-to-text" ? "Morse Code" : "Text"}
                </span>
              </div>

              {/* Action buttons for input */}
              <div className="flex items-center gap-1">
                {/* Input Audio Button */}
                <Button
                  onClick={() => handleAudioPlay(inputText, true)}
                  variant="ghost"
                  size="sm"
                  className={`text-[#456359] ${isInputPlaying ? 'animate-pulse' : ''}`}
                  disabled={!inputText || isInputVisualPlaying} // Only disable if visual is playing
                  title={isInputPlaying ? "Stop Audio" : "Play Audio"}
                >
                  {isInputPlaying ? <Pause size={18} /> : <Volume2 size={18} />}
                </Button>

                {/* Input Visual Effect Button */}
                <Button
                  onClick={() => handleVisualPlay(inputText, true)}
                  variant="ghost"
                  size="sm"
                  className={`text-[#456359] ${isInputVisualPlaying ? 'animate-pulse' : ''}`}
                  disabled={!inputText || isInputPlaying} // Only disable if audio is playing
                  title={isInputVisualPlaying ? "Stop Visual Effect" : "Play Visual Effect"}
                >
                  {isInputVisualPlaying ? <Pause size={18} /> : <Lightbulb size={18} />}
                </Button>

                {/* Show swap button on mobile */}
                <Button
                  onClick={toggleMode}
                  variant="ghost"
                  size="sm"
                  className="md:hidden text-[#456359]"
                  title="Swap Modes" // Added title
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
                    : "text-md/relaxed"}
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
                title="Clear Input" // Added title
              >
                <Trash2 className="h-5 w-5" />
              </Button>

            </div>
          </div>

          {/* Output section */}
          <div>
            <div className="flex justify-between items-center p-4 border-b border-gray-200 text-[#372824]">
              <div className="flex items-center">
                <span className="text-lg text-[#456359] font-semibold">
                  {mode === "morse-to-text" ? "Text" : "Morse Code"}
                </span>
              </div>
              {/* Output Audio Button */}
              <Button
                onClick={() => handleAudioPlay(outputText, false)} // isInput = false
                variant="ghost"
                size="sm"
                className={`text-[#456359] ${isPlaying ? 'animate-pulse' : ''}`}
                disabled={!outputText || isVisualPlaying} // Disable if output visual is playing
                title={isPlaying ? "Stop Output Audio" : "Play Output Audio"}
              >
                {isPlaying ? <Pause size={18} /> : <Volume2 size={18} />}
              </Button>
            </div>

            <div className={`
              p-4 text-gray-800 whitespace-pre-wrap
              ${initialText.length === 0
                ? "min-h-[200px] md:min-h-[300px]"
                : "min-h-[100px] md:min-h-[200px]"}
              ${isSingleLetterMode
                ? "text-center text-4xl md:text-6xl"
                : "text-md"}
            `}>
              {outputText || (
                <span className="text-gray-400 text-md">
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
                title="Copy Output" // Added title
              >
                <Copy className="h-5 w-5" />
                {copied && <span className="sr-only">Copied!</span>}
              </Button>
              {/* Output Visual Button */}
              <Button
                onClick={() => handleVisualPlay(mode === "morse-to-text" ? inputText : outputText, false)} // isInput = false
                variant="ghost"
                size="sm"
                className={`text-[#456359] ${isVisualPlaying ? 'animate-pulse' : ''}`}
                disabled={!(mode === "morse-to-text" ? inputText : outputText) || isPlaying} // Disable if output audio is playing
                title={isVisualPlaying ? "Stop Output Visual Effect" : "Play Output Visual Effect"}
              >
                {isVisualPlaying ? <Pause size={18} /> : <Lightbulb size={18} />}
              </Button>
              <Button
                onClick={handleDownload}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
                disabled={!outputText}
                title="Download Output" // Added title
              >
                <Download className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
                title="Help" // Added title
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
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