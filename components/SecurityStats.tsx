"use client";

import { useI18n } from "@/components/I18nProvider";

export default function SecurityStats() {
  const { t } = useI18n();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-4">
        <div className="text-xs text-gray-500 font-mono mb-1">{t.stats.drainers}</div>
        <div className="text-2xl font-bold text-[#ff0040] text-glow-danger">12,847</div>
        <div className="text-[10px] text-gray-600 mt-1">{t.stats.subtitle1}</div>
      </div>

      <div className="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-4">
        <div className="text-xs text-gray-500 font-mono mb-1">{t.stats.stolen}</div>
        <div className="text-2xl font-bold text-[#ffaa00]">$3.4B</div>
        <div className="text-[10px] text-gray-600 mt-1">{t.stats.subtitle2}</div>
      </div>

      <div className="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-4">
        <div className="text-xs text-gray-500 font-mono mb-1">{t.stats.status}</div>
        <div className="text-2xl font-bold text-[#00ff41] text-glow">{t.stats.protected}</div>
        <div className="text-[10px] text-gray-600 mt-1">{t.stats.subtitle3}</div>
      </div>
    </div>
  );
}
