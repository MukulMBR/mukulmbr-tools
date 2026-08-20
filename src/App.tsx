import React, { useState, useEffect, Suspense } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ToolCard } from "./components/ToolCard";
import { ToolErrorBoundary } from "./components/shared/ToolErrorBoundary";
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
  Loader2,
} from "lucide-react";

// Route-Level Code Splitting for All 18 Tool Engines (React.lazy + Suspense)
const BusTrackerView = React.lazy(() =>
  import("./tools/bus/BusTrackerView").then((m) => ({ default: m.BusTrackerView }))
);
const UniversalDownloaderView = React.lazy(() =>
  import("./tools/media/UniversalDownloaderView").then((m) => ({ default: m.UniversalDownloaderView }))
);
const MotionHubToolsView = React.lazy(() =>
  import("./tools/motionhub/MotionHubToolsView").then((m) => ({ default: m.MotionHubToolsView }))
);

function ToolLoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto my-16 p-12 rounded-3xl border border-emerald-500/20 bg-slate-900/60 backdrop-blur-xl text-center space-y-4">
      <Loader2 className="h-10 w-10 text-emerald-400 animate-spin mx-auto" />
      <h3 className="text-lg font-bold text-white">Loading Engine Module...</h3>
      <p className="text-xs text-slate-400">Initializing client-side WebAssembly & browser memory environment.</p>
    </div>
  );
}

export default function App() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Sync URL Query Parameters (?tool=id) for direct sharing & bookmarking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toolParam = params.get("tool");
    if (toolParam) {
      setActiveTool(toolParam);
    }
  }, []);

  const handleSelectTool = (toolId: string | null) => {
    setActiveTool(toolId);
    const url = new URL(window.location.href);
    if (toolId) {
      url.searchParams.set("tool", toolId);
    } else {
      url.searchParams.delete("tool");
    }
    window.history.pushState({}, "", url.toString());
  };

  const categories = [
    "All",
    "Live GPS Radar",
    "Video Studio",
    "Audio & Speech",
    "AI & Automation",
    "Media Utilities",
  ];

  // All 18 Tools from MBR Motion Hub Suite
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
      description: "Extract Instagram Reels, YouTube HD, TikTok, and Twitter videos directly in browser memory.",
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
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 font-sans">
      <Navbar tools={toolsList} onSelectTool={handleSelectTool} />

      <main className="flex-1">
        {activeTool && (
          <ToolErrorBoundary toolName={activeTool} onReset={() => handleSelectTool(null)}>
            <Suspense fallback={<ToolLoadingSkeleton />}>
              {activeTool === "bus-tracker" ? (
                <BusTrackerView onBack={() => handleSelectTool(null)} />
              ) : activeTool === "downloader" ? (
                <UniversalDownloaderView onBack={() => handleSelectTool(null)} />
              ) : (
                <MotionHubToolsView toolId={activeTool} onBack={() => handleSelectTool(null)} />
              )}
            </Suspense>
          </ToolErrorBoundary>
        )}

        {!activeTool && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Banner */}
            <div className="relative rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/20 via-slate-900/40 to-slate-950/80 p-8 sm:p-12 mb-12 text-center overflow-hidden backdrop-blur-xl shadow-2xl shadow-emerald-950/20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                MBR Motion Hub — Spatial Telemetry & Browser Engine
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                Live GPS Radar & <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Studio Engine</span>
              </h1>
              <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
                Perform live GPS bus tracking, social video downloads, video editing, speech TTS synthesis, and AI automation. 100% private local execution.
              </p>

              {/* Search Bar (Full Width Centered Row) */}
              <div className="max-w-2xl mx-auto mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-400" />
                  <input
                    type="text"
                    placeholder="Search 18 engines (GPS Radar, Downloader, TTS Studio, Cut Studio)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950/90 border border-emerald-500/30 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-xl shadow-slate-950/50"
                  />
                </div>
              </div>

              {/* Category Filter Pills (Clean Wrapped Pills Row) */}
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs px-4 py-2.5 rounded-xl border transition-all font-semibold ${
                      selectedCategory === cat
                        ? "bg-emerald-500 border-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 scale-105"
                        : "bg-slate-950/60 border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/30 hover:bg-slate-900"
                    }`}
                  >
                    {cat} ({getCategoryCount(cat)})
                  </button>
                ))}
              </div>
            </div>

            {/* Tools Grid */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-emerald-400" />
                  Motion Hub Studio Tools ({filteredTools.length})
                </h2>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  All 18 Engines Active
                </span>
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
                    onClick={() => handleSelectTool(tool.id)}
                  />
                ))}
              </div>
            </div>

            {/* Features Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div className="p-6 rounded-2xl border border-emerald-500/15 bg-slate-900/30">
                <Lock className="h-6 w-6 text-emerald-400 mb-3" />
                <h3 className="text-sm font-bold text-white mb-1">100% Client-Side Privacy</h3>
                <p className="text-xs text-slate-400">
                  All 18 engines process media locally inside your browser memory.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-emerald-500/15 bg-slate-900/30">
                <Zap className="h-6 w-6 text-emerald-400 mb-3" />
                <h3 className="text-sm font-bold text-white mb-1">Lightning Acceleration</h3>
                <p className="text-xs text-slate-400">
                  Instant processing powered by local CPU & WebAssembly GPU acceleration.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-emerald-500/15 bg-slate-900/30">
                <Layers className="h-6 w-6 text-emerald-400 mb-3" />
                <h3 className="text-sm font-bold text-white mb-1">Decoupled Architecture</h3>
                <p className="text-xs text-slate-400">
                  Independent codebase deployed live at <code>tools.mukulmbr.in</code>.
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
