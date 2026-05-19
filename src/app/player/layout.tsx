"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Activity, QrCode, BarChart2 } from "lucide-react";
import BetterSquadLogo from "@/components/shared/BetterSquadLogo";

const tabs = [
  { href: "/player", label: "Home", icon: Home },
  { href: "/player/checkin", label: "Check-in", icon: Activity },
  { href: "/player/scan", label: "QR Scan", icon: QrCode },
  { href: "/player/stats", label: "Stats", icon: BarChart2 },
];

export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex justify-center">
      <div className="w-full max-w-sm min-h-screen flex flex-col relative">
        {/* Mobile header */}
        <header className="flex items-center justify-between px-4 py-4 border-b border-white/8">
          <BetterSquadLogo size="sm" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Spieler-App</span>
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">
              LM
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto pb-20">{children}</main>

        {/* Bottom Tab Bar */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm border-t border-white/8 bg-slate-950/95 backdrop-blur-lg">
          <div className="flex items-center justify-around py-2">
            {tabs.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                    active ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
