"use client";

import { RiskCheck } from "@/lib/demoData";

interface Props {
  check: RiskCheck;
}

const severityConfig = {
  low: {
    border: "#48bb78",
    bg: "rgba(72,187,120,0.06)",
    titleColor: "#68d391",
    badge: "rgba(72,187,120,0.12)",
    badgeText: "#68d391",
    label: "Tranquilo",
    icon: "✅",
  },
  medium: {
    border: "#ed8936",
    bg: "rgba(237,137,54,0.06)",
    titleColor: "#f6ad55",
    badge: "rgba(237,137,54,0.12)",
    badgeText: "#f6ad55",
    label: "Atención",
    icon: "⚠️",
  },
  high: {
    border: "#ed8936",
    bg: "rgba(237,137,54,0.08)",
    titleColor: "#f6ad55",
    badge: "rgba(237,137,54,0.15)",
    badgeText: "#f6ad55",
    label: "Peligro",
    icon: "🚨",
  },
  critical: {
    border: "#f56565",
    bg: "rgba(245,101,101,0.08)",
    titleColor: "#fc8181",
    badge: "rgba(245,101,101,0.15)",
    badgeText: "#fc8181",
    label: "Crítico",
    icon: "⛔",
  },
};

export default function WarningCard({ check }: Props) {
  const cfg = severityConfig[check.severity];

  return (
    <div
      className="rounded-xl p-5 transition-all hover:shadow-lg"
      style={{
        background: cfg.bg,
        borderLeft: `3px solid ${cfg.border}`,
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderRight: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl shrink-0 mt-0.5">{cfg.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h4 className="font-semibold text-sm" style={{ color: cfg.titleColor }}>
              {check.title}
            </h4>
            <span
              className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide"
              style={{ background: cfg.badge, color: cfg.badgeText }}
            >
              {cfg.label}
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#a0aec0" }}>
            {check.humanText}
          </p>
          <div
            className="text-[11px] mt-2 px-2.5 py-1 rounded inline-block font-mono"
            style={{ color: "#4a5568", background: "rgba(0,0,0,0.25)" }}
          >
            🔧 {check.technicalNote}
          </div>
        </div>
      </div>
    </div>
  );
}
