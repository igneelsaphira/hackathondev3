"use client";

import { RiskCheck } from "@/lib/demoData";

interface Props {
  check: RiskCheck;
  index: number;
}

const severityConfig = {
  low: { icon: "✅", border: "border-emerald-200", bg: "bg-emerald-50", titleColor: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700" },
  medium: { icon: "⚠️", border: "border-amber-200", bg: "bg-amber-50", titleColor: "text-amber-700", badge: "bg-amber-100 text-amber-700" },
  high: { icon: "🚨", border: "border-orange-200", bg: "bg-orange-50", titleColor: "text-orange-700", badge: "bg-orange-100 text-orange-700" },
  critical: { icon: "⛔", border: "border-red-200", bg: "bg-red-50", titleColor: "text-red-700", badge: "bg-red-100 text-red-700" },
};

export default function WarningCard({ check, index }: Props) {
  const cfg = severityConfig[check.severity];

  return (
    <div className={`rounded-xl border ${cfg.border} ${cfg.bg} p-4 transition-all hover:shadow-md`}>
      <div className="flex items-start gap-3">
        <span className="text-xl shrink-0">{cfg.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className={`font-semibold text-sm ${cfg.titleColor}`}>
              {check.title}
            </h4>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${cfg.badge}`}>
              {check.severity === "low" ? "Tranquilo" : check.severity === "medium" ? "Atención" : check.severity === "high" ? "Peligro" : "Crítico"}
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed mb-2">
            {check.humanText}
          </p>
          <div className="text-[11px] text-slate-400 font-mono bg-white/60 rounded px-2 py-1 inline-block">
            🔧 {check.technicalNote}
          </div>
        </div>
      </div>
    </div>
  );
}
