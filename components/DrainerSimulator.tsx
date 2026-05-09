"use client";

import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";

type Step = "bait" | "signed" | "drained";

export default function DrainerSimulator() {
  const { t } = useI18n();
  const [step, setStep] = useState<Step>("bait");
  const [drainProgress, setDrainProgress] = useState(0);
  const [balances, setBalances] = useState({
    sol: 12.45,
    usdc: 450.00,
    bonk: 2500000,
  });

  const startDrain = () => {
    setStep("signed");
    setDrainProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setDrainProgress(progress);
      setBalances({
        sol: Math.max(0, 12.45 * (1 - progress / 100)),
        usdc: Math.max(0, 450.00 * (1 - progress / 100)),
        bonk: Math.max(0, 2500000 * (1 - progress / 100)),
      });

      if (progress >= 100) {
        clearInterval(interval);
        setStep("drained");
      }
    }, 80);
  };

  const reset = () => {
    setStep("bait");
    setDrainProgress(0);
    setBalances({ sol: 12.45, usdc: 450.00, bonk: 2500000 });
  };

  return (
    <div className="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-6">
      <h2 className="text-xl font-bold mb-1 text-glow-danger">{t.drainerSim.title}</h2>
      <p className="text-xs text-gray-500 mb-4 font-mono">{t.drainerSim.desc}</p>

      {step === "bait" && (
        <div className="bg-[#050505] border border-[#00f0ff] rounded p-5 text-center space-y-3">
          <div className="text-4xl">🎁</div>
          <h3 className="text-lg font-bold text-[#00f0ff]">{t.drainerSim.step1Title}</h3>
          <p className="text-xs text-gray-400 font-mono">{t.drainerSim.step1Desc}</p>
          <button
            onClick={startDrain}
            className="bg-[#00f0ff] text-black font-bold px-6 py-2 rounded text-sm font-mono hover:bg-[#00c0cc] transition-colors"
          >
            {t.drainerSim.step1Btn}
          </button>
        </div>
      )}

      {step === "signed" && (
        <div className="bg-[#050505] border border-[#ff0040] rounded p-5 space-y-3">
          <div className="text-center">
            <div className="text-4xl mb-2">💀</div>
            <h3 className="text-lg font-bold text-[#ff0040] text-glow-danger">{t.drainerSim.step2Title}</h3>
            <p className="text-xs text-gray-400 font-mono">{t.drainerSim.step2Desc}</p>
          </div>

          <div className="text-xs text-[#ff0040] font-bold text-center animate-pulse">
            {t.drainerSim.draining} {drainProgress}%
          </div>

          <div className="w-full bg-[#1a1a1a] rounded h-2">
            <div
              className="bg-[#ff0040] h-2 rounded transition-all"
              style={{ width: `${drainProgress}%` }}
            />
          </div>

          <div className="space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">SOL</span>
              <span className={balances.sol === 0 ? "text-[#ff0040]" : "text-white"}>
                {balances.sol.toFixed(4)} → {balances.sol === 0 ? "0.0000" : ""}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">USDC</span>
              <span className={balances.usdc === 0 ? "text-[#ff0040]" : "text-white"}>
                ${balances.usdc.toFixed(2)} → {balances.usdc === 0 ? "$0.00" : ""}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">BONK</span>
              <span className={balances.bonk === 0 ? "text-[#ff0040]" : "text-white"}>
                {balances.bonk.toLocaleString()} → {balances.bonk === 0 ? "0" : ""}
              </span>
            </div>
          </div>
        </div>
      )}

      {step === "drained" && (
        <div className="bg-[#050505] border border-[#ff0040] rounded p-5 space-y-3 border-glow-danger">
          <div className="text-center">
            <div className="text-4xl mb-2">😈</div>
            <h3 className="text-lg font-bold text-[#ff0040] text-glow-danger">{t.drainerSim.step3Title}</h3>
            <p className="text-xs text-gray-400 font-mono">{t.drainerSim.step3Desc}</p>
          </div>

          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded p-3 space-y-2">
            <div className="text-xs text-[#ffaa00] font-mono">• {t.drainerSim.lesson1}</div>
            <div className="text-xs text-[#ffaa00] font-mono">• {t.drainerSim.lesson2}</div>
            <div className="text-xs text-[#ffaa00] font-mono">• {t.drainerSim.lesson3}</div>
          </div>

          <button
            onClick={reset}
            className="w-full border border-[#00ff41] text-[#00ff41] font-bold px-6 py-2 rounded text-sm font-mono hover:bg-[#00ff41] hover:text-black transition-colors"
          >
            {t.drainerSim.step3Btn}
          </button>
        </div>
      )}

      <div className="text-[10px] text-gray-700 font-mono text-center mt-3">
        {t.drainerSim.footer}
      </div>
    </div>
  );
}
