import React, { useState, useEffect } from "react";
import { Radio, ArrowUpRight, ShieldCheck, Download, X, Monitor, Smartphone, CheckCircle2 } from "lucide-react";

export function Navbar() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowInstallModal(false);
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
      setShowInstallModal(true);
    }
  };

  return (
    <>
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

      {/* PWA Install Guide Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl border border-emerald-500/30 bg-slate-900 p-6 sm:p-8 shadow-2xl shadow-emerald-950/50 space-y-6">
            <button
              onClick={() => setShowInstallModal(false)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Download className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Install MBR Motion Hub</h3>
                <p className="text-xs text-slate-400">Access all 18 tools instantly like a native desktop/mobile app.</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Desktop Instruction */}
              <div className="p-4 rounded-2xl border border-white/10 bg-slate-950/60 flex items-start gap-3">
                <Monitor className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">On Computer (Chrome / Edge / Brave)</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Look at the right side of your browser address bar at the top (near the bookmark star ⭐). Click the <strong className="text-emerald-300">Install icon (⊕)</strong> to add Motion Hub to your desktop.
                  </p>
                </div>
              </div>

              {/* Mobile Instruction */}
              <div className="p-4 rounded-2xl border border-white/10 bg-slate-950/60 flex items-start gap-3">
                <Smartphone className="h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">On Mobile (Android / iPhone)</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Tap the browser menu button (<strong className="text-white">⋮</strong> on Android or <strong className="text-white">Share</strong> on iOS) and select <strong className="text-emerald-300">"Add to Home Screen"</strong>.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowInstallModal(false)}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
            >
              Got It, Thank You!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
