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
  const [isVisualPlaying, setIsVisualPlaying] = useState(false)
  const [inputText, setInputText] = useState(initialText || "")
  const [outputText, setOutputText] = useState("")
  const [mode, setMode] = useState<"morse-to-text" | "text-to-morse">(textToMorse ? "text-to-morse" : "morse-to-text")
  const [copied, setCopied] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isInputPlaying, setIsInputPlaying] = useState(false)
  const [isInputVisualPlaying, setIsInputVisualPlaying] = useState(false);
  const [audioSettings, setAudioSettings] = useState({
    wpm: 15,
    frequency: 700,
    volume: 0.5,
    soundType: 'cw' // Default to CW radio tone
  })

  // New state for pause/resume and progress tracking
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [isVisualPaused, setIsVisualPaused] = useState(false);
  const [currentAudioSymbolIndex, setCurrentAudioSymbolIndex] = useState(0);
  const [currentVisualSymbolIndex, setCurrentVisualSymbolIndex] = useState(0);


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

  // Refs for managing timeouts and playback timing
  const audioTimeoutRef = useRef<NodeJS.Timeout | null>(null); // For scheduling next audio chunk
  const visualTimeoutRef = useRef<NodeJS.Timeout | null>(null); // For scheduling next visual chunk
  const activeVisualTimeoutsRef = useRef<NodeJS.Timeout[]>([]); // For clearing all active visual timeouts


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
    if (!audioContextRef.current && typeof window !== 'undefined') {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        oscillatorRef.current = audioContextRef.current.createOscillator();
        gainNodeRef.current = audioContextRef.current.createGain();

        oscillatorRef.current.frequency.value = audioSettings.frequency;
        gainNodeRef.current.gain.value = 0; // Start silent

        oscillatorRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(audioContextRef.current.destination);

        oscillatorRef.current.start();
      } catch (error) {
        console.error("Failed to initialize AudioContext:", error);
        // Handle the error appropriately, maybe disable audio features
      }
    }
  }

  // --- Playback Stop Functions ---
  const stopAudio = (isInput = false) => {
    const ac = audioContextRef.current;
    const gain = gainNodeRef.current;

    // Clear the recursive scheduling timeout
    if (audioTimeoutRef.current) {
        clearTimeout(audioTimeoutRef.current);
        audioTimeoutRef.current = null;
    }

    // Stop audio context processing if it exists
    if (ac && gain) {
        gain.gain.cancelScheduledValues(ac.currentTime);
        gain.gain.setValueAtTime(0, ac.currentTime); // Ensure silence immediately
    }

    // Reset state
    if (isInput) {
        setIsInputPlaying(false);
    } else {
        setIsPlaying(false);
    }
    setIsAudioPaused(false);
    setCurrentAudioSymbolIndex(0);
  }

  const stopVisual = (isInput = false) => {
    // Clear all scheduled visual timeouts (start/end effects and next step)
    activeVisualTimeoutsRef.current.forEach(clearTimeout);
    activeVisualTimeoutsRef.current = [];
    if (visualTimeoutRef.current) {
      clearTimeout(visualTimeoutRef.current);
      visualTimeoutRef.current = null;
    }

    // Reset state
     if (isInput) {
        setIsInputVisualPlaying(false);
    } else {
        setIsVisualPlaying(false);
    }
    setIsVisualPaused(false);
    setVisualEffect({ active: false, isDash: false }); // Turn off visual effect
    setCurrentVisualSymbolIndex(0);
  }


  // --- Refactored Visual Playback with Pause/Resume ---
  const playVisualMorse = (morseText: string, isInput = false, startIndex = 0) => {
    if (!morseText) return;

    stopVisual(!isInput); // Stop the *other* visual playback if running

    // Clear only the main scheduling timeout if it exists from a previous run
    if (visualTimeoutRef.current) {
        clearTimeout(visualTimeoutRef.current);
        visualTimeoutRef.current = null;
    }
    // Clear effect timeouts from previous run for this type (input/output)
    activeVisualTimeoutsRef.current.forEach(clearTimeout);
    activeVisualTimeoutsRef.current = [];

    if (isInput) setIsInputVisualPlaying(true); else setIsVisualPlaying(true);
    // Don't set paused to false here, let resumeVisual handle it if resuming
    // setIsVisualPaused(false); // Ensure not paused when starting/resuming

    const dotDuration = 1.2 / audioSettings.wpm * 1000; // ms
    const dashDuration = dotDuration * 3;
    const symbolSpaceDuration = dotDuration;
    const letterSpaceDuration = dotDuration * 3;
    const wordSpaceDuration = dotDuration * 7;

    const symbols = morseText.split('');
    let currentIndex = startIndex;

    const scheduleNextVisual = (delayOffset = 0) => {
      // Base case: End of playback
      if (currentIndex >= symbols.length) {
        visualTimeoutRef.current = setTimeout(() => {
          stopVisual(isInput); // Use stop function for cleanup
        }, delayOffset);
        // Don't add this final stop timeout to activeVisualTimeoutsRef
        return;
      }

      // Pause check: If paused, just stop scheduling. Index is already saved.
      if (isVisualPaused) {
        // setCurrentVisualSymbolIndex(currentIndex); // Already set before pause
        return;
      }

      const symbol = symbols[currentIndex];
      let symbolDuration = 0;
      let spaceDuration = symbolSpaceDuration; // Default space after symbol
      let currentSymbolDelay = delayOffset; // Use the offset passed in

      if (symbol === '.' || symbol === '•') {
        symbolDuration = dotDuration;
        const startTimeout = setTimeout(() => {
          setVisualEffect({ active: true, isDash: false });
        }, currentSymbolDelay);
        const endTimeout = setTimeout(() => {
          setVisualEffect({ active: false, isDash: false });
        }, currentSymbolDelay + symbolDuration);
        activeVisualTimeoutsRef.current.push(startTimeout, endTimeout);
      } else if (symbol === '-' || symbol === '–' || symbol === '—') {
        symbolDuration = dashDuration;
        const startTimeout = setTimeout(() => {
          setVisualEffect({ active: true, isDash: true });
        }, currentSymbolDelay);
        const endTimeout = setTimeout(() => {
          setVisualEffect({ active: false, isDash: false });
        }, currentSymbolDelay + symbolDuration);
        activeVisualTimeoutsRef.current.push(startTimeout, endTimeout);
      } else if (symbol === ' ') {
        // Check for word space (3 spaces) vs letter space (1 space)
        if (currentIndex + 2 < symbols.length && symbols[currentIndex + 1] === ' ' && symbols[currentIndex + 2] === ' ') {
          spaceDuration = wordSpaceDuration;
          currentIndex += 2; // Skip the next two spaces
        } else {
          spaceDuration = letterSpaceDuration;
        }
        symbolDuration = 0; // No visual for space itself
      } else {
         // Ignore invalid characters
         symbolDuration = 0;
         spaceDuration = 0;
      }

      const totalTimeForThisStep = symbolDuration + spaceDuration;
      currentIndex++;
      // setCurrentVisualSymbolIndex(currentIndex); // Update progress *before* scheduling next

      // Schedule the next recursive call
      if (totalTimeForThisStep > 0) {
          // Schedule the next call relative to the *start* of the current step
          visualTimeoutRef.current = setTimeout(() => scheduleNextVisual(0), currentSymbolDelay + totalTimeForThisStep);
      } else {
          // If duration is 0, schedule immediately relative to current step start
          visualTimeoutRef.current = setTimeout(() => scheduleNextVisual(0), currentSymbolDelay);
      }
    };

    // Start the scheduling process
    setCurrentVisualSymbolIndex(startIndex); // Ensure index is correct at start/resume
    scheduleNextVisual(0); // Start with zero offset
  };

  const pauseVisual = (isInput = false) => {
    // Set paused state first
    setIsVisualPaused(true);
    setCurrentVisualSymbolIndex(currentVisualSymbolIndex); // Save current index (redundant but safe)

    // Clear the main timeout that schedules the *next* symbol
    if (visualTimeoutRef.current) {
      clearTimeout(visualTimeoutRef.current);
      visualTimeoutRef.current = null;
    }

    // Clear any *pending* visual effect timeouts (start/end)
    // This prevents effects for symbols *after* the pause point from showing.
    // It does NOT stop an effect that has already started.
    activeVisualTimeoutsRef.current.forEach(clearTimeout);
    activeVisualTimeoutsRef.current = [];

    // Optionally: Force visual effect off immediately on pause
    // setVisualEffect({ active: false, isDash: false });
  };

  const resumeVisual = (isInput = false) => {
    // Only resume if it was actually paused and playing
    const currentlyPlaying = isInput ? isInputVisualPlaying : isVisualPlaying;
    if (!currentlyPlaying || !isVisualPaused) return;

    setIsVisualPaused(false); // Unset paused state
    const text = isInput ? inputText : (mode === 'text-to-morse' ? outputText : inputText);
    // Resume from the stored index
    playVisualMorse(text, isInput, currentVisualSymbolIndex);
  };


  // --- Refactored Audio Playback with Pause/Resume ---
  const playMorseAudio = (morseText: string, isInput = false, startIndex = 0) => {
    if (!morseText) return;

    setupAudio(); // Ensure context is ready
    const ac = audioContextRef.current;
    const gain = gainNodeRef.current;
    const osc = oscillatorRef.current;
    if (!ac || !gain || !osc) {
        console.error("AudioContext not available or initialized.");
        stopAudio(isInput); // Ensure state is reset
        return;
    }

    stopAudio(!isInput); // Stop the *other* audio playback if running

    // Clear any scheduled audio timeouts/events before starting/resuming
    gain.gain.cancelScheduledValues(ac.currentTime);
    gain.gain.setValueAtTime(0, ac.currentTime); // Ensure silence initially
    if (audioTimeoutRef.current) {
        clearTimeout(audioTimeoutRef.current);
        audioTimeoutRef.current = null;
    }

    if (isInput) setIsInputPlaying(true); else setIsPlaying(true);
    // Don't set paused to false here, let resumeAudio handle it if resuming
    // setIsAudioPaused(false);

    const dotDuration = 1.2 / audioSettings.wpm;
    const dashDuration = dotDuration * 3;
    const symbolSpaceDuration = dotDuration;
    const letterSpaceDuration = dotDuration * 3;
    const wordSpaceDuration = dotDuration * 7;

    osc.frequency.setValueAtTime(audioSettings.frequency, ac.currentTime);
    osc.type = audioSettings.soundType === 'telegraph' ? 'square' : 'sine';

    const symbols = morseText.split('');
    let currentIndex = startIndex;
    let scheduleTime = ac.currentTime; // Start scheduling from now

    const scheduleNextAudio = () => {
        // Base case: End of playback
        if (currentIndex >= symbols.length) {
            const delayUntilEnd = (scheduleTime - ac.currentTime) * 1000;
            audioTimeoutRef.current = setTimeout(() => {
                stopAudio(isInput);
            }, Math.max(0, delayUntilEnd + 50));
            return;
        }

        // Pause check: If paused, stop scheduling. Index is saved.
        if (isAudioPaused) {
            // setCurrentAudioSymbolIndex(currentIndex); // Already set before pause
            return;
        }

        const symbol = symbols[currentIndex];
        let symbolDuration = 0;
        let spaceDuration = symbolSpaceDuration;

        // Schedule gain changes for the current symbol
        if (symbol === '.' || symbol === '•') {
            symbolDuration = dotDuration;
            gain.gain.setValueAtTime(audioSettings.volume, scheduleTime);
            gain.gain.setValueAtTime(0, scheduleTime + symbolDuration);
        } else if (symbol === '-' || symbol === '–' || symbol === '—') {
            symbolDuration = dashDuration;
            gain.gain.setValueAtTime(audioSettings.volume, scheduleTime);
            gain.gain.setValueAtTime(0, scheduleTime + symbolDuration);
        } else if (symbol === ' ') {
            if (currentIndex + 2 < symbols.length && symbols[currentIndex + 1] === ' ' && symbols[currentIndex + 2] === ' ') {
                spaceDuration = wordSpaceDuration;
                currentIndex += 2;
            } else {
                spaceDuration = letterSpaceDuration;
            }
            symbolDuration = 0;
        } else {
            symbolDuration = 0;
            spaceDuration = 0; // No sound, no extra space
        }

        // Advance the time for the next schedule
        const timeForCurrentStep = symbolDuration + spaceDuration;
        scheduleTime += timeForCurrentStep;
        currentIndex++;
        // setCurrentAudioSymbolIndex(currentIndex); // Update before scheduling next

        // Schedule the call for the *next* symbol using setTimeout
        // Calculate delay from *now* until the current step finishes
        const delayUntilNextCall = (scheduleTime - ac.currentTime) * 1000;

        if (timeForCurrentStep > 0) {
             // Schedule the next check slightly *before* the current step ends
             // to ensure smooth transition if possible, or right after.
            audioTimeoutRef.current = setTimeout(scheduleNextAudio, Math.max(0, delayUntilNextCall - 10)); // Small buffer
        } else {
             // If duration is 0, schedule next check immediately
             scheduleNextAudio(); // Direct call might be too fast, use timeout 0
            // audioTimeoutRef.current = setTimeout(scheduleNextAudio, 0);
        }
    };

    // Start scheduling
    setCurrentAudioSymbolIndex(startIndex); // Ensure index is correct
    scheduleNextAudio();
  };

  const pauseAudio = (isInput = false) => {
    const ac = audioContextRef.current;
    const gain = gainNodeRef.current;
    const currentlyPlaying = isInput ? isInputPlaying : isPlaying;
    if (!ac || !gain || !currentlyPlaying || isAudioPaused) return; // Only pause if playing and not already paused

    // Set paused state first
    setIsAudioPaused(true);
    setCurrentAudioSymbolIndex(currentAudioSymbolIndex); // Save current index

    // Clear the recursive scheduling timeout
    if (audioTimeoutRef.current) {
        clearTimeout(audioTimeoutRef.current);
        audioTimeoutRef.current = null;
    }

    // Cancel future scheduled gain changes and force silence now
    gain.gain.cancelScheduledValues(ac.currentTime);
    gain.gain.setValueAtTime(0, ac.currentTime);
  };

  const resumeAudio = (isInput = false) => {
     const ac = audioContextRef.current;
     const currentlyPlaying = isInput ? isInputPlaying : isPlaying;
     // Only resume if it was playing and is currently paused
     if (!ac || !currentlyPlaying || !isAudioPaused) return;

    setIsAudioPaused(false); // Unset paused state
    const text = isInput ? inputText : outputText;
    // Resume scheduling from the stored index
    playMorseAudio(text, isInput, currentAudioSymbolIndex);
  };


  // Text-to-speech for regular text (basic implementation - no pause/resume)
  const speakText = (text: string) => {
    if (text && window.speechSynthesis) {
      // Cancel any previous utterances
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-US"
      // Add event listeners if needed (e.g., onend)
      window.speechSynthesis.speak(utterance)
    }
  }

  // --- Updated Event Handlers ---

  // Handle audio playback trigger (Play/Stop)
  const handleAudioPlay = (text: string, isInput = false) => {
    const isMorse = /^[.\- ]+$/.test(text.replace(/\s+/g, ' '));
    const currentlyPlaying = isInput ? isInputPlaying : isPlaying;

    if (!isMorse) {
      // Handle TTS
      stopAudio(isInput); // Stop any morse audio
      stopVisual(isInput); // Stop any morse visual
      speakText(text);
      return;
    }

    // Stop TTS if it's running
    window.speechSynthesis?.cancel();

    if (!currentlyPlaying) {
      // --- Start playing ---
      stopVisual(isInput); // Stop visual if it's running
      playMorseAudio(text, isInput, 0); // Start from beginning
    } else {
      // --- Stop playing ---
      stopAudio(isInput);
    }
  };

  // Handle visual playback trigger (Play/Stop)
  const handleVisualPlay = (text: string, isInput = false) => {
    const isMorse = /^[.\- ]+$/.test(text.replace(/\s+/g, ' '));
    const currentlyPlaying = isInput ? isInputVisualPlaying : isVisualPlaying;

    if (!isMorse) {
      console.log("Visual effect not applicable for plain text.");
      return; // Do nothing for non-Morse
    }

    // Stop TTS if it's running
    window.speechSynthesis?.cancel();

    if (!currentlyPlaying) {
      // --- Start playing ---
      stopAudio(isInput); // Stop audio if it's running
      playVisualMorse(text, isInput, 0); // Start from beginning
    } else {
      // --- Stop playing ---
      stopVisual(isInput);
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
    stopAudio(true); // Stop input audio
    stopAudio(false); // Stop output audio
    stopVisual(true); // Stop input visual
    stopVisual(false); // Stop output visual
    window.speechSynthesis?.cancel(); // Stop TTS

    setInputText("")
    setOutputText("")
    setInputError(null)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Determine Morse text for output visual button
  const morseForOutputVisual = mode === 'text-to-morse' ? outputText : inputText;
  const isOutputMorseValid = /^[.\- ]+$/.test(morseForOutputVisual.replace(/\s+/g, ' '));

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
              <div className="flex items-center gap-1"> {/* Reduced gap slightly */}
                {/* Input Audio Button */}
                <Button
                  onClick={() => handleAudioPlay(inputText, true)}
                  variant="ghost"
                  size="sm"
                  className={`text-[#456359] ${isInputPlaying ? 'animate-pulse' : ''}`}
                  // Disable if input empty OR visual is actively playing
                  disabled={!inputText || isInputVisualPlaying}
                  title={isInputPlaying ? "Stop Audio" : "Play Input Audio"}
                >
                  {isInputPlaying ? <Pause size={18} /> : <Volume2 size={18} />}
                </Button>

                {/* Input Visual Button */}
                <Button
                  onClick={() => handleVisualPlay(inputText, true)}
                  variant="ghost"
                  size="sm"
                  className={`text-[#456359] ${isInputVisualPlaying ? 'animate-pulse' : ''}`}
                   // Disable if input empty OR input not morse OR audio is actively playing
                  disabled={!inputText || !/^[.\- ]+$/.test(inputText.replace(/\s+/g, ' ')) || isInputPlaying}
                  title={isInputVisualPlaying ? "Stop Visual" : "Play Input Visual Effect"}
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
                    : "text-xl/relaxed"}
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
              {/* Output Audio Button - No change needed here unless you want separate visual too */}
              <Button
                onClick={() => handleAudioPlay(outputText, false)} // isInput = false
                variant="ghost"
                size="sm"
                className={`text-[#456359] ${isPlaying ? 'animate-pulse' : ''}`}
                // Disable if output empty OR visual is actively playing
                disabled={!outputText || isVisualPlaying}
                title={isPlaying ? "Stop Audio" : "Play Output Audio"}
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
                : "text-xl"}
            `}>
              {outputText || (
                <span className="text-gray-400 text-md">
                  {mode === "morse-to-text" ? "Converted text will appear here" : "Morse code will appear here"}
                </span>
              )}
            </div>

            <div className="p-3 border-t border-gray-200 flex justify-end space-x-2">
              {/* Copy Button */}
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
                onClick={() => handleVisualPlay(morseForOutputVisual, false)} // Use handler
                variant="ghost"
                size="sm"
                className={`text-[#456359] ${isVisualPlaying ? 'animate-pulse' : ''}`}
                // Disable if no valid morse OR audio is actively playing
                disabled={!isOutputMorseValid || isPlaying}
                title={isVisualPlaying ? "Stop Visual" : "Play Output Visual Effect"}
              >
                {isVisualPlaying ? <Pause size={18} /> : <Lightbulb size={18} />}
              </Button>

              {/* Download Button */}
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
              {/* Help Button */}
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