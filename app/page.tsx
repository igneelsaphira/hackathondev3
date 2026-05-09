import TokenAnalyzer from "@/components/TokenAnalyzer";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "#0c1222" }}>
      {/* Navbar */}
      <nav className="border-b border-white/5 sticky top-0 z-50" style={{ background: "rgba(12,18,34,0.9)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #c9a96e, #a08050)" }}>
              AC
            </div>
            <span className="font-semibold text-sm tracking-wide" style={{ color: "#e8ecf4" }}>Antes de Comprar</span>
          </div>
          <span className="text-[11px] font-medium tracking-wider uppercase px-3 py-1 rounded-full" style={{ color: "#8a94a8", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            Hackathon MVP
          </span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-5 py-12">
        {/* Hero */}
        <div className="mb-12">
          <div
            className="inline-block text-[11px] font-semibold tracking-[0.1em] uppercase mb-5 px-4 py-1.5 rounded-full"
            style={{ color: "#c9a96e", border: "1px solid rgba(201,169,110,0.3)", background: "rgba(201,169,110,0.06)" }}
          >
            Protección para inversores nuevos
          </div>
          <h1
            className="font-display text-5xl md:text-[56px] font-black leading-[1.05] mb-4"
            style={{ color: "#f5f7fb" }}
          >
            Antes de<br />Comprar
          </h1>
          <p className="text-base leading-relaxed max-w-lg" style={{ color: "#8a94a8" }}>
            Si una app puede dejarte comprar una moneda, también debería ayudarte a entender si podrás salir. 
            Traducimos señales técnicas en advertencias que cualquiera puede entender.
          </p>
        </div>

        {/* Analizador */}
        <TokenAnalyzer />

        {/* Footer */}
        <div className="mt-16 pt-8 text-center space-y-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs" style={{ color: "#4a5568" }}>
            Hecho para hackathon. No es asesoría financiera. DYOR.
          </p>
          <p className="text-[11px]" style={{ color: "#2d3748" }}>
            Los datos se consultan en tiempo real cuando es posible.
          </p>
        </div>
      </div>
    </main>
  );
}
