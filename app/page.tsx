import TokenAnalyzer from "@/components/TokenAnalyzer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              AC
            </div>
            <span className="font-bold text-slate-800">Antes de Comprar</span>
          </div>
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
            Hackathon MVP
          </span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Revisa antes de invertir
          </h1>
          <p className="text-base text-slate-500 max-w-lg mx-auto leading-relaxed">
            Si una app puede dejarte comprar una moneda, también debería ayudarte a entender si podrás salir. 
            Traducimos señales técnicas en advertencias que cualquiera puede entender.
          </p>
        </div>

        {/* Analizador */}
        <TokenAnalyzer />

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200 text-center space-y-3">
          <p className="text-xs text-slate-400">
            Hecho para hackathon. No es asesoría financiera. DYOR.
          </p>
          <p className="text-[11px] text-slate-300">
            Los datos se consultan en tiempo real cuando es posible. Algunas señales requieren verificación manual.
          </p>
        </div>
      </div>
    </main>
  );
}
