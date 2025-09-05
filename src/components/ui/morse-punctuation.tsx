// components/ui/morse-punctuation.tsx
"use client";

import * as React from "react";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Copy, Check, Volume2, Search } from "lucide-react";

type Entry = {
  name: string;
  symbol: string;
  morseDotsDashes: string; // visual with middle dot/emdash: "· – · – · –"
  morsePlain: string; // ".-.-.-" for audio timing
};

const ENTRIES: Entry[] = [
  { name: "Period", symbol: ".", morseDotsDashes: "· – · – · –", morsePlain: ".-.-.-" },
  { name: "Comma", symbol: ",", morseDotsDashes: "– – · · – –", morsePlain: "--..--" },
  { name: "Question Mark", symbol: "?", morseDotsDashes: "· · – – · ·", morsePlain: "..--.." },
  { name: "Apostrophe", symbol: "’", morseDotsDashes: "· – – – – ·", morsePlain: ".-----." },
  { name: "Colon", symbol: ":", morseDotsDashes: "– – – · · ·", morsePlain: "---..." },
  { name: "Semicolon", symbol: ";", morseDotsDashes: "– · – · – ·", morsePlain: "-.-.-." },
  { name: "Hyphen", symbol: "-", morseDotsDashes: "– · · · · –", morsePlain: "-....-" },
  { name: "Slash", symbol: "/", morseDotsDashes: "– · · – ·", morsePlain: "-..-." },
  { name: "Quotation Marks", symbol: "\"", morseDotsDashes: "· – · · – ·", morsePlain: ".-..-." },
  { name: "Equals", symbol: "=", morseDotsDashes: "– · · · –", morsePlain: "-...-" },
  { name: "Plus", symbol: "+", morseDotsDashes: "· – · – ·", morsePlain: ".-.-." },
];

function useAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const ensureCtx = () => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      ctxRef.current = new Ctx();
    }
    return ctxRef.current!;
  };

  // WPM: ms per dit = 1200 / WPM (standard PARIS timing)
  const playMorse = async (
    morsePlain: string,
    opts: { wpm: number; freq: number }
  ) => {
    if (isPlaying) return;
    setIsPlaying(true);
    const ctx = ensureCtx();

    const ditMs = 1200 / Math.max(5, Math.min(opts.wpm, 50)); // clamp 5..50
    const dahMs = ditMs * 3;
    const intraGap = ditMs; // between dits/dahs in same char
    const charGap = ditMs * 3; // between chars

    const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

    // Create a single oscillator we start/stop for each element
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    osc.type = "sine";
    osc.frequency.setValueAtTime(opts.freq, ctx.currentTime);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    const beep = async (durationMs: number) => {
      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.9, now + 0.002);
      await wait(durationMs);
      const off = ctx.currentTime;
      gain.gain.linearRampToValueAtTime(0, off + 0.01);
    };

    try {
      for (let i = 0; i < morsePlain.length; i++) {
        const ch = morsePlain[i];
        if (ch === ".") {
          await beep(ditMs);
          await wait(intraGap);
        } else if (ch === "-") {
          await beep(dahMs);
          await wait(intraGap);
        } else if (ch === " " || ch === "/") {
          // Handle inter-char or inter-word if passed
          await wait(charGap);
        }
      }
      // trailing small gap
      await wait(charGap);
    } finally {
      osc.stop(ctx.currentTime + 0.02);
      setIsPlaying(false);
    }
  };

  return { playMorse, isPlaying };
}

export default function MorsePunctuationTool() {
  const [search, setSearch] = useState("");
  const [wpm, setWpm] = useState(20);
  const [freq, setFreq] = useState(550);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const { playMorse, isPlaying } = useAudio();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ENTRIES;
    return ENTRIES.filter((e) => {
      return (
        e.name.toLowerCase().includes(q) ||
        e.symbol.toLowerCase().includes(q) ||
        e.morseDotsDashes.replace(/\s+/g, "").includes(q) ||
        e.morsePlain.includes(q)
      );
    });
  }, [search]);

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1200);
    } catch {
      // no-op
    }
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-[#2d2d2d]">
          Morse Code Punctuation – Quick Reference & Player
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4 p-0">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex items-center gap-2 w-full md:w-1/2">
            <Search className="h-4 w-4 text-[#456359]" />
            <Input
              placeholder="Search punctuation, e.g. period, -....-, .-.-.-, ,"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#f7f6f4] border-[#e6e2de] focus-visible:ring-[#456359]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-1/2">
            <div className="flex flex-col">
              <label className="text-sm text-[#456359] mb-2">
                Speed (WPM): <span className="font-medium">{wpm}</span>
              </label>
              <Slider
                value={[wpm]}
                onValueChange={(v) => setWpm(v[0])}
                min={5}
                max={40}
                step={1}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-[#456359] mb-2">
                Tone (Hz): <span className="font-medium">{freq}</span>
              </label>
              <Slider
                value={[freq]}
                onValueChange={(v) => setFreq(v[0])}
                min={300}
                max={900}
                step={5}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#456359] text-white">
              <tr>
                <th className="px-4 py-2">Punctuation</th>
                <th className="px-4 py-2">Symbol</th>
                <th className="px-4 py-2">Morse (· / –)</th>
                <th className="px-4 py-2 hidden md:table-cell">Morse (. / -)</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => {
                const key = `${e.name}-${e.symbol}`;
                const copied = copiedKey === key;
                return (
                  <tr key={key} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium text-[#2d2d2d]">
                      {e.name}
                    </td>
                    <td className="px-4 py-3">{e.symbol}</td>
                    <td className="px-4 py-3">{e.morseDotsDashes}</td>
                    <td className="px-4 py-3 hidden md:table-cell font-mono">
                      {e.morsePlain}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-[#f7f6f4] hover:bg-[#efece8] text-[#2d2d2d]"
                          onClick={() =>
                            copy(e.morsePlain, key)
                          }
                          title="Copy ASCII Morse (. and -)"
                        >
                          {copied ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                          <span className="ml-2 hidden sm:inline">Copy</span>
                        </Button>
                        <Button
                          size="sm"
                          className="bg-[#456359] hover:bg-[#3a524a] text-white"
                          onClick={() =>
                            playMorse(e.morsePlain, { wpm, freq })
                          }
                          disabled={isPlaying}
                          title="Play Morse audio"
                        >
                          <Play className="h-4 w-4" />
                          <span className="ml-2 hidden sm:inline">Play</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-sm text-[#6b6b6b]"
                    colSpan={5}
                  >
                    No matches. Try searching for \`.-.-.-\`, \`period\`, or a
                    symbol like \`-\`.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mini helper */}
        <div className="mt-5 flex items-center gap-3 text-sm text-[#456359]">
          <Volume2 className="h-4 w-4" />
          <p>
            Playback timing uses standard PARIS timing (dit = 1200/WPM ms,
            dah = 3×dit).
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
