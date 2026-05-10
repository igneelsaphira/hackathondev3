"use client";

import { useState } from "react";
import { PaymentData } from "./SellerView";
import { t, Lang } from "@/lib/translations";

interface Props {
  lang: Lang;
  onBack: () => void;
  initialPayment?: PaymentData | null;
}

const SOL_TO_CLP = 185000;
const USD_TO_CLP = 920;

export default function BuyerView({ lang, onBack, initialPayment }: Props) {
  const [step, setStep] = useState<"input" | "review" | "processing" | "success">(
    initialPayment ? "review" : "input"
  );
  const [paymentId, setPaymentId] = useState(initialPayment?.paymentId || "");
  const [payment, setPayment] = useState<PaymentData | null>(initialPayment || null);
  const [txHash, setTxHash] = useState("");

  const demoPayments: Record<string, PaymentData> = {
    DEMO1: {
      amountClp: 3500,
      amountUsd: 3.80,
      solPrice: 0.0189,
      sellerAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      itemName: lang === "es" ? "Café con leche + croissant" : "Coffee + croissant",
      paymentId: "DEMO1",
      receiveToken: "USDC",
    },
    DEMO2: {
      amountClp: 45000,
      amountUsd: 48.91,
      solPrice: 0.2432,
      sellerAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      itemName: lang === "es" ? "Zapatillas usadas talla 42" : "Used sneakers size 42",
      paymentId: "DEMO2",
      receiveToken: "USDC",
    },
    DEMO3: {
      amountClp: 120000,
      amountUsd: 130.43,
      solPrice: 0.6486,
      sellerAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      itemName: lang === "es" ? "Clases de guitarra - 4 sesiones" : "Guitar lessons - 4 sessions",
      paymentId: "DEMO3",
      receiveToken: "USDC",
    },
  };

  const handleLookup = () => {
    const id = paymentId.trim().toUpperCase();
    if (demoPayments[id]) {
      setPayment(demoPayments[id]);
      setStep("review");
      return;
    }
    const mock: PaymentData = {
      amountClp: 5000,
      amountUsd: 5.43,
      solPrice: 0.027,
      sellerAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      itemName: lang === "es" ? "Producto" : "Product",
      paymentId: id,
      receiveToken: "USDC",
    };
    setPayment(mock);
    setStep("review");
  };

  const handlePay = async () => {
    if (!payment) return;
    setStep("processing");
    await new Promise((r) => setTimeout(r, 2500));
    const hash = "5" + Array.from({ length: 87 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join("");
    setTxHash(hash);
    setStep("success");
  };

  if (step === "success" && payment) {
    return (
      <div className="space-y-6">
        <button onClick={onBack} className="text-sm font-medium flex items-center gap-1.5" style={{ color: "#8a94a8" }}>
          {t(lang, "sellerBack")}
        </button>

        <div
          className="rounded-2xl border p-8 text-center"
          style={{ background: "rgba(72,187,120,0.04)", borderColor: "rgba(72,187,120,0.15)" }}
        >
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#68d391" }}>
            {t(lang, "successTitle")}
          </h2>
          <p className="text-sm mb-6" style={{ color: "#8a94a8" }}>
            {t(lang, "successDesc")}
          </p>

          <div
            className="rounded-xl p-5 mb-6 text-left space-y-3"
            style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex justify-between">
              <span className="text-xs" style={{ color: "#6b7a94" }}>{t(lang, "product")}</span>
              <span className="text-sm font-medium" style={{ color: "#e8ecf4" }}>{payment.itemName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs" style={{ color: "#6b7a94" }}>{t(lang, "youPaid")}</span>
              <span className="text-sm font-medium" style={{ color: "#e8ecf4" }}>{payment.solPrice.toFixed(4)} SOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs" style={{ color: "#6b7a94" }}>{t(lang, "sellerGot")}</span>
              <span className="text-sm font-medium" style={{ color: "#68d391" }}>{payment.amountUsd.toFixed(2)} USDC</span>
            </div>
            <div className="pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="text-xs" style={{ color: "#4a5568" }}>{t(lang, "txHash")}</span>
              <p className="text-[10px] font-mono mt-1 break-all" style={{ color: "#2d3748" }}>{txHash}</p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="w-full font-bold px-4 py-3.5 rounded-xl text-sm transition-all"
            style={{
              background: "linear-gradient(135deg, #c9a96e, #a08050)",
              color: "#0c1222",
            }}
          >
            {t(lang, "payAgain")}
          </button>
        </div>
      </div>
    );
  }

  if (step === "processing" && payment) {
    return (
      <div className="space-y-6">
        <div
          className="rounded-2xl border p-10 text-center"
          style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="w-10 h-10 rounded-full border-[3px] mx-auto mb-4 animate-spin"
            style={{ borderColor: "rgba(201,169,110,0.2)", borderTopColor: "#c9a96e" }}
          />
          <p className="text-sm font-medium mb-1" style={{ color: "#e8ecf4" }}>{t(lang, "processing")}</p>
          <p className="text-xs" style={{ color: "#6b7a94" }}>{t(lang, "processingStep1")}</p>
          <p className="text-xs" style={{ color: "#6b7a94" }}>{t(lang, "processingStep2")}</p>
          <p className="text-xs mt-2" style={{ color: "#4a5568" }}>{t(lang, "processingWait")}</p>
        </div>
      </div>
    );
  }

  if (step === "review" && payment) {
    return (
      <div className="space-y-5">
        <button onClick={() => setStep("input")} className="text-sm font-medium flex items-center gap-1.5" style={{ color: "#8a94a8" }}>
          {t(lang, "sellerBack")}
        </button>

        <h2 className="font-display text-2xl font-bold" style={{ color: "#f5f7fb" }}>
          {t(lang, "reviewTitle")}
        </h2>

        <div
          className="rounded-2xl border p-6 space-y-4"
          style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex justify-between items-center pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-sm" style={{ color: "#8a94a8" }}>{t(lang, "product")}</span>
            <span className="text-base font-semibold" style={{ color: "#f5f7fb" }}>{payment.itemName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: "#8a94a8" }}>{t(lang, "price")}</span>
            <span className="text-2xl font-bold font-display" style={{ color: "#f5f7fb" }}>
              ${payment.amountClp.toLocaleString(lang === "es" ? "es-CL" : "en-US")} <span className="text-sm font-body font-normal" style={{ color: "#6b7a94" }}>CLP</span>
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: "#8a94a8" }}>{t(lang, "sellerReceives")}</span>
            <span className="text-lg font-bold" style={{ color: "#68d391" }}>{payment.amountUsd.toFixed(2)} USDC</span>
          </div>
          <div className="flex justify-between items-center pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-sm" style={{ color: "#8a94a8" }}>{t(lang, "youPay")}</span>
            <span className="text-lg font-bold" style={{ color: "#f6ad55" }}>{payment.solPrice.toFixed(4)} SOL</span>
          </div>

          <div
            className="rounded-xl p-4 text-xs leading-relaxed"
            style={{ background: "rgba(201,169,110,0.04)", border: "1px solid rgba(201,169,110,0.1)", color: "#a0aec0" }}
          >
            <strong style={{ color: "#c9a96e" }}>{t(lang, "whatHappens")}</strong>
            <br />
            {t(lang, "whatHappensDesc")}
          </div>

          <button
            onClick={handlePay}
            className="w-full font-bold px-4 py-4 rounded-xl text-sm transition-all"
            style={{
              background: "linear-gradient(135deg, #c9a96e, #a08050)",
              color: "#0c1222",
            }}
          >
            {t(lang, "payButton")} {payment.solPrice.toFixed(4)} SOL
          </button>

          <p className="text-[11px] text-center" style={{ color: "#4a5568" }}>
            {t(lang, "demoDisclaimer")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="text-sm font-medium flex items-center gap-1.5" style={{ color: "#8a94a8" }}>
        {t(lang, "buyerBack")}
      </button>

      <h2 className="font-display text-2xl font-bold" style={{ color: "#f5f7fb" }}>
        {t(lang, "buyerTitle")}
      </h2>
      <p className="text-sm" style={{ color: "#8a94a8" }}>
        {t(lang, "buyerDesc")}
      </p>

      <div
        className="rounded-2xl border p-6 space-y-5"
        style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#8a94a8" }}>
            {t(lang, "paymentCode")}
          </label>
          <input
            type="text"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLookup()}
            placeholder={t(lang, "paymentCodePlaceholder")}
            className="w-full rounded-xl px-4 py-3.5 text-sm outline-none font-mono"
            style={{
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#e8ecf4",
            }}
          />
        </div>

        <button
          onClick={handleLookup}
          disabled={!paymentId.trim()}
          className="w-full font-bold px-4 py-3.5 rounded-xl text-sm transition-all disabled:opacity-50"
          style={{
            background: "linear-gradient(135deg, #c9a96e, #a08050)",
            color: "#0c1222",
          }}
        >
          {t(lang, "searchPayment")}
        </button>
      </div>

      <div>
        <p className="text-xs font-medium mb-3" style={{ color: "#6b7a94" }}>
          {t(lang, "tryExample")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <DemoPayButton
            lang={lang}
            data={demoPayments.DEMO1}
            onClick={() => {
              setPayment(demoPayments.DEMO1);
              setStep("review");
            }}
          />
          <DemoPayButton
            lang={lang}
            data={demoPayments.DEMO2}
            onClick={() => {
              setPayment(demoPayments.DEMO2);
              setStep("review");
            }}
          />
          <DemoPayButton
            lang={lang}
            data={demoPayments.DEMO3}
            onClick={() => {
              setPayment(demoPayments.DEMO3);
              setStep("review");
            }}
          />
        </div>
      </div>
    </div>
  );
}

function DemoPayButton({ lang, data, onClick }: { lang: Lang; data: PaymentData; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl p-4 text-left transition-all hover:shadow-lg w-full"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="text-xs font-medium mb-1 truncate" style={{ color: "#e8ecf4" }}>{data.itemName}</div>
      <div className="text-sm font-bold" style={{ color: "#c9a96e" }}>
        ${data.amountClp.toLocaleString(lang === "es" ? "es-CL" : "en-US")}
      </div>
      <div className="text-[10px] mt-0.5" style={{ color: "#4a5568" }}>
        {data.solPrice.toFixed(4)} SOL → {data.amountUsd.toFixed(2)} USDC
      </div>
    </button>
  );
}
