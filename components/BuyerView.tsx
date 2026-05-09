"use client";

import { useState } from "react";
import { PaymentData } from "./SellerView";

interface Props {
  onBack: () => void;
  initialPayment?: PaymentData | null;
}

const SOL_TO_CLP = 185000;
const USD_TO_CLP = 920;

export default function BuyerView({ onBack, initialPayment }: Props) {
  const [step, setStep] = useState<"input" | "review" | "processing" | "success">(
    initialPayment ? "review" : "input"
  );
  const [paymentId, setPaymentId] = useState(initialPayment?.paymentId || "");
  const [payment, setPayment] = useState<PaymentData | null>(initialPayment || null);
  const [txHash, setTxHash] = useState("");

  // Demo payment data
  const demoPayments: Record<string, PaymentData> = {
    DEMO1: {
      amountClp: 3500,
      amountUsd: 3.80,
      solPrice: 0.0189,
      sellerAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      itemName: "Café con leche + croissant",
      paymentId: "DEMO1",
    },
    DEMO2: {
      amountClp: 45000,
      amountUsd: 48.91,
      solPrice: 0.2432,
      sellerAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      itemName: "Zapatillas usadas talla 42",
      paymentId: "DEMO2",
    },
    DEMO3: {
      amountClp: 120000,
      amountUsd: 130.43,
      solPrice: 0.6486,
      sellerAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      itemName: "Clases de guitarra - 4 sesiones",
      paymentId: "DEMO3",
    },
  };

  const handleLookup = () => {
    const id = paymentId.trim().toUpperCase();
    if (demoPayments[id]) {
      setPayment(demoPayments[id]);
      setStep("review");
      return;
    }
    // For any input, create a mock payment
    const mock: PaymentData = {
      amountClp: 5000,
      amountUsd: 5.43,
      solPrice: 0.027,
      sellerAddress: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      itemName: "Producto",
      paymentId: id,
    };
    setPayment(mock);
    setStep("review");
  };

  const handlePay = async () => {
    if (!payment) return;
    setStep("processing");

    // Simulate swap + transfer
    await new Promise((r) => setTimeout(r, 2500));

    // Mock tx hash
    const hash = "5" + Array.from({ length: 87 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join("");
    setTxHash(hash);
    setStep("success");
  };

  if (step === "success" && payment) {
    return (
      <div className="space-y-6">
        <button onClick={onBack} className="text-sm font-medium flex items-center gap-1.5" style={{ color: "#8a94a8" }}>
          ← Volver
        </button>

        <div
          className="rounded-2xl border p-8 text-center"
          style={{ background: "rgba(72,187,120,0.04)", borderColor: "rgba(72,187,120,0.15)" }}
        >
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#68d391" }}>
            ¡Pago completado!
          </h2>
          <p className="text-sm mb-6" style={{ color: "#8a94a8" }}>
            El vendedor ya recibió sus USDC. Todo fue automático.
          </p>

          <div
            className="rounded-xl p-5 mb-6 text-left space-y-3"
            style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex justify-between">
              <span className="text-xs" style={{ color: "#6b7a94" }}>Producto</span>
              <span className="text-sm font-medium" style={{ color: "#e8ecf4" }}>{payment.itemName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs" style={{ color: "#6b7a94" }}>Tú pagaste</span>
              <span className="text-sm font-medium" style={{ color: "#e8ecf4" }}>{payment.solPrice.toFixed(4)} SOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs" style={{ color: "#6b7a94" }}>Vendedor recibió</span>
              <span className="text-sm font-medium" style={{ color: "#68d391" }}>{payment.amountUsd.toFixed(2)} USDC</span>
            </div>
            <div className="pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="text-xs" style={{ color: "#4a5568" }}>Hash de transacción</span>
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
            Hacer otro pago
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
          <p className="text-sm font-medium mb-1" style={{ color: "#e8ecf4" }}>Procesando pago...</p>
          <p className="text-xs" style={{ color: "#6b7a94" }}>
            1. Swapeando SOL → USDC via Jupiter
          </p>
          <p className="text-xs" style={{ color: "#6b7a94" }}>
            2. Transfiriendo USDC al vendedor
          </p>
          <p className="text-xs mt-2" style={{ color: "#4a5568" }}>Esto tarda unos segundos</p>
        </div>
      </div>
    );
  }

  if (step === "review" && payment) {
    return (
      <div className="space-y-5">
        <button onClick={() => setStep("input")} className="text-sm font-medium flex items-center gap-1.5" style={{ color: "#8a94a8" }}>
          ← Volver
        </button>

        <h2 className="font-display text-2xl font-bold" style={{ color: "#f5f7fb" }}>
          Revisar pago
        </h2>

        <div
          className="rounded-2xl border p-6 space-y-4"
          style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex justify-between items-center pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-sm" style={{ color: "#8a94a8" }}>Producto</span>
            <span className="text-base font-semibold" style={{ color: "#f5f7fb" }}>{payment.itemName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: "#8a94a8" }}>Precio</span>
            <span className="text-2xl font-bold font-display" style={{ color: "#f5f7fb" }}>
              ${payment.amountClp.toLocaleString("es-CL")} <span className="text-sm font-body font-normal" style={{ color: "#6b7a94" }}>CLP</span>
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: "#8a94a8" }}>Vendedor recibe</span>
            <span className="text-lg font-bold" style={{ color: "#68d391" }}>{payment.amountUsd.toFixed(2)} USDC</span>
          </div>
          <div className="flex justify-between items-center pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-sm" style={{ color: "#8a94a8" }}>Tú pagas</span>
            <span className="text-lg font-bold" style={{ color: "#f6ad55" }}>{payment.solPrice.toFixed(4)} SOL</span>
          </div>

          {/* Swap explanation */}
          <div
            className="rounded-xl p-4 text-xs leading-relaxed"
            style={{ background: "rgba(201,169,110,0.04)", border: "1px solid rgba(201,169,110,0.1)", color: "#a0aec0" }}
          >
            <strong style={{ color: "#c9a96e" }}>¿Qué pasa aquí?</strong>
            <br />
            Tu wallet tiene SOL. La app va a usar Jupiter para cambiar esos SOL a USDC automáticamente, 
            y luego enviar los USDC al vendedor. Todo en una sola transacción.
          </div>

          <button
            onClick={handlePay}
            className="w-full font-bold px-4 py-4 rounded-xl text-sm transition-all"
            style={{
              background: "linear-gradient(135deg, #c9a96e, #a08050)",
              color: "#0c1222",
            }}
          >
            💳 Pagar {payment.solPrice.toFixed(4)} SOL
          </button>

          <p className="text-[11px] text-center" style={{ color: "#4a5568" }}>
            En modo demo la transacción es simulada. En producción usaría tu wallet Phantom.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="text-sm font-medium flex items-center gap-1.5" style={{ color: "#8a94a8" }}>
        ← Volver al inicio
      </button>

      <h2 className="font-display text-2xl font-bold" style={{ color: "#f5f7fb" }}>
        Pagar algo
      </h2>
      <p className="text-sm" style={{ color: "#8a94a8" }}>
        Ingresa el código del pago o prueba con un ejemplo.
      </p>

      <div
        className="rounded-2xl border p-6 space-y-5"
        style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#8a94a8" }}>
            🔍 Código de pago
          </label>
          <input
            type="text"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLookup()}
            placeholder="Ej: DEMO1"
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
          Buscar pago
        </button>
      </div>

      {/* Quick demos */}
      <div>
        <p className="text-xs font-medium mb-3" style={{ color: "#6b7a94" }}>
          Prueba con un ejemplo:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <DemoPayButton
            data={demoPayments.DEMO1}
            onClick={() => {
              setPayment(demoPayments.DEMO1);
              setStep("review");
            }}
          />
          <DemoPayButton
            data={demoPayments.DEMO2}
            onClick={() => {
              setPayment(demoPayments.DEMO2);
              setStep("review");
            }}
          />
          <DemoPayButton
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

function DemoPayButton({ data, onClick }: { data: PaymentData; onClick: () => void }) {
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
        ${data.amountClp.toLocaleString("es-CL")}
      </div>
      <div className="text-[10px] mt-0.5" style={{ color: "#4a5568" }}>
        {data.solPrice.toFixed(4)} SOL → {data.amountUsd.toFixed(2)} USDC
      </div>
    </button>
  );
}
