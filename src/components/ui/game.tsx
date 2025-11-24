"use client"

import { useState, useEffect, useRef } from "react"
import { Play, RotateCcw, HelpCircle, Trophy, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { internationalMorseCodeMap } from "@/components/ui/machine"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// Word list for the game
const WORDS = [
  "MORSE", "CODE", "RADIO", "SIGNAL", "OCEAN", 
  "WORLD", "HELLO", "MUSIC", "PIANO", "GUITAR",
  "EARTH", "SPACE", "LIGHT", "SOUND", "WAVES",
  "BEACH", "RIVER", "MOUNTAIN", "FOREST", "STORM",
  "CLOUD", "RAIN", "WIND", "SNOW", "FIRE"
]

interface GameState {
  word: string
  maskedWord: string[] // For displaying revealed letters
  tries: number
  wpm: number
  status: 'start' | 'playing' | 'won' | 'lost'
  history: { guess: string, result: ('correct' | 'incorrect')[] }[]
}

const INITIAL_TRIES = 21
const INITIAL_WPM = 20
const SPEED_DECREMENT = 5
const TRIES_PER_SPEED_DROP = 3

export default function MorseCodeGame() {
  const [gameState, setGameState] = useState<GameState>({
    word: "",
    maskedWord: [],
    tries: INITIAL_TRIES,
    wpm: INITIAL_WPM,
    status: 'start',
    history: []
  })
  
  const [input, setInput] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  
  const audioContextRef = useRef<AudioContext | null>(null)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  const [isOpen, setIsOpen] = useState(false)

  // Initialize game
  useEffect(() => {
    startNewGame()
    return () => stopAudio()
  }, [])

  const startNewGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)]
    setGameState({
      word: randomWord,
      maskedWord: new Array(randomWord.length).fill(""),
      tries: INITIAL_TRIES,
      wpm: INITIAL_WPM,
      status: 'playing',
      history: []
    })
    setInput("")
    stopAudio()
  }

  // Audio handling
  const stopAudio = () => {
    setIsPlaying(false)
    timeoutsRef.current.forEach(t => clearTimeout(t))
    timeoutsRef.current = []
    
    // Suspend context to stop all currently scheduled sounds
    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend()
    }
  }

  const playWord = async () => {
    if (isPlaying) return
    setIsPlaying(true)

    // Initialize audio context
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    
    // Resume if suspended
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume()
    }

    const ac = audioContextRef.current
    const wpm = gameState.wpm
    
    // Calculate timings
    const dotDuration = 1.2 / wpm
    const dashDuration = dotDuration * 3
    const symbolSpace = dotDuration
    const letterSpace = dotDuration * 3
    
    // Generate sequence
    const textToMorseMap: Record<string, string> = {}
    Object.entries(internationalMorseCodeMap).forEach(([morse, char]) => {
      textToMorseMap[char] = morse
    })

    const sequence: { type: 'dot' | 'dash' | 'space', duration: number }[] = []
    
    gameState.word.split('').forEach((char, charIndex) => {
      const morse = textToMorseMap[char] || ''
      morse.split('').forEach((symbol, symbolIndex) => {
        sequence.push({ 
          type: symbol === '.' ? 'dot' : 'dash', 
          duration: symbol === '.' ? dotDuration : dashDuration 
        })
        
        // Space between symbols
        if (symbolIndex < morse.length - 1) {
          sequence.push({ type: 'space', duration: symbolSpace })
        }
      })
      
      // Space between letters
      if (charIndex < gameState.word.length - 1) {
        sequence.push({ type: 'space', duration: letterSpace })
      }
    })

    let currentTime = ac.currentTime + 0.1 // Start slightly in future

    sequence.forEach((item) => {
      if (item.type !== 'space') {
        const osc = ac.createOscillator()
        const gain = ac.createGain()
        
        osc.frequency.value = 700
        osc.type = 'sine'
        
        osc.connect(gain)
        gain.connect(ac.destination)
        
        osc.start(currentTime)
        osc.stop(currentTime + item.duration)
        
        gain.gain.setValueAtTime(0.5, currentTime)
        gain.gain.setValueAtTime(0, currentTime + item.duration - 0.005) // Smooth end
      }
      currentTime += item.duration
    })

    // Reset playing state after sequence finishes
    const totalDuration = (currentTime - ac.currentTime) * 1000
    const timeout = setTimeout(() => {
      setIsPlaying(false)
    }, totalDuration)
    timeoutsRef.current.push(timeout)
  }

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault()
    if (gameState.status !== 'playing' || !input) return

    const guess = input.toUpperCase()
    const targetChars = gameState.word.split('')
    const inputChars = guess.split('')
    const newMaskedWord = [...gameState.maskedWord]
    
    // Check for character matches
    inputChars.forEach((char, index) => {
      if (index < targetChars.length) {
        // Allow spaces or underscores as placeholders
        if (char !== '_' && char !== ' ') {
          if (char === targetChars[index]) {
            newMaskedWord[index] = char
          }
        }
      }
    })

    // Check if fully revealed
    const isWon = newMaskedWord.every(char => char !== "")

    if (isWon) {
      setGameState(prev => ({
        ...prev,
        status: 'won',
        maskedWord: newMaskedWord
      }))
      return
    }

    // Decrement tries and update speed
    const triesUsed = INITIAL_TRIES - gameState.tries + 1
    const newWpm = Math.floor(triesUsed / TRIES_PER_SPEED_DROP) > 0 
      ? Math.max(5, INITIAL_WPM - (Math.floor(triesUsed / TRIES_PER_SPEED_DROP) * SPEED_DECREMENT))
      : gameState.wpm

    const nextTries = gameState.tries - 1
    
    if (nextTries <= 0) {
      setGameState(prev => ({
        ...prev,
        tries: 0,
        status: 'lost',
        maskedWord: targetChars // Reveal word on loss
      }))
    } else {
      setGameState(prev => ({
        ...prev,
        tries: nextTries,
        wpm: newWpm,
        maskedWord: newMaskedWord
      }))
    }
    
    setInput("")
  }

  return (
    <div className="flex flex-col font-lexend rounded-lg max-w-4xl mx-auto p-4 md:p-8 w-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-8 border-b border-gray-200 dark:border-gray-700 pb-4 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary flex items-center gap-2">
          <Trophy className="h-6 w-6 md:h-8 md:w-8" />
          Morse Code Game
        </h2>
        <div className="flex gap-2 md:gap-4 text-xs md:text-sm font-medium w-full md:w-auto justify-center">
          <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-full flex-1 md:flex-none text-center">
            Tries: <span className="text-primary font-bold">{gameState.tries}</span>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-full flex-1 md:flex-none text-center">
            Speed: <span className="text-primary font-bold">{gameState.wpm} WPM</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Game Control Section */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col items-center justify-center space-y-6 min-h-[200px]">
              
              <Button
                onClick={playWord}
                disabled={isPlaying || gameState.status !== 'playing'}
                className={`
                  w-28 h-28 md:w-32 md:h-32 rounded-full text-lg md:text-xl shadow-lg transition-all duration-200
                  ${isPlaying 
                    ? 'bg-primary/80 scale-95' 
                    : 'bg-primary hover:bg-primary/90 hover:scale-105'
                  }
                `}
              >
                {isPlaying ? (
                  <div className="flex flex-col items-center gap-2">
                    <span className="animate-pulse">Playing...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Play size={40} />
                    <span>Play Word</span>
                  </div>
                )}
              </Button>

              <p className="text-sm text-gray-500 text-center max-w-xs">
                Listen to the Morse code and guess the word. 
                Speed decreases every 3 attempts.
              </p>
            </div>
          </div>
        </div>

        {/* Guessing Section */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col justify-center h-full">
            
            {/* Word Display (Masked or Revealed) */}
            <div className="flex justify-center gap-1.5 mb-8 flex-wrap">
              {gameState.maskedWord.map((char, i) => (
                  <div key={i} className={`
                    w-10 h-12 md:w-12 md:h-14 flex items-center justify-center text-xl md:text-2xl font-bold rounded-md border-2 transition-colors duration-300
                    ${char 
                      ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:border-green-600 dark:text-green-400' 
                      : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                    }
                    ${gameState.status === 'lost' && !char ? 'bg-red-100 border-red-500 text-red-700' : ''}
                  `}>
                    {char || (gameState.status === 'lost' ? gameState.word[i] : '')}
                  </div>
              ))}
            </div>

            {gameState.status === 'playing' ? (
              <form onSubmit={handleGuess} className="space-y-4">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter guess (e.g. TE_T)"
                  className="text-center text-lg md:text-xl tracking-widest uppercase h-12 md:h-14 font-mono"
                  maxLength={gameState.word.length}
                  autoFocus
                />
                <div className="flex justify-between text-xs text-gray-500 px-1">
                   <span>Word Length: {gameState.word.length} letters</span>
                   <span>{input.length}/{gameState.word.length} entered</span>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90 transition-all"
                  disabled={!input}
                >
                  Check Answer
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className={`text-2xl font-bold ${gameState.status === 'won' ? 'text-green-600' : 'text-red-600'}`}>
                  {gameState.status === 'won' ? 'Congratulations!' : 'Game Over'}
                </div>
                <Button 
                  onClick={startNewGame}
                  className="w-full h-12 text-lg"
                  variant="outline"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Play Again
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Instructions / Footer */}
      <div className="mt-8">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-2 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-sm"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-primary">
              <HelpCircle className="h-4 w-4" />
              How to Play
            </h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle instructions</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 space-y-2 bg-white dark:bg-gray-900">
            <p>
              Challenge yourself to decode Morse code!
            </p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Press the <span className="font-semibold text-primary">Play Word</span> button to hear the sequence.</li>
              <li>You have <strong>21 tries</strong> to guess the hidden word.</li>
              <li>Playback speed starts at <strong>40 WPM</strong>.</li>
              <li>Every <strong>3 failed attempts</strong>, the speed slows down by 5 WPM to make it easier.</li>
              <li>Type your guess in the box. Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">_</code> for letters you aren&apos;t sure about (e.g., <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">M_RSE</code>).</li>
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

