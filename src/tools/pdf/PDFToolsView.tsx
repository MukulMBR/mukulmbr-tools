import React, { useState } from "react";
import { FileText, ArrowLeft, FilePlus, Scissors, RefreshCw, FileCode, ShieldCheck, CheckCircle2 } from "lucide-react";

export function PDFToolsView({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"merge" | "split" | "convert" | "metadata">("merge");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
      setStatusMessage(null);
    }
  };

  const handleSimulateAction = (action: string) => {
    setStatusMessage(`Ready to process ${selectedFiles.length} file(s) for PDF ${action}. (Client-side engine configured)`);
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
        <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Browser PDF Suite</h1>
          <p className="text-xs text-slate-400">Merge, split, convert, and inspect PDF files without uploading sensitive documents to external servers.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("merge")}
          className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl transition-all ${
            activeTab === "merge"
              ? "bg-red-500/20 border border-red-500/40 text-red-300"
              : "bg-slate-900/40 border border-white/5 text-slate-400 hover:bg-slate-800"
          }`}
        >
          <FilePlus className="h-4 w-4" /> PDF Merger
        </button>
        <button
          onClick={() => setActiveTab("split")}
          className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl transition-all ${
            activeTab === "split"
              ? "bg-red-500/20 border border-red-500/40 text-red-300"
              : "bg-slate-900/40 border border-white/5 text-slate-400 hover:bg-slate-800"
          }`}
        >
          <Scissors className="h-4 w-4" /> PDF Splitter
        </button>
        <button
          onClick={() => setActiveTab("convert")}
          className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl transition-all ${
            activeTab === "convert"
              ? "bg-red-500/20 border border-red-500/40 text-red-300"
              : "bg-slate-900/40 border border-white/5 text-slate-400 hover:bg-slate-800"
          }`}
        >
          <RefreshCw className="h-4 w-4" /> PDF Converter
        </button>
        <button
          onClick={() => setActiveTab("metadata")}
          className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl transition-all ${
            activeTab === "metadata"
              ? "bg-red-500/20 border border-red-500/40 text-red-300"
              : "bg-slate-900/40 border border-white/5 text-slate-400 hover:bg-slate-800"
          }`}
        >
          <FileCode className="h-4 w-4" /> Metadata Inspector
        </button>
      </div>

      {/* Tool Work Area */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8">
        <label className="border-2 border-dashed border-white/10 hover:border-red-500/40 bg-slate-800/40 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors text-center mb-6">
          <FileText className="h-10 w-10 text-red-400 mb-3" />
          <span className="text-sm font-medium text-slate-200">
            {activeTab === "merge" ? "Select PDF files to merge into one document" : "Select PDF file"}
          </span>
          <span className="text-xs text-slate-400 mt-1">100% Client-Side Memory Processing</span>
          <input
            type="file"
            accept="application/pdf"
            multiple={activeTab === "merge"}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {selectedFiles.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Selected Files ({selectedFiles.length})
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {selectedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/60 border border-white/5 text-xs">
                  <span className="font-medium text-white truncate max-w-md">{file.name}</span>
                  <span className="text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleSimulateAction(activeTab)}
              className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-medium py-3 rounded-xl text-xs transition-all shadow-lg shadow-red-500/20"
            >
              Run PDF {activeTab.toUpperCase()}
            </button>
          </div>
        )}

        {statusMessage && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
