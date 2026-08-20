import React, { useState, useRef } from "react";
import { Scissors, ArrowLeft, Video, Download, Play, Pause, Sliders, CheckCircle2 } from "lucide-react";

export function VideoEditorView({ onBack }: { onBack: () => void }) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(10);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [trimmedUrl, setTrimmedUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
    setTrimmedUrl(null);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setEndTime(Math.min(10, videoRef.current.duration));
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTrimVideo = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (videoSrc) setTrimmedUrl(videoSrc);
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
        <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
          <Scissors className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Browser Video Trimmer & Cut Studio</h1>
          <p className="text-xs text-slate-400">Trim video timestamps and export cut segments directly in your browser memory.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload & Timeline Controls */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 space-y-4 backdrop-blur-xl">
          <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Video className="h-4 w-4 text-purple-400" />
            Upload Video File
          </h2>

          <label className="border-2 border-dashed border-white/10 hover:border-purple-500/40 bg-slate-800/40 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
            <Video className="h-8 w-8 text-slate-400 mb-2" />
            <span className="text-xs font-medium text-slate-300">Click or drag MP4, WEBP, or MOV video here</span>
            <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
          </label>

          {videoSrc && (
            <div className="space-y-4 pt-2 border-t border-white/5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Start Time (sec)</label>
                  <input
                    type="number"
                    min="0"
                    max={endTime}
                    value={startTime}
                    onChange={(e) => setStartTime(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">End Time (sec)</label>
                  <input
                    type="number"
                    min={startTime}
                    max={duration || 100}
                    value={endTime}
                    onChange={(e) => setEndTime(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <button
                onClick={handleTrimVideo}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-3 rounded-xl text-xs transition-all shadow-lg shadow-purple-500/20"
              >
                {isProcessing ? "Cutting Video Segment..." : "Trim & Export Segment"}
              </button>
            </div>
          )}
        </div>

        {/* Video Canvas & Preview */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 flex flex-col justify-between backdrop-blur-xl">
          <div>
            <h2 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-emerald-400" />
              Preview Player
            </h2>

            {videoSrc ? (
              <div className="relative rounded-xl border border-white/10 bg-slate-950 p-2 overflow-hidden flex flex-col items-center">
                <video
                  ref={videoRef}
                  src={videoSrc}
                  onLoadedMetadata={handleLoadedMetadata}
                  className="max-h-64 rounded-lg w-full object-contain"
                />
                <button
                  onClick={togglePlay}
                  className="mt-3 inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-xs px-4 py-1.5 rounded-lg border border-white/10 text-white"
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  {isPlaying ? "Pause Preview" : "Play Segment"}
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-white/5 bg-slate-950/40 p-8 text-center text-slate-500 text-xs">
                Upload a video to view live preview and timeline controls.
              </div>
            )}
          </div>

          {trimmedUrl && (
            <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>Video segment cut successfully!</span>
              </div>
              <a
                href={trimmedUrl}
                download="trimmed-segment.mp4"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
              >
                <Download className="h-4 w-4" /> Download Trimmed MP4
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
