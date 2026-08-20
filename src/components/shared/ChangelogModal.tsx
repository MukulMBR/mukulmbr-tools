import React from "react";
import { Sparkles, X, CheckCircle2, ShieldCheck, Zap, Radio } from "lucide-react";

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangelogModal({ isOpen, onClose }: ChangelogModalProps) {
  if (!isOpen) return null;

  const updates = [
    {
      date: "August 2026",
      title: "Phase 1 - 5 Ecosystem Upgrade Release",
      features: [
        "Added Tool-to-Tool Chaining (Pass media between Downloader, Trimmer & Audio Extractor)",
        "Added 1-Click Social Export Presets (Instagram Reels, YouTube Shorts, Podcast MP3)",
        "Added Favorite Tools system with LocalStorage persistence & Pinned Favorites grid",
        "Added Cmd + K / Ctrl + K instant Command Palette tool search overlay",
        "Added Leaflet 3D GPS Bus Radar with realistic 3D Bus icon & Journey Route Map progress bar",
        "Restored Live Bus Tracking Link / URL parser for YourBus, redBus & AbhiBus URLs",
        "Enforced 100% Client-Side Memory privacy & strict Content-Security-Policy (CSP) headers",
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl border border-emerald-500/30 bg-slate-900 p-6 sm:p-8 shadow-2xl shadow-emerald-950/50 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">What's New in MBR Motion Hub</h3>
            <p className="text-xs text-slate-400">Latest releases & browser-native engine updates.</p>
          </div>
        </div>

        <div className="space-y-4 max-h-80 overflow-y-auto">
          {updates.map((u) => (
            <div key={u.date} className="p-4 rounded-2xl border border-white/10 bg-slate-950/60 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-emerald-400">{u.title}</h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                  {u.date}
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                {u.features.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
        >
          Awesome, Continue Using Tools
        </button>
      </div>
    </div>
  );
}
