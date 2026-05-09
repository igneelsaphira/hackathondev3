import type { Metadata } from "next";
import "./globals.css";
import { WalletContextProvider } from "@/components/WalletProvider";

export const metadata: Metadata = {
  title: "Antes de Comprar — Revisa antes de invertir",
  description: "Traducimos señales técnicas de riesgo en advertencias humanas antes de que compres un token en Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen" style={{ background: "#0c1222" }}>
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}
