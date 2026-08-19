import React from "react";
import { ShieldCheck, Heart, Github, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#07070d] py-12 mt-20 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold text-base mb-3">MBR Tools Ecosystem</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Free, browser-based online tools designed for performance and maximum privacy. All calculations, conversions, and file edits occur completely inside your browser.
            </p>
          </div>
          <div>
            <h4 className="text-slate-200 font-medium text-sm mb-3">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#pdf" className="hover:text-purple-400 transition-colors">PDF Utilities (Merge, Split, Convert)</a></li>
              <li><a href="#dpi" className="hover:text-purple-400 transition-colors">DPI Resolution Converter</a></li>
              <li><a href="#image" className="hover:text-purple-400 transition-colors">Image Converter & Compressor</a></li>
              <li><a href="#json" className="hover:text-purple-400 transition-colors">JSON & Developer Utilities</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-200 font-medium text-sm mb-3">Security & Privacy</h4>
            <div className="flex items-center gap-2 text-xs text-emerald-400 mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Zero File Server Uploads</span>
            </div>
            <p className="text-xs text-slate-500">
              Your files never leave your device. All computations leverage native Web APIs and client-side processing.
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
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>mukulmbr.in</span>
            </a>
            <a
              href="https://github.com/MukulMBR"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
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
