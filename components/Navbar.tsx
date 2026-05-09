"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Navbar() {
  const { publicKey } = useWallet();

  return (
    <nav className="border-b border-[#1a1a1a] bg-[#050505]/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#00ff41] animate-pulse" />
          <span className="text-lg font-bold tracking-wider text-glow">
            SHADOW<span className="text-[#00ff41]">SCAN</span>
          </span>
          <span className="hidden sm:inline text-xs text-gray-500 border border-[#1a1a1a] px-2 py-0.5 rounded">
            v0.1.0-alpha
          </span>
        </div>

        <div className="flex items-center gap-4">
          {publicKey && (
            <span className="hidden md:inline text-xs text-[#00ff41] font-mono">
              {publicKey.toBase58().slice(0, 6)}...{publicKey.toBase58().slice(-4)}
            </span>
          )}
          <WalletMultiButton className="!bg-[#00ff41] !text-black !font-bold !font-mono !text-sm !px-4 !py-2 !rounded hover:!bg-[#00cc33] transition-colors" />
        </div>
      </div>
    </nav>
  );
}
