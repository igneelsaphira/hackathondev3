"use client";

import { TokenAnalysis, getRiskColor } from "@/lib/riskEngine";

interface Props {
  analysis: TokenAnalysis;
}

export default function RiskMeter({ analysis }: Props) {
  const colors = getRiskColor(analysis.riskLevel);
  const pct = analysis.riskScore;

  // Conic gradient for the ring
  const ringStyle = {
    background: `conic-gradient(${colors.hex} ${pct * 3.6}deg, rgba(255,255,255,0.05) 0deg)`,
  };

  return (
    <div className="rounded-2xl border p-6" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-sm mb-1" style={{ color: "#8a94a8" }}>Nivel de riesgo</div>
          <div className="text-2xl font-bold" style={{ color: colors.hex }}>
            {colors.label}
          </div>
        </div>
        {/* Circular score */}
        <div className="relative w-20 h-20 rounded-full flex items-center justify-center" style={ringStyle}>
          <div className="absolute w-[68px] h-[68px] rounded-full flex items-center justify-center font-bold text-xl" style={{ background: "#0c1222" }}>
            <span style={{ color: colors.hex }}>{analysis.riskScore}</span>
          </div>
        </div>
      </div>

      {/* Score bar */}
      <div className="mb-4">
        <div className="flex justify-between text-[10px] mb-1.5" style={{ color: "#4a5568" }}>
          <span>0</span>
          <span>100</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, #48bb78, #ed8936, #f56565)",
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {["Seguro", "Medio", "Alto", "Crítico"].map((l) => (
            <span key={l} className="text-[9px] font-medium" style={{ color: "#2d3748" }}>
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Traffic light */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          {[
            { active: pct <= 30, color: "#48bb78" },
            { active: pct > 30 && pct <= 60, color: "#ed8936" },
            { active: pct > 60 && pct <= 85, color: "#f56565" },
            { active: pct > 85, color: "#dc2626" },
          ].map((seg, i) => (
            <div
              key={i}
              className="w-3.5 h-3.5 rounded-full transition-all"
              style={{
                background: seg.active ? seg.color : "rgba(255,255,255,0.08)",
                boxShadow: seg.active ? `0 0 10px ${seg.color}40` : "none",
                transform: seg.active ? "scale(1.15)" : "scale(1)",
              }}
            />
          ))}
        </div>
        <span className="text-xs" style={{ color: "#4a5568" }}>
          {analysis.riskLevel === "low" && "Puntaje bajo = menos alarmas visibles"}
          {analysis.riskLevel === "medium" && "Hay algunas señales que conviene revisar"}
          {analysis.riskLevel === "high" && "Varias alarmas importantes detectadas"}
          {analysis.riskLevel === "critical" && "Señales graves. Mucho cuidado."}
          {analysis.riskLevel === "unknown" && "No pudimos evaluarlo bien"}
        </span>
      </div>
    </div>
  );
}
