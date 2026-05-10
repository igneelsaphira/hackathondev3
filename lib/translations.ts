export type Lang = "es" | "en";

export const translations = {
  es: {
    // Nav
    navTitle: "PagaSimple",
    navBadge: "Hackathon MVP",

    // Landing
    heroBadge: "Hackathon Dev3pack x ChileDAO",
    heroTitle: "PagaSimple",
    heroSubtitle: "Paga con crypto sin que el vendedor sepa qué es crypto. Tú usas SOL, él recibe dólares digitales (USDC). Sin comisiones de banco, sin esperar.",
    problem1Title: "Yape cobra",
    problem1Text: "Las apps de pago se quedan con un % de cada venta.",
    problem2Title: "El vendedor no entiende crypto",
    problem2Text: "No quiere saber qué es un wallet ni un token.",
    problem3Title: "Transferencias tardan",
    problem3Text: "Los bancos tardan horas o días en fines de semana.",
    solutionTitle: "La solución",
    solutionText: "Tú pagas con SOL → la app lo convierte automáticamente a USDC → el vendedor recibe dólares digitales estables. Él los puede cambiar a pesos cuando quiera. Todo en segundos.",
    sellerCardTitle: "Soy vendedor",
    sellerCardSubtitle: "Quiero recibir pagos",
    sellerCardDesc: "Genera un link o QR para que te paguen. Recibes USDC directo a tu wallet.",
    buyerCardTitle: "Soy comprador",
    buyerCardSubtitle: "Quiero pagar algo",
    buyerCardDesc: "Paga con SOL y la app hace la conversión automática. El vendedor recibe USDC.",
    demoHint: "💡 Tip: En la hackathon, prueba el flujo completo — genera un pago como vendedor y luego págalo como comprador.",

    // Seller
    sellerBack: "← Volver al inicio",
    sellerTitle: "Recibir un pago",
    sellerDesc: "Ingresa los datos y genera un link para que te paguen.",
    whatSell: "📋 ¿Qué vendes?",
    whatSellPlaceholder: "Ej: Café con leche, Zapatillas Nike...",
    howMuch: "💰 ¿Cuánto cuesta? (CLP)",
    howMuchPlaceholder: "Ej: 3500",
    yourWallet: "👥 Tu dirección de wallet (opcional para demo)",
    walletPlaceholder: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    generateLink: "🔗 Generar link de pago",
    linkReady: "¡Link de pago listo!",
    linkReadyDesc: "Comparte este link con tu comprador. Él paga con SOL y tú recibes USDC.",
    amount: "Monto",
    approx: "≈",
    product: "Producto",
    copyLink: "📋 Copiar link",
    createAnother: "Crear otro",
    qrCode: "Código QR simulado",

    // Buyer
    buyerBack: "← Volver al inicio",
    buyerTitle: "Pagar algo",
    buyerDesc: "Ingresa el código del pago o prueba con un ejemplo.",
    paymentCode: "🔍 Código de pago",
    paymentCodePlaceholder: "Ej: DEMO1",
    searchPayment: "Buscar pago",
    tryExample: "Prueba con un ejemplo:",
    reviewTitle: "Revisar pago",
    price: "Precio",
    sellerReceives: "Vendedor recibe",
    youPay: "Tú pagas",
    whatHappens: "¿Qué pasa aquí?",
    whatHappensDesc: "Tu wallet tiene SOL. La app va a usar Jupiter para cambiar esos SOL a USDC automáticamente, y luego enviar los USDC al vendedor. Todo en una sola transacción.",
    payButton: "💳 Pagar",
    processing: "Procesando pago...",
    processingStep1: "1. Swapeando SOL → USDC via Jupiter",
    processingStep2: "2. Transfiriendo USDC al vendedor",
    processingWait: "Esto tarda unos segundos",
    successTitle: "¡Pago completado!",
    successDesc: "El vendedor ya recibió sus USDC. Todo fue automático.",
    youPaid: "Tú pagaste",
    sellerGot: "Vendedor recibió",
    txHash: "Hash de transacción",
    payAgain: "Hacer otro pago",

    // Footer
    footerMade: "Hecho para hackathon Dev3pack x ChileDAO. No es asesoría financiera.",
    footerVia: "Los swaps se ejecutan vía Jupiter. El vendedor recibe USDC estable.",

    // Disclaimer
    demoDisclaimer: "En modo demo la transacción es simulada. En producción usaría tu wallet Phantom.",
  },

  en: {
    // Nav
    navTitle: "PagaSimple",
    navBadge: "Hackathon MVP",

    // Landing
    heroBadge: "Hackathon Dev3pack x ChileDAO",
    heroTitle: "PagaSimple",
    heroSubtitle: "Pay with crypto without the seller knowing what crypto is. You use SOL, they receive digital dollars (USDC). No bank fees, no waiting.",
    problem1Title: "Payment apps charge fees",
    problem1Text: "Apps like Venmo take a cut from every sale.",
    problem2Title: "Seller doesn't understand crypto",
    problem2Text: "They don't want to know what a wallet or token is.",
    problem3Title: "Bank transfers are slow",
    problem3Text: "Banks take hours or days, especially on weekends.",
    solutionTitle: "The solution",
    solutionText: "You pay with SOL → the app automatically converts to USDC → the seller receives stable digital dollars. They can cash out to local currency anytime. All in seconds.",
    sellerCardTitle: "I'm a seller",
    sellerCardSubtitle: "I want to receive payments",
    sellerCardDesc: "Generate a link or QR code to get paid. You receive USDC directly to your wallet.",
    buyerCardTitle: "I'm a buyer",
    buyerCardSubtitle: "I want to pay for something",
    buyerCardDesc: "Pay with SOL and the app handles the conversion. The seller receives USDC.",
    demoHint: "💡 Tip: For the hackathon, try the full flow — generate a payment as seller then pay it as buyer.",

    // Seller
    sellerBack: "← Back to home",
    sellerTitle: "Receive a payment",
    sellerDesc: "Enter the details and generate a payment link.",
    whatSell: "📋 What are you selling?",
    whatSellPlaceholder: "E.g.: Coffee, Sneakers...",
    howMuch: "💰 How much does it cost? (CLP)",
    howMuchPlaceholder: "E.g.: 3500",
    yourWallet: "👥 Your wallet address (optional for demo)",
    walletPlaceholder: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    generateLink: "🔗 Generate payment link",
    linkReady: "Payment link ready!",
    linkReadyDesc: "Share this link with your buyer. They pay with SOL and you receive USDC.",
    amount: "Amount",
    approx: "≈",
    product: "Product",
    copyLink: "📋 Copy link",
    createAnother: "Create another",
    qrCode: "Simulated QR code",

    // Buyer
    buyerBack: "← Back to home",
    buyerTitle: "Pay for something",
    buyerDesc: "Enter the payment code or try an example.",
    paymentCode: "🔍 Payment code",
    paymentCodePlaceholder: "E.g.: DEMO1",
    searchPayment: "Search payment",
    tryExample: "Try an example:",
    reviewTitle: "Review payment",
    price: "Price",
    sellerReceives: "Seller receives",
    youPay: "You pay",
    whatHappens: "What happens here?",
    whatHappensDesc: "Your wallet has SOL. The app will use Jupiter to swap your SOL to USDC automatically, then send the USDC to the seller. All in one transaction.",
    payButton: "💳 Pay",
    processing: "Processing payment...",
    processingStep1: "1. Swapping SOL → USDC via Jupiter",
    processingStep2: "2. Transferring USDC to seller",
    processingWait: "This takes a few seconds",
    successTitle: "Payment completed!",
    successDesc: "The seller has received their USDC. Everything was automatic.",
    youPaid: "You paid",
    sellerGot: "Seller received",
    txHash: "Transaction hash",
    payAgain: "Make another payment",

    // Footer
    footerMade: "Made for hackathon Dev3pack x ChileDAO. Not financial advice.",
    footerVia: "Swaps executed via Jupiter. Seller receives stable USDC.",

    // Disclaimer
    demoDisclaimer: "In demo mode the transaction is simulated. In production it would use your Phantom wallet.",
  },
};

export function t(lang: Lang, key: keyof typeof translations.es): string {
  return translations[lang][key] || translations["es"][key] || key;
}
