"use client";

export default function SecurityStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-4">
        <div className="text-xs text-gray-500 font-mono mb-1">DRAINERS DETECTED</div>
        <div className="text-2xl font-bold text-[#ff0040] text-glow-danger">12,847</div>
        <div className="text-[10px] text-gray-600 mt-1">On-chain this month</div>
      </div>

      <div className="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-4">
        <div className="text-xs text-gray-500 font-mono mb-1">STOLEN (2025)</div>
        <div className="text-2xl font-bold text-[#ffaa00]">$3.4B</div>
        <div className="text-[10px] text-gray-600 mt-1">Across all chains</div>
      </div>

      <div className="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-4">
        <div className="text-xs text-gray-500 font-mono mb-1">YOUR STATUS</div>
        <div className="text-2xl font-bold text-[#00ff41] text-glow">PROTECTED</div>
        <div className="text-[10px] text-gray-600 mt-1">ShadowScan active</div>
      </div>
    </div>
  );
}
