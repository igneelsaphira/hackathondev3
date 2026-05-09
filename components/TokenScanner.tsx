"use client";

import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";

interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  tags?: string[];
  verified?: boolean;
  daily_volume?: number;
}

export default function TokenScanner() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TokenInfo | null>(null);
  const [error, setError] = useState("");
  const [scanLines, setScanLines] = useState<string[]>([]);

  const addScanLine = (line: string) => {
    setScanLines((prev) => [...prev.slice(-4), line]);
  };

  const scanToken = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    setScanLines([]);

    const lines = [
      t.tokenScanner.statusInit,
      `${t.tokenScanner.statusResolve} "${query}"`,
      t.tokenScanner.statusJupiter,
      t.tokenScanner.statusAnalyze,
    ];

    for (const line of lines) {
      addScanLine(line);
      await new Promise((r) => setTimeout(r, 400));
    }

    try {
      const res = await fetch("https://token.jup.ag/strict");
      const tokens: TokenInfo[] = await res.json();

      const match = tokens.find(
        (token) =>
          token.address.toLowerCase() === query.toLowerCase() ||
          token.symbol.toLowerCase() === query.toLowerCase() ||
          token.name.toLowerCase().includes(query.toLowerCase())
      );

      if (!match) {
        const res2 = await fetch("https://token.jup.ag/all");
        const allTokens: TokenInfo[] = await res2.json();
        const looseMatch = allTokens.find(
          (token) =>
            token.address.toLowerCase() === query.toLowerCase() ||
            token.symbol.toLowerCase() === query.toLowerCase() ||
            token.name.toLowerCase().includes(query.toLowerCase())
        );

        if (!looseMatch) {
          setError(t.tokenScanner.errNotFound);
          addScanLine(t.tokenScanner.statusUnknown);
          setLoading(false);
          return;
        }

        addScanLine(t.tokenScanner.statusLoose);
        setResult(looseMatch);
      } else {
        addScanLine(t.tokenScanner.statusVerified);
        setResult(match);
      }
    } catch (e) {
      setError(t.tokenScanner.errNetwork);
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = (token: TokenInfo) => {
    if (token.verified) return { level: t.tokenScanner.riskLow, color: "text-[#00ff41]" };
    if (!token.daily_volume || token.daily_volume < 1000)
      return { level: t.tokenScanner.riskHigh, color: "text-[#ff0040]" };
    if (!token.tags?.length) return { level: t.tokenScanner.riskMedium, color: "text-[#ffaa00]" };
    return { level: t.tokenScanner.riskLow, color: "text-[#00ff41]" };
  };

  return (
    <div className="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-6">
      <h2 className="text-xl font-bold mb-1 text-glow">{t.tokenScanner.title}</h2>
      <p className="text-xs text-gray-500 mb-4 font-mono">{t.tokenScanner.desc}</p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && scanToken()}
          placeholder={t.tokenScanner.placeholder}
          className="flex-1 bg-[#050505] border border-[#1a1a1a] rounded px-4 py-2 text-sm font-mono focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-all"
        />
        <button
          onClick={scanToken}
          disabled={loading}
          className="bg-[#00ff41] text-black font-bold px-6 py-2 rounded text-sm font-mono hover:bg-[#00cc33] disabled:opacity-50 transition-colors"
        >
          {loading ? t.tokenScanner.btnScanning : t.tokenScanner.btnScan}
        </button>
      </div>

      {scanLines.length > 0 && (
        <div className="bg-[#050505] border border-[#1a1a1a] rounded p-3 mb-4 font-mono text-xs space-y-1">
          {scanLines.map((line, i) => (
            <div key={i} className={line.includes("WARNING") || line.includes("ADVERTENCIA") ? "text-[#ffaa00]" : line.includes("UNKNOWN") || line.includes("DESCONOCIDO") || line.includes("HIGH RISK") || line.includes("ALTO RIESGO") ? "text-[#ff0040] text-glow-danger" : line.includes("VERIFIED") || line.includes("VERIFICADO") ? "text-[#00ff41]" : "text-gray-400"}>
              {line}
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-[#050505] border border-[#ff0040] rounded p-4 border-glow-danger">
          <div className="text-[#ff0040] font-bold text-sm text-glow-danger">⚠ {error}</div>
          <div className="text-xs text-gray-500 mt-1">
            {t.tokenScanner.msgUnknown}
          </div>
        </div>
      )}

      {result && (
        <div className="bg-[#050505] border border-[#00ff41] rounded p-4 border-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold">{result.name}</span>
            <span className={`text-xs font-bold px-2 py-1 rounded bg-[#111] ${getRiskLevel(result).color}`}>
              RISK: {getRiskLevel(result).level}
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">{t.tokenScanner.labelSymbol}</span>
              <span className="text-[#00f0ff]">{result.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t.tokenScanner.labelMint}</span>
              <span className="text-[#00ff41] truncate max-w-[200px]">{result.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t.tokenScanner.labelDecimals}</span>
              <span>{result.decimals}</span>
            </div>
            {result.daily_volume !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-500">{t.tokenScanner.labelVolume}</span>
                <span>${result.daily_volume.toLocaleString()}</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-[#1a1a1a]">
            <div className="text-xs text-gray-500">
              {getRiskLevel(result).level === t.tokenScanner.riskLow ? (
                <span className="text-[#00ff41]">{t.tokenScanner.msgVerified}</span>
              ) : getRiskLevel(result).level === t.tokenScanner.riskMedium ? (
                <span className="text-[#ffaa00]">{t.tokenScanner.msgMedium}</span>
              ) : (
                <span className="text-[#ff0040]">{t.tokenScanner.msgUnknown}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
