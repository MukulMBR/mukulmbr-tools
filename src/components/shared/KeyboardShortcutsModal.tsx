import React, { useEffect, useState } from "react";
import { Command, X, Keyboard } from "lucide-react";

export function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "?" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const shortcuts = [
    { key: "Ctrl + K / Cmd + K", action: "Open Instant Command Palette Search" },
    { key: "Space", action: "Play / Pause Video Timeline & Audio Player" },
    { key: "I", action: "Set Trim Start Marker (Trim In)" },
    { key: "O", action: "Set Trim End Marker (Trim Out)" },
    { key: "Ctrl + E", action: "Export & Render Media Segment" },
    { key: "?", action: "Toggle Keyboard Shortcuts Cheat Sheet" },
    { key: "ESC", action: "Close Active Modal / Reset Tool Window" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl border border-emerald-500/30 bg-slate-900 p-6 sm:p-8 shadow-2xl shadow-emerald-950/50 space-y-6">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Keyboard className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Keyboard Shortcuts</h3>
            <p className="text-xs text-slate-400">HUD shortcuts for power users across studio tools.</p>
          </div>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto">
          {shortcuts.map((s) => (
            <div key={s.key} className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-slate-950/60 text-xs">
              <span className="text-slate-300">{s.action}</span>
              <kbd className="px-2 py-1 rounded bg-slate-800 text-emerald-300 border border-white/10 font-mono text-[11px] font-bold">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
        >
          Close Cheat Sheet
        </button>
      </div>
    </div>
  );
}
