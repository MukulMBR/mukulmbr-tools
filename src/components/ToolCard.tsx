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
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl border border-white/10 bg-slate-900/40 p-6 transition-all duration-300 hover:border-purple-500/40 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-purple-500/5 ${
        status === "Coming Soon" ? "opacity-75" : "cursor-pointer"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="h-12 w-12 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/10 group-hover:text-purple-300 transition-all">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-white/5">
            {category}
          </span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {badge}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed">
        {description}
      </p>

      <div className="flex items-center justify-between text-xs pt-4 border-t border-white/5 text-slate-400">
        <span className="flex items-center gap-1 text-[11px] text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          No server upload
        </span>

        <span className="inline-flex items-center gap-1 font-medium text-purple-400 group-hover:translate-x-1 transition-transform">
          {status === "Coming Soon" ? "In Development" : "Launch Utility"}
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}
