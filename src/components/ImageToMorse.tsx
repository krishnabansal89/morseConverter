"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
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
  Image as ImageIcon,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

/* =========================
   Morse map + helpers
   ========================= */

const characterToMorseMap: Record<string, string> = {
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--_-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
  " ": "", // handled specially
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

const timingsFromWpm = (wpm: number) => {
  const dit = 1200 / Math.max(1, wpm); // ms (PARIS standard)
  return {
    dit,
    dah: dit * 3,
    intra: dit, // between elements in a letter
    interLetter: dit * 3,
    interWord: dit * 7,
  };
};

type VisualEffectState = { active: boolean; isDash: boolean };

/* WAV builder for downloads */
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
  const writeStr = (o: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i));
  };
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

/* =========================
   Component
   ========================= */

export default function ImageMorseTranslator() {
  const strings = {
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

  // refs
  const converterRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // alert
  const [alertMessage, setAlertMessage] = useState<AlertMsg | null>(null);

  // visual effect
  const [visualEffect, setVisualEffect] = useState<VisualEffectState>({
    active: false,
    isDash: false,
  });

  // image + preview
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // zoom effect state
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [zoomLensPosition, setZoomLensPosition] = useState({ x: 0, y: 0 });

  // OCR + IO
  const [ocrProgress, setOcrProgress] = useState<number>(0);
  const [isOcrRunning, setIsOcrRunning] = useState(false);
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [inputError, setInputError] = useState<string | null>(null);

  const typingPlaceholder =
    "Upload an image to extract text automatically, then edit if needed.";

  const isInputMorse = false;
  const isOutputMorse = true;

  // effects selection + playback state
  const [audioEffectSelected, setAudioEffectSelected] = useState(true);
  const [visualEffectSelected, setVisualEffectSelected] = useState(true);
  const [isInputPlaying, setIsInputPlaying] = useState(false);
  const [isInputVisualPlaying, setIsInputVisualPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisualPlaying, setIsVisualPlaying] = useState(false);
  const isAnyPlaying =
    isInputPlaying || isInputVisualPlaying || isPlaying || isVisualPlaying;
  const [isAnyPaused, setIsAnyPaused] = useState(false);

  // audio settings
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

  // web audio
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const timeoutsRef = useRef<number[]>([]);
  const resumeIndexRef = useRef<number>(0);
  const currentMorseRef = useRef<string>("");

  /* ===== Utils ===== */

  const showAlert = (text: string, type: AlertType = "info", ms = 2000) => {
    setAlertMessage({ text, type });
    window.setTimeout(() => setAlertMessage(null), ms);
  };

  const ensureAudio = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
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
      try {
        oscRef.current.stop();
      } catch {}
      try {
        oscRef.current.disconnect();
      } catch {}
    }
    oscRef.current = null;
  };

  const clearTimeouts = () => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  };

  const applyVisual = (active: boolean, isDash: boolean) => {
    if (!visualEffectSelected) return;
    setVisualEffect({ active, isDash });
  };

  const buildSequence = useCallback(
    (morse: string) => {
      const { dit, dah, intra, interLetter, interWord } =
        timingsFromWpm(audioSettings.wpm);
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
    },
    [audioSettings.wpm]
  );

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
    stopTone();
    clearTimeouts();
    setIsAnyPaused(true);
    if (fromInput) {
      setIsInputPlaying(false);
      setIsInputVisualPlaying(false);
    } else {
      setIsPlaying(false);
      setIsVisualPlaying(false);
    }
  };

  const resumeSelectedEffects = (fromInput: boolean) => {
    if (!isAnyPaused) return;
    setIsAnyPaused(false);
    const morse = currentMorseRef.current;
    const seq = buildSequence(morse);
    playSequence(seq, resumeIndexRef.current, fromInput);
  };

  const playSequence = (
    seq: { tone: boolean; ms: number; dash?: boolean }[],
    startIdx: number,
    fromInput: boolean
  ) => {
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

  // Added: playSelectedEffects helper to start playback from input (converted) or output (already morse)
  const playSelectedEffects = (text: string, fromInput: boolean) => {
    const t = (text || '').trim();
    if (!t) {
      showAlert('Nothing to play.', 'warning');
      return;
    }
    if (isAnyPlaying) return;

    const morse = fromInput ? textToMorse(t) : t; // convert only when playing input text
    if (!morse) {
      showAlert('No valid characters for Morse.', 'warning');
      return;
    }

    currentMorseRef.current = morse;
    resumeIndexRef.current = 0;
    setIsAnyPaused(false);

    const seq = buildSequence(morse);
    if (!seq || seq.length === 0) {
      showAlert('Nothing to play.', 'warning');
      return;
    }
    playSequence(seq, 0, fromInput);
  };

  const handleChooseFile = useCallback(
    async (f: File | null) => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setFile(f);
      if (f) {
        const url = URL.createObjectURL(f);
        setPreviewUrl(url);
        // Automatically trigger OCR when image is selected
        await runOCR(f);
      } else {
        setPreviewUrl(null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [previewUrl]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  /* ===== NEW: Paste screenshot support ===== */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onPaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items || items.length === 0) return;

      let handled = false;
      for (const item of Array.from(items)) {
        if (item.type && item.type.startsWith("image/")) {
          const f = item.getAsFile();
          if (f) {
            e.preventDefault();
            handled = true;
            showAlert("Image pasted from clipboard. Running OCR…", "info", 1200);
            await handleChooseFile(f);
            break;
          }
        }
      }

      // if not handled, let normal text paste continue
      if (!handled) return;
    };

    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, [handleChooseFile]);

  /* ===== Optional: drag & drop support (nice to have) ===== */
  const handleDragOver = (e: React.DragEvent) => {
    if (e.dataTransfer?.types?.includes("Files")) {
      e.preventDefault();
    }
  };
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer?.files?.[0];
    if (f && f.type?.startsWith("image/")) {
      await handleChooseFile(f);
      showAlert("Image dropped. Running OCR…", "info", 1200);
    }
  };

  /* ===== Zoom effect handlers ===== */
  const handleImageMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate zoom position (center the zoom area around cursor)
    const zoomSize = 100; // Size of the zoom lens
    const lensX = Math.max(0, Math.min(x - zoomSize / 2, rect.width - zoomSize));
    const lensY = Math.max(0, Math.min(y - zoomSize / 2, rect.height - zoomSize));
    
    // Calculate the magnified area position
    const zoomX = (x / rect.width) * 100;
    const zoomY = (y / rect.height) * 100;
    
    setZoomLensPosition({ x: lensX, y: lensY });
    setZoomPosition({ x: zoomX, y: zoomY });
  };

  const handleImageMouseEnter = () => {
    if (previewUrl && !isOcrRunning) {
      setIsZooming(true);
    }
  };

  const handleImageMouseLeave = () => {
    setIsZooming(false);
  };

  /* ===== OCR ===== */

  const runOCR = async (imageFile?: File) => {
    const fileToProcess = imageFile || file;
    if (!fileToProcess) {
      showAlert("Choose an image first.", "warning");
      return;
    }
    setIsOcrRunning(true);
    setOcrProgress(0);
    try {
      const Tesseract = (await import("tesseract.js")).default;
      const result = await Tesseract.recognize(fileToProcess, "eng", {
        logger: (m: any) => {
          if (m.status === "recognizing text" && typeof m.progress === "number") {
            setOcrProgress(Math.round(m.progress * 100));
          }
        },
      });
      const text = (result?.data?.text || "").trim();
      setInputText(text);
      setOutputText(textToMorse(text));
      if (!text) setInputError("No text detected. Try a clearer image.");
      else {
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

  /* ===== IO handlers ===== */

  const handleClear = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
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

  const toggleAudioEffect = () => {
    setAudioEffectSelected((s) => !s);
  };

  const toggleVisualEffect = () => {
    setVisualEffectSelected((s) => !s);
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
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
  };

  /* keep gain synced with volume */
  useEffect(() => {
    if (gainRef.current) gainRef.current.gain.value = audioSettings.volume;
  }, [audioSettings.volume]);

  const isOutputReady = !!outputText;

  const isMac =
    typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/.test(navigator.platform);

  /* ===== Render ===== */

  return (
    <div
      ref={converterRef}
      className={`
        flex flex-col font-lexend  rounded-lg text-[#372824] transition-colors duration-500 ease-in-out
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
        {/* key bit: items-stretch so both columns are equal height */}
        <div className="grid md:grid-cols-2 relative items-stretch">
          {/* INPUT column */}
          <div className="border-r border-gray-200 flex flex-col h-full">
            {/* top bar */}
            <div className="flex md:justify-between justify-around items-center p-4 border-b border-gray-200 md:w-full md:flex-row flex-col gap-y-2">
              <div className="flex items-center">
                <span className="md:text-lg text-2xl font-bold text-[#456359]">
                  Image & {strings.headingText}
                </span>
              </div>

              {/* picker + paste + conditional Extract */}
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => handleChooseFile(e.target.files?.[0] ?? null)}
                />
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title={file ? "Change Image" : "Choose Image"}
                    disabled={isOcrRunning}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`
                      relative w-20 h-14 rounded-lg border-2 overflow-hidden dark:bg-card
                      ${file ? "border-[#456359]" : "border-dashed border-[#456359]/50 bg-gray-50 hover:bg-gray-100"}
                      ${isOcrRunning ? "opacity-50 cursor-not-allowed" : ""}
                      flex items-center justify-center group
                    `}
                    onMouseMove={previewUrl ? handleImageMouseMove : undefined}
                    onMouseEnter={previewUrl ? handleImageMouseEnter : undefined}
                    onMouseLeave={previewUrl ? handleImageMouseLeave : undefined}
                  >
                    {!previewUrl ? (
                      <div className="flex flex-col items-center justify-center text-[#456359]/80">
                        <ImageIcon className="w-8 h-6 opacity-80" />
                        <span className="text-[10px] mt-1">Choose image</span>
                      </div>
                    ) : (
                      <>
                        <img
                          src={previewUrl}
                          alt="Selected"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {isOcrRunning ? (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <div className="text-white text-[10px] text-center">
                              <div className="animate-spin-slow w-4 h-4 border-2 border-white border-t-transparent rounded-full mx-auto mb-1"></div>
                              {ocrProgress}%
                            </div>
                          </div>
                        ) : (
                          <>
                            <span className="absolute bottom-0 left-0 right-0 text-[10px] text-white/90 bg-black/40 px-1 py-0.5 text-center">
                              Change
                            </span>
                            {/* Zoom lens overlay */}
                            {isZooming && (
                              <div
                                className="absolute zoom-lens pointer-events-none rounded-sm"
                                style={{
                                  width: '25px',
                                  height: '25px',
                                  left: `${zoomLensPosition.x}px`,
                                  top: `${zoomLensPosition.y}px`,
                                }}
                              />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </button>

                  {/* Magnified image overlay */}
                  {isZooming && previewUrl && !isOcrRunning && (
                    <div
                      className="absolute left-24 top-0 w-48 h-32 border-2 border-[#456359] bg-white rounded-lg overflow-hidden z-50 pointer-events-none zoom-overlay zoom-enter"
                    >
                      <div
                        className="w-full h-full bg-cover bg-no-repeat transition-all duration-75 ease-out"
                        style={{
                          backgroundImage: `url(${previewUrl})`,
                          backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          backgroundSize: '300%', // 3x magnification
                        }}
                      />
                      <div className="absolute top-1 right-1 bg-black/70 text-white text-[8px] px-1.5 py-0.5 rounded font-mono">
                        3x
                      </div>
                      {/* Optional: Add crosshairs in the center */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-3 h-px bg-red-400 opacity-50"></div>
                        <div className="absolute w-px h-3 bg-red-400 opacity-50"></div>
                      </div>
                    </div>
                  )}
                </div>

               
              </div>
            </div>

            {/* middle content: stretch + scroll */}
            <div className="relative flex-1 min-h-0">
              <Textarea
                ref={inputRef}
                value={inputText}
                onChange={handleInputChange}
                placeholder={typingPlaceholder}
                className={`
                  h-full p-4 border-0 min-h-[20vw] rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0
                  text-xl/relaxed dark:text-gray-100
                `}
              />
              {inputError && (
                <div className="absolute bottom-2 left-0 right-0 mx-4 p-2 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                  {inputError}
                </div>
              )}
            </div>

            {/* bottom bar pinned to bottom */}
            <div className="p-3 md:border-t md:border-0 border-b flex md:justify-between md:w-full justify-center border-gray-200 my-3 md:my-0 mt-auto">
              <Button
                onClick={handleClear}
                variant="ghost"
                size="sm"
                className="text-[#372824] dark:text-[#9ca3af] hover:text-black md:flex flex-col hidden"
                title="Clear Input"
              >
                <Trash2 className="h-5 w-5 p-0 m-0 -mb-2" />
                {strings.clear}
              </Button>
              <span className="md:hidden text-xs text-gray-500">
                {file ? "" : `Click choose, drag & drop, or ${isMac ? "⌘" : "Ctrl"}+V to paste`}
              </span>
            </div>
          </div>

          {/* OUTPUT column */}
          <div className="flex flex-col h-full">
            {/* top bar */}
            <div className="flex md:justify-between justify-around items-center p-4 py-[28px] border-b border-gray-200 text-[#372824] md:w-full md:flex-row flex-col gap-y-2">
              <div className="flex items-center">
                <span className="md:text-lg text-2xl text-[#456359] font-bold">{strings.headingMorseCode}</span>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  onClick={() => playSelectedEffects(outputText, false)}
                  variant="ghost"
                  size="sm"
                  className={`relative text-[#456359] ${isPlaying || isVisualPlaying ? "bg-gray-100" : ""} flex items-center gap-1`}
                  disabled={!isOutputReady || (!audioEffectSelected && !visualEffectSelected) || (isInputPlaying || isInputVisualPlaying)}
                  title="Play Output"
                >
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

            {/* middle content: stretch + scroll */}
            <div className="flex-1 min-h-0 p-4 text-gray-800 whitespace-pre-wrap overflow-auto dark:text-gray-100">
              {isOutputReady ? (
                <div className="font-mono break-words text-2xl/relaxed">{outputText}</div>
              ) : (
                <span className="text-gray-400 text-md">{strings.morseCodeWillAppearHere}</span>
              )}
            </div>

            {/* bottom bar pinned to bottom */}
            <div className="p-3 border-t border-gray-200 flex flex-col md:flex-row md:justify-between space-x-2 md:w-full items-center gap-y-6 justify-center mt-auto">
              <div className="flex items-center space-x-2">
                <Button
                  onClick={toggleAudioEffect}
                  variant="ghost"
                  size="sm"
                  className={`relative ${audioEffectSelected ? "bg-[#456359] hover:bg-[#456359] text-white hover:text-white" : "text-[#456359] hover:bg-white"} flex items-center gap-1 md:flex-row flex-col py-10 md:py-0`}
                  title={audioEffectSelected ? "Audio Effect Selected" : "Select Audio Effect"}
                  disabled={isAnyPlaying || isAnyPaused || (audioEffectSelected && !visualEffectSelected)}
                >
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
                  <Download className="h-5 w-5 p-0 m-0 -mb-2" />
                  {strings.download}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-gray-500 hover:text-gray-700 flex flex-col dark:text-[#9ca3af]"
                  title="Help"
                  onClick={() => {
                    showAlert(
                      "Paste screenshot with Ctrl/⌘+V (or use the Paste button), or choose/drag an image → OCR runs automatically → Edit text → Play/Download.",
                      "info",
                      3200
                    );
                  }}
                >
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
            <div className="p-4 border-t border-gray-100 grid gap-4 dark:text-[#9ca3af]">
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
                      setAudioSettings((s) => ({ ...s, wpm: v }));
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
                      setAudioSettings((s) => ({ ...s, frequency: v }));
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
                      setAudioSettings((s) => ({ ...s, volume: v }));
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
                          setAudioSettings((s) => ({ ...s, soundType: "cw" }));
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
                          setAudioSettings((s) => ({ ...s, soundType: "telegraph" }));
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

      {/* Global animations (same class names as your other tool) */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }

        @keyframes pulse-dot { 0%,100% { background-color:#456359; } 50% { background-color:#5a7d73; } }
        @keyframes pulse-dash { 0%,100% { background-color:#456359; } 50% { background-color:#3a534a; } }
        .pulse-dot { animation: pulse-dot 0.15s ease-in-out; transition: background-color .2s,color .2s; }
        .pulse-dash { animation: pulse-dash 0.5s ease-in-out; transition: background-color .3s,color .3s; }

        @keyframes fadeIn { from { opacity:0; transform: translateY(-10px); } to { opacity:1; transform: translateY(0); } }
        @keyframes fadeOut { from { opacity:1; transform: translateY(0); } to { opacity:0; transform: translateY(-10px); } }
        .animate-fadeIn { animation: fadeIn .3s ease-in-out; }
        .animate-fadeOut { animation: fadeOut .3s ease-in-out forwards; }

        /* Zoom effect animations */
        @keyframes zoomIn {
          from { 
            opacity: 0; 
            transform: scale(0.8) translateX(-10px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateX(0); 
          }
        }
        
        @keyframes zoomOut {
          from { 
            opacity: 1; 
            transform: scale(1) translateX(0); 
          }
          to { 
            opacity: 0; 
            transform: scale(0.8) translateX(-10px); 
          }
        }

        .zoom-enter { animation: zoomIn 0.2s ease-out forwards; }
        .zoom-exit { animation: zoomOut 0.15s ease-in forwards; }

        /* Enhanced zoom lens effect */
        .zoom-lens {
          backdrop-filter: blur(1px);
          box-shadow: 
            0 0 0 2px rgba(255, 255, 255, 0.8),
            0 0 0 3px rgba(69, 99, 89, 0.6),
            0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.1s ease-out;
        }

        .zoom-lens:hover {
          box-shadow: 
            0 0 0 2px rgba(255, 255, 255, 0.9),
            0 0 0 4px rgba(69, 99, 89, 0.8),
            0 6px 16px rgba(0, 0, 0, 0.2);
        }

        /* Magnified overlay styles */
        .zoom-overlay {
          backdrop-filter: blur(2px);
          box-shadow: 
            0 10px 25px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(69, 99, 89, 0.1);
        }

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
