"use client"

import { useState, useEffect, useRef } from "react"
import {
  Copy, Download, Trash2, HelpCircle, Volume2, Lightbulb, Settings, Check, Square, Radio
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { internationalMorseCodeMap } from "@/components/ui/machine"

interface KeyerSettings {
  dotDuration: number
  dashDuration: number
  symbolSpace: number
  letterSpace: number
  wordSpace: number
  frequency: number
  volume: number
  soundType: 'cw' | 'telegraph'
  autoSpace: boolean
}

export default function MorseCodeKeyer() {
  const [morseSequence, setMorseSequence] = useState<string>("")
  const [currentSymbol, setCurrentSymbol] = useState<string>("")
  const [translatedText, setTranslatedText] = useState<string>("")
  const [isKeyPressed, setIsKeyPressed] = useState(false)
  const [keyPressStart, setKeyPressStart] = useState<number>(0)
  const [visualEffect, setVisualEffect] = useState({
    active: false,
    isDash: false
  })
  
  const [settings, setSettings] = useState<KeyerSettings>({
    dotDuration: 100, // milliseconds
    dashDuration: 300,
    symbolSpace: 100,
    letterSpace: 300,
    wordSpace: 700,
    frequency: 700,
    volume: 0.5,
    soundType: 'cw',
    autoSpace: true
  })
  
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [visualEnabled, setVisualEnabled] = useState(true)
  const [stats, setStats] = useState({
    dotsCount: 0,
    dashesCount: 0,
    charactersCount: 0,
    wordsCount: 0
  })

  const [flashText, setFlashText] = useState<{
    button: string;
    text: string;
    active: boolean;
  }>({
    button: "",
    text: "",
    active: false
  })

  const [alertMessage, setAlertMessage] = useState<{ text: string, type: 'info' | 'success' | 'error' | 'warning' } | null>(null)
  
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const lastSymbolTimeRef = useRef<number>(Date.now())
  const autoSpaceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const keyerContainerRef = useRef<HTMLDivElement>(null)

  const showFlashText = (button: string, text: string, duration: number = 1500) => {
    setFlashText({
      button,
      text,
      active: true
    })

    setTimeout(() => {
      setFlashText(prev => ({
        ...prev,
        active: false
      }))
    }, duration)
  }

  const showAlert = (text: string, type: 'info' | 'success' | 'error' | 'warning' = 'info', duration: number = 3000) => {
    setAlertMessage({ text, type })

    if (duration > 0) {
      const timer = setTimeout(() => {
        const alertElement = document.querySelector('[role="alert"]')
        if (alertElement) {
          alertElement.classList.add('animate-fadeOut')
          alertElement.classList.remove('animate-fadeIn')
          setTimeout(() => {
            setAlertMessage(null)
          }, 300)
        } else {
          setAlertMessage(null)
        }
      }, duration - 300)

      return () => clearTimeout(timer)
    }
  }

  // Initialize audio context
  const setupAudio = () => {
    if (typeof window === 'undefined') return

    try {
      // Create audio context if it doesn't exist
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      // Create oscillator and gain if they don't exist or were stopped
      if (!oscillatorRef.current || !gainNodeRef.current) {
        // Clean up old nodes if they exist
        if (oscillatorRef.current) {
          try {
            oscillatorRef.current.stop()
            oscillatorRef.current.disconnect()
          } catch (e) {
            console.log(e)
            // Ignore errors from already stopped oscillators
          }
        }

        // Create new oscillator and gain
        oscillatorRef.current = audioContextRef.current.createOscillator()
        gainNodeRef.current = audioContextRef.current.createGain()

        oscillatorRef.current.frequency.value = settings.frequency
        oscillatorRef.current.type = settings.soundType === 'telegraph' ? 'square' : 'sine'
        gainNodeRef.current.gain.value = 0

        oscillatorRef.current.connect(gainNodeRef.current)
        gainNodeRef.current.connect(audioContextRef.current.destination)

        oscillatorRef.current.start()
      }
    } catch (error) {
      console.error("Failed to initialize AudioContext:", error)
    }
  }

  // Start audio tone
  const startTone = () => {
    if (!audioEnabled) return
    
    setupAudio()
    
    const ac = audioContextRef.current
    const gain = gainNodeRef.current
    const osc = oscillatorRef.current
    
    if (!ac || !gain || !osc) return

    // Resume audio context if suspended (required by browsers)
    if (ac.state === 'suspended') {
      ac.resume()
    }

    osc.frequency.setValueAtTime(settings.frequency, ac.currentTime)
    osc.type = settings.soundType === 'telegraph' ? 'square' : 'sine'
    gain.gain.setValueAtTime(settings.volume, ac.currentTime)
  }

  // Stop audio tone
  const stopTone = () => {
    if (!audioEnabled) return
    
    const ac = audioContextRef.current
    const gain = gainNodeRef.current
    
    if (!ac || !gain) return

    gain.gain.setValueAtTime(0, ac.currentTime)
  }

  // Handle key press start (mouse/touch down)
  const handleKeyDown = () => {
    if (isKeyPressed) return
    
    setIsKeyPressed(true)
    setKeyPressStart(Date.now())
    lastSymbolTimeRef.current = Date.now()
    
    // Clear auto-space timeout
    if (autoSpaceTimeoutRef.current) {
      clearTimeout(autoSpaceTimeoutRef.current)
      autoSpaceTimeoutRef.current = null
    }
    
    // Initialize audio on first interaction if needed
    if (!audioContextRef.current && audioEnabled) {
      setupAudio()
    }
    
    // Start audio
    startTone()
    
    // Visual feedback
    if (visualEnabled) {
      setVisualEffect({ active: true, isDash: false })
    }
  }

  // Handle key release (mouse/touch up)
  const handleKeyUp = () => {
    if (!isKeyPressed) return
    
    const duration = Date.now() - keyPressStart
    setIsKeyPressed(false)
    
    // Stop audio
    stopTone()
    
    // Visual feedback
    if (visualEnabled) {
      setVisualEffect({ active: false, isDash: false })
    }
    
    // Determine if it's a dot or dash
    const symbol = duration > (settings.dotDuration + settings.dashDuration) / 2 ? '-' : '.'
    
    // Update current symbol and morse sequence
    setCurrentSymbol(prev => prev + symbol)
    setMorseSequence(prev => prev + symbol)
    
    // Update stats
    setStats(prev => ({
      ...prev,
      dotsCount: symbol === '.' ? prev.dotsCount + 1 : prev.dotsCount,
      dashesCount: symbol === '-' ? prev.dashesCount + 1 : prev.dashesCount
    }))
    
    // Set up auto-spacing if enabled
    if (settings.autoSpace) {
      // Letter space after inactivity
      autoSpaceTimeoutRef.current = setTimeout(() => {
        if (currentSymbol) {
          addLetterSpace()
        }
      }, settings.letterSpace)
    }
  }

  // Add letter space (convert current symbol to character)
  const addLetterSpace = () => {
    if (!currentSymbol) return
    
    const character = internationalMorseCodeMap[currentSymbol] || '?'
    setTranslatedText(prev => prev + character)
    setMorseSequence(prev => prev + ' ')
    setCurrentSymbol('')
    
    setStats(prev => ({
      ...prev,
      charactersCount: prev.charactersCount + 1
    }))
    
    // Set up word space timeout
    if (settings.autoSpace) {
      autoSpaceTimeoutRef.current = setTimeout(() => {
        addWordSpace()
      }, settings.wordSpace - settings.letterSpace)
    }
  }

  // Add word space
  const addWordSpace = () => {
    if (translatedText && !translatedText.endsWith(' ')) {
      setTranslatedText(prev => prev + ' ')
      setMorseSequence(prev => prev + '  ')
      
      setStats(prev => ({
        ...prev,
        wordsCount: prev.wordsCount + 1
      }))
    }
  }

  // Manual space button
  const handleManualSpace = () => {
    if (autoSpaceTimeoutRef.current) {
      clearTimeout(autoSpaceTimeoutRef.current)
      autoSpaceTimeoutRef.current = null
    }
    
    if (currentSymbol) {
      addLetterSpace()
      showFlashText('space', 'Letter space added')
    } else if (translatedText && !translatedText.endsWith(' ')) {
      addWordSpace()
      showFlashText('space', 'Word space added')
    }
  }

  // Copy output
  const handleCopy = (type: 'morse' | 'text') => {
    const textToCopy = type === 'morse' ? morseSequence : translatedText
    
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
      showFlashText(`copy-${type}`, 'Copied!')
    } else {
      showAlert('Nothing to copy', 'warning', 2000)
    }
  }

  // Download output
  const handleDownload = () => {
    if (!morseSequence && !translatedText) {
      showAlert('Nothing to download', 'warning', 2000)
      return
    }
    
    const content = `Morse Code:\n${morseSequence}\n\nTranslation:\n${translatedText}\n\nStats:\n- Dots: ${stats.dotsCount}\n- Dashes: ${stats.dashesCount}\n- Characters: ${stats.charactersCount}\n- Words: ${stats.wordsCount}`
    
    const element = document.createElement("a")
    const file = new Blob([content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `morse-keyer-${Date.now()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    showFlashText("download", "Downloaded!")
  }

  // Clear all
  const handleClear = () => {
    setMorseSequence("")
    setCurrentSymbol("")
    setTranslatedText("")
    setStats({
      dotsCount: 0,
      dashesCount: 0,
      charactersCount: 0,
      wordsCount: 0
    })
    
    if (autoSpaceTimeoutRef.current) {
      clearTimeout(autoSpaceTimeoutRef.current)
      autoSpaceTimeoutRef.current = null
    }
    
    showAlert("Cleared all", 'info', 2000)
  }

  // Handle help
  const handleHelp = () => {
    showAlert("Press and hold the key button or spacebar. Short press = dot (.), long press = dash (-). Spaces are added automatically or manually.", 'info', 5000)
  }

  // Keyboard support
  useEffect(() => {
    const handleKeyboardDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault()
        handleKeyDown()
      }
    }
    
    const handleKeyboardUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        handleKeyUp()
      }
    }
    
    window.addEventListener('keydown', handleKeyboardDown)
    window.addEventListener('keyup', handleKeyboardUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyboardDown)
      window.removeEventListener('keyup', handleKeyboardUp)
    }
  }, [isKeyPressed, keyPressStart, currentSymbol, settings])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
          oscillatorRef.current.disconnect()
        } catch (e) {
            console.log(e)
          // Ignore errors from already stopped oscillators
        }
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      if (autoSpaceTimeoutRef.current) {
        clearTimeout(autoSpaceTimeoutRef.current)
      }
    }
  }, [])

  // Update oscillator frequency when settings change
  useEffect(() => {
    if (oscillatorRef.current && audioContextRef.current) {
      try {
        oscillatorRef.current.frequency.setValueAtTime(settings.frequency, audioContextRef.current.currentTime)
        oscillatorRef.current.type = settings.soundType === 'telegraph' ? 'square' : 'sine'
      } catch (e) {
        console.log(e)
        // If oscillator is stopped, recreate it on next key press
        oscillatorRef.current = null
        gainNodeRef.current = null
      }
    }
  }, [settings.frequency, settings.soundType])

  return (
    <div
      ref={keyerContainerRef}
      className={`
        flex flex-col font-lexend rounded-lg transition-colors duration-500 ease-in-out max-w-7xl mx-auto
        ${visualEffect.active ? 'bg-[#456359] text-white pulse-dot' : 'bg-background-secondary text-[#372824] dark:text-gray-100'}
      `}
    >
      {/* Alert Message Component */}
      {alertMessage && (
        <div
          className={`
            mx-4 mt-4 p-3 rounded-md shadow-sm border text-sm flex items-center justify-between 
            animate-fadeIn transition-all duration-300 ease-in-out
            ${alertMessage.type === 'info' ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300' : ''}
            ${alertMessage.type === 'success' ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300' : ''}
            ${alertMessage.type === 'error' ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300' : ''}
            ${alertMessage.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300' : ''}
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
              const alertElement = document.querySelector('[role="alert"]')
              if (alertElement) {
                alertElement.classList.add('animate-fadeOut')
                alertElement.classList.remove('animate-fadeIn')
                setTimeout(() => {
                  setAlertMessage(null)
                }, 300)
              } else {
                setAlertMessage(null)
              }
            }}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      <div className="w-full mx-auto rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="grid md:grid-cols-2 relative">
          {/* Left: Keyer Input Section */}
          <div className="border-r border-gray-200 dark:border-gray-700">
            {/* Header with controls */}
            <div className="flex w-full items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 md:w-full md:flex-row flex-col gap-y-2 h-20">
              <div className="flex items-center">
                <span className="md:text-lg text-2xl font-bold text-primary flex items-center gap-2">
                  <Radio className="h-5 w-5" />
                  Morse Keyer
                </span>
              </div>

              {/* Keyer Status and Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${isKeyPressed ? 'bg-red-500 animate-pulse' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{isKeyPressed ? 'KEYING' : 'READY'}</span>
                </div>

                {/* Stop Button */}
                <Button
                  onClick={() => {
                    stopTone()
                    setIsKeyPressed(false)
                    if (autoSpaceTimeoutRef.current) {
                      clearTimeout(autoSpaceTimeoutRef.current)
                      autoSpaceTimeoutRef.current = null
                    }
                    showFlashText('stop-keyer', 'Stopped')
                  }}
                  variant="ghost"
                  size="sm"
                  className="relative text-primary flex items-center gap-1 md:flex-row"
                  disabled={!isKeyPressed && !currentSymbol}
                  title="Stop Keying"
                >
                  {flashText.button === "stop-keyer" && flashText.active && (
                    <span className="flash-text-secondary">{flashText.text}</span>
                  )}
                  <Square size={18} />
                  Stop
                </Button>
              </div>
            </div>

            {/* Keyer Area */}
            <div className="p-4 min-h-[200px] md:min-h-[300px]  flex flex-col items-center justify-center space-y-4">
              {/* Instructions */}
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Press and hold key button or spacebar
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Short press = Dot (.) • Long press = Dash (-)
                </p>
              </div>

              {/* Large Keyer Button */}
              <button
                onMouseDown={handleKeyDown}
                onMouseUp={handleKeyUp}
                onMouseLeave={() => isKeyPressed && handleKeyUp()}
                onTouchStart={(e) => {
                  e.preventDefault()
                  handleKeyDown()
                }}
                onTouchEnd={(e) => {
                  e.preventDefault()
                  handleKeyUp()
                }}
                className={`
                  w-48 h-48 rounded-full border-4 font-bold text-xl
                  transition-all duration-100 ease-in-out
                  select-none touch-none
                  ${isKeyPressed 
                    ? 'bg-[#456359] border-[#3a534a] text-white scale-95 shadow-inner' 
                    : 'bg-gradient-to-br from-[#456359] to-[#5a7d73] border-[#456359] text-white hover:scale-105 shadow-2xl hover:shadow-[#456359]/50'
                  }
                `}
              >
                <div className="flex flex-col items-center justify-center">
                  {isKeyPressed ? (
                    <>
                      <Radio className="h-12 w-12 mb-2" />
                      <div className="text-base">KEYING</div>
                    </>
                  ) : (
                    <>
                      <Radio className="h-12 w-12 mb-2" />
                      <div className="text-base">TAP KEY</div>
                    </>
                  )}
                </div>
              </button>

              {/* Current Symbol Display */}
              <div className="w-full max-w-xs">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Current Symbol</div>
                  <div className="text-2xl font-mono font-bold text-primary min-h-[2rem] flex items-center justify-center">
                    {currentSymbol || '—'}
                  </div>
                </div>
              </div>

              {/* Manual Space Button */}
              <Button
                onClick={handleManualSpace}
                variant="outline"
                size="sm"
                className="relative w-full max-w-xs border-[#456359] text-primary hover:bg-[#456359] hover:text-white"
                disabled={!currentSymbol && !translatedText}
              >
                {flashText.button === "space" && flashText.active && (
                  <span className="flash-text">{flashText.text}</span>
                )}
                Add Space
              </Button>

            </div>

            {/* Bottom Clear Button */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center md:justify-between w-full min-h-[64px]">
              <Button
                onClick={handleClear}
                variant="ghost"
                size="sm"
                className="text-[#372824] dark:text-[#9ca3af] hover:text-black flex flex-col"
                disabled={!morseSequence && !translatedText}
                title="Clear All"
              >
                <Trash2 className="h-5 w-5 p-0 m-0 -mb-2" />
                Clear
              </Button>
            </div>
          </div>

          {/* Right: Output Section */}
          <div className="flex flex-col justify-between">
            {/* Output Header with Controls */}
            <div className="flex w-full items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 md:w-full md:flex-row flex-col gap-y-2 h-20">
              <div className="flex items-center">
                <span className="md:text-lg text-2xl text-primary font-bold">
                  Output
                </span>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${morseSequence ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{morseSequence ? 'ACTIVE' : 'IDLE'}</span>
                </div>
              </div>
            </div>

            {/* Output Display Areas */}
            <div className="p-4 space-y-4 min-h-[200px] md:min-h-[300px]">
              {/* Morse Code Output */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-primary">Morse Code</label>
                  <Button
                    onClick={() => handleCopy('morse')}
                    variant="ghost"
                    size="sm"
                    className="relative h-7 text-gray-600 dark:text-gray-400"
                    disabled={!morseSequence}
                  >
                    {flashText.button === "copy-morse" && flashText.active && (
                      <span className="flash-text">{flashText.text}</span>
                    )}
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 min-h-[100px] max-h-[140px] overflow-y-auto">
                  {morseSequence ? (
                    <div className="font-mono text-lg break-all text-gray-800 dark:text-gray-200">{morseSequence}</div>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500 text-sm">Morse code will appear here...</span>
                  )}
                </div>
              </div>

              {/* Text Translation Output */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-primary">Translation</label>
                  <Button
                    onClick={() => handleCopy('text')}
                    variant="ghost"
                    size="sm"
                    className="relative h-7 text-gray-600 dark:text-gray-400"
                    disabled={!translatedText}
                  >
                    {flashText.button === "copy-text" && flashText.active && (
                      <span className="flash-text">{flashText.text}</span>
                    )}
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 min-h-[100px] max-h-[140px] overflow-y-auto">
                  {translatedText ? (
                    <div className="text-lg break-words text-gray-800 dark:text-gray-200">{translatedText}</div>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500 text-sm">Text translation will appear here...</span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row md:justify-between w-full items-center gap-3 md:gap-2 min-h-[64px]">
              {/* Effect selection buttons */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    setAudioEnabled(!audioEnabled)
                    if (!audioEnabled && !visualEnabled) {
                      setVisualEnabled(true)
                      showFlashText('visualeffect', 'Visual effect enabled')
                    } else if (!audioEnabled) {
                      showFlashText('audioeffect', 'Audio effect enabled')
                    } else {
                      showFlashText('audioeffect', 'Audio effect disabled')
                    }
                  }}
                  variant="ghost"
                  size="sm"
                  className={`relative ${audioEnabled ? 'bg-[#456359] hover:bg-[#456359] text-white hover:text-white' : 'text-primary hover:bg-background'} flex items-center gap-1`}
                  title={audioEnabled ? "Audio Effect Enabled" : "Enable Audio Effect"}
                  disabled={!audioEnabled && !visualEnabled}
                >
                  {flashText.button === "audioeffect" && flashText.active && (
                    <span className={`${audioEnabled ? 'flash-text' : 'flash-text-inactive'}`}>{flashText.text}</span>
                  )}
                  <Volume2 className="h-5 w-5" />
                  <span className="hidden md:inline">Audio</span>
                  <Check className={`h-5 w-5 ${audioEnabled ? 'text-white' : 'hidden'}`} />
                </Button>

                <Button
                  onClick={() => {
                    setVisualEnabled(!visualEnabled)
                    if (!visualEnabled && !audioEnabled) {
                      setAudioEnabled(true)
                      showFlashText('audioeffect', 'Audio effect enabled')
                    } else if (!visualEnabled) {
                      showFlashText('visualeffect', 'Visual effect enabled')
                    } else {
                      showFlashText('visualeffect', 'Visual effect disabled')
                    }
                  }}
                  variant="ghost"
                  size="sm"
                  className={`relative ${visualEnabled ? 'bg-[#456359] hover:bg-[#456359] text-white hover:text-white' : 'text-primary hover:bg-background'} flex items-center gap-1`}
                  title={visualEnabled ? "Visual Effect Enabled" : "Enable Visual Effect"}
                  disabled={!visualEnabled && !audioEnabled}
                >
                  {flashText.button === "visualeffect" && flashText.active && (
                    <span className={`${visualEnabled ? 'flash-text' : 'flash-text-inactive'}`}>{flashText.text}</span>
                  )}
                  <Lightbulb className="h-5 w-5" />
                  <span className="hidden md:inline">Visual</span>
                  <Check className={`h-5 w-5 ${visualEnabled ? 'text-white' : 'hidden'}`} />
                </Button>
              </div>

              {/* Utility buttons */}
              <div className="flex items-center gap-0">
                <Button
                  onClick={handleDownload}
                  variant="ghost"
                  size="sm"
                  className="relative text-gray-500 hover:text-gray-700 dark:text-gray-400 flex flex-col"
                  disabled={!morseSequence && !translatedText}
                  title="Download Output"
                >
                  {flashText.button === "download" && flashText.active && (
                    <span className="flash-text">Downloaded!</span>
                  )}
                  <Download className="h-5 w-5 p-0 m-0 -mb-2" />
                  Download
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
                  Help
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        <Collapsible className="border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between bg-background-secondary items-center px-4 py-3 bg-background">
            <span className="text-sm font-medium text-primary">Keyer Settings</span>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Toggle settings</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 grid gap-4 bg-gray-50 dark:bg-gray-900/20">
              {/* Timing Settings */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-primary">Timing (milliseconds)</h4>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-sm text-right col-span-1 dark:text-gray-300">
                    Dot:
                  </label>
                  <div className="col-span-2">
                    <input
                      type="range"
                      min="50"
                      max="300"
                      step="10"
                      value={settings.dotDuration}
                      onChange={(e) => {
                        const newValue = Number(e.target.value)
                        setSettings({
                          ...settings,
                          dotDuration: newValue,
                          dashDuration: newValue * 3
                        })
                      }}
                      className="w-full accent-[#456359]"
                    />
                  </div>
                  <span className="col-span-1 text-sm dark:text-gray-300">{settings.dotDuration}ms</span>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-sm text-right col-span-1 dark:text-gray-300">
                    Letter Space:
                  </label>
                  <div className="col-span-2">
                    <input
                      type="range"
                      min="100"
                      max="1000"
                      step="50"
                      value={settings.letterSpace}
                      onChange={(e) => {
                        setSettings({
                          ...settings,
                          letterSpace: Number(e.target.value)
                        })
                      }}
                      className="w-full accent-[#456359]"
                    />
                  </div>
                  <span className="col-span-1 text-sm dark:text-gray-300">{settings.letterSpace}ms</span>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-sm text-right col-span-1 dark:text-gray-300">
                    Word Space:
                  </label>
                  <div className="col-span-2">
                    <input
                      type="range"
                      min="300"
                      max="2000"
                      step="100"
                      value={settings.wordSpace}
                      onChange={(e) => {
                        setSettings({
                          ...settings,
                          wordSpace: Number(e.target.value)
                        })
                      }}
                      className="w-full accent-[#456359]"
                    />
                  </div>
                  <span className="col-span-1 text-sm dark:text-gray-300">{settings.wordSpace}ms</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <label className="text-sm dark:text-gray-300">
                    Auto-spacing
                  </label>
                  <button
                    onClick={() => {
                      setSettings({
                        ...settings,
                        autoSpace: !settings.autoSpace
                      })
                      showAlert(
                        !settings.autoSpace 
                          ? 'Auto-spacing enabled' 
                          : 'Auto-spacing disabled - use manual space button',
                        'info',
                        2000
                      )
                    }}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${settings.autoSpace ? 'bg-[#456359]' : 'bg-gray-300 dark:bg-gray-600'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${settings.autoSpace ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>
              </div>

              {/* Audio Settings */}
              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-primary">Audio Settings</h4>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-sm text-right col-span-1 dark:text-gray-300">
                    Frequency:
                  </label>
                  <div className="col-span-2">
                    <input
                      type="range"
                      min="400"
                      max="1000"
                      step="50"
                      value={settings.frequency}
                      onChange={(e) => {
                        setSettings({
                          ...settings,
                          frequency: Number(e.target.value)
                        })
                      }}
                      className="w-full accent-[#456359]"
                    />
                  </div>
                  <span className="col-span-1 text-sm dark:text-gray-300">{settings.frequency} Hz</span>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-sm text-right col-span-1 dark:text-gray-300">
                    Volume:
                  </label>
                  <div className="col-span-2">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings.volume}
                      onChange={(e) => {
                        setSettings({
                          ...settings,
                          volume: Number(e.target.value)
                        })
                      }}
                      className="w-full accent-[#456359]"
                    />
                  </div>
                  <span className="col-span-1 text-sm dark:text-gray-300">{Math.round(settings.volume * 100)}%</span>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-sm text-right col-span-1 dark:text-gray-300">
                    Sound Type:
                  </label>
                  <div className="col-span-3">
                    <div className="flex gap-4">
                      <label className="flex items-center dark:text-gray-300">
                        <input
                          type="radio"
                          name="soundType"
                          value="cw"
                          checked={settings.soundType === 'cw'}
                          onChange={() => {
                            setSettings({
                              ...settings,
                              soundType: 'cw'
                            })
                          }}
                          className="mr-2 accent-[#456359]"
                        />
                        CW Radio Tone
                      </label>
                      <label className="flex items-center dark:text-gray-300">
                        <input
                          type="radio"
                          name="soundType"
                          value="telegraph"
                          checked={settings.soundType === 'telegraph'}
                          onChange={() => {
                            setSettings({
                              ...settings,
                              soundType: 'telegraph'
                            })
                          }}
                          className="mr-2 accent-[#456359]"
                        />
                        Telegraph Sounder
                      </label>
                    </div>
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
        
        .pulse-dot {
          animation: pulse-dot 0.15s ease-in-out;
          transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
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