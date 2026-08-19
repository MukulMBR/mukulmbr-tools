import React, { useState, useRef } from "react";
import { Image as ImageIcon, ArrowLeft, Download, Upload, Sliders, CheckCircle2 } from "lucide-react";

export function ImageToolsView({ onBack }: { onBack: () => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>("image/webp");
  const [quality, setQuality] = useState<number>(0.85);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [aspectRatioLocked, setAspectRatioLocked] = useState<boolean>(true);
  const [originalDims, setOriginalDims] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setProcessedUrl(null);

    const img = new Image();
    img.onload = () => {
      setWidth(img.width);
      setHeight(img.height);
      setOriginalDims({ w: img.width, h: img.height });
    };
    img.src = url;
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (aspectRatioLocked && originalDims.w > 0) {
      setHeight(Math.round((val / originalDims.w) * originalDims.h));
    }
  };

  const handleProcessImage = () => {
    if (!imagePreview || width <= 0 || height <= 0) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL(targetFormat, quality);
      setProcessedUrl(dataUrl);
    };
    img.src = imagePreview;
  };

  const getFormatExtension = () => {
    if (targetFormat === "image/png") return "png";
    if (targetFormat === "image/jpeg") return "jpg";
    return "webp";
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
        <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
          <ImageIcon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Browser-Based Image Tools</h1>
          <p className="text-xs text-slate-400">Convert, resize, and compress images securely inside your browser with HTML5 Canvas.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input & Options */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Upload className="h-4 w-4 text-blue-400" />
            Upload Image
          </h2>

          <label className="border-2 border-dashed border-white/10 hover:border-blue-500/40 bg-slate-800/40 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
            <Upload className="h-8 w-8 text-slate-400 mb-2" />
            <span className="text-xs font-medium text-slate-300">Click or drag image file here</span>
            <span className="text-[10px] text-slate-500 mt-1">Supports PNG, JPG, WEBP, GIF, SVG</span>
            <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
          </label>

          {selectedFile && (
            <div className="space-y-4 pt-2 border-t border-white/5">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Target Format</label>
                <select
                  value={targetFormat}
                  onChange={(e) => setTargetFormat(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="image/webp">WebP (Optimized Web)</option>
                  <option value="image/jpeg">JPEG (Standard Image)</option>
                  <option value="image/png">PNG (Lossless Transparency)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {targetFormat !== "image/png" && (
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Quality</span>
                    <span>{Math.round(quality * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
              )}

              <button
                onClick={handleProcessImage}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-blue-500/20"
              >
                Process Image
              </button>
            </div>
          )}
        </div>

        {/* Preview & Download */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-purple-400" />
              Image Preview & Output
            </h2>

            {imagePreview ? (
              <div className="relative rounded-xl border border-white/10 bg-slate-950 p-2 overflow-hidden flex items-center justify-center min-h-[200px]">
                <img
                  src={processedUrl || imagePreview}
                  alt="Preview"
                  className="max-h-64 object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="rounded-xl border border-white/5 bg-slate-950/40 p-8 text-center text-slate-500 text-xs">
                Select an image to see live preview and download options.
              </div>
            )}
          </div>

          {processedUrl && (
            <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>Image processed successfully!</span>
              </div>
              <a
                href={processedUrl}
                download={`processed-image.${getFormatExtension()}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
              >
                <Download className="h-4 w-4" /> Download Processed Image
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
