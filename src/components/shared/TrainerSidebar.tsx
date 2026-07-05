"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, LayoutDashboard, ShieldCheck } from "lucide-react";
import { clubInfo } from "@/data/mockData";

const navItems = [
  { href: "/trainer", label: "Dashboard", icon: LayoutDashboard },
  { href: "/trainer/session", label: "Session Planner", icon: Calendar },
];

export default function TrainerSidebar() {
  const pathname = usePathname();
  const currentPath = pathname.replace(/\/$/, "") || "/";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5">
        <div className="flex items-center gap-7">
          <Link href="/" aria-label="BetterSquad Startseite">
            <img
              src="/bettersquad-logo.png"
              alt="BetterSquad"
              className="h-[30px] w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = currentPath === href || (href !== "/trainer" && currentPath.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-[#10172a] text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex min-w-0 items-center gap-3">
          <div className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:flex">
            <ShieldCheck className="h-3.5 w-3.5" />
            DSGVO · DE-Server
          </div>
          <div className="hidden min-w-0 text-right md:block">
            <div className="truncate text-xs font-bold text-slate-950">{clubInfo.name}</div>
            <div className="truncate text-[11px] text-slate-500">{clubInfo.team}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
