"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getAssociatedTokenAddress, createApproveInstruction } from "@solana/spl-token";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useI18n } from "@/components/I18nProvider";

interface TokenPermission {
  tokenMint: string;
  tokenSymbol: string;
  delegate: string;
  amount: string;
  uiAmount: string;
}

export default function PermissionScanner() {
  const { t } = useI18n();
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState<TokenPermission[]>([]);
  const [revoking, setRevoking] = useState<string | null>(null);
  const [revoked, setRevoked] = useState<Set<string>>(new Set());

  const scanPermissions = async () => {
    if (!publicKey) return;
    setLoading(true);
    setPermissions([]);
    setRevoked(new Set());

    try {
      const response = await connection.getParsedTokenAccountsByOwner(publicKey, {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
      });

      const perms: TokenPermission[] = [];

      for (const { account } of response.value) {
        const parsed = account.data.parsed?.info;
        if (!parsed) continue;
        if (parsed.delegate) {
          perms.push({
            tokenMint: parsed.mint,
            tokenSymbol: parsed.mint.slice(0, 4) + "..." + parsed.mint.slice(-4),
            delegate: parsed.delegate,
            amount: parsed.delegatedAmount?.amount || "0",
            uiAmount: parsed.delegatedAmount?.uiAmountString || "0",
          });
        }
      }

      setPermissions(perms);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const revoke = async (mint: string) => {
    if (!publicKey || !signTransaction) return;
    setRevoking(mint);

    try {
      const mintPubkey = new PublicKey(mint);
      const ata = await getAssociatedTokenAddress(mintPubkey, publicKey);
      const tx = new Transaction().add(
        createApproveInstruction(ata, publicKey, publicKey, 0)
      );
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      const signed = await signTransaction(tx);
      const sig = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(sig);

      setRevoked((prev) => new Set(prev).add(mint));
    } catch (e) {
      console.error(e);
    } finally {
      setRevoking(null);
    }
  };

  return (
    <div className="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-6">
      <h2 className="text-xl font-bold mb-1 text-glow">{t.permissionScanner.title}</h2>
      <p className="text-xs text-gray-500 mb-4 font-mono">{t.permissionScanner.desc}</p>

      {!publicKey ? (
        <div className="text-xs text-gray-500 font-mono text-center py-6 border border-dashed border-[#1a1a1a] rounded">
          {t.permissionScanner.noWallet}
        </div>
      ) : (
        <>
          <button
            onClick={scanPermissions}
            disabled={loading}
            className="w-full bg-[#00ff41] text-black font-bold px-6 py-2 rounded text-sm font-mono hover:bg-[#00cc33] disabled:opacity-50 transition-colors mb-4"
          >
            {loading ? t.permissionScanner.btnScanning : t.permissionScanner.btnScan}
          </button>

          {permissions.length === 0 && !loading && (
            <div className="text-xs text-[#00ff41] font-mono text-center py-4">
              {t.permissionScanner.noPermissions}
            </div>
          )}

          {permissions.length > 0 && (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <div className="text-[10px] text-gray-600 font-mono grid grid-cols-12 gap-2 px-2">
                <span className="col-span-3">{t.permissionScanner.columnToken}</span>
                <span className="col-span-5">{t.permissionScanner.columnDelegate}</span>
                <span className="col-span-2">{t.permissionScanner.columnAmount}</span>
                <span className="col-span-2"></span>
              </div>
              {permissions.map((p) => (
                <div
                  key={p.tokenMint}
                  className="bg-[#050505] border border-[#1a1a1a] rounded p-2 grid grid-cols-12 gap-2 items-center"
                >
                  <span className="col-span-3 text-xs font-mono text-[#00f0ff] truncate">
                    {p.tokenSymbol}
                  </span>
                  <span className="col-span-5 text-[10px] font-mono text-gray-400 truncate">
                    {p.delegate.slice(0, 8)}...{p.delegate.slice(-4)}
                  </span>
                  <span className="col-span-2 text-[10px] font-mono text-[#ffaa00]">
                    {p.uiAmount}
                  </span>
                  <div className="col-span-2 text-right">
                    {revoked.has(p.tokenMint) ? (
                      <span className="text-[10px] text-[#00ff41] font-bold">{t.permissionScanner.revoked}</span>
                    ) : (
                      <button
                        onClick={() => revoke(p.tokenMint)}
                        disabled={revoking === p.tokenMint}
                        className="text-[10px] bg-[#ff0040] text-white px-2 py-1 rounded font-bold hover:bg-[#cc0033] disabled:opacity-50 transition-colors"
                      >
                        {revoking === p.tokenMint ? t.permissionScanner.revoking : t.permissionScanner.revoke}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div className="text-[10px] text-[#ffaa00] font-mono mt-2">
                {t.permissionScanner.warning}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
