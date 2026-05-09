export interface RiskCheck {
  id: string;
  title: string;
  humanText: string;
  technicalNote: string;
  severity: "low" | "medium" | "high" | "critical";
  scoreImpact: number;
}

export interface TokenAnalysis {
  address: string;
  name: string;
  symbol: string;
  riskScore: number;
  riskLevel: "low" | "medium" | "high" | "critical" | "unknown";
  checks: RiskCheck[];
  humanSummary: string;
  recommendation: string;
  canSell: boolean;
  liquidityUsd?: number;
}

export const SAFE_TOKEN: TokenAnalysis = {
  address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  name: "USD Coin",
  symbol: "USDC",
  riskScore: 8,
  riskLevel: "low",
  canSell: true,
  liquidityUsd: 450000000,
  checks: [
    {
      id: "liquidity",
      title: "Liquidez suficiente",
      humanText: "Hay bastante dinero real detrás de este token, así que comprar y vender debería ser fácil.",
      technicalNote: "Liquidez ~$450M en pools",
      severity: "low",
      scoreImpact: 0,
    },
    {
      id: "mint",
      title: "Sin mint authority",
      humanText: "Nadie puede crear más tokens de la nada, así que tu porción no se va a diluir.",
      technicalNote: "Mint authority revocada",
      severity: "low",
      scoreImpact: 0,
    },
    {
      id: "freeze",
      title: "Sin freeze authority",
      humanText: "Nadie puede congelar tu cuenta y dejarte sin poder mover el token.",
      technicalNote: "Freeze authority revocada",
      severity: "low",
      scoreImpact: 0,
    },
    {
      id: "holders",
      title: "Holders distribuidos",
      humanText: "El token está repartido entre muchas personas, no depende de unos pocos.",
      technicalNote: "Top 10 holders < 15%",
      severity: "low",
      scoreImpact: 0,
    },
  ],
  humanSummary:
    "Este token tiene buena liquidez, no tiene controles peligrosos activos y está bien distribuido. Claro que nada es 100% seguro, pero las señales visibles son positivas.",
  recommendation: "Se ven señales tranquilizadoras. Igual haz tu propia investigación antes de comprar.",
};

export const RISKY_TOKEN: TokenAnalysis = {
  address: "FakeRuggyToken1234567890abcdef",
  name: "RocketMoonElon",
  symbol: "RME",
  riskScore: 72,
  riskLevel: "high",
  canSell: true,
  liquidityUsd: 12000,
  checks: [
    {
      id: "liquidity",
      title: "Liquidez muy baja",
      humanText: "Hay muy poco dinero real en el pool. Podrías comprar fácil, pero vender te podría costar mucho o dejarte con menos de lo que esperabas.",
      technicalNote: "Liquidez ~$12,000",
      severity: "high",
      scoreImpact: 25,
    },
    {
      id: "mint",
      title: "Mint authority activa",
      humanText: "El creador todavía puede imprimir más tokens cuando quiera. Eso puede bajar el valor de los que ya compraste.",
      technicalNote: "Mint authority no revocada",
      severity: "high",
      scoreImpact: 20,
    },
    {
      id: "freeze",
      title: "Freeze authority activa",
      humanText: "El creador tiene el poder de congelar cuentas. En teoría podría impedir que vendas.",
      technicalNote: "Freeze authority activa",
      severity: "medium",
      scoreImpact: 15,
    },
    {
      id: "holders",
      title: "Holders muy concentrados",
      humanText: "Unas pocas wallets tienen la mayoría del token. Si ellos venden, el precio se puede ir al piso.",
      technicalNote: "Top 3 holders = 78%",
      severity: "high",
      scoreImpact: 12,
    },
    {
      id: "age",
      title: "Token muy nuevo",
      humanText: "Este token tiene horas o días de creado. Los tokens recién nacidos suelen ser mucho más riesgosos.",
      technicalNote: "Creado hace 2 días",
      severity: "medium",
      scoreImpact: 10,
    },
  ],
  humanSummary:
    "Hay varias señales de alerta: poca liquidez, controles peligrosos activos y concentración extrema. Podrías entrar, pero salir podría ser difícil o caro.",
  recommendation: "Revisa muy bien antes de poner dinero. Hay demasiadas señales de riesgo visibles.",
};

export const HONEYPOT_TOKEN: TokenAnalysis = {
  address: "HoneypotTrap999999999999999999",
  name: "FreeMoneyToken",
  symbol: "FMT",
  riskScore: 95,
  riskLevel: "critical",
  canSell: false,
  liquidityUsd: 8000,
  checks: [
    {
      id: "sell_route",
      title: "No hay forma de vender",
      humanText: "No encontramos una ruta de cambio de vuelta hacia SOL o USDC. Esto puede significar que compraste algo que no puedes vender después.",
      technicalNote: "Jupiter no devuelve ruta de venta",
      severity: "critical",
      scoreImpact: 35,
    },
    {
      id: "liquidity",
      title: "Liquidez casi inexistente",
      humanText: "Hay muy poco dinero real disponible. Incluso si pudieras vender, perderías casi todo por el 'price impact'.",
      technicalNote: "Liquidez ~$8,000",
      severity: "high",
      scoreImpact: 25,
    },
    {
      id: "mint",
      title: "Mint authority activa",
      humanText: "El creador puede seguir creando más tokens, diluyendo lo que compraste.",
      technicalNote: "Mint authority activa",
      severity: "high",
      scoreImpact: 20,
    },
    {
      id: "freeze",
      title: "Freeze authority activa",
      humanText: "El creador puede congelar tu cuenta en cualquier momento.",
      technicalNote: "Freeze authority activa",
      severity: "medium",
      scoreImpact: 15,
    },
    {
      id: "metadata",
      title: "Metadata sospechosa",
      humanText: "No hay información clara del proyecto, sitio web ni redes sociales verificables.",
      technicalNote: "Metadata incompleta",
      severity: "medium",
      scoreImpact: 10,
    },
  ],
  humanSummary:
    "Las señales son muy graves. No encontramos forma de vender este token, tiene controles peligrosos activos y casi no hay liquidez. Es el patrón clásico de una trampa donde puedes entrar pero no salir.",
  recommendation: "NO COMPRES. Es muy probable que no puedas recuperar tu dinero.",
};

export const DEMO_TOKENS: Record<string, TokenAnalysis> = {
  [SAFE_TOKEN.address]: SAFE_TOKEN,
  [RISKY_TOKEN.address]: RISKY_TOKEN,
  [HONEYPOT_TOKEN.address]: HONEYPOT_TOKEN,
};
