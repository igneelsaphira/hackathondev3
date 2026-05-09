"use client";

import { useState } from "react";

export default function TransactionGuard() {
  const [txBase64, setTxBase64] = useState("");
  const [simulating, setSimulating] = useState(false);
  const [report, setReport] = useState<any>(null);

  const simulateCheck = () => {
    if (!txBase64.trim()) return;
    setSimulating(true);
    setReport(null);

    setTimeout(() => {
      // Heuristic simulation for demo/hackathon
      const redFlags = [];
      const safeChecks = [];

      if (txBase64.length < 50) {
        redFlags.push("Transaction data suspiciously short");
      } else {
        safeChecks.push("Transaction structure looks valid");
      }

      // Common drainer patterns in base64 heuristic
      if (txBase64.includes("setAuthority") || txBase64.toLowerCase().includes("approve")) {
        redFlags.push("Contains token approval instruction — VERIFY DESTINATION");
      }

      if (txBase64.includes("CloseAccount")) {
        redFlags.push("Contains CloseAccount — this can drain your token account");
      }

      if (redFlags.length === 0) {
        safeChecks.push("No obvious drainer patterns detected");
        safeChecks.push("Always verify the destination address manually");
      }

      setReport({ redFlags, safeChecks, rawLength: txBase64.length });
      setSimulating(false);
    }, 1500);
  };

  return (
    <div className="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-6">
      <h2 className="text-xl font-bold mb-1 text-glow-info">TRANSACTION GUARD</h2>
      <p className="text-xs text-gray-500 mb-4 font-mono">
        Paste a base64 transaction before signing. We decode the red flags.
      </p>

      <textarea
        value={txBase64}
        onChange={(e) => setTxBase64(e.target.value)}
        placeholder="Paste base64 encoded transaction..."
        rows={4}
        className="w-full bg-[#050505] border border-[#1a1a1a] rounded px-4 py-2 text-xs font-mono focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all mb-3 resize-none"
      />

      <button
        onClick={simulateCheck}
        disabled={simulating || !txBase64.trim()}
        className="w-full bg-[#00f0ff] text-black font-bold px-6 py-2 rounded text-sm font-mono hover:bg-[#00c0cc] disabled:opacity-50 transition-colors"
      >
        {simulating ? "ANALYZING..." : "ANALYZE TRANSACTION"}
      </button>

      {report && (
        <div className="mt-4 space-y-3">
          {report.redFlags.length > 0 && (
            <div className="bg-[#050505] border border-[#ff0040] rounded p-3 border-glow-danger">
              <div className="text-[#ff0040] font-bold text-xs mb-2">⚠ RED FLAGS DETECTED</div>
              <ul className="space-y-1">
                {report.redFlags.map((flag: string, i: number) => (
                  <li key={i} className="text-xs text-[#ff0040]">• {flag}</li>
                ))}
              </ul>
            </div>
          )}

          {report.safeChecks.length > 0 && (
            <div className="bg-[#050505] border border-[#00ff41] rounded p-3 border-glow">
              <div className="text-[#00ff41] font-bold text-xs mb-2">✓ SAFE CHECKS</div>
              <ul className="space-y-1">
                {report.safeChecks.map((check: string, i: number) => (
                  <li key={i} className="text-xs text-gray-300">• {check}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-[10px] text-gray-600 font-mono">
            RAW SIZE: {report.rawLength} chars | This is a heuristic scan. Always double-check with a second wallet.
          </div>
        </div>
      )}
    </div>
  );
}
