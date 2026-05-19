import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BetterSquad – Professionelle Belastungssteuerung",
  description:
    "Die erste Vereins-Plattform für integrierte GPS- und Recovery-Steuerung im deutschen Amateurfußball.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="bg-[#0a0f1a] text-slate-100 antialiased">{children}</body>
    </html>
  );
}
