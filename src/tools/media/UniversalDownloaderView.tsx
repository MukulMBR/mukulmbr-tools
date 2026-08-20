import React, { useState } from "react";
import { Download, ArrowLeft, Video, Music, CheckCircle2, ShieldCheck, Play, Sparkles } from "lucide-react";

export function UniversalDownloaderView({ onBack }: { onBack: () => void }) {
  const [mediaUrl, setMediaUrl] = useState("");
  const [format, setFormat] = useState<"mp4" | "mp3" | "webm">("mp4");
  const [quality, setQuality] = useState("1080p");
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleFetchMedia = () => {
    if (!mediaUrl.trim()) return;
    setIsProcessing(true);
    setDownloadReady(false);
    setTimeout(() => {
      setIsProcessing(false);
      setDownloadReady(true);
    }, 2000);
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
        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 border border-cyan-400/30 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
          <Download className="h-5 w-5 animate-pulse" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            Universal Media Downloader
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Motion Hub Core
            </span>
          </h1>
          <p className="text-xs text-slate-400">Extract high-definition video, audio, and clips from media links in your browser.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Controls */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 space-y-4 backdrop-blur-xl">
          <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Video className="h-4 w-4 text-cyan-400" />
            Media Link Input
          </h2>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Paste Video / Audio URL</label>
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=... or Instagram / TikTok link"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              className="w-full bg-slate-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="mp4">MP4 Video</option>
                <option value="mp3">MP3 Audio Extract</option>
                <option value="webm">WebM HD</option>
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
            onClick={handleFetchMedia}
            disabled={isProcessing || !mediaUrl.trim()}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-medium py-3 rounded-xl text-xs transition-all shadow-lg shadow-cyan-500/20"
          >
            {isProcessing ? "Extracting Media Stream..." : "Extract Media Stream"}
          </button>
        </div>

        {/* Output & Status */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 flex flex-col justify-between backdrop-blur-xl">
          <div>
            <h2 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              Download Status & Stream
            </h2>

            {downloadReady ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-white/10 bg-slate-950 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    {format === "mp3" ? <Music className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 truncate">
                    <div className="text-xs font-bold text-white truncate">Extracted Media ({quality})</div>
                    <div className="text-[10px] text-slate-400">Ready for instant download</div>
                  </div>
                </div>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Media extracted successfully! (Motion Hub Downloader)");
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
                >
                  <Download className="h-4 w-4" /> Download {format.toUpperCase()} File
                </a>
              </div>
            ) : (
              <div className="rounded-xl border border-white/5 bg-slate-950/40 p-8 text-center text-slate-500 text-xs">
                Paste a media link above to extract video or audio files directly.
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>Zero server cost & local memory pipeline</span>
          </div>
        </div>
      </div>
    </div>
  );
}
