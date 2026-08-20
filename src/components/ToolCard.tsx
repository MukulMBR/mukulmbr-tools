import React from "react";
import { LucideIcon, ArrowRight, ShieldCheck, Star } from "lucide-react";

interface ToolCardProps {
  id?: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  status: "Ready" | "Beta" | "Coming Soon";
  badge?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
  onClick?: () => void;
}

export function ToolCard({
  id,
  title,
  description,
  icon: Icon,
  category,
  status,
  badge = "Client-Side",
  isFavorite = false,
  onToggleFavorite,
  onClick,
}: ToolCardProps) {
  const isRadar = category === "Live GPS Radar";

  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between min-h-[220px] ${
        isRadar
          ? "border-emerald-500/40 bg-slate-900/90 shadow-xl shadow-emerald-950/20 hover:border-emerald-400 hover:bg-slate-900 hover:shadow-emerald-500/10 cursor-pointer"
          : "border-white/10 bg-slate-900/80 hover:border-emerald-500/40 hover:bg-slate-900/95 hover:shadow-xl hover:shadow-emerald-500/10 cursor-pointer"
      }`}
    >
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`h-12 w-12 rounded-xl border flex items-center justify-center transition-all group-hover:scale-105 ${
                isRadar
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-500/20"
                  : "bg-slate-800 border-white/10 text-emerald-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-300 group-hover:border-emerald-500/30"
              }`}
            >
              <Icon className="h-6 w-6" />
            </div>

            {/* Star Favorite Toggle Button */}
            {onToggleFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(e);
                }}
                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                className={`h-8 w-8 rounded-lg flex items-center justify-center border transition-all ${
                  isFavorite
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-400 shadow-md shadow-amber-500/10 scale-105"
                    : "bg-slate-800/60 border-white/10 text-slate-500 hover:text-amber-400 hover:border-amber-500/30"
                }`}
              >
                <Star className={`h-4 w-4 ${isFavorite ? "fill-amber-400" : ""}`} />
              </button>
            )}
          </div>

          <div className="flex flex-col items-end gap-1">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                isRadar
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                  : "bg-slate-800 text-slate-300 border-white/10"
              }`}
            >
              {category}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-950 text-emerald-400 border border-emerald-500/20">
              {badge}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-300 mb-6 line-clamp-2 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between text-xs pt-4 border-t border-white/10 text-slate-400">
        <span className="flex items-center gap-1.5 text-[11px] text-slate-300 font-medium">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          No server upload
        </span>

        <span className="inline-flex items-center gap-1 font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
          Launch Engine
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}
