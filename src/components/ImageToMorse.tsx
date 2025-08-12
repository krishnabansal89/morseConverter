"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeftRight,
  ArrowUpDown,
  Check,
  Copy,
  Download,
  HelpCircle,
  Lightbulb,
  Pause,
  Play,
  Settings,
  Square,
  Trash2,
  Volume2,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// ---- Morse mapping ----
const characterToMorseMap: Record<string, string> = {
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.",
  "G": "--.", "H": "....", "I": "..", "J": ".---", "K": "-.-", "L": ".-..",
  "M": "--", "N": "-.", "O": "---", "P": ".--.", "Q": "--.-", "R": ".-.",
  "S": "...", "T": "-", "U": "..-", "V": "...-", "W": ".--", "X": "-..-",
  "Y": "-.--", "Z": "--..", ".": ".-.-.-", ",": "--..--", "?": "..--..",
  "'": ".----.", "!": "-.-.--", "/": "-..-.", "(": "-.--.", ")": "-.--.-",
  "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-", "+": ".-.-.",
  "-": "-....-", "_": "..--.-", "\"": ".-..-.", "$": "...-..-", "@": ".--.-.",
  " ": "" // handled specially
};

function textToMorse(raw: string) {
  const s = (raw || "").toUpperCase();
  const parts: string[] = [];
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === " ") {
      if (parts.length && parts[parts.length - 1] !== "/") parts.push("/");
      continue;
    }
    const code = characterToMorseMap[ch];
    if (code) parts.push(code);
  }
  return parts.join(" ").replace(/\s*\/\s*/g, " / ").trim();
}

type AlertType = "info" | "success" | "error" | "warning";
type AlertMsg = { type: AlertType; text: string };

type SoundType = "cw" | "telegraph";

// Calculate standard PARIS timing (ms) from WPM
const timingsFromWpm = (wpm: number) => {
  const dit = 1200 / Math.max(1, wpm); // ms
  return {
    dit,
    dah: dit * 3,
    intra: dit,       // between elements in a letter
    interLetter: dit * 3,
    interWord: dit * 7,
  };
};

type VisualEffectState = { active: boolean; isDash: boolean };

// Build a WAV from morse for downloads (simple 600Hz tone)
function buildWavFromMorse(
  morse: string,
  opts: { wpm: number; frequency: number; volume: number }
) {
  const sampleRate = 44100;
  const freq = opts.frequency;
  const volume = Math.min(1, Math.max(0, opts.volume));
  const { dit, dah, intra, interLetter, interWord } = timingsFromWpm(opts.wpm);

  type Seg = { tone: boolean; ms: number; dash?: boolean };
  const segs: Seg[] = [];
  const tokens = morse.split(" ");
  tokens.forEach((tok, idxTok) => {
    if (tok === "/") {
      segs.push({ tone: false, ms: interWord });
      return;
    }
    const chars = tok.split("");
    chars.forEach((c, i) => {
      segs.push({ tone: true, ms: c === "." ? dit : dah, dash: c === "-" });
      if (i < chars.length - 1) segs.push({ tone: false, ms: intra });
    });
    if (idxTok < tokens.length - 1 && tokens[idxTok + 1] !== "/") {
      segs.push({ tone: false, ms: interLetter });
    }
  });

  const totalMs = segs.reduce((a, b) => a + b.ms, 0);
  const totalSamples = Math.ceil((totalMs / 1000) * sampleRate);
  const data = new Float32Array(totalSamples);

  let p = 0;
  const twoPiF = 2 * Math.PI * freq;

  const env = (t: number, nSamples: number) => {
    const a = Math.min(0.006 * sampleRate, nSamples * 0.1);
    const d = Math.min(0.006 * sampleRate, nSamples * 0.1);
    if (t < a) return t / a;
    if (t > nSamples - d) return (nSamples - t) / d;
    return 1;
  };

  for (const seg of segs) {
    const n = Math.floor((seg.ms / 1000) * sampleRate);
    if (seg.tone) {
      for (let i = 0; i < n && p < data.length; i++, p++) {
        const e = env(i, n);
        data[p] = Math.sin(twoPiF * (p / sampleRate)) * volume * e;
      }
    } else {
      p += n; // silence
    }
  }

  const buffer = new ArrayBuffer(44 + data.length * 2);
  const view = new DataView(buffer);
  const writeStr = (o: number, s: string) => { for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i)); };
  writeStr(0, "RIFF");
  view.setUint32(4, 36 + data.length * 2, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, data.length * 2, true);
  let off = 44;
  for (let i = 0; i < data.length; i++, off += 2) {
    const s = Math.max(-1, Math.min(1, data[i]));
    view.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return new Blob([view], { type: "audio/wav" });
}

