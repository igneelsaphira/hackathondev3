import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PagaSimple — Paga con SOL, recibe USDC",
  description: "Paga con crypto sin que el vendedor sepa qué es crypto. Tú usas SOL, él recibe dólares digitales (USDC).",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased"
        style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          background: "#0c1222",
          color: "#e8ecf4",
        }}
      >
        {children}
      </body>
    </html>
  );
}
