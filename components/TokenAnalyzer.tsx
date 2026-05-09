"use client";

import { useState } from "react";
import { analyzeToken, TokenAnalysis, getRiskColor } from "@/lib/riskEngine";
import { SAFE_TOKEN, RISKY_TOKEN, HONEYPOT_TOKEN } from "@/lib/demoData";
import RiskMeter from "./RiskMeter";
import WarningCard from "./WarningCard";
import HumanExplanation from "./HumanExplanation";

export default function TokenAnalyzer() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TokenAnalysis | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async (inputAddress?: string) => {
    const addr = inputAddress || address.trim();
    if (!addr) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const analysis = await analyzeToken(addr);
      setResult(analysis);
    } catch (e) {
      setError("No pudimos analizar este token en este momento. Intenta con uno de los ejemplos de demo.");
    } finally {
      setLoading(false);
    }
  };

  const copyReport = () => {
    if (!result) return;
    const text = `🔍 Análisis de token: ${result.name} (${result.symbol})
📍 Dirección: ${result.address}
🚨 Riesgo: ${getRiskColor(result.riskLevel).label} (${result.riskScore}/100)

${result.checks.map((c) => `• ${c.title}: ${c.humanText}`).join("\n")}

💭 Resumen: ${result.humanSummary}
📋 Recomendación: ${result.recommendation}
    `.trim();
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Input */}
      <div
        className="rounded-2xl border p-6 mb-5"
        style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <label className="block text-sm font-medium mb-2.5" style={{ color: "#8a94a8" }}>
          🔍 Pega la dirección del token de Solana
        </label>
        <div className="flex gap-2.5">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            placeholder="Ej: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
            className="flex-1 rounded-xl px-4 py-3.5 text-sm font-mono outline-none transition-all"
            style={{
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#e8ecf4",
            }}
          />
          <button
            onClick={() => handleAnalyze()}
            disabled={loading || !address.trim()}
            className="font-bold px-7 py-3.5 rounded-xl text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #c9a96e, #a08050)",
              color: "#0c1222",
            }}
          >
            {loading ? "Analizando..." : "Analizar"}
          </button>
        </div>
        <p className="text-xs mt-2.5" style={{ color: "#4a5568" }}>
          También puedes probar con uno de los ejemplos de abajo ↓
        </p>
      </div>

      {/* Demo buttons */}
      {!result && !loading && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <DemoButton
            emoji="🟢"
            title="Token seguro"
            desc="Pocas alarmas"
            borderColor="rgba(72,187,120,0.2)"
            onClick={() => {
              setAddress(SAFE_TOKEN.address);
              handleAnalyze(SAFE_TOKEN.address);
            }}
          />
          <DemoButton
            emoji="🟠"
            title="Token riesgoso"
            desc="Muchas alarmas"
            borderColor="rgba(237,137,54,0.2)"
            onClick={() => {
              setAddress(RISKY_TOKEN.address);
              handleAnalyze(RISKY_TOKEN.address);
            }}
          />
          <DemoButton
            emoji="🔴"
            title="Token trampa"
            desc="No se puede vender"
            borderColor="rgba(245,101,101,0.2)"
            onClick={() => {
              setAddress(HONEYPOT_TOKEN.address);
              handleAnalyze(HONEYPOT_TOKEN.address);
            }}
          />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div
          className="rounded-2xl border p-10 text-center"
          style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="w-10 h-10 rounded-full border-[3px] mx-auto mb-4 animate-spin"
            style={{ borderColor: "rgba(201,169,110,0.2)", borderTopColor: "#c9a96e" }}
          />
          <p className="text-sm" style={{ color: "#8a94a8" }}>Revisando señales de riesgo...</p>
          <p className="text-xs mt-1" style={{ color: "#4a5568" }}>Consultando precios, liquidez y permisos</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className="rounded-2xl border p-5 mb-5"
          style={{ background: "rgba(237,137,54,0.06)", borderColor: "rgba(237,137,54,0.15)" }}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="text-sm font-medium" style={{ color: "#f6ad55" }}>{error}</p>
              <p className="text-xs mt-1" style={{ color: "#8a94a8" }}>
                Los ejemplos de arriba funcionan sin depender de APIs externas.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-5">
          {/* Token header */}
          <div
            className="rounded-2xl border p-6"
            style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="font-display text-2xl font-bold" style={{ color: "#f5f7fb" }}>
                  {result.name}
                </h2>
                <p className="text-sm" style={{ color: "#6b7a94" }}>{result.symbol}</p>
              </div>
              <div
                className="px-4 py-1.5 rounded-full text-xs font-bold"
                style={{
                  background: getRiskColor(result.riskLevel).hex + "18",
                  color: getRiskColor(result.riskLevel).hex,
                  border: `1px solid ${getRiskColor(result.riskLevel).hex}30`,
                }}
              >
                {getRiskColor(result.riskLevel).label}
              </div>
            </div>
            <p className="text-xs font-mono break-all" style={{ color: "#4a5568" }}>
              {result.address}
            </p>
          </div>

          {/* Risk meter */}
          <RiskMeter analysis={result} />

          {/* Human summary */}
          <div
            className="rounded-2xl border p-6"
            style={{ background: "rgba(201,169,110,0.04)", borderColor: "rgba(201,169,110,0.12)" }}
          >
            <h3 className="text-sm font-bold mb-2" style={{ color: "#c9a96e" }}>
              💭 En palabras simples
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#a0aec0" }}>
              {result.humanSummary}
            </p>
          </div>

          {/* Warnings */}
          <div>
            <h3 className="text-sm font-bold mb-3" style={{ color: "#8a94a8" }}>
              {result.checks.length} {result.checks.length === 1 ? "señal encontrada" : "señales encontradas"}
            </h3>
            <div className="space-y-3">
              {result.checks.map((check) => (
                <WarningCard key={check.id} check={check} />
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div
            className="rounded-2xl border p-6"
            style={{
              background:
                result.riskLevel === "critical"
                  ? "rgba(245,101,101,0.04)"
                  : result.riskLevel === "high"
                  ? "rgba(237,137,54,0.04)"
                  : result.riskLevel === "medium"
                  ? "rgba(237,137,54,0.03)"
                  : "rgba(72,187,120,0.04)",
              borderColor:
                result.riskLevel === "critical"
                  ? "rgba(245,101,101,0.12)"
                  : result.riskLevel === "high"
                  ? "rgba(237,137,54,0.12)"
                  : result.riskLevel === "medium"
                  ? "rgba(237,137,54,0.1)"
                  : "rgba(72,187,120,0.12)",
            }}
          >
            <h3 className="text-sm font-bold mb-2" style={{ color: "#e8ecf4" }}>
              ✅ Recomendación
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#a0aec0" }}>
              {result.recommendation}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={copyReport}
              className="flex-1 font-medium px-4 py-3.5 rounded-xl text-sm transition-colors border"
              style={{
                background: "rgba(255,255,255,0.03)",
                color: "#8a94a8",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              📋 Copiar reporte
            </button>
            <button
              onClick={() => {
                setResult(null);
                setAddress("");
              }}
              className="flex-1 font-bold px-4 py-3.5 rounded-xl text-sm transition-all"
              style={{
                background: "linear-gradient(135deg, #c9a96e, #a08050)",
                color: "#0c1222",
              }}
            >
              🔍 Analizar otro token
            </button>
          </div>

          {/* Disclaimer */}
          <div
            className="rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
          >
            <p className="text-[11px] leading-relaxed" style={{ color: "#4a5568" }}>
              <strong style={{ color: "#6b7a94" }}>Disclaimer:</strong> Esta herramienta no es asesoría financiera. No garantiza que un token sea seguro o fraudulento. Solo analiza señales de riesgo disponibles públicamente para ayudar a tomar decisiones más informadas. Un token puede parecer seguro ahora y cambiar después.
            </p>
          </div>

          {/* Explanations */}
          <HumanExplanation />
        </div>
      )}
    </div>
  );
}

function DemoButton({
  emoji,
  title,
  desc,
  borderColor,
  onClick,
}: {
  emoji: string;
  title: string;
  desc: string;
  borderColor: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl p-4 text-left transition-all hover:shadow-lg"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${borderColor}`,
      }}
    >
      <div className="text-2xl mb-2">{emoji}</div>
      <div className="text-sm font-semibold" style={{ color: "#e8ecf4" }}>{title}</div>
      <div className="text-xs mt-1" style={{ color: "#6b7a94" }}>{desc}</div>
    </button>
  );
}
