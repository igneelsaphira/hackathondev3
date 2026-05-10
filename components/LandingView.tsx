"use client";

import { t, Lang } from "@/lib/translations";

interface Props {
  lang: Lang;
  onModeSelect: (mode: "seller" | "buyer") => void;
}

export default function LandingView({ lang, onModeSelect }: Props) {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-8">
        <div
          className="inline-block text-[11px] font-semibold tracking-[0.1em] uppercase mb-5 px-4 py-1.5 rounded-full"
          style={{ color: "#c9a96e", border: "1px solid rgba(201,169,110,0.3)", background: "rgba(201,169,110,0.06)" }}
        >
          {t(lang, "heroBadge")}
        </div>
        <h1 className="font-display text-5xl md:text-[56px] font-black leading-[1.05] mb-4" style={{ color: "#f5f7fb" }}>
          {t(lang, "heroTitle")}
        </h1>
        <p className="text-base leading-relaxed max-w-lg mx-auto" style={{ color: "#8a94a8" }}>
          {t(lang, "heroSubtitle")}
        </p>
      </div>

      {/* Problem cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProblemCard
          emoji="🚨"
          title={t(lang, "problem1Title")}
          text={t(lang, "problem1Text")}
        />
        <ProblemCard
          emoji="🤔"
          title={t(lang, "problem2Title")}
          text={t(lang, "problem2Text")}
        />
        <ProblemCard
          emoji="⏰"
          title={t(lang, "problem3Title")}
          text={t(lang, "problem3Text")}
        />
      </div>

      {/* Solution */}
      <div
        className="rounded-2xl border p-8 text-center"
        style={{ background: "rgba(201,169,110,0.04)", borderColor: "rgba(201,169,110,0.12)" }}
      >
        <h2 className="text-xl font-bold mb-3" style={{ color: "#c9a96e" }}>
          {t(lang, "solutionTitle")}
        </h2>
        <p className="text-sm leading-relaxed max-w-md mx-auto mb-6" style={{ color: "#a0aec0" }}>
          {t(lang, "solutionText")}
        </p>
        <div className="flex justify-center gap-3 text-2xl">
          <span>💳</span>
          <span style={{ color: "#4a5568" }}>→</span>
          <span>⚡</span>
          <span style={{ color: "#4a5568" }}>→</span>
          <span>💵</span>
        </div>
      </div>

      {/* Mode selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ModeCard
          emoji="🏪"
          title={t(lang, "sellerCardTitle")}
          subtitle={t(lang, "sellerCardSubtitle")}
          desc={t(lang, "sellerCardDesc")}
          onClick={() => onModeSelect("seller")}
        />
        <ModeCard
          emoji="👤"
          title={t(lang, "buyerCardTitle")}
          subtitle={t(lang, "buyerCardSubtitle")}
          desc={t(lang, "buyerCardDesc")}
          onClick={() => onModeSelect("buyer")}
        />
      </div>

      {/* Demo hint */}
      <div className="text-center">
        <p className="text-xs" style={{ color: "#4a5568" }}>
          {t(lang, "demoHint")}
        </p>
      </div>
    </div>
  );
}

function ProblemCard({ emoji, title, text }: { emoji: string; title: string; text: string }) {
  return (
    <div
      className="rounded-xl p-5 text-center"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="text-sm font-semibold mb-1.5" style={{ color: "#e8ecf4" }}>{title}</h3>
      <p className="text-xs leading-relaxed" style={{ color: "#6b7a94" }}>{text}</p>
    </div>
  );
}

function ModeCard({
  emoji,
  title,
  subtitle,
  desc,
  onClick,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl p-6 text-left transition-all hover:shadow-lg w-full"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="text-lg font-bold mb-0.5" style={{ color: "#f5f7fb" }}>{title}</h3>
      <p className="text-xs font-medium mb-2" style={{ color: "#c9a96e" }}>{subtitle}</p>
      <p className="text-sm leading-relaxed" style={{ color: "#8a94a8" }}>{desc}</p>
    </button>
  );
}
