import type { Metadata } from "next";
import "./globals.css";
import { WalletContextProvider } from "@/components/WalletProvider";
import { I18nProvider } from "@/components/I18nProvider";

export const metadata: Metadata = {
  title: "ShadowScan — Solana Security",
  description: "No mint address needed. Just security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <WalletContextProvider>
            {children}
          </WalletContextProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
