"use client";

import { TokenAnalysis, getRiskColor } from "@/lib/riskEngine";

interface Props {
  analysis: TokenAnalysis;
}

export default function RiskMeter({ analysis }: Props) {
  const colors = getRiskColor(analysis.riskLevel);

  const segments = [
    { label: "Bajo", range: "0-30", active: analysis.riskScore <= 30, color: "bg-emerald-500" },
    { label: "Medio", range: "31-60", active: analysis.riskScore > 30 && analysis.riskScore <= 60, color: "bg-amber-500" },
    { label: "Alto", range: "61-85", active: analysis.riskScore > 60 && analysis.riskScore <= 85, color: "bg-orange-500" },
    { label: "Crítico", range: "86-100", active: analysis.riskScore > 85, color: "bg-red-600" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-slate-500 mb-1">Nivel de riesgo</div>
          <div className={`text-2xl font-bold ${colors.text}`}>
            {colors.label}
          </div>
        </div>
        <div className={`w-16 h-16 rounded-full ${colors.bg} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
          {analysis.riskScore}
        </div>
      </div>

      {/* Barra de puntaje */}
      <div className="mb-4">
        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
          <span>0</span>
          <span>100</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex">
          {segments.map((seg) => (
            <div
              key={seg.label}
              className={`flex-1 ${seg.active ? seg.color : "bg-slate-200"} transition-all duration-500`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {segments.map((seg) => (
            <span
              key={seg.label}
              className={`text-[9px] ${seg.active ? "text-slate-700 font-bold" : "text-slate-300"}`}
            >
              {seg.label}
            </span>
          ))}
        </div>
      </div>

      {/* Semáforo */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          {segments.map((seg) => (
            <div
              key={seg.label}
              className={`w-4 h-4 rounded-full transition-all ${
                seg.active ? `${seg.color} ring-2 ring-offset-2 ring-slate-200 scale-110` : "bg-slate-200"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-slate-500">
          {analysis.riskLevel === "low"
            ? "Puntaje bajo = menos alarmas visibles"
            : analysis.riskLevel === "medium"
            ? "Hay algunas señales que conviene revisar"
            : analysis.riskLevel === "high"
            ? "Varias alarmas importantes detectadas"
            : analysis.riskLevel === "critical"
            ? "Señales graves. Mucho cuidado."
            : "No pudimos evaluarlo bien"}
        </span>
      </div>
    </div>
  );
}
