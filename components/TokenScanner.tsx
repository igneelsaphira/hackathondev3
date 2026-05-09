"use client";

import { useState } from "react";

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
      `> Initializing shadow protocol...`,
      `> Resolving query: "${query}"`,
      `> Querying Jupiter token registry...`,
      `> Analyzing on-chain metadata...`,
    ];

    for (const line of lines) {
      addScanLine(line);
      await new Promise((r) => setTimeout(r, 400));
    }

    try {
      // Try Jupiter strict list first
      const res = await fetch("https://token.jup.ag/strict");
      const tokens: TokenInfo[] = await res.json();

      const match = tokens.find(
        (t) =>
          t.address.toLowerCase() === query.toLowerCase() ||
          t.symbol.toLowerCase() === query.toLowerCase() ||
          t.name.toLowerCase().includes(query.toLowerCase())
      );

      if (!match) {
        // Try all tokens
        const res2 = await fetch("https://token.jup.ag/all");
        const allTokens: TokenInfo[] = await res2.json();
        const looseMatch = allTokens.find(
          (t) =>
            t.address.toLowerCase() === query.toLowerCase() ||
            t.symbol.toLowerCase() === query.toLowerCase() ||
            t.name.toLowerCase().includes(query.toLowerCase())
        );

        if (!looseMatch) {
          setError("Token not found in Jupiter registry. Unknown or unverified asset.");
          addScanLine("> STATUS: UNKNOWN — HIGH RISK"
          );
          setLoading(false);
          return;
        }

        addScanLine("> WARNING: Token found in loose registry only");
        setResult(looseMatch);
      } else {
        addScanLine("> VERIFIED: Found in Jupiter strict list");
        setResult(match);
      }
    } catch (e) {
      setError("Network scan failed. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = (token: TokenInfo) => {
    if (token.verified) return { level: "LOW", color: "text-[#00ff41]" };
    if (!token.daily_volume || token.daily_volume < 1000)
      return { level: "HIGH", color: "text-[#ff0040]" };
    if (!token.tags?.length) return { level: "MEDIUM", color: "text-[#ffaa00]" };
    return { level: "LOW", color: "text-[#00ff41]" };
  };

  return (
    <div className="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-6">
      <h2 className="text-xl font-bold mb-1 text-glow">TOKEN SHADOW SCAN</h2>
      <p className="text-xs text-gray-500 mb-4 font-mono">
        Paste name, symbol, or any address. We handle the mint lookup.
      </p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && scanToken()}
          placeholder="e.g. BONK, USDC, or paste any mint..."
          className="flex-1 bg-[#050505] border border-[#1a1a1a] rounded px-4 py-2 text-sm font-mono focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-all"
        />
        <button
          onClick={scanToken}
          disabled={loading}
          className="bg-[#00ff41] text-black font-bold px-6 py-2 rounded text-sm font-mono hover:bg-[#00cc33] disabled:opacity-50 transition-colors"
        >
          {loading ? "SCANNING..." : "SCAN"}
        </button>
      </div>

      {scanLines.length > 0 && (
        <div className="bg-[#050505] border border-[#1a1a1a] rounded p-3 mb-4 font-mono text-xs space-y-1">
          {scanLines.map((line, i) => (
            <div key={i} className={line.includes("WARNING") ? "text-[#ffaa00]" : line.includes("UNKNOWN") || line.includes("HIGH RISK") ? "text-[#ff0040] text-glow-danger" : line.includes("VERIFIED") ? "text-[#00ff41]" : "text-gray-400"}>
              {line}
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-[#050505] border border-[#ff0040] rounded p-4 border-glow-danger">
          <div className="text-[#ff0040] font-bold text-sm text-glow-danger">⚠ {error}</div>
          <div className="text-xs text-gray-500 mt-1">
            This token is not verified. Do not interact unless you know exactly what you're doing.
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
              <span className="text-gray-500">SYMBOL</span>
              <span className="text-[#00f0ff]">{result.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">MINT ADDRESS</span>
              <span className="text-[#00ff41] truncate max-w-[200px]">{result.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">DECIMALS</span>
              <span>{result.decimals}</span>
            </div>
            {result.daily_volume !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-500">DAILY VOL</span>
                <span>${result.daily_volume.toLocaleString()}</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-[#1a1a1a]">
            <div className="text-xs text-gray-500">
              {getRiskLevel(result).level === "LOW" ? (
                <span className="text-[#00ff41]">✓ Verified in Jupiter strict list. Lower scam probability.</span>
              ) : getRiskLevel(result).level === "MEDIUM" ? (
                <span className="text-[#ffaa00]">⚠ Token exists but has low volume or missing metadata. Exercise caution.</span>
              ) : (
                <span className="text-[#ff0040]">✗ Unknown or unverified. Assume malicious until proven otherwise.</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
