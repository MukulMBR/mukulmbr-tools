import React, { useState, useEffect } from "react";
import { Radio, ArrowUpRight, ShieldCheck, Download, Command, Search, Smartphone } from "lucide-react";
import { CommandPalette } from "./CommandPalette";

interface NavbarProps {
  tools?: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
  }>;
  onSelectTool?: (toolId: string) => void;
}

export function Navbar({ tools = [], onSelectTool = () => {} }: NavbarProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

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

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowCommandPalette((prev) => !prev);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("keydown", handleKeyDown);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("keydown", handleKeyDown);
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
      <header className="sticky top-0 z-40 border-b border-emerald-500/15 bg-[#07090e]/85 backdrop-blur-xl">
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

          {/* Action Links, Cmd+K Palette, & Install App CTA */}
          <div className="flex items-center gap-3">
            {/* Cmd+K Command Palette Trigger */}
            <button
              onClick={() => setShowCommandPalette(true)}
              className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/90 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-emerald-500/20 transition-all shadow-inner"
            >
              <Search className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Search Tools</span>
              <kbd className="hidden md:inline-flex items-center gap-0.5 text-[10px] bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded border border-white/10 font-mono">
                <Command className="h-2.5 w-2.5" /> K
              </kbd>
            </button>

            {!isInstalled && (
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 px-3 py-1.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all scale-100 hover:scale-105"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Install</span>
              </button>
            )}

            <a
              href="https://mukulmbr.in"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-white/10 hover:border-emerald-500/40 transition-all shadow-md"
            >
              <span>Portfolio</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
            </a>
          </div>
        </div>
      </header>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onSelectTool={onSelectTool}
        tools={tools}
      />
    </>
  );
}
