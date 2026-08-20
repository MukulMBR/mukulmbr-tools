import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ToolCard } from "./components/ToolCard";
import { BusTrackerView } from "./tools/bus/BusTrackerView";
import { MotionHubToolsView } from "./tools/motionhub/MotionHubToolsView";
import { UniversalDownloaderView } from "./tools/media/UniversalDownloaderView";
import {
  Radio,
  Video,
  Scissors,
  Sparkles,
  Camera,
  Music,
  Mic,
  Bot,
  Layers,
  Download,
  Disc,
  Image as ImageIcon,
  ShieldCheck,
  Zap,
  Search,
  Lock,
} from "lucide-react";

export default function App() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Live GPS Radar",
    "Video Studio",
    "Audio & Speech",
    "AI & Automation",
    "Media Utilities",
  ];

  // All 18 Tools from Motion Hub / Bus Tracker App Suite
  const toolsList = [
    // 1. Live GPS Radar (1)
    {
      id: "bus-tracker",
      title: "Live GPS Telemetry Radar",
      description: "Interactive 3D spatial radar tracking live bus telemetry, routes, speed, waypoints, and ETA calculations.",
      icon: Radio,
      category: "Live GPS Radar",
      status: "Ready" as const,
      badge: "Live Telemetry",
    },
    // 2. Video Studio (5)
    {
      id: "prompt-video-editor",
      title: "Prompt Video Editor",
      description: "Generate video edits, AI cuts, and scene transitions using natural language text prompts.",
      icon: Sparkles,
      category: "Video Studio",
      status: "Ready" as const,
      badge: "AI Prompts",
    },
    {
      id: "video-editor",
      title: "Full Video Editor Studio",
      description: "Multi-track video timeline editing, text overlays, audio sync, and canvas rendering.",
      icon: Video,
      category: "Video Studio",
      status: "Ready" as const,
      badge: "Multi-Track",
    },
    {
      id: "video-trimmer",
      title: "Video Trimmer & Cut Studio",
      description: "Trim start/end timestamps, cut clips, and export edited MP4 video segments locally.",
      icon: Scissors,
      category: "Video Studio",
      status: "Ready" as const,
      badge: "Cut Studio",
    },
    {
      id: "video-enhancer",
      title: "Video Enhancer & AI Upscaler",
      description: "RealESRGAN and GFPGAN AI video resolution upscaling, sharpening, and noise reduction.",
      icon: Sparkles,
      category: "Video Studio",
      status: "Ready" as const,
      badge: "AI Upscale",
    },
    {
      id: "camera-director",
      title: "Camera Director Studio",
      description: "AI camera switching, auto framing, multi-cam switching, and scene director controls.",
      icon: Camera,
      category: "Video Studio",
      status: "Ready" as const,
      badge: "Director AI",
    },
    // 3. Audio & Speech (3)
    {
      id: "audio-trimmer",
      title: "Audio Trimmer & Cutter",
      description: "Trim audio track timestamps, cut silence, and export MP3 / WAV audio clips.",
      icon: Music,
      category: "Audio & Speech",
      status: "Ready" as const,
      badge: "Audio Cut",
    },
    {
      id: "audio-extractor",
      title: "Audio Track Extractor",
      description: "Extract background music, vocal tracks, and audio files directly from video links or files.",
      icon: Music,
      category: "Audio & Speech",
      status: "Ready" as const,
      badge: "Extractor",
    },
    {
      id: "tts-studio",
      title: "TTS Speech Studio",
      description: "Text-to-Speech synthesis with voice speed rate, pitch control, and audio playback.",
      icon: Mic,
      category: "Audio & Speech",
      status: "Ready" as const,
      badge: "TTS Engine",
    },
    // 4. AI & Automation (3)
    {
      id: "channel-strategist",
      title: "AI Channel Strategist",
      description: "Generate video titles, channel growth strategies, tags, and script outlines using AI.",
      icon: Bot,
      category: "AI & Automation",
      status: "Ready" as const,
      badge: "Channel AI",
    },
    {
      id: "subtitle-generator",
      title: "AI Subtitle Generator",
      description: "Speech-to-text automated captioning and SRT transcript generator for video content.",
      icon: Sparkles,
      category: "AI & Automation",
      status: "Ready" as const,
      badge: "Subtitles",
    },
    {
      id: "auto-stitcher",
      title: "Auto Video Stitcher",
      description: "Automatically join and stitch multiple video clips into a single seamless master video.",
      icon: Layers,
      category: "AI & Automation",
      status: "Ready" as const,
      badge: "Auto Stitch",
    },
    // 5. Media Utilities (6)
    {
      id: "downloader",
      title: "Universal Media Downloader",
      description: "Extract high-definition video, audio, and MP3 streams directly in browser memory.",
      icon: Download,
      category: "Media Utilities",
      status: "Ready" as const,
      badge: "Downloader",
    },
    {
      id: "gif-maker",
      title: "GIF Studio Maker",
      description: "Convert video clips and image sequences into animated high-quality GIFs.",
      icon: Disc,
      category: "Media Utilities",
      status: "Ready" as const,
      badge: "GIF Studio",
    },
    {
      id: "thumbnail-generator",
      title: "Thumbnail Generator",
      description: "Design eye-catching video thumbnails with title text, overlays, and graphics.",
      icon: ImageIcon,
      category: "Media Utilities",
      status: "Ready" as const,
      badge: "Thumbnails",
    },
    {
      id: "screen-recorder",
      title: "Browser Screen Recorder",
      description: "Record your screen, webcam, and system audio directly in your web browser.",
      icon: Video,
      category: "Media Utilities",
      status: "Ready" as const,
      badge: "Recorder",
    },
    {
      id: "watermark-studio",
      title: "Watermark Studio & Remover",
      description: "Inpaint, mask, and add custom logos or watermarks to video media.",
      icon: ShieldCheck,
      category: "Media Utilities",
      status: "Ready" as const,
      badge: "Watermark AI",
    },
    {
      id: "video-compressor",
      title: "Video Compressor Studio",
      description: "Compress large video files for web and social media without sacrificing visual quality.",
      icon: Zap,
      category: "Media Utilities",
      status: "Ready" as const,
      badge: "Compressor",
    },
  ];

  const filteredTools = toolsList.filter((tool) => {
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    const matchesQuery =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const getCategoryCount = (catName: string) => {
    if (catName === "All") return toolsList.length;
    return toolsList.filter((t) => t.category === catName).length;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0b14] text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1">
        {activeTool === "bus-tracker" ? (
          <BusTrackerView onBack={() => setActiveTool(null)} />
        ) : activeTool === "downloader" ? (
          <UniversalDownloaderView onBack={() => setActiveTool(null)} />
        ) : activeTool ? (
          <MotionHubToolsView toolId={activeTool} onBack={() => setActiveTool(null)} />
        ) : null}

        {!activeTool && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Banner */}
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-purple-950/20 via-slate-900/40 to-slate-900/60 p-8 sm:p-12 mb-12 text-center overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                MBR Motion Hub — All 18 Studio Tools & GPS Telemetry Radar
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                18 Tools Processed <span className="gradient-text">100% Locally</span>
              </h1>
              <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
                Live GPS bus telemetry radar, AI video editing, audio TTS synthesis, media downloads, and automation utilities. Zero server file uploads.
              </p>

              {/* Search & Filter */}
              <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search 18 tools (GPS Radar, Video Editor, TTS, Downloader)..."
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
                      {cat} ({getCategoryCount(cat)})
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
                  Motion Hub Tools Ecosystem ({filteredTools.length})
                </h2>
                <span className="text-xs text-slate-400">All 18 Tools Available</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  All 18 tools process data locally in your browser instance.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/30">
                <Zap className="h-6 w-6 text-purple-400 mb-3" />
                <h3 className="text-sm font-bold text-white mb-1">Lightning Fast Execution</h3>
                <p className="text-xs text-slate-400">
                  Zero server lag. Instant processing powered by local CPU & GPU acceleration.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/30">
                <Layers className="h-6 w-6 text-blue-400 mb-3" />
                <h3 className="text-sm font-bold text-white mb-1">Standalone Repository</h3>
                <p className="text-xs text-slate-400">
                  Decoupled architecture deployed at <code>tools.mukulmbr.in</code>.
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
