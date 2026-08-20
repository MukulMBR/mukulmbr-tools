import React from "react";
import { Smartphone, Tv, Mic, Sparkles, Check } from "lucide-react";

export interface ExportPreset {
  id: string;
  name: string;
  target: string;
  aspectRatio: string;
  resolution: string;
  fps: string;
  bitrate: string;
  icon: any;
}

interface ExportPresetsProps {
  selectedPresetId: string;
  onSelectPreset: (preset: ExportPreset) => void;
}

export const EXPORT_PRESETS: ExportPreset[] = [
  {
    id: "insta-reels",
    name: "Instagram Reels & TikTok",
    target: "Social Mobile Vertical",
    aspectRatio: "9:16",
    resolution: "1080x1920",
    fps: "60 FPS",
    bitrate: "8 Mbps",
    icon: Smartphone,
  },
  {
    id: "yt-shorts",
    name: "YouTube Shorts",
    target: "Vertical HD Video",
    aspectRatio: "9:16",
    resolution: "1080x1920",
    fps: "60 FPS",
    bitrate: "10 Mbps",
    icon: Smartphone,
  },
  {
    id: "yt-hd",
    name: "YouTube HD / Desktop",
    target: "Widescreen 1080p",
    aspectRatio: "16:9",
    resolution: "1920x1080",
    fps: "60 FPS",
    bitrate: "12 Mbps",
    icon: Tv,
  },
  {
    id: "podcast-mp3",
    name: "Podcast & Speech Audio",
    target: "Lossless Audio",
    aspectRatio: "Audio",
    resolution: "320 kbps",
    fps: "44.1 kHz",
    bitrate: "High Quality",
    icon: Mic,
  },
];

export function ExportPresets({ selectedPresetId, onSelectPreset }: ExportPresetsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
        <Sparkles className="h-4 w-4" /> Select 1-Click Social Export Preset
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {EXPORT_PRESETS.map((preset) => {
          const isSelected = preset.id === selectedPresetId;
          const Icon = preset.icon;
          return (
            <div
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? "bg-emerald-500/20 border-emerald-400 text-white shadow-lg shadow-emerald-500/10 scale-105"
                  : "bg-slate-950/60 border-white/10 text-slate-400 hover:border-emerald-500/30 hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="h-8 w-8 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-emerald-400">
                  <Icon className="h-4 w-4" />
                </div>
                {isSelected && (
                  <span className="h-5 w-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-bold">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </div>

              <h4 className="text-xs font-bold text-white truncate mb-0.5">{preset.name}</h4>
              <p className="text-[10px] text-slate-400 mb-2">{preset.target}</p>

              <div className="flex items-center gap-2 text-[9px] font-mono text-emerald-300">
                <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/5">{preset.aspectRatio}</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/5">{preset.resolution}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
