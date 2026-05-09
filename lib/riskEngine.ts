import { TokenAnalysis, RiskCheck, DEMO_TOKENS } from "./demoData";

export type { TokenAnalysis, RiskCheck };

export async function analyzeToken(address: string): Promise<TokenAnalysis> {
  if (DEMO_TOKENS[address]) {
    return DEMO_TOKENS[address];
  }
  try {
    return await analyzeRealToken(address);
  } catch (e) {
    return analyzePartial(address);
  }
}

async function analyzeRealToken(address: string): Promise<TokenAnalysis> {
  const checks: RiskCheck[] = [];
  let score = 0;
  let canSell = false;
  let tokenName = "Desconocido";
  let tokenSymbol = "???";

  try {
    const res = await fetch("https://token.jup.ag/all");
    const tokens = await res.json();
    const match = tokens.find(
      (t: any) =>
        t.address.toLowerCase() === address.toLowerCase() ||
        t.symbol.toLowerCase() === address.toLowerCase()
    );
    if (match) {
      tokenName = match.name;
      tokenSymbol = match.symbol;
      if (!match.tags || match.tags.length === 0) {
        checks.push({
          id: "metadata",
          title: "Poca información pública",
          humanText: "Este token no tiene mucha metadata disponible. Puede ser porque es muy nuevo o porque el creador no quiso mostrar mucho.",
          technicalNote: "Sin tags ni metadata en Jupiter",
          severity: "medium",
          scoreImpact: 10,
        });
        score += 10;
      }
    } else {
      checks.push({
        id: "unknown",
        title: "Token no verificado",
        humanText: "No encontramos este token en los registros públicos de Jupiter. Eso no significa que sea malo, pero sí que es poco conocido.",
        technicalNote: "No en Jupiter token list",
        severity: "medium",
        scoreImpact: 15,
      });
      score += 15;
    }
  } catch (e) {}

  try {
    const sellRes = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=${address}&outputMint=So11111111111111111111111111111111111111112&amount=1000000&slippageBps=50`
    );
    if (sellRes.ok) {
      const sellData = await sellRes.json();
      canSell = true;
      if (sellData.priceImpactPct && parseFloat(sellData.priceImpactPct) > 5) {
        checks.push({
          id: "price_impact",
          title: "Vender podría ser caro",
          humanText: `Si intentas vender, podrías perder alrededor del ${parseFloat(sellData.priceImpactPct).toFixed(1)}% del valor por falta de liquidez. Eso significa que recuperarías menos de lo que pensabas.`,
          technicalNote: `Price impact: ${sellData.priceImpactPct}%`,
          severity: "high",
          scoreImpact: 20,
        });
        score += 20;
      }
    } else {
      checks.push({
        id: "sell_route",
        title: "No hay forma clara de vender",
        humanText: "No encontramos una ruta para cambiar este token de vuelta a SOL o USDC. Eso puede significar que compras algo que luego no puedes vender.",
        technicalNote: "Jupiter no devuelve ruta de venta",
        severity: "critical",
        scoreImpact: 35,
      });
      score += 35;
    }
  } catch (e) {}

  try {
    const priceRes = await fetch(`https://api.jup.ag/price/v2?ids=${address}`);
    if (priceRes.ok) {
      const priceData = await priceRes.json();
      const price = priceData.data?.[address]?.price;
      if (!price || parseFloat(price) === 0) {
        checks.push({
          id: "price",
          title: "Sin precio detectable",
          humanText: "No logramos obtener un precio actual para este token. Eso suele pasar cuando no hay suficiente actividad de trading.",
          technicalNote: "Sin precio en Jupiter",
          severity: "medium",
          scoreImpact: 15,
        });
        score += 15;
      }
    }
  } catch (e) {}

  score = Math.min(100, score);

  let riskLevel: TokenAnalysis["riskLevel"] = "low";
  if (score >= 86) riskLevel = "critical";
  else if (score >= 61) riskLevel = "high";
  else if (score >= 31) riskLevel = "medium";

  const recommendation =
    score >= 86
      ? "NO COMPRES. Es muy probable que no puedas recuperar tu dinero."
      : score >= 61
      ? "Revisa muy bien antes de poner dinero. Hay demasiadas señales de riesgo visibles."
      : score >= 31
      ? "Hay algunas señales de precaución. Lee bien antes de decidir."
      : "Se ven señales tranquilizadoras. Igual haz tu propia investigación antes de comprar.";

  const humanSummary =
    score >= 61
      ? "Hay varias señales de alerta importantes. Podrías entrar, pero salir podría ser difícil o caro."
      : score >= 31
      ? "Hay algunas señales que conviene revisar. No es el peor caso, pero tampoco está libre de riesgos."
      : "Las señales visibles son positivas. Claro que nada es 100% seguro, pero no encontramos alarmas graves.";

  return {
    address,
    name: tokenName,
    symbol: tokenSymbol,
    riskScore: score,
    riskLevel,
    canSell,
    checks,
    humanSummary,
    recommendation,
  };
}

function analyzePartial(address: string): TokenAnalysis {
  return {
    address,
    name: "Desconocido",
    symbol: "???",
    riskScore: 50,
    riskLevel: "unknown",
    canSell: false,
    checks: [
      {
        id: "unknown",
        title: "No pudimos verificar este token",
        humanText: "No logramos obtener información suficiente para analizar este token correctamente. Eso no significa que sea malo, pero tampoco que sea seguro.",
        technicalNote: "Error de red o token no indexado",
        severity: "medium",
        scoreImpact: 0,
      },
    ],
    humanSummary: "No pudimos revisar este token en profundidad. Te recomendamos buscar más información antes de comprar.",
    recommendation: "No tenemos datos suficientes. Investiga por tu cuenta antes de arriesgar dinero.",
  };
}

export function getRiskColor(level: TokenAnalysis["riskLevel"]) {
  switch (level) {
    case "low":
      return { bg: "bg-emerald-500", text: "text-emerald-400", hex: "#48bb78", border: "border-emerald-500/20", label: "Riesgo bajo" };
    case "medium":
      return { bg: "bg-amber-500", text: "text-amber-400", hex: "#ed8936", border: "border-amber-500/20", label: "Riesgo medio" };
    case "high":
      return { bg: "bg-orange-500", text: "text-orange-400", hex: "#ed8936", border: "border-orange-500/20", label: "Riesgo alto" };
    case "critical":
      return { bg: "bg-red-500", text: "text-red-400", hex: "#f56565", border: "border-red-500/20", label: "Riesgo crítico" };
    case "unknown":
    default:
      return { bg: "bg-slate-500", text: "text-slate-400", hex: "#8a94a8", border: "border-slate-500/20", label: "No verificable" };
  }
}
