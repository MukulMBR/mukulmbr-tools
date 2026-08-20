import React from "react";
import { LucideIcon, ArrowRight, ShieldCheck } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  status: "Ready" | "Beta" | "Coming Soon";
  badge?: string;
  onClick?: () => void;
}

export function ToolCard({
  title,
  description,
  icon: Icon,
  category,
  status,
  badge = "Client-Side",
  onClick,
}: ToolCardProps) {
  const isRadar = category === "Live GPS Radar";

  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl border transition-all duration-300 p-6 backdrop-blur-xl ${
        isRadar
          ? "border-emerald-500/40 bg-gradient-to-b from-emerald-950/30 to-slate-900/60 shadow-xl shadow-emerald-950/20 hover:border-emerald-400 hover:shadow-emerald-500/10 cursor-pointer"
          : "border-white/10 bg-slate-900/40 hover:border-emerald-500/30 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-emerald-500/5 cursor-pointer"
      }`}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`h-12 w-12 rounded-xl border flex items-center justify-center transition-all group-hover:scale-110 ${
            isRadar
              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-500/20"
              : "bg-slate-800/80 border-white/10 text-emerald-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-300 group-hover:border-emerald-500/30"
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>

        <div className="flex flex-col items-end gap-1">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
              isRadar
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                : "bg-slate-800 text-slate-400 border-white/5"
            }`}
          >
            {category}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-950/80 text-emerald-400 border border-emerald-500/20">
            {badge}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
        {title}
      </h3>
      <p className="text-xs text-slate-400 mb-6 line-clamp-2 leading-relaxed">
        {description}
      </p>

      {/* Card Footer */}
      <div className="flex items-center justify-between text-xs pt-4 border-t border-white/5 text-slate-400">
        <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
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
