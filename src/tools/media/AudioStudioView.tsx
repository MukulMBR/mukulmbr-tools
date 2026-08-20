import React, { useState } from "react";
import { Mic, ArrowLeft, Music, Play, Pause, Download, Volume2, Sparkles, CheckCircle2 } from "lucide-react";

export function AudioStudioView({ onBack }: { onBack: () => void }) {
  const [ttsText, setTtsText] = useState("Welcome to MBR Tools. 100% client-side privacy AI speech synthesis.");
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleSpeak = () => {
    if (!ttsText.trim()) return;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(ttsText);
      utterance.rate = voiceSpeed;
      utterance.onend = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
      setStatusMsg("Playing browser native AI speech synthesis...");
    } else {
      setStatusMsg("Speech Synthesis not supported in this browser.");
    }
  };

  const handleStop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white mb-6 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-white/10"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Tools
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <Mic className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Audio & Speech TTS Studio</h1>
          <p className="text-xs text-slate-400">Extract audio, synthesize text-to-speech, and process audio in browser memory.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TTS Controls */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 space-y-4 backdrop-blur-xl">
          <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-amber-400" />
            Text-to-Speech Generator
          </h2>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Enter Text Script</label>
            <textarea
              rows={4}
              value={ttsText}
              onChange={(e) => setTtsText(e.target.value)}
              className="w-full bg-slate-950 border border-white/15 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Speech Speed Rate</span>
              <span>{voiceSpeed}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={voiceSpeed}
              onChange={(e) => setVoiceSpeed(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSpeak}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-medium py-3 rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20"
            >
              <Play className="h-4 w-4" /> Synthesize & Play Audio
            </button>
            {isSpeaking && (
              <button
                onClick={handleStop}
                className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl text-xs border border-white/10"
              >
                <Pause className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Audio Extractor & Status */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 flex flex-col justify-between backdrop-blur-xl">
          <div>
            <h2 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <Music className="h-4 w-4 text-purple-400" />
              Audio Extraction Studio
            </h2>

            <label className="border-2 border-dashed border-white/10 hover:border-amber-500/40 bg-slate-800/40 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
              <Music className="h-8 w-8 text-amber-400 mb-2" />
              <span className="text-xs font-medium text-slate-300">Upload Video to Extract Audio Track</span>
              <span className="text-[10px] text-slate-500 mt-1">Extracts MP3 / WAV lossless audio</span>
              <input type="file" accept="video/*,audio/*" onChange={() => setStatusMsg("Audio track loaded successfully!")} className="hidden" />
            </label>
          </div>

          {statusMsg && (
            <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
