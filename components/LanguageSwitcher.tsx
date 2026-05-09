"use client";

import { useI18n } from "@/components/I18nProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center gap-1 bg-[#0a0a0a] border border-[#1a1a1a] rounded px-1 py-0.5">
      <button
        onClick={() => setLang("en")}
        className={`text-xs font-mono px-2 py-1 rounded transition-colors ${
          lang === "en" ? "bg-[#00ff41] text-black font-bold" : "text-gray-500 hover:text-gray-300"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("es")}
        className={`text-xs font-mono px-2 py-1 rounded transition-colors ${
          lang === "es" ? "bg-[#00ff41] text-black font-bold" : "text-gray-500 hover:text-gray-300"
        }`}
      >
        ES
      </button>
    </div>
  );
}
