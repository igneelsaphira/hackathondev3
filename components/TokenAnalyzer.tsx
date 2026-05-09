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
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          🔍 Pega la dirección del token de Solana
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            placeholder="Ej: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            onClick={() => handleAnalyze()}
            disabled={loading || !address.trim()}
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            {loading ? "Analizando..." : "Analizar token"}
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          También puedes probar con uno de los ejemplos de abajo ↓
        </p>
      </div>

      {/* Botones demo rápida */}
      {!result && !loading && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => {
              setAddress(SAFE_TOKEN.address);
              handleAnalyze(SAFE_TOKEN.address);
            }}
            className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-left hover:shadow-md hover:border-emerald-300 transition-all group"
          >
            <div className="text-2xl mb-2">🟢</div>
            <div className="text-sm font-semibold text-emerald-800">Probar token seguro</div>
            <div className="text-xs text-emerald-600 mt-1">USDC — pocas alarmas</div>
          </button>
          <button
            onClick={() => {
              setAddress(RISKY_TOKEN.address);
              handleAnalyze(RISKY_TOKEN.address);
            }}
            className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-left hover:shadow-md hover:border-orange-300 transition-all group"
          >
            <div className="text-2xl mb-2">🟠</div>
            <div className="text-sm font-semibold text-orange-800">Probar token riesgoso</div>
            <div className="text-xs text-orange-600 mt-1">Muchas alarmas visibles</div>
          </button>
          <button
            onClick={() => {
              setAddress(HONEYPOT_TOKEN.address);
              handleAnalyze(HONEYPOT_TOKEN.address);
            }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 text-left hover:shadow-md hover:border-red-300 transition-all group"
          >
            <div className="text-2xl mb-2">🔴</div>
            <div className="text-sm font-semibold text-red-800">Probar token trampa</div>
            <div className="text-xs text-red-600 mt-1">No se puede vender — cuidado</div>
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
          <div className="w-10 h-10 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-600">Revisando señales de riesgo...</p>
          <p className="text-xs text-slate-400 mt-1">Consultando precios, liquidez y permisos</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="text-sm font-medium text-amber-800">{error}</p>
              <p className="text-xs text-amber-600 mt-1">
                Los ejemplos de arriba funcionan sin depender de APIs externas.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Resultado */}
      {result && (
        <div className="space-y-6">
          {/* Header del token */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-xl font-bold text-slate-800">{result.name}</h2>
                <p className="text-sm text-slate-500">{result.symbol}</p>
              </div>
              <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${getRiskColor(result.riskLevel).lightBg} ${getRiskColor(result.riskLevel).text} border ${getRiskColor(result.riskLevel).border}`}>
                {getRiskColor(result.riskLevel).label}
              </div>
            </div>
            <p className="text-xs text-slate-400 font-mono break-all">{result.address}</p>
          </div>

          {/* Medidor */}
          <RiskMeter analysis={result} />

          {/* Resumen humano */}
          <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
            <h3 className="text-sm font-bold text-blue-800 mb-2">💭 En palabras simples</h3>
            <p className="text-sm text-blue-900 leading-relaxed">{result.humanSummary}</p>
          </div>

          {/* Advertencias */}
          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-3">
              {result.checks.length} {result.checks.length === 1 ? "señal encontrada" : "señales encontradas"}
            </h3>
            <div className="space-y-3">
              {result.checks.map((check, i) => (
                <WarningCard key={check.id} check={check} index={i} />
              ))}
            </div>
          </div>

          {/* Recomendación final */}
          <div className={`rounded-2xl border p-6 ${
            result.riskLevel === "critical"
              ? "bg-red-50 border-red-200"
              : result.riskLevel === "high"
              ? "bg-orange-50 border-orange-200"
              : result.riskLevel === "medium"
              ? "bg-amber-50 border-amber-200"
              : "bg-emerald-50 border-emerald-200"
          }`}>
            <h3 className="text-sm font-bold mb-2 text-slate-800">✅ Recomendación</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{result.recommendation}</p>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <button
              onClick={copyReport}
              className="flex-1 bg-slate-100 text-slate-700 font-medium px-4 py-3 rounded-xl text-sm hover:bg-slate-200 transition-colors border border-slate-200"
            >
              📋 Copiar reporte
            </button>
            <button
              onClick={() => {
                setResult(null);
                setAddress("");
              }}
              className="flex-1 bg-blue-600 text-white font-medium px-4 py-3 rounded-xl text-sm hover:bg-blue-700 transition-colors shadow-sm"
            >
              🔍 Analizar otro token
            </button>
          </div>

          {/* Disclaimer */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              <strong>Disclaimer:</strong> Esta herramienta no es asesoría financiera. No garantiza que un token sea seguro o fraudulento. Solo analiza señales de riesgo disponibles públicamente para ayudar a tomar decisiones más informadas. Un token puede parecer seguro ahora y cambiar después.
            </p>
          </div>

          {/* Explicaciones */}
          <HumanExplanation />
        </div>
      )}
    </div>
  );
}
