import React, { useState } from "react";
import { Code, ArrowLeft, CheckCircle2, AlertCircle, Copy } from "lucide-react";

export function JSONToolView({ onBack }: { onBack: () => void }) {
  const [inputJson, setInputJson] = useState<string>('{\n  "name": "Mukul Bushi Reddy M",\n  "domain": "mukulmbr.in",\n  "tools": ["pdf", "dpi", "image", "json"],\n  "clientSide": true\n}');
  const [outputJson, setOutputJson] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(inputJson);
      setOutputJson(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(inputJson);
      setOutputJson(JSON.stringify(parsed));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
    }
  };

  const handleCopy = () => {
    if (!outputJson) return;
    navigator.clipboard.writeText(outputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <Code className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">JSON Formatter & Minifier</h1>
          <p className="text-xs text-slate-400">Validate, format, indent, and minify JSON data instantly in your browser.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">Input JSON</label>
          <textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            rows={14}
            className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-purple-500"
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleFormat}
              className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-medium py-2 rounded-lg text-xs transition-all"
            >
              Format JSON
            </button>
            <button
              onClick={handleMinify}
              className="flex-1 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-medium py-2 rounded-lg text-xs transition-all"
            >
              Minify JSON
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-slate-300">Output Result</label>
            {outputJson && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300"
              >
                <Copy className="h-3 w-3" />
                {copied ? "Copied!" : "Copy Output"}
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={outputJson || (error ? "" : "Click 'Format' or 'Minify' to process JSON...")}
            rows={14}
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-xs font-mono text-emerald-400 focus:outline-none"
          />

          {error && (
            <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
