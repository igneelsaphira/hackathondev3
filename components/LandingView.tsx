"use client";

import { useState } from "react";

interface Props {
  onModeSelect: (mode: "seller" | "buyer") => void;
}

export default function LandingView({ onModeSelect }: Props) {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-8">
        <div
          className="inline-block text-[11px] font-semibold tracking-[0.1em] uppercase mb-5 px-4 py-1.5 rounded-full"
          style={{ color: "#c9a96e", border: "1px solid rgba(201,169,110,0.3)", background: "rgba(201,169,110,0.06)" }}
        >
          Hackathon Dev3pack x ChileDAO
        </div>
        <h1 className="font-display text-5xl md:text-[56px] font-black leading-[1.05] mb-4" style={{ color: "#f5f7fb" }}>
          PagaSimple
        </h1>
        <p className="text-base leading-relaxed max-w-lg mx-auto" style={{ color: "#8a94a8" }}>
          Paga con crypto sin que el vendedor sepa qué es crypto. 
          Tú usas SOL, él recibe dólares digitales (USDC). 
          Sin comisiones de banco, sin esperar.
        </p>
      </div>

      {/* Problem cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProblemCard
          emoji="🚨"
          title="Yape cobra"
          text="Las apps de pago se quedan con un % de cada venta."
        />
        <ProblemCard
          emoji="🤔"
          title="El vendedor no entiende crypto"
          text="No quiere saber qué es un wallet ni un token."
        />
        <ProblemCard
          emoji="⏰"
          title="Transferencias tardan"
          text="Los bancos tardan horas o días en fines de semana."
        />
      </div>

      {/* Solution */}
      <div
        className="rounded-2xl border p-8 text-center"
        style={{ background: "rgba(201,169,110,0.04)", borderColor: "rgba(201,169,110,0.12)" }}
      >
        <h2 className="text-xl font-bold mb-3" style={{ color: "#c9a96e" }}>
          ✅ La solución
        </h2>
        <p className="text-sm leading-relaxed max-w-md mx-auto mb-6" style={{ color: "#a0aec0" }}>
          Tú pagas con SOL → la app lo convierte automáticamente a USDC → el vendedor recibe dólares digitales estables. 
          Él los puede cambiar a pesos cuando quiera. Todo en segundos.
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
          emoji="🏧"
          title="Soy vendedor"
          subtitle="Quiero recibir pagos"
          desc="Genera un link o QR para que te paguen. Recibes USDC directo a tu wallet."
          onClick={() => onModeSelect("seller")}
        />
        <ModeCard
          emoji="👤"
          title="Soy comprador"
          subtitle="Quiero pagar algo"
          desc="Paga con SOL y la app hace la conversión automática. El vendedor recibe USDC."
          onClick={() => onModeSelect("buyer")}
        />
      </div>

      {/* Demo hint */}
      <div className="text-center">
        <p className="text-xs" style={{ color: "#4a5568" }}>
          💡 Tip: En la hackathon, prueba el flujo completo — genera un pago como vendedor y luego págalo como comprador.
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
