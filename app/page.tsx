import Navbar from "@/components/Navbar";
import TokenScanner from "@/components/TokenScanner";
import TransactionGuard from "@/components/TransactionGuard";
import SecurityStats from "@/components/SecurityStats";
import PermissionScanner from "@/components/PermissionScanner";
import DrainerSimulator from "@/components/DrainerSimulator";
import ScamReporter from "@/components/ScamReporter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <div className="text-center py-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-glow">
            <span className="block">NO MINT ADDRESS?</span>
            <span className="block text-[#00ff41]">NO PROBLEM.</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-mono">
            ShadowScan protects Solana users without requiring deep technical knowledge.
            Search by name. Verify before you sign. Stay alive.
          </p>
        </div>

        <SecurityStats />

        {/* Primary tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TokenScanner />
          <TransactionGuard />
        </div>

        {/* Secondary tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PermissionScanner />
          <DrainerSimulator />
        </div>

        {/* Community */}
        <div className="max-w-2xl mx-auto">
          <ScamReporter />
        </div>

        {/* Footer info */}
        <div className="border-t border-[#1a1a1a] pt-6 pb-8 text-center space-y-2">
          <p className="text-xs text-gray-600 font-mono">
            ShadowScan does not store your data. All scans happen client-side.
          </p>
          <p className="text-[10px] text-gray-700 font-mono">
            Built for hackathon. Not financial advice. DYOR.
          </p>
        </div>
      </div>
    </main>
  );
}
