"use client";

import { useState } from "react";

interface Props {
  onBack: () => void;
  onPaymentCreated: (data: PaymentData) => void;
}

export interface PaymentData {
  amountClp: number;
  amountUsd: number;
  solPrice: number;
  sellerAddress: string;
  itemName: string;
  paymentId: string;
}

// Mock: precio SOL en CLP (actualizar con API real)
const SOL_TO_CLP = 185000;
const USD_TO_CLP = 920;

export default function SellerView({ onBack, onPaymentCreated }: Props) {
  const [amount, setAmount] = useState("");
  const [itemName, setItemName] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [step, setStep] = useState<"form" | "link">("form");
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  const handleCreate = () => {
    const clp = parseInt(amount);
    if (!clp || clp < 1000) return;

    const usd = clp / USD_TO_CLP;
    const solNeeded = clp / SOL_TO_CLP;
    const id = Math.random().toString(36).substring(2, 10).toUpperCase();

    const data: PaymentData = {
      amountClp: clp,
      amountUsd: usd,
      solPrice: solNeeded,
      sellerAddress: sellerAddress || "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      itemName: itemName || "Producto",
      paymentId: id,
    };

    setPaymentData(data);
    setStep("link");
    onPaymentCreated(data);
  };

  const copyLink = () => {
    if (!paymentData) return;
    const link = `${typeof window !== "undefined" ? window.location.origin : ""}?pay=${paymentData.paymentId}`;
    navigator.clipboard.writeText(link);
  };

  if (step === "link" && paymentData) {
    return (
      <div className="space-y-6">
        <button onClick={onBack} className="text-sm font-medium flex items-center gap-1.5" style={{ color: "#8a94a8" }}>
          ← Volver
        </button>

        <div
          className="rounded-2xl border p-8 text-center"
          style={{ background: "rgba(72,187,120,0.04)", borderColor: "rgba(72,187,120,0.15)" }}
        >
          <div className="text-4xl mb-3">🎉</div>
          <h2 className="text-xl font-bold mb-2" style={{ color: "#68d391" }}>
            ¡Link de pago listo!
          </h2>
          <p className="text-sm mb-6" style={{ color: "#8a94a8" }}>
            Comparte este link con tu comprador. Él paga con SOL y tú recibes USDC.
          </p>

          <div
            className="rounded-xl p-5 mb-6 text-left"
            style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-medium" style={{ color: "#6b7a94" }}>Monto</span>
              <span className="text-lg font-bold" style={{ color: "#f5f7fb" }}>
                ${paymentData.amountClp.toLocaleString("es-CL")} CLP
              </span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-medium" style={{ color: "#6b7a94" }}>≈</span>
              <span className="text-sm" style={{ color: "#8a94a8" }}>
                {paymentData.amountUsd.toFixed(2)} USDC
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium" style={{ color: "#6b7a94" }}>Producto</span>
              <span className="text-sm font-medium" style={{ color: "#e8ecf4" }}>{paymentData.itemName}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={copyLink}
              className="flex-1 font-medium px-4 py-3 rounded-xl text-sm border transition-colors"
              style={{
                background: "rgba(255,255,255,0.03)",
                color: "#8a94a8",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              📋 Copiar link
            </button>
            <button
              onClick={onBack}
              className="flex-1 font-bold px-4 py-3 rounded-xl text-sm transition-all"
              style={{
                background: "linear-gradient(135deg, #c9a96e, #a08050)",
                color: "#0c1222",
              }}
            >
              Crear otro
            </button>
          </div>

          {/* Simulated QR */}
          <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-xs mb-3" style={{ color: "#4a5568" }}>Código QR simulado</p>
            <div
              className="w-40 h-40 mx-auto rounded-xl flex items-center justify-center"
              style={{ background: "#fff", padding: 8 }}
            >
              <div className="w-full h-full grid grid-cols-6 grid-rows-6 gap-0.5">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-sm"
                    style={{
                      background: Math.random() > 0.4 ? "#0c1222" : "transparent",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
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
        Recibir un pago
      </h2>
      <p className="text-sm" style={{ color: "#8a94a8" }}>
        Ingresa los datos y genera un link para que te paguen.
      </p>

      <div
        className="rounded-2xl border p-6 space-y-5"
        style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#8a94a8" }}>
            📋 ¿Qué vendes?
          </label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Ej: Café con leche, Zapatillas Nike..."
            className="w-full rounded-xl px-4 py-3.5 text-sm outline-none"
            style={{
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#e8ecf4",
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#8a94a8" }}>
            💰 ¿Cuánto cuesta? (CLP)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ej: 3500"
            className="w-full rounded-xl px-4 py-3.5 text-sm outline-none font-mono"
            style={{
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#e8ecf4",
            }}
          />
          {amount && parseInt(amount) > 0 && (
            <p className="text-xs mt-2" style={{ color: "#6b7a94" }}>
              ≈ ${(parseInt(amount) / USD_TO_CLP).toFixed(2)} USDC · ≈ {(parseInt(amount) / SOL_TO_CLP).toFixed(4)} SOL
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#8a94a8" }}>
            👥 Tu dirección de wallet (opcional para demo)
          </label>
          <input
            type="text"
            value={sellerAddress}
            onChange={(e) => setSellerAddress(e.target.value)}
            placeholder="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
            className="w-full rounded-xl px-4 py-3.5 text-sm outline-none font-mono text-xs"
            style={{
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#e8ecf4",
            }}
          />
        </div>

        <button
          onClick={handleCreate}
          disabled={!amount || parseInt(amount) < 1000}
          className="w-full font-bold px-4 py-4 rounded-xl text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #c9a96e, #a08050)",
            color: "#0c1222",
          }}
        >
          🔗 Generar link de pago
        </button>
      </div>
    </div>
  );
}
