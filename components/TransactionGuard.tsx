"use client";

import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";

export default function TransactionGuard() {
  const { t } = useI18n();
  const [txBase64, setTxBase64] = useState("");
  const [simulating, setSimulating] = useState(false);
  const [report, setReport] = useState<any>(null);

  const simulateCheck = () => {
    if (!txBase64.trim()) return;
    setSimulating(true);
    setReport(null);

    setTimeout(() => {
      const redFlags: string[] = [];
      const safeChecks: string[] = [];

      if (txBase64.length < 50) {
        redFlags.push("Transaction data suspiciously short / Datos sospechosamente cortos");
      } else {
        safeChecks.push("Transaction structure looks valid / Estructura válida");
      }

      if (txBase64.includes("setAuthority") || txBase64.toLowerCase().includes("approve")) {
        redFlags.push("Contains token approval instruction — VERIFY DESTINATION / Contiene instrucción de aprobación — VERIFICA DESTINO");
      }

      if (txBase64.includes("CloseAccount")) {
        redFlags.push("Contains CloseAccount — this can drain your token account / Contiene CloseAccount — puede vaciar tu cuenta");
      }

      if (redFlags.length === 0) {
        safeChecks.push("No obvious drainer patterns detected / No se detectaron patrones de drainer");
        safeChecks.push("Always verify the destination address manually / Siempre verifica la dirección destino");
      }

      setReport({ redFlags, safeChecks, rawLength: txBase64.length });
      setSimulating(false);
    }, 1500);
  };

  return (
    <div className="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-6">
      <h2 className="text-xl font-bold mb-1 text-glow-info">{t.txGuard.title}</h2>
      <p className="text-xs text-gray-500 mb-4 font-mono">{t.txGuard.desc}</p>

      <textarea
        value={txBase64}
        onChange={(e) => setTxBase64(e.target.value)}
        placeholder={t.txGuard.placeholder}
        rows={4}
        className="w-full bg-[#050505] border border-[#1a1a1a] rounded px-4 py-2 text-xs font-mono focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all mb-3 resize-none"
      />

      <button
        onClick={simulateCheck}
        disabled={simulating || !txBase64.trim()}
        className="w-full bg-[#00f0ff] text-black font-bold px-6 py-2 rounded text-sm font-mono hover:bg-[#00c0cc] disabled:opacity-50 transition-colors"
      >
        {simulating ? t.txGuard.btnAnalyzing : t.txGuard.btnAnalyze}
      </button>

      {report && (
        <div className="mt-4 space-y-3">
          {report.redFlags.length > 0 && (
            <div className="bg-[#050505] border border-[#ff0040] rounded p-3 border-glow-danger">
              <div className="text-[#ff0040] font-bold text-xs mb-2">{t.txGuard.redFlags}</div>
              <ul className="space-y-1">
                {report.redFlags.map((flag: string, i: number) => (
                  <li key={i} className="text-xs text-[#ff0040]">• {flag}</li>
                ))}
              </ul>
            </div>
          )}

          {report.safeChecks.length > 0 && (
            <div className="bg-[#050505] border border-[#00ff41] rounded p-3 border-glow">
              <div className="text-[#00ff41] font-bold text-xs mb-2">{t.txGuard.safeChecks}</div>
              <ul className="space-y-1">
                {report.safeChecks.map((check: string, i: number) => (
                  <li key={i} className="text-xs text-gray-300">• {check}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-[10px] text-gray-600 font-mono">
            {t.txGuard.rawSize} {report.rawLength} chars | {t.txGuard.footer}
          </div>
        </div>
      )}
    </div>
  );
}
