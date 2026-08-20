import React, { useState, useEffect } from "react";
import { Search, Command, X, Zap, ArrowRight } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (toolId: string) => void;
  tools: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
  }>;
}

export function CommandPalette({ isOpen, onClose, onSelectTool, tools }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = tools.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase()) ||
      t.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        onSelectTool(filtered[selectedIndex].id);
        onClose();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onSelectTool, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl border border-emerald-500/30 bg-slate-900 shadow-2xl shadow-emerald-950/50 overflow-hidden flex flex-col">
        {/* Search Header */}
        <div className="relative border-b border-white/10 p-4 flex items-center gap-3 bg-slate-950/50">
          <Search className="h-5 w-5 text-emerald-400" />
          <input
            type="text"
            autoFocus
            placeholder="Type a tool name or category (e.g. Downloader, Radar, TTS)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="h-7 w-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center border border-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tools Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((tool, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={tool.id}
                  onClick={() => {
                    onSelectTool(tool.id);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-emerald-500/20 border border-emerald-500/30 text-white"
                      : "hover:bg-slate-800/60 text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        {tool.title}
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-white/5">
                          {tool.category}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-sm">{tool.description}</div>
                    </div>
                  </div>

                  {isSelected && <ArrowRight className="h-4 w-4 text-emerald-400" />}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">No tools found matching "{query}"</div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="p-3 border-t border-white/5 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/10 font-mono">↑↓</span> Move
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/10 font-mono">↵</span> Select
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/10 font-mono">ESC</span> Close
          </div>
          <div className="flex items-center gap-1 text-emerald-400">
            <Command className="h-3 w-3" /> Motion Hub Engine Palette
          </div>
        </div>
      </div>
    </div>
  );
}
