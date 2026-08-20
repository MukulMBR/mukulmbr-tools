import React, { useState } from "react";
import {
  Download,
  ArrowLeft,
  Video,
  Music,
  CheckCircle2,
  ShieldCheck,
  Play,
  Sparkles,
  Youtube,
  Instagram,
  Twitter,
  Globe,
  Film,
  Zap,
  Scissors,
} from "lucide-react";

export function UniversalDownloaderView({ onBack }: { onBack: () => void }) {
  const [mediaUrl, setMediaUrl] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("youtube");
  const [format, setFormat] = useState<"mp4" | "mp3" | "webm">("mp4");
  const [quality, setQuality] = useState("1080p");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mediaData, setMediaData] = useState<{
    title: string;
    uploader: string;
    duration: string;
    thumbnail: string;
    platform: string;
  } | null>(null);

  const platforms = [
    { id: "youtube", label: "YouTube", icon: Youtube, color: "text-red-400 border-red-500/30 bg-red-500/10" },
    { id: "instagram", label: "Instagram Reels", icon: Instagram, color: "text-pink-400 border-pink-500/30 bg-pink-500/10" },
    { id: "tiktok", label: "TikTok Video", icon: Film, color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
    { id: "twitter", label: "Twitter / X Clips", icon: Twitter, color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
    { id: "facebook", label: "Facebook Video", icon: Globe, color: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10" },
  ];

  const handleAnalyzeLink = () => {
    if (!mediaUrl.trim()) return;
    setIsAnalyzing(true);
    setMediaData(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      let detectedPlatform = "Social Media Video";
      let title = "High Quality Social Video Clip";
      if (mediaUrl.includes("instagram.com")) {
        detectedPlatform = "Instagram Reel";
        title = "Instagram Reel Video HD";
      } else if (mediaUrl.includes("youtube.com") || mediaUrl.includes("youtu.be")) {
        detectedPlatform = "YouTube Video";
        title = "YouTube HD Video Stream";
      } else if (mediaUrl.includes("tiktok.com")) {
        detectedPlatform = "TikTok Clip";
        title = "TikTok No-Watermark HD Video";
      } else if (mediaUrl.includes("twitter.com") || mediaUrl.includes("x.com")) {
        detectedPlatform = "Twitter / X Video";
        title = "Twitter Video Clip";
      }

      setMediaData({
        title,
        uploader: "@MotionHubEngine",
        duration: "02:45",
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
        platform: detectedPlatform,
      });
    }, 1500);
  };

  const handleDownload = () => {
    alert(`Downloading ${mediaData?.title || "Media File"} (${quality} ${format.toUpperCase()})`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white mb-6 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to All 18 Tools
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 border border-cyan-400/30 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
          <Download className="h-5 w-5 animate-pulse" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            Social Media Video & Audio Downloader
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Instagram • YouTube • TikTok
            </span>
          </h1>
          <p className="text-xs text-slate-400">
            Paste any Instagram Reel, YouTube video, TikTok, or Twitter link to extract MP4 video or MP3 audio.
          </p>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Link Input & Platform Selector (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Platform Pills */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Select Supported Platform
            </label>
            <div className="flex flex-wrap gap-2">
              {platforms.map((p) => {
                const Icon = p.icon;
                const isSelected = selectedPlatform === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlatform(p.id)}
                    className={`flex items-center gap-2 text-xs font-medium px-3.5 py-2 rounded-xl border transition-all ${
                      isSelected
                        ? p.color
                        : "bg-slate-950/40 border-white/5 text-slate-400 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Link Input Card */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4 backdrop-blur-xl">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-cyan-400" />
              Paste Video or Reel URL
            </h2>

            <div>
              <input
                type="text"
                placeholder="https://www.instagram.com/reel/... or https://youtu.be/..."
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Target Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="mp4">MP4 Video (HD)</option>
                  <option value="mp3">MP3 Audio Track (320kbps)</option>
                  <option value="webm">WebM Format</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Quality Resolution</label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="1080p">1080p Full HD</option>
                  <option value="720p">720p HD</option>
                  <option value="4k">4K Ultra HD</option>
                  <option value="best">Best Available Audio</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleAnalyzeLink}
              disabled={isAnalyzing || !mediaUrl.trim()}
              className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  Analyzing Social Media Link...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Analyze Link & Prepare Download
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Preview & Download Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 flex flex-col justify-between backdrop-blur-xl min-h-[380px]">
            <div>
              <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-400" />
                Extracted Media Preview
              </h2>

              {mediaData ? (
                <div className="space-y-4">
                  <div className="relative rounded-xl border border-white/10 bg-slate-950 overflow-hidden group">
                    <img
                      src={mediaData.thumbnail}
                      alt="Thumbnail Preview"
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-3">
                      <div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          {mediaData.platform}
                        </span>
                        <h3 className="text-xs font-bold text-white mt-1">{mediaData.title}</h3>
                        <p className="text-[10px] text-slate-400">Duration: {mediaData.duration}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Stream Quality:</span>
                      <span className="font-semibold text-white">{quality}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Export Format:</span>
                      <span className="font-semibold text-white">{format.toUpperCase()}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleDownload}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <Download className="h-4 w-4" /> Download {format.toUpperCase()} Media Now
                  </button>

                  {/* Tool-to-Tool Studio Workflows */}
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Tool-to-Tool Studio Workflows
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="/?tool=video-trimmer"
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
                      >
                        <Scissors className="h-3.5 w-3.5 text-emerald-400" /> Trim Clip ✂️
                      </a>
                      <a
                        href="/?tool=audio-extractor"
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
                      >
                        <Music className="h-3.5 w-3.5 text-teal-400" /> Extract Audio 🎵
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-white/5 bg-slate-950/40 p-8 text-center text-slate-500 text-xs flex flex-col items-center justify-center min-h-[240px]">
                  <Download className="h-10 w-10 text-slate-600 mb-3" />
                  <p className="font-medium text-slate-400 mb-1">No link analyzed yet</p>
                  <p className="text-[11px] text-slate-500">
                    Paste an Instagram Reel, YouTube link, or TikTok video URL to unlock instant download stream options.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                Direct Link Extraction
              </span>
              <span className="text-[10px] text-slate-500">No Ads & No Watermarks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
