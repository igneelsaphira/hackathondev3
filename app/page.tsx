"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LandingView from "@/components/LandingView";
import SellerView, { PaymentData } from "@/components/SellerView";
import BuyerView from "@/components/BuyerView";
import { useLang } from "@/lib/useLang";
import { t } from "@/lib/translations";

function HomeContent() {
  const [mode, setMode] = useState<"landing" | "seller" | "buyer">("landing");
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [lang, toggleLang] = useLang();
  const searchParams = useSearchParams();

  // Si hay ?pay=XXX en la URL, mostrar directo el BuyerView
  useEffect(() => {
    const payId = searchParams.get("pay");
    if (payId) {
      // En demo: creamos un pago genérico con ese ID
      // En producción real se buscaría en base de datos
      const mockPayment: PaymentData = {
        amountClp: 5000,
        amountUsd: 5.43,
        solPrice: 0.027,
        sellerAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
        itemName: lang === "es" ? "Producto" : "Product",
        paymentId: payId,
        receiveToken: "USDC",
      };
      setPayment(mockPayment);
      setMode("buyer");
    }
  }, [searchParams, lang]);

  return (
    <main className="min-h-screen" style={{ background: "#0c1222" }}>
      {/* Navbar */}
      <nav
        className="border-b border-white/5 sticky top-0 z-50"
        style={{ background: "rgba(12,18,34,0.9)", backdropFilter: "blur(20px)" }}
      >
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between">
          <button
            onClick={() => {
              setMode("landing");
              setPayment(null);
              // Limpiar query param
              if (typeof window !== "undefined") {
                window.history.replaceState({}, "", window.location.pathname);
              }
            }}
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
            onBack={() => {
              setMode("landing");
              setPayment(null);
              if (typeof window !== "undefined") {
                window.history.replaceState({}, "", window.location.pathname);
              }
            }}
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

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0c1222" }}>
        <div
          className="w-10 h-10 rounded-full border-[3px] animate-spin"
          style={{ borderColor: "rgba(201,169,110,0.2)", borderTopColor: "#c9a96e" }}
        />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
