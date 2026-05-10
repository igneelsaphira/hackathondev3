"use client";

import { useState } from "react";
import LandingView from "@/components/LandingView";
import SellerView from "@/components/SellerView";
import BuyerView from "@/components/BuyerView";
import { PaymentData } from "@/components/SellerView";
import { useLang } from "@/lib/useLang";
import { t, Lang } from "@/lib/translations";

export default function Home() {
  const [mode, setMode] = useState<"landing" | "seller" | "buyer">("landing");
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [lang, toggleLang] = useLang();

  return (
    <main className="min-h-screen" style={{ background: "#0c1222" }}>
      {/* Navbar */}
      <nav
        className="border-b border-white/5 sticky top-0 z-50"
        style={{ background: "rgba(12,18,34,0.9)", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between">
          <button
            onClick={() => setMode("landing")}
            className="flex items-center gap-3"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #c9a96e, #a08050)" }}
            >
              PS
            </div>
            <span
              className="font-semibold text-sm tracking-wide"
              style={{ color: "#e8ecf4" }}
            >
              {t(lang, "navTitle")}
            </span>
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="text-xs font-medium px-3 py-1.5 rounded-full transition-colors hover:opacity-80"
              style={{
                color: "#c9a96e",
                border: "1px solid rgba(201,169,110,0.3)",
                background: "rgba(201,169,110,0.06)",
              }}
            >
              {lang === "es" ? "ES → EN" : "EN → ES"}
            </button>
            <span
              className="text-[11px] font-medium tracking-wider uppercase px-3 py-1 rounded-full hidden sm:inline-block"
              style={{
                color: "#8a94a8",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {t(lang, "navBadge")}
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-5 py-10">
        {mode === "landing" && (
          <LandingView
            lang={lang}
            onModeSelect={(m) => {
              setMode(m);
              setPayment(null);
            }}
          />
        )}
        {mode === "seller" && (
          <SellerView
            lang={lang}
            onBack={() => setMode("landing")}
            onPaymentCreated={(p) => setPayment(p)}
          />
        )}
        {mode === "buyer" && (
          <BuyerView
            lang={lang}
            onBack={() => setMode("landing")}
            initialPayment={payment}
          />
        )}

        {/* Footer */}
        <div
          className="mt-16 pt-8 text-center space-y-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs" style={{ color: "#4a5568" }}>
            {t(lang, "footerMade")}
          </p>
          <p className="text-[11px]" style={{ color: "#2d3748" }}>
            {t(lang, "footerVia")}
          </p>
        </div>
      </div>
    </main>
  );
}
