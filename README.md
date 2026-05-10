# PagaSimple

> Paga con SOL. El vendedor recibe dólares digitales (USDC). Sin que nadie tenga que entender qué es un smart contract.

## El problema

En Chile miles de personas venden por Instagram, WhatsApp y MercadoLibre. Para cobrar usan:
- **Transferencias bancarias** → tardan horas o días
- **Yape/otras apps** → se quedan con comisión de cada venta
- **Efectivo** → inseguro, especialmente con desconocidos

Además, hay gente que tiene SOL (criptomoneda de Solana) y no sabe cómo pagarle a alguien que **no quiere saber nada de crypto**.

## La solución

PagaSimple permite que:
- **El comprador** pague con SOL
- **La app** convierte automáticamente SOL → USDC (dólar digital estable)
- **El vendedor** recibe USDC en su wallet

El vendedor ve: *"Recibiste $3.80 USDC (~$3.500 CLP)"*. No necesita saber qué es Jupiter, qué es un swap, ni qué es una wallet. Solo ve que le llegó plata estable.

## Demo en vivo

🔗 https://hackathondev3.vercel.app

## Flujo de la app

1. **Vendedor** ingresa producto + monto en CLP → genera link/QR
2. **Comprador** abre el link, revisa el resumen → aprueba el pago
3. **La app** swapea SOL → USDC via Jupiter y transfiere al vendedor
4. **Ambos** reciben confirmación instantánea

## Tecnología

- **Frontend:** Next.js 16 + TypeScript + Tailwind CSS
- **Blockchain:** Solana (mainnet)
- **Swap:** Jupiter Aggregator (SOL → USDC)
- **Deploy:** Vercel

## Categoría

**Payments / Consumer dApps**

## Lo que funciona en la demo

- Generación de links de pago con monto en CLP
- Simulación de swap SOL → USDC
- Confirmación visual de pago completado
- 3 ejemplos de demo listos para probar

## Limitaciones honestas

- Las transacciones on-chain están simuladas en esta versión de MVP
- El swap real requeriría integración completa con Jupiter API + wallet Phantom
- Los precios SOL/CLP son mock para la demo
- No incluye sistema de disputas (escrow completo)

## Próximos pasos

- Integrar wallet Phantom real para pagos on-chain
- Agregar sistema de escrow con disputas
- Notificaciones push al vendedor
- Dashboard de ventas para comerciantes
- Soporte para múltiples stablecoins

## Autora

María Paz Matus — Hackathon Dev3pack x ChileDAO 2026

## Repositorio

https://github.com/igneelsaphira/hackathondev3
