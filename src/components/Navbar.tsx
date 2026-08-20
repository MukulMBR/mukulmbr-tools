import React, { useState, useEffect } from "react";
import { Radio, ArrowUpRight, ShieldCheck, Download, Smartphone } from "lucide-react";

export function Navbar() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        "To install MBR Motion Hub on your phone or computer:\n\n" +
          "• On Mobile: Tap 'Share' or browser menu (⋮) -> Select 'Add to Home Screen'\n" +
          "• On Desktop: Click the Install icon in your browser address bar (top right)"
      );
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-500/15 bg-[#07090e]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300 border border-emerald-400/30">
            <Radio className="h-5 w-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#07090e]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent">
                MBR Motion Hub
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Spatial Engine
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
              Telemetry Radar & Browser Studio
            </p>
          </div>
        </a>

        {/* Action Links & Install App CTA */}
        <div className="flex items-center gap-3">
          {/* Install App PWA CTA Button */}
          {!isInstalled && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 px-3.5 py-2 rounded-xl shadow-lg shadow-emerald-500/20 transition-all scale-100 hover:scale-105"
            >
              <Download className="h-4 w-4" />
              <span>Install App</span>
            </button>
          )}

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-300 bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-emerald-500/20 shadow-inner">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="font-medium">100% Client-Side Engine</span>
          </div>

          <a
            href="https://mukulmbr.in"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-emerald-950/40 px-3.5 py-2 rounded-xl border border-white/10 hover:border-emerald-500/40 transition-all shadow-md"
          >
            <span>Portfolio</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
          </a>
        </div>
      </div>
    </header>
  );
}
