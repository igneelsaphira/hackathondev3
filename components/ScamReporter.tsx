"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/components/I18nProvider";

interface Report {
  id: string;
  name: string;
  mint: string;
  type: string;
  description: string;
  date: string;
}

export default function ScamReporter() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [mint, setMint] = useState("");
  const [scamType, setScamType] = useState("drainer");
  const [description, setDescription] = useState("");
  const [reports, setReports] = useState<Report[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("shadowscan_reports");
    if (saved) {
      try {
        setReports(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveReports = (newReports: Report[]) => {
    setReports(newReports);
    localStorage.setItem("shadowscan_reports", JSON.stringify(newReports));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mint.trim()) return;

    const newReport: Report = {
      id: Date.now().toString(),
      name: name.trim(),
      mint: mint.trim(),
      type: scamType,
      description: description.trim(),
      date: new Date().toLocaleDateString(),
    };

    saveReports([newReport, ...reports]);
    setName("");
    setMint("");
    setDescription("");
    setScamType("drainer");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const typeColors: Record<string, string> = {
    drainer: "bg-[#ff0040]",
    rugpull: "bg-[#ffaa00]",
    fake: "bg-[#00f0ff]",
    other: "bg-gray-500",
  };

  const typeLabels: Record<string, string> = {
    drainer: t.scamReporter.typeDrainer,
    rugpull: t.scamReporter.typeRugpull,
    fake: t.scamReporter.typeFake,
    other: t.scamReporter.typeOther,
  };

  return (
    <div className="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-6">
      <h2 className="text-xl font-bold mb-1 text-glow">{t.scamReporter.title}</h2>
      <p className="text-xs text-gray-500 mb-4 font-mono">{t.scamReporter.desc}</p>

      <form onSubmit={submit} className="space-y-3 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-gray-500 font-mono block mb-1">{t.scamReporter.labelName}</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.scamReporter.placeholderName}
              className="w-full bg-[#050505] border border-[#1a1a1a] rounded px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#00ff41] transition-all"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-500 font-mono block mb-1">{t.scamReporter.labelMint}</label>
            <input
              value={mint}
              onChange={(e) => setMint(e.target.value)}
              placeholder={t.scamReporter.placeholderMint}
              className="w-full bg-[#050505] border border-[#1a1a1a] rounded px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#00ff41] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-gray-500 font-mono block mb-1">{t.scamReporter.labelType}</label>
          <select
            value={scamType}
            onChange={(e) => setScamType(e.target.value)}
            className="w-full bg-[#050505] border border-[#1a1a1a] rounded px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#00ff41] transition-all text-gray-300"
          >
            <option value="drainer">{t.scamReporter.typeDrainer}</option>
            <option value="rugpull">{t.scamReporter.typeRugpull}</option>
            <option value="fake">{t.scamReporter.typeFake}</option>
            <option value="other">{t.scamReporter.typeOther}</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-gray-500 font-mono block mb-1">{t.scamReporter.labelDesc}</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.scamReporter.placeholderDesc}
            rows={2}
            className="w-full bg-[#050505] border border-[#1a1a1a] rounded px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#00ff41] transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#00ff41] text-black font-bold px-6 py-2 rounded text-sm font-mono hover:bg-[#00cc33] transition-colors"
        >
          {t.scamReporter.btnSubmit}
        </button>

        {submitted && (
          <div className="text-xs text-[#00ff41] font-mono text-center animate-pulse">
            {t.scamReporter.submitted}
          </div>
        )}
      </form>

      <div className="border-t border-[#1a1a1a] pt-4">
        <h3 className="text-sm font-bold mb-3 text-gray-300">{t.scamReporter.reportsTitle}</h3>

        {reports.length === 0 ? (
          <div className="text-xs text-gray-600 font-mono text-center py-4">
            {t.scamReporter.noReports}
          </div>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {reports.map((r) => (
              <div key={r.id} className="bg-[#050505] border border-[#1a1a1a] rounded p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-300">{r.name}</span>
                  <span className={`text-[10px] text-white px-2 py-0.5 rounded ${typeColors[r.type] || "bg-gray-500"}`}>
                    {typeLabels[r.type] || r.type}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-gray-500 truncate mb-1">
                  {r.mint}
                </div>
                {r.description && (
                  <div className="text-[10px] text-gray-400 font-mono truncate">{r.description}</div>
                )}
                <div className="text-[9px] text-gray-600 font-mono mt-1">
                  {t.scamReporter.reportedAt}: {r.date}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
