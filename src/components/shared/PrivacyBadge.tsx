import React, { useState } from "react";
import { ShieldCheck, Lock, Globe, Info, X } from "lucide-react";

interface PrivacyBadgeProps {
  networkType?: "local" | "network";
  compact?: boolean;
}

export function PrivacyBadge({ networkType = "local", compact = false }: PrivacyBadgeProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <div
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold cursor-pointer hover:bg-emerald-500/20 transition-all shadow-sm"
        >
          <Lock className="h-3.5 w-3.5 text-emerald-400" />
          <span>Runs 100% in your browser — your files never leave your device</span>
          <Info className="h-3.5 w-3.5 text-emerald-400/70" />
        </div>

        {networkType === "network" ? (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 flex items-center gap-1">
            <Globe className="h-3 w-3" /> Client-Side Direct Fetch
          </span>
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-emerald-400" /> 100% Local Memory Engine
          </span>
        )}
      </div>

      {/* Architecture Privacy Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl border border-emerald-500/30 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">How Local Browser Execution Works</h3>
                <p className="text-xs text-slate-400">Zero file uploads. Complete data isolation.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-white/10 bg-slate-950/60 space-y-3 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 mt-1.5" />
                <p>
                  <strong className="text-white">Local CPU & GPU Processing:</strong> All video trimming, audio speech synthesis, canvas rendering, and file format conversions happen using WebAssembly, Web Audio API, and HTML5 Canvas directly inside your browser window.
                </p>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 mt-1.5" />
                <p>
                  <strong className="text-white">Zero Cloud Server Uploads:</strong> No media files, videos, images, or audio tracks are uploaded to any external server storage.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
            >
              Got It, Continue Working
            </button>
          </div>
        </div>
      )}
    </>
  );
}
