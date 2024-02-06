import type { Metadata } from "next";
import { Noto_Sans_TC, Courier_Prime } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_TC({ subsets: ["latin"], display: 'swap', variable: '--font-noto', });
const courierPrime = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], display: 'swap', variable: '--font-crPrime', });

export const metadata: Metadata = {
  title: "段考時鐘",
  description: "一款專為段考設計的電子時鐘",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={`fixed w-screen h-screen overflow-hidden ${noto.variable}  ${courierPrime.variable}`}>{children}</body>
    </html>
  );
}
