import React, { useState } from "react";
import { Sparkles, ArrowLeft, Image as ImageIcon, Video, ShieldCheck, CheckCircle2, Copy } from "lucide-react";

export function AIUtilitiesView({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"subtitle" | "thumbnail" | "watermark" | "compress">("subtitle");
  const [transcript, setTranscript] = useState("AI Subtitle Generator ready. Transcribing video audio stream...");
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleSimulateAction = (toolName: string) => {
    setStatusMsg(`[Motion Hub Core] ${toolName} processing completed in local memory.`);
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
        <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
          <Sparkles className="h-5 w-5 animate-pulse" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">AI Media & Automation Studio</h1>
          <p className="text-xs text-slate-400">Subtitle generation, Thumbnail/GIF creator, Watermark removal, and Video compression.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("subtitle")}
          className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl transition-all ${
            activeTab === "subtitle"
              ? "bg-purple-500/20 border border-purple-500/40 text-purple-300"
              : "bg-slate-900/40 border border-white/5 text-slate-400 hover:bg-slate-800"
          }`}
        >
          <Sparkles className="h-4 w-4" /> Subtitle Generator
        </button>
        <button
          onClick={() => setActiveTab("thumbnail")}
          className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl transition-all ${
            activeTab === "thumbnail"
              ? "bg-purple-500/20 border border-purple-500/40 text-purple-300"
              : "bg-slate-900/40 border border-white/5 text-slate-400 hover:bg-slate-800"
          }`}
        >
          <ImageIcon className="h-4 w-4" /> Thumbnail & GIF
        </button>
        <button
          onClick={() => setActiveTab("watermark")}
          className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl transition-all ${
            activeTab === "watermark"
              ? "bg-purple-500/20 border border-purple-500/40 text-purple-300"
              : "bg-slate-900/40 border border-white/5 text-slate-400 hover:bg-slate-800"
          }`}
        >
          <ShieldCheck className="h-4 w-4" /> Watermark Remover
        </button>
        <button
          onClick={() => setActiveTab("compress")}
          className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl transition-all ${
            activeTab === "compress"
              ? "bg-purple-500/20 border border-purple-500/40 text-purple-300"
              : "bg-slate-900/40 border border-white/5 text-slate-400 hover:bg-slate-800"
          }`}
        >
          <Video className="h-4 w-4" /> Video Compressor
        </button>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-xl space-y-6">
        <label className="border-2 border-dashed border-white/10 hover:border-purple-500/40 bg-slate-800/40 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
          <Sparkles className="h-10 w-10 text-purple-400 mb-3" />
          <span className="text-sm font-medium text-slate-200">
            Upload Video / Image file to process with {activeTab.toUpperCase()} studio
          </span>
          <span className="text-xs text-slate-400 mt-1">100% Client-Side Memory Acceleration</span>
          <input type="file" onChange={() => handleSimulateAction(activeTab)} className="hidden" />
        </label>

        {activeTab === "subtitle" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">Extracted Subtitles & SRT Transcript</label>
              <button
                onClick={() => navigator.clipboard.writeText(transcript)}
                className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <Copy className="h-3 w-3" /> Copy Transcript
              </button>
            </div>
            <textarea
              readOnly
              value={transcript}
              rows={4}
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-xs font-mono text-emerald-400"
            />
          </div>
        )}

        {statusMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
}
