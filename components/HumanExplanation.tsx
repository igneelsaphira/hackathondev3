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
    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">📖 ¿Qué significan estas cosas?</h3>
      <div className="space-y-2">
        {explanations.map((exp, i) => (
          <div key={i} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <span className="text-sm font-medium text-slate-700">{exp.term}</span>
              <span className="text-slate-400 text-lg">{openIndex === i ? "−" : "+"}</span>
            </button>
            {openIndex === i && (
              <div className="px-4 pb-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                {exp.text}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
