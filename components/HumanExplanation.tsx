"use client";

import { useState } from "react";

const explanations = [
  {
    term: "¿Qué es la liquidez?",
    text: "Es la cantidad de dinero real que hay disponible para que puedas comprar o vender el token. Si es muy baja, puedes comprar fácil porque nadie te pone resistencia, pero cuando quieras vender no hay quien te compre y pierdes dinero.",
  },
  {
    term: "¿Qué es 'no poder vender'?",
    text: "Algunos tokens están diseñados para que puedas comprar pero no vender. Es como entrar a una habitación donde la puerta de salida está cerrada. Por eso revisamos si existe una ruta para cambiar el token de vuelta a dinero real (SOL/USDC).",
  },
  {
    term: "¿Qué es mint authority?",
    text: "Es el permiso que tiene el creador del token para 'imprimir' más monedas. Si sigue activo, pueden crear millones de tokens nuevos de la nada, haciendo que los que tú compraste valgan mucho menos.",
  },
  {
    term: "¿Qué es freeze authority?",
    text: "Es el poder que tiene el creador para congelar tu cuenta. En teoría podría impedirte mover o vender tus tokens cuando quiera. Es como que alguien más tenga la llave de tu caja fuerte.",
  },
  {
    term: "¿Qué es 'holders concentrados'?",
    text: "Significa que pocas personas o wallets tienen la mayoría del token. Si una de esas personas grandes vende todo de golpe, el precio se desploma y tú pierdes.",
  },
  {
    term: "¿Y el price impact?",
    text: "Es cuánto baja el precio cuando vendes. Si el token tiene poca liquidez, tu venta misma hace que el precio caiga, y terminas recibiendo mucho menos de lo que esperabas.",
  },
];

export default function HumanExplanation() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      className="rounded-2xl border p-6"
      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <h3 className="text-base font-bold mb-4" style={{ color: "#c9a96e" }}>
        📖 ¿Qué significan estas cosas?
      </h3>
      <div className="space-y-2">
        {explanations.map((exp, i) => (
          <div
            key={i}
            className="rounded-lg overflow-hidden transition-colors"
            style={{
              background: openIndex === i ? "rgba(255,255,255,0.03)" : "transparent",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-sm font-medium" style={{ color: "#e8ecf4" }}>{exp.term}</span>
              <span className="text-lg font-light" style={{ color: "#4a5568" }}>
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            {openIndex === i && (
              <div
                className="px-4 pb-3 text-sm leading-relaxed"
                style={{ color: "#8a94a8", borderTop: "1px solid rgba(255,255,255,0.04)" }}
              >
                {exp.text}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
