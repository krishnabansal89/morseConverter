"use client"

import { useState, useEffect, useRef } from "react"
import { Copy, Download, Trash2, HelpCircle, Share2, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const morseCodeMap: Record<string, string> = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "-----": "0",
  ".-.-.-": ".",
  "--..--": ",",
  "..--..": "?",
  ".----.": "'",
  "-.-.--": "!",
  "-..-.": "/",
  "-.--.": "(",
  "-.--.-": ")",
  ".-...": "&",
  "---...": ":",
  "-.-.-.": ";",
  "-...-": "=",
  ".-.-.": "+",
  "-....-": "-",
  "..--.-": "_",
  ".-..-.": '"',
  "...-..-": "$",
  ".--.-.": "@",
  "": " ",
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

export default function MorseConverter() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [mode, setMode] = useState<"morse-to-text" | "text-to-morse">("morse-to-text")
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Convert input based on selected mode
  useEffect(() => {
    if (mode === "morse-to-text") {
      convertMorseToText(inputText)
    } else {
      convertTextToMorse(inputText)
    }
  }, [inputText, mode])

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
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Toggle conversion mode
  const toggleMode = () => {
    setMode((prev) => (prev === "morse-to-text" ? "text-to-morse" : "morse-to-text"))
    setInputText("")
    setOutputText("")
  }

  // Text-to-speech for output
  const handleSpeak = () => {
    if (outputText && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(outputText)
      utterance.lang = "en-US"
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="  flex  flex-col font-lexend rounded-4xl text-[#372824]">
      <div className="border border-gray-200 w-[100%] mx-auto   rounded-lg  overflow-hidden">
        

        <div className="grid md:grid-cols-2">
          {/* Input section */}
          <div className="border-r border-gray-200">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="flex items-center">
                <button onClick={toggleMode} className="text-md font-semibold hover:text-[#372824] text-[#456359]">
                  {mode === "morse-to-text" ? "Morse Code" : "Text"}
                </button>
              </div>
            
            </div>

            <Textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                mode === "morse-to-text"
                  ? "Enter Morse code (use spaces between characters and three spaces between words)"
                  : "Type text to convert to Morse code"
              }
              className="min-h-[200px] md:min-h-[300px] p-4 border-0 rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />

            <div className="p-3 border-t flex justify-between border-gray-200">
              <Button onClick={handleClear} variant="ghost" size="sm" className="text-[#372824] hover:text-black">
                <Trash2 className="h-5 w-5" />
              </Button>
              <Button onClick={() => {}} variant="outline" className="rounded-md px-6 text-[#2d2d2d] bg-[#ffffff] border border-[#456359]/20 hover:bg-[#456359]/10 transition-all ">
                Submit
              </Button>
            </div>
          </div>

          {/* Output section */}
          <div>
            <div className="flex justify-between items-center p-4 border-b border-gray-200 text-[#372824]">
              <div className="flex items-center">
                <button onClick={toggleMode} className="text-md  hover:text-[#372824] text-[#456359] font-semibold ">
                  {mode === "morse-to-text" ? "Text" : "Morse Code"}
                </button>
              </div>
           
            </div>

            <div className="min-h-[200px] md:min-h-[300px] p-4 text-gray-800">
              {outputText || (
                <span className="text-gray-400">
                  {mode === "morse-to-text" ? "Converted text will appear here" : "Morse code will appear here"}
                </span>
              )}
            </div>

            <div className="p-3 border-t  border-gray-200 flex justify-end space-x-2">
              <Button
                onClick={handleSpeak}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
                disabled={!outputText}
              >
                <Volume2 className="h-5 w-5" />
              </Button>
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
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <HelpCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700" disabled={!outputText}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

