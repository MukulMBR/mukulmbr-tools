import React from "react";
import { ShieldCheck, Radio, Github, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-emerald-500/15 bg-[#05070b] py-12 mt-20 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Radio className="h-3.5 w-3.5" />
              </div>
              <h3 className="text-white font-bold text-base">MBR Motion Hub</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Browser-native spatial telemetry radar and media studio. 100% private local execution powered by modern Web APIs and client-side processing.
            </p>
          </div>
          <div>
            <h4 className="text-slate-200 font-semibold text-sm mb-3">Studio Suite</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-emerald-400 font-medium">📡 Live GPS Radar</span> — Vehicle Telemetry & Routes</li>
              <li><span className="text-slate-300">🎬 Video Studio</span> — Trimmer, Prompt Editor & Upscaler</li>
              <li><span className="text-slate-300">🎙️ Audio & Speech</span> — TTS Studio & Audio Extractor</li>
              <li><span className="text-slate-300">⚙️ Media Utilities</span> — Social Downloader & Screen Recorder</li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-200 font-semibold text-sm mb-3">Privacy Guarantee</h4>
            <div className="flex items-center gap-2 text-xs text-emerald-400 mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Zero Server Cloud Uploads</span>
            </div>
            <p className="text-xs text-slate-500">
              Files and telemetry are rendered locally in your browser memory instance.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Mukul Bushi Reddy M. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://mukulmbr.in"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>mukulmbr.in</span>
            </a>
            <a
              href="https://github.com/MukulMBR"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
