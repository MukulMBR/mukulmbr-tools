import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ToolCard } from "./components/ToolCard";
import { BusTrackerView } from "./tools/bus/BusTrackerView";
import { UniversalDownloaderView } from "./tools/media/UniversalDownloaderView";
import { VideoEditorView } from "./tools/media/VideoEditorView";
import { AudioStudioView } from "./tools/media/AudioStudioView";
import { AIUtilitiesView } from "./tools/media/AIUtilitiesView";
import {
  Download,
  Scissors,
  Mic,
  Sparkles,
  Radio,
  Search,
  Zap,
  Lock,
  Layers,
} from "lucide-react";

export default function App() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Radar", "Video", "Audio", "AI & Utilities"];

  const toolsList = [
    {
      id: "bus-tracker",
      title: "Live GPS Bus Radar",
      description: "Interactive 3D spatial radar tracking live bus telemetry, routes, speed, waypoints, and ETA calculations.",
      icon: Radio,
      category: "Radar",
      status: "Ready" as const,
      badge: "Live Telemetry",
    },
    {
      id: "downloader",
      title: "Universal Media Downloader",
      description: "Extract high-definition video, audio, and MP3 streams directly in your browser memory.",
      icon: Download,
      category: "Video",
      status: "Ready" as const,
      badge: "Media Extractor",
    },
    {
      id: "video-editor",
      title: "Video Trimmer & Cut Studio",
      description: "Trim video timestamps, cut segments, and export edited MP4 video clips locally.",
      icon: Scissors,
      category: "Video",
      status: "Ready" as const,
      badge: "Cut Studio",
    },
    {
      id: "audio-studio",
      title: "Audio & Speech TTS Studio",
      description: "Text-to-Speech synthesis rate control and audio track extraction with browser AI.",
      icon: Mic,
      category: "Audio",
      status: "Ready" as const,
      badge: "TTS & Audio",
    },
    {
      id: "ai-utilities",
      title: "AI Subtitle & Media Automation",
      description: "AI subtitle transcription, Thumbnail/GIF creator, Watermark removal, and Video compression.",
      icon: Sparkles,
      category: "AI & Utilities",
      status: "Ready" as const,
      badge: "AI Automation",
    },
  ];

  const filteredTools = toolsList.filter((tool) => {
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    const matchesQuery =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0b14] text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1">
        {activeTool === "bus-tracker" && (
          <BusTrackerView onBack={() => setActiveTool(null)} />
        )}
        {activeTool === "downloader" && (
          <UniversalDownloaderView onBack={() => setActiveTool(null)} />
        )}
        {activeTool === "video-editor" && (
          <VideoEditorView onBack={() => setActiveTool(null)} />
        )}
        {activeTool === "audio-studio" && (
          <AudioStudioView onBack={() => setActiveTool(null)} />
        )}
        {activeTool === "ai-utilities" && (
          <AIUtilitiesView onBack={() => setActiveTool(null)} />
        )}

        {!activeTool && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Banner */}
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-purple-950/20 via-slate-900/40 to-slate-900/60 p-8 sm:p-12 mb-12 text-center overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Live GPS Telemetry Radar & Media Studio Ecosystem
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                Your Tools & GPS Radar <span className="gradient-text">Processed Locally</span>
              </h1>
              <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
                Perform live GPS bus tracking, media extraction, video trimming, audio TTS synthesis, and AI automation directly in your web browser. Zero server uploads.
              </p>

              {/* Search & Filter */}
              <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search tools (Radar, Video, Audio, AI)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900/90 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0 justify-center">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-3 py-2 rounded-xl border transition-all whitespace-nowrap ${
                        selectedCategory === cat
                          ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20 font-medium"
                          : "bg-slate-900/60 border-white/10 text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-400" />
                  Studio Utilities
                </h2>
                <span className="text-xs text-slate-400">{filteredTools.length} Tool(s) Ready</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    title={tool.title}
                    description={tool.description}
                    icon={tool.icon}
                    category={tool.category}
                    status={tool.status}
                    badge={tool.badge}
                    onClick={() => setActiveTool(tool.id)}
                  />
                ))}
              </div>
            </div>

            {/* Features Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/30">
                <Lock className="h-6 w-6 text-emerald-400 mb-3" />
                <h3 className="text-sm font-bold text-white mb-1">100% Client-Side Privacy</h3>
                <p className="text-xs text-slate-400">
                  Files and telemetry are processed locally in your browser instance.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/30">
                <Zap className="h-6 w-6 text-purple-400 mb-3" />
                <h3 className="text-sm font-bold text-white mb-1">Lightning Fast Execution</h3>
                <p className="text-xs text-slate-400">
                  No network upload latency. Instant processing powered by local CPU & GPU acceleration.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/30">
                <Layers className="h-6 w-6 text-blue-400 mb-3" />
                <h3 className="text-sm font-bold text-white mb-1">Standalone Repository</h3>
                <p className="text-xs text-slate-400">
                  Decoupled architecture ready for deployment at <code>tools.mukulmbr.in</code>.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