// ===== Component =====

export default function ImageMorseTranslator() {
  // --- UI strings mirroring your design ---
  const strings = {
    swap: "New Image",
    headingText: "Text",
    headingMorseCode: "Morse Code",
    play: "Play",
    pause: "Pause",
    resume: "Resume",
    stop: "Stop",
    clear: "Clear",
    audio: "Audio",
    visual: "Visual",
    copy: "Copy",
    download: "Download",
    help: "Help",
    settings: "Audio Settings",
    convertedTextWillAppearHere: "Extracted text will appear here after OCR.",
    morseCodeWillAppearHere: "Morse code will appear here.",
  };

  // ---- Refs / state for layout parity ----
  const converterRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [alertMessage, setAlertMessage] = useState<AlertMsg | null>(null);

  const [visualEffect, setVisualEffect] = useState<VisualEffectState>({
    active: false,
    isDash: false,
  });

  // ---- OCR + text/morse state ----
  const [file, setFile] = useState<File | null>(null);
  const [ocrProgress, setOcrProgress] = useState<number>(0);
  const [isOcrRunning, setIsOcrRunning] = useState(false);
  const [inputText, setInputText] = useState<string>("");       // extracted (editable)
  const [outputText, setOutputText] = useState<string>("");     // morse
  const [inputError, setInputError] = useState<string | null>(null);

  const typingPlaceholder = "Upload an image, then run OCR (editable after).";
  const initialText = inputText; // aligns with your conditional heights
  const isSingleLetterMode = false;
  const isInputMorse = false;
  const isOutputMorse = true;

  // ---- Effects selection + playback state ----
  const [audioEffectSelected, setAudioEffectSelected] = useState(true);
  const [visualEffectSelected, setVisualEffectSelected] = useState(true);

  const [isInputPlaying, setIsInputPlaying] = useState(false);
  const [isInputVisualPlaying, setIsInputVisualPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisualPlaying, setIsVisualPlaying] = useState(false);
  const isAnyPlaying = isInputPlaying || isInputVisualPlaying || isPlaying || isVisualPlaying;

  const [isAnyPaused, setIsAnyPaused] = useState(false);

  const [flashText, setFlashText] = useState<{ button: string; active: boolean; text: string }>({
    button: "",
    active: false,
    text: "",
  });

  // ---- Audio settings ----
  const [audioSettings, setAudioSettings] = useState<{
    wpm: number;
    frequency: number;
    volume: number;
    soundType: SoundType;
  }>({
    wpm: 20,
    frequency: 600,
    volume: 0.25,
    soundType: "cw",
  });

  // ---- WebAudio simple scheduler ----
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const timeoutsRef = useRef<number[]>([]);
  const resumeIndexRef = useRef<number>(0);
  const resumeFromInputRef = useRef<boolean>(false);
  const currentMorseRef = useRef<string>("");

  const showAlert = (text: string, type: AlertType = "info", ms = 2000) => {
    setAlertMessage({ text, type });
    window.setTimeout(() => setAlertMessage(null), ms);
  };

  const buildSequence = useCallback((morse: string) => {
    const { dit, dah, intra, interLetter, interWord } = timingsFromWpm(audioSettings.wpm);
    type Seg = { tone: boolean; ms: number; dash?: boolean };
    const segs: Seg[] = [];
    const tokens = (morse || "").split(" ").filter(Boolean);

    tokens.forEach((tok, idxTok) => {
      if (tok === "/") {
        segs.push({ tone: false, ms: interWord });
        return;
      }
      const chars = tok.split("");
      chars.forEach((c, i) => {
        segs.push({ tone: true, ms: c === "." ? dit : dah, dash: c === "-" });
        if (i < chars.length - 1) segs.push({ tone: false, ms: intra });
      });
      if (idxTok < tokens.length - 1 && tokens[idxTok + 1] !== "/") {
        segs.push({ tone: false, ms: interLetter });
      }
    });
    return segs;
  }, [audioSettings.wpm]);

  const ensureAudio = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainRef.current = audioCtxRef.current.createGain();
      gainRef.current.gain.value = audioSettings.volume;
      gainRef.current.connect(audioCtxRef.current.destination);
    }
  };

  const startTone = (freq: number) => {
    stopTone();
    if (!audioEffectSelected) return;
    ensureAudio();
    const ctx = audioCtxRef.current!;
    const osc = ctx.createOscillator();
    const gain = gainRef.current!;
    osc.type = audioSettings.soundType === "telegraph" ? "square" : "sine";
    osc.frequency.value = freq;
    osc.connect(gain);
    osc.start();
    oscRef.current = osc;
  };

  const stopTone = () => {
    if (oscRef.current) {
      try { oscRef.current.stop(); } catch {}
      try { oscRef.current.disconnect(); } catch {}
    }
    oscRef.current = null;
  };

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
  };

  const setFlash = (button: string, text: string, ms = 900) => {
    setFlashText({ button, text, active: true });
    window.setTimeout(() => setFlashText(prev => ({ ...prev, active: false })), ms);
  };

  const applyVisual = (active: boolean, isDash: boolean) => {
    if (!visualEffectSelected) return;
    setVisualEffect({ active, isDash });
  };

  const stopAllEffects = (fromInput: boolean) => {
    stopTone();
    clearTimeouts();
    setIsAnyPaused(false);
    applyVisual(false, false);

    if (fromInput) {
      setIsInputPlaying(false);
      setIsInputVisualPlaying(false);
    } else {
      setIsPlaying(false);
      setIsVisualPlaying(false);
    }
    resumeIndexRef.current = 0;
    currentMorseRef.current = "";
  };

  const pauseSelectedEffects = (fromInput: boolean) => {
    // Pause between segments (coarse pause)
    stopTone();
    clearTimeouts();
    setIsAnyPaused(true);
    if (fromInput) {
      setIsInputPlaying(false);
      setIsInputVisualPlaying(false);
      resumeFromInputRef.current = true;
    } else {
      setIsPlaying(false);
      setIsVisualPlaying(false);
      resumeFromInputRef.current = false;
    }
    setFlash(fromInput ? "pause-input" : "pause-output", "Paused");
  };

  const resumeSelectedEffects = (fromInput: boolean) => {
    if (!isAnyPaused) return;
    setIsAnyPaused(false);
    const morse = currentMorseRef.current;
    const seq = buildSequence(morse);
    playSequence(seq, resumeIndexRef.current, fromInput);
    setFlash(fromInput ? "pause-input" : "pause-output", "Resumed");
  };

  const playSequence = (seq: { tone: boolean; ms: number; dash?: boolean }[], startIdx: number, fromInput: boolean) => {
    if (seq.length === 0) return;

    if (fromInput) {
      if (visualEffectSelected) setIsInputVisualPlaying(true);
      if (audioEffectSelected) setIsInputPlaying(true);
    } else {
      if (visualEffectSelected) setIsVisualPlaying(true);
      if (audioEffectSelected) setIsPlaying(true);
    }

    let idx = startIdx;
    const runNext = () => {
      if (idx >= seq.length) {
        stopAllEffects(fromInput);
        setFlash(fromInput ? "stop-input" : "stop-output", "Done", 700);
        return;
      }
      const seg = seq[idx];
      if (seg.tone) {
        if (visualEffectSelected) applyVisual(true, !!seg.dash);
        if (audioEffectSelected) startTone(audioSettings.frequency);
      } else {
        if (visualEffectSelected) applyVisual(false, false);
        stopTone();
      }

      const id = window.setTimeout(() => {
        idx += 1;
        resumeIndexRef.current = idx;
        runNext();
      }, seg.ms);
      timeoutsRef.current.push(id);
    };
    runNext();
  };

  const playSelectedEffects = (text: string, fromInput: boolean) => {
    if (!text?.trim()) {
      showAlert("Nothing to play.", "warning");
      return;
    }
    if (isAnyPlaying) return;

    const morse = fromInput ? textToMorse(text) : text; // input => convert to morse; output already morse
    if (!morse) {
      showAlert("No valid characters for Morse.", "warning");
      return;
    }
    currentMorseRef.current = morse;
    resumeIndexRef.current = 0;
    setIsAnyPaused(false);

    const seq = buildSequence(morse);
    playSequence(seq, 0, fromInput);
    setFlash(fromInput ? "play-input" : "play-output", "Playing");
  };

  // ---- Handlers mirroring your design ----
  const toggleAudioEffect = () => {
    setAudioEffectSelected(s => !s);
    setFlash("audioeffect", audioEffectSelected ? "Audio Off" : "Audio On");
  };
  const toggleVisualEffect = () => {
    setVisualEffectSelected(s => !s);
    setFlash("visualeffect", visualEffectSelected ? "Visual Off" : "Visual On");
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setFlash("copy", "Copied!");
    } catch {
      showAlert("Clipboard not available.", "error");
    }
  };

  const handleDownload = () => {
    if (!outputText) return;
    const blob = buildWavFromMorse(outputText, {
      wpm: audioSettings.wpm,
      frequency: audioSettings.frequency,
      volume: audioSettings.volume,
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "morse.wav";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    setFlash("download", "Downloaded!");
  };

  const handleHelp = () => {
    showAlert("Upload image → Extract → Edit text if needed → Play/Download.", "info", 2500);
    setFlash("help", "How it works");
  };

  const handleClear = () => {
    setFile(null);
    setInputText("");
    setOutputText("");
    setInputError(null);
    stopAllEffects(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setInputText(v);
    setOutputText(textToMorse(v));
    setInputError(null);
  };

  const toggleMode = () => {
    // Repurposed as "New Image" — open file dialog
    fileInputRef.current?.click();
  };

  const runOCR = async () => {
    if (!file) {
      showAlert("Choose an image first.", "warning");
      return;
    }
    setIsOcrRunning(true);
    setOcrProgress(0);
    try {
      const Tesseract = (await import("tesseract.js")).default;
      const result = await Tesseract.recognize(file, "eng", {
        logger: (m: any) => {
          if (m.status === "recognizing text" && typeof m.progress === "number") {
            setOcrProgress(Math.round(m.progress * 100));
          }
        },
      });
      const text = (result?.data?.text || "").trim();
      setInputText(text);
      setOutputText(textToMorse(text));
      if (!text) {
        setInputError("No text detected. Try a clearer image.");
      } else {
        setInputError(null);
        showAlert("OCR complete.", "success", 1200);
      }
    } catch (e: any) {
      console.error(e);
      showAlert(e?.message || "OCR failed.", "error", 2500);
    } finally {
      setIsOcrRunning(false);
    }
  };

  const isOutputReady = !!outputText;

  useEffect(() => {
    // keep gain synced with volume
    if (gainRef.current) gainRef.current.gain.value = audioSettings.volume;
  }, [audioSettings.volume]);

  return (
    <div
      ref={converterRef}
      className={`
        flex flex-col font-lexend rounded-lg text-[#372824] transition-colors duration-500 ease-in-out
        ${visualEffect.active ? (visualEffect.isDash ? "bg-[#456359] text-white pulse-dash" : "bg-[#456359] text-white pulse-dot") : ""}
      `}
    >
      {/* Alert */}
      {alertMessage && (
        <div
          className={`
            mx-4 mt-4 p-3 rounded-md shadow-sm border text-sm flex items-center justify-between
            animate-fadeIn transition-all duration-300 ease-in-out
            ${alertMessage.type === "info" ? "bg-green-50 border-green-200 text-green-700" : ""}
            ${alertMessage.type === "success" ? "bg-green-50 border-green-200 text-green-700" : ""}
            ${alertMessage.type === "error" ? "bg-red-50 border-red-200 text-red-700" : ""}
            ${alertMessage.type === "warning" ? "bg-amber-50 border-amber-200 text-amber-700" : ""}
          `}
          role="alert"
        >
          <div className="flex items-center">
            <span className="mr-2">ℹ️</span>
            <span className="text-sm font-medium">{alertMessage.text}</span>
          </div>
          <button
            onClick={() => setAlertMessage(null)}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      <div className="w-full mx-auto rounded-lg overflow-hidden border border-gray-200">
        <div className="grid md:grid-cols-2 relative">
          {/* Center "swap" — we use to trigger new image */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-10 md:block hidden">
            <div className="flex flex-col items-center">
              <Button
                onClick={toggleMode}
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12 border-[#456359] bg-white shadow-md overflow-hidden"
                title="New Image"
              >
                <div className="swap-arrow-container">
                  <ArrowLeftRight className="h-6 w-6 text-[#456359]" />
                </div>
              </Button>
              <span className="text-xs mt-1 text-[#456359]">{strings.swap}</span>
            </div>
          </div>

          {/* INPUT side */}
          <div className="border-r border-gray-200">
            <div className="flex md:justify-between justify-around items-center p-4 border-b border-gray-200 md:w-full md:flex-row flex-col gap-y-2">
              <div className="flex items-center">
                <span className="md:text-lg text-2xl font-bold text-[#456359]">
                  Image & {strings.headingText}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="ghost"
                  size="sm"
                  className="text-[#456359]"
                  title="Choose Image"
                >
                  Choose Image
                </Button>
                <Button
                  onClick={runOCR}
                  variant="ghost"
                  size="sm"
                  className={`relative text-[#456359] ${isOcrRunning ? "bg-gray-100" : ""}`}
                  disabled={!file || isOcrRunning || isAnyPlaying}
                  title="Extract & Translate"
                >
                  {isOcrRunning ? `Extracting ${ocrProgress}%` : "Extract & Translate"}
                </Button>

                {/* Play input (extracted text) */}
                {/* <Button
                  onClick={() => playSelectedEffects(inputText, true)}
                  variant="ghost"
                  size="sm"
                  className={`relative text-[#456359] ${(isInputPlaying || isInputVisualPlaying) ? "bg-gray-100" : ""} flex items-center gap-1`}
                  disabled={
                    !inputText ||
                    (!audioEffectSelected && !visualEffectSelected) ||
                    isAnyPlaying
                  }
                  title="Play Input"
                >
                  {flashText.button === "play-input" && flashText.active && (
                    <span className="flash-text-secondary">{flashText.text}</span>
                  )}
                  <Play size={18} />
                  {strings.play}
                </Button>

                <Button
                  onClick={() => (isAnyPaused ? resumeSelectedEffects(true) : pauseSelectedEffects(true))}
                  variant="ghost"
                  size="sm"
                  className={`relative text-[#456359] ${isAnyPaused ? "bg-gray-100" : ""} flex items-center gap-1`}
                  disabled={!((isInputPlaying || isInputVisualPlaying) || isAnyPaused)}
                  title={isAnyPaused ? strings.resume : strings.pause}
                >
                  <Pause size={18} />
                  {isAnyPaused ? strings.resume : strings.pause}
                </Button>

                <Button
                  onClick={() => stopAllEffects(true)}
                  variant="ghost"
                  size="sm"
                  className="relative text-[#456359] flex items-center gap-1"
                  disabled={!(isInputPlaying || isInputVisualPlaying || isAnyPaused)}
                  title="Stop Input"
                >
                  <Square size={18} />
                  {strings.stop}
                </Button> */}

                {/* Mobile clear */}
                {/* <Button
                  onClick={handleClear}
                  disabled={!inputText && !file}
                  variant="ghost"
                  size="sm"
                  className="text-[#372824] hover:text-black flex flex-col md:hidden"
                  title="Clear Input"
                >
                  <Trash2 className="h-5 w-5 p-0 m-0 -mb-2" />
                  {strings.clear}
                </Button> */}
              </div>
            </div>

            <div className="relative">
              <Textarea
                ref={inputRef}
                value={inputText}
                onChange={handleInputChange}
                onClick={() => {
                  if (!inputText) {
                    showAlert("Upload & Extract first, then edit text if needed.", "warning", 2200);
                  }
                }}
                placeholder={typingPlaceholder}
                className={`
                  p-4 border-0 rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0
                  ${initialText.length === 0 ? "min-h-[200px] md:min-h-[300px]" : "min-h-[100px] md:min-h-[200px]"}
                  ${isSingleLetterMode && inputText === initialText
                    ? "text-center pt-14 text-4xl md:text-6xl"
                    : initialText.length > 1 ? "text-3xl/relaxed" : "text-xl/relaxed"}
                `}
              />
              {inputError && (
                <div className="absolute bottom-2 left-0 right-0 mx-4 p-2 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                  {inputError}
                </div>
              )}
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
                title="New Image"
              >
                <ArrowUpDown className="h-5 w-5 p-0 m-0" />
                {strings.swap}
              </Button>
            </div>
          </div>

          {/* OUTPUT side */}
          <div>
            <div className="flex md:justify-between justify-around items-center p-4 border-b border-gray-200 text-[#372824] md:w-full md:flex-row flex-col gap-y-2">
              <div className="flex items-center">
                <span className="md:text-lg text-2xl text-[#456359] font-bold">
                  {strings.headingMorseCode}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  onClick={() => playSelectedEffects(outputText, false)}
                  variant="ghost"
                  size="sm"
                  className={`relative text-[#456359] ${(isPlaying || isVisualPlaying) ? "bg-gray-100" : ""} flex items-center gap-1`}
                  disabled={
                    !isOutputReady ||
                    (!audioEffectSelected && !visualEffectSelected) ||
                    (isInputPlaying || isInputVisualPlaying)
                  }
                  title="Play Output"
                >
                  {flashText.button === "play-output" && flashText.active && (
                    <span className="flash-text-secondary">{flashText.text}</span>
                  )}
                  <Play size={18} />
                  {strings.play}
                </Button>

                <Button
                  onClick={() => (isAnyPaused ? resumeSelectedEffects(false) : pauseSelectedEffects(false))}
                  variant="ghost"
                  size="sm"
                  className={`relative text-[#456359] ${isAnyPaused ? "bg-gray-100" : ""} flex items-center gap-1`}
                  disabled={!((isPlaying || isVisualPlaying) || isAnyPaused)}
                  title={isAnyPaused ? `${strings.resume} Output` : `${strings.pause} Output`}
                >
                  <Pause size={18} />
                  {isAnyPaused ? strings.resume : strings.pause}
                </Button>

                <Button
                  onClick={() => stopAllEffects(false)}
                  variant="ghost"
                  size="sm"
                  className="relative text-[#456359] flex items-center gap-1"
                  disabled={!(isPlaying || isVisualPlaying || isAnyPaused)}
                  title="Stop Output"
                >
                  <Square size={18} />
                  {strings.stop}
                </Button>
              </div>
            </div>

            <div
              className={`
                p-4 text-gray-800 whitespace-pre-wrap
                ${initialText.length === 0 ? "min-h-[200px] md:min-h-[300px]" : "min-h-[100px] md:min-h-[200px]"}
                ${isSingleLetterMode ? "text-center text-4xl md:text-6xl" : initialText.length > 1 ? "text-3xl/relaxed" : "text-xl/relaxed"}
              `}
            >
              {isOutputReady ? (
                <>
                  <div className="font-mono break-words">{outputText}</div>
                </>
              ) : (
                <span className="text-gray-400 text-md">{strings.morseCodeWillAppearHere}</span>
              )}
            </div>

            <div className="p-3 border-t border-gray-200 flex flex-col md:flex-row md:justify-between space-x-2 md:w-full items-center gap-y-6 justify-center">
              <div className="flex items-center space-x-2">
                <Button
                  onClick={toggleAudioEffect}
                  variant="ghost"
                  size="sm"
                  className={`relative ${audioEffectSelected ? "bg-[#456359] hover:bg-[#456359] text-white hover:text-white" : "text-[#456359] hover:bg-white"} flex items-center gap-1 md:flex-row flex-col py-10 md:py-0`}
                  title={audioEffectSelected ? "Audio Effect Selected" : "Select Audio Effect"}
                  disabled={isAnyPlaying || isAnyPaused || (audioEffectSelected && !visualEffectSelected)}
                >
                  {flashText.button === "audioeffect" && flashText.active && (
                    <span className={`${audioEffectSelected ? "flash-text" : "flash-text-inactive"}`}>{flashText.text}</span>
                  )}
                  <Volume2 className="h-5 w-5" />
                  {strings.audio}
                  <Check className={`h-5 w-5 ${audioEffectSelected ? "text-white" : "hidden"}`} />
                </Button>

                <Button
                  onClick={toggleVisualEffect}
                  variant="ghost"
                  size="sm"
                  className={`relative ${visualEffectSelected ? "bg-[#456359] hover:bg-[#456359] text-white hover:text-white" : "text-[#456359] hover:bg-white"} flex items-center gap-1 md:flex-row flex-col py-10 md:py-0`}
                  title={visualEffectSelected ? "Visual Effect Selected" : "Select Visual Effect"}
                  disabled={isAnyPlaying || isAnyPaused || (!isOutputMorse && !isInputMorse) || (!audioEffectSelected && visualEffectSelected)}
                >
                  {flashText.button === "visualeffect" && flashText.active && (
                    <span className={`${visualEffectSelected ? "flash-text" : "flash-text-inactive"}`}>{flashText.text}</span>
                  )}
                  <Lightbulb className="h-5 w-5" />
                  {strings.visual}
                  <Check className={`h-5 w-5 ${visualEffectSelected ? "text-white" : "hidden"}`} />
                </Button>
              </div>

              <div className="flex items-center md:justify-end justify-around md:w-fit w-full md:mx-0 mx-auto">
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="sm"
                  className="relative text-gray-500 hover:text-gray-700 flex flex-col"
                  disabled={!isOutputReady}
                  title={`${strings.copy} Output`}
                >
                  {flashText.button === "copy" && flashText.active && (
                    <span className="flash-text">Copied!</span>
                  )}
                  <Copy className="h-5 w-5 p-0 m-0 -mb-2" />
                  {strings.copy}
                </Button>

                <Button
                  onClick={handleDownload}
                  variant="ghost"
                  size="sm"
                  className="relative text-gray-500 hover:text-gray-700 flex flex-col"
                  disabled={!isOutputReady}
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
              </div>
            </div>
          </div>
        </div>

        {/* Audio Settings */}
        <Collapsible className="border-t border-gray-200">
          <div className="flex justify-between items-center px-4 py-2">
            <span className="text-sm font-medium text-[#456359]">{strings.settings}</span>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="text-[#456359]">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Toggle {strings.settings.toLowerCase()}</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="p-4 border-t border-gray-100 grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-sm text-right col-span-1">WPM:</label>
                <div className="col-span-2">
                  <input
                    type="range"
                    min={5}
                    max={30}
                    value={audioSettings.wpm}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setAudioSettings(s => ({ ...s, wpm: v }));
                      showAlert(`Playback speed set to ${v} WPM`, "info", 1200);
                    }}
                    className="w-full accent-[#456359]"
                  />
                </div>
                <span className="col-span-1 text-sm">{audioSettings.wpm}</span>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-sm text-right col-span-1">Frequency:</label>
                <div className="col-span-2">
                  <input
                    type="range"
                    min={400}
                    max={1000}
                    step={50}
                    value={audioSettings.frequency}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setAudioSettings(s => ({ ...s, frequency: v }));
                      showAlert(`Tone frequency set to ${v} Hz`, "info", 1200);
                    }}
                    className="w-full accent-[#456359]"
                  />
                </div>
                <span className="col-span-1 text-sm">{audioSettings.frequency} Hz</span>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-sm text-right col-span-1">Volume:</label>
                <div className="col-span-2">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={audioSettings.volume}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setAudioSettings(s => ({ ...s, volume: v }));
                      showAlert(`Volume set to ${Math.round(v * 100)}%`, "info", 1200);
                    }}
                    className="w-full accent-[#456359]"
                  />
                </div>
                <span className="col-span-1 text-sm">{Math.round(audioSettings.volume * 100)}%</span>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-sm text-right col-span-1">Sound Type:</label>
                <div className="col-span-3">
                  <div className="flex gap-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="soundType"
                        value="cw"
                        checked={audioSettings.soundType === "cw"}
                        onChange={() => {
                          setAudioSettings(s => ({ ...s, soundType: "cw" }));
                          showAlert("Sound type set to CW Radio Tone", "info", 1200);
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
                        checked={audioSettings.soundType === "telegraph"}
                        onChange={() => {
                          setAudioSettings(s => ({ ...s, soundType: "telegraph" }));
                          showAlert("Sound type set to Telegraph Sounder", "info", 1200);
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

      {/* animations (same classes) */}
      <style jsx global>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }

        @keyframes pulse-dot { 0%,100% { background-color:#456359; } 50% { background-color:#5a7d73; } }
        @keyframes pulse-dash { 0%,100% { background-color:#456359; } 50% { background-color:#3a534a; } }
        .pulse-dot { animation: pulse-dot 0.15s ease-in-out; transition: background-color .2s,color .2s; }
        .pulse-dash { animation: pulse-dash 0.5s ease-in-out; transition: background-color .3s,color .3s; }

        @keyframes fadeIn { from { opacity:0; transform: translateY(-10px); } to { opacity:1; transform: translateY(0); } }
        @keyframes fadeOut { from { opacity:1; transform: translateY(0); } to { opacity:0; transform: translateY(-10px); } }
        .animate-fadeIn { animation: fadeIn .3s ease-in-out; }
        .animate-fadeOut { animation: fadeOut .3s ease-in-out forwards; }

        .flash-text,
        .flash-text-secondary,
        .flash-text-inactive,
        .help-flash-text {
          position: absolute; top: -22px; font-size: 11px; background: #fff; border: 1px solid #e5e7eb; padding: 2px 6px; border-radius: 6px;
        }
        .flash-text-secondary { background: #fffbe6; border-color: #f5c749; }
        .flash-text-inactive { background: #f8fafc; color:#64748b; }
        .help-flash-text { background:#eef2ff; border-color:#c7d2fe; }
      `}</style>
    </div>
  );
}
