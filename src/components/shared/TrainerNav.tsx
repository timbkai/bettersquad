"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Calendar, Settings } from "lucide-react";
import BetterSquadLogo from "./BetterSquadLogo";

const navItems = [
  { href: "/trainer", label: "Dashboard", icon: LayoutDashboard },
  { href: "/trainer/session", label: "Session", icon: Calendar },
];

export default function TrainerNav() {
  const pathname = usePathname();

  return (
    <nav className="h-16 border-b border-white/8 bg-slate-950/80 backdrop-blur-lg flex items-center px-6 gap-8 sticky top-0 z-50">
      <Link href="/">
        <BetterSquadLogo size="sm" />
      </Link>

      <div className="flex items-center gap-1 flex-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-500">FC Viktoria Köln · Regionalliga West</span>
        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">
          TR
        </div>
      </div>
    </nav>
  );
}
