import React, { useState } from "react";
import { Monitor, ArrowLeft, RefreshCw, Layers, Calculator } from "lucide-react";

export function DPIToolView({ onBack }: { onBack: () => void }) {
  const [pixelsW, setPixelsW] = useState<number>(1920);
  const [pixelsH, setPixelsH] = useState<number>(1080);
  const [dpi, setDpi] = useState<number>(300);

  const inchesW = (pixelsW / dpi).toFixed(2);
  const inchesH = (pixelsH / dpi).toFixed(2);
  const cmW = ((pixelsW / dpi) * 2.54).toFixed(2);
  const cmH = ((pixelsH / dpi) * 2.54).toFixed(2);
  const mmW = ((pixelsW / dpi) * 25.4).toFixed(1);
  const mmH = ((pixelsH / dpi) * 25.4).toFixed(1);

  const presets = [
    { label: "Web Standard (72 DPI)", dpi: 72 },
    { label: "Screen Display (96 DPI)", dpi: 96 },
    { label: "High Quality Print (300 DPI)", dpi: 300 },
    { label: "Ultra HD Print (600 DPI)", dpi: 600 },
  ];

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
          <Monitor className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">DPI Resolution Converter & Calculator</h1>
          <p className="text-xs text-slate-400">Calculate physical print sizes (Inches, CM, MM) or pixel dimensions for target DPI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Calculator className="h-4 w-4 text-purple-400" />
            Input Dimensions
          </h2>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Width (Pixels)</label>
            <input
              type="number"
              value={pixelsW}
              onChange={(e) => setPixelsW(Math.max(1, Number(e.target.value)))}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Height (Pixels)</label>
            <input
              type="number"
              value={pixelsH}
              onChange={(e) => setPixelsH(Math.max(1, Number(e.target.value)))}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Target DPI / PPI</label>
            <input
              type="number"
              value={dpi}
              onChange={(e) => setDpi(Math.max(1, Number(e.target.value)))}
              className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Quick Presets</label>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((p) => (
                <button
                  key={p.dpi}
                  onClick={() => setDpi(p.dpi)}
                  className={`text-xs p-2 rounded-lg border text-left transition-all ${
                    dpi === p.dpi
                      ? "bg-purple-600/20 border-purple-500 text-purple-300"
                      : "bg-slate-800/40 border-white/5 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <Layers className="h-4 w-4 text-emerald-400" />
              Calculated Physical Dimensions
            </h2>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400">Inches (in)</span>
                <span className="text-sm font-bold text-white">{inchesW} × {inchesH} in</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400">Centimeters (cm)</span>
                <span className="text-sm font-bold text-white">{cmW} × {cmH} cm</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400">Millimeters (mm)</span>
                <span className="text-sm font-bold text-white">{mmW} × {mmH} mm</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
            <p className="font-semibold mb-1">💡 Print Tip:</p>
            For high-definition physical printing (brochures, posters, photos), use <strong>300 DPI</strong> or higher to prevent pixelation.
          </div>
        </div>
      </div>
    </div>
  );
}
