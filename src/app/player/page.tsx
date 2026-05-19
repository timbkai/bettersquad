"use client";

import Link from "next/link";
import { Activity, QrCode, BarChart2, ChevronRight, Clock, Wifi, Heart } from "lucide-react";
import { players } from "@/data/mockData";
import StatusBadge from "@/components/shared/StatusBadge";

const myPlayer = players[6]; // Noah Fischer – ZM – green

export default function PlayerHome() {
  const hoooperColor =
    myPlayer.hooper.total <= 14 ? "text-emerald-400" : myPlayer.hooper.total <= 20 ? "text-amber-400" : "text-red-400";

  const lastLoad = myPlayer.dailyLoads[myPlayer.dailyLoads.length - 1];

  return (
    <div className="px-4 py-5 space-y-4">
      {/* Greeting */}
      <div>
        <p className="text-slate-500 text-sm">Guten Morgen,</p>
        <h1 className="text-2xl font-black text-white">{myPlayer.name.split(" ")[0]} 👋</h1>
      </div>

      {/* Readiness Card */}
      <div className={`rounded-2xl p-5 border ${
        myPlayer.riskLevel === "red"
          ? "bg-red-500/10 border-red-500/30"
          : myPlayer.riskLevel === "yellow"
          ? "bg-amber-500/10 border-amber-500/30"
          : "bg-emerald-500/10 border-emerald-500/30"
      }`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-slate-300">Heutige Readiness</span>
          <StatusBadge risk={myPlayer.riskLevel} size="sm" />
        </div>

        <div className="flex items-end gap-4">
          <div>
            <div className="text-xs text-slate-500 mb-1">ACWR</div>
            <div className={`text-5xl font-black ${
              myPlayer.riskLevel === "green" ? "text-emerald-400" : "text-amber-400"
            }`}>{myPlayer.acwr.toFixed(2)}</div>
          </div>
          <div className="pb-1">
            <div className="text-xs text-slate-500 mb-1">Hooper</div>
            <div className={`text-2xl font-bold ${hoooperColor}`}>{myPlayer.hooper.total}<span className="text-xs text-slate-500">/28</span></div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 text-sm text-slate-300">
          {myPlayer.riskLevel === "green"
            ? "Volle Trainingsbelastung möglich. Du bist in top Form heute."
            : "Reduzierte Belastung empfohlen. Sprich mit dem Trainer."}
        </div>
      </div>

      {/* Quick actions */}
      <div className="space-y-2">
        <p className="text-xs text-slate-500 uppercase tracking-wider">Schnellzugriff</p>
        {[
          {
            href: "/player/checkin",
            icon: Activity,
            label: "Wellness Check-in",
            sub: `Letzter: Heute 07:14 Uhr · Hooper ${myPlayer.hooper.total}/28`,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
          },
          {
            href: "/player/scan",
            icon: QrCode,
            label: "GPS-Tracker holen",
            sub: "QR-Scan · Tracker & Pulsgurt zuweisen",
            color: "text-blue-400",
            bg: "bg-blue-500/10",
          },
          {
            href: "/player/stats",
            icon: BarChart2,
            label: "Meine Statistiken",
            sub: `${lastLoad.distance} km letzte Einheit · ${lastLoad.sprints} Sprints`,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
          },
        ].map(({ href, icon: Icon, label, sub, color, bg }) => (
          <Link key={href} href={href}>
            <div className="flex items-center gap-3 bg-slate-900/60 border border-white/8 rounded-xl p-4 hover:border-white/15 transition-all group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-sm">{label}</div>
                <div className="text-xs text-slate-500 truncate mt-0.5">{sub}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* Equipment status */}
      <div className="bg-slate-900/60 border border-white/8 rounded-xl p-4">
        <p className="text-xs text-slate-500 mb-3">Equipment Status</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-xs text-slate-400">GPS-Tracker</div>
              <div className="text-sm font-bold text-white">22 verfügbar</div>
            </div>
          </div>
          <div className="w-px h-8 bg-white/8" />
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-400" />
            <div>
              <div className="text-xs text-slate-400">Polar H10</div>
              <div className="text-sm font-bold text-white">23 verfügbar</div>
            </div>
          </div>
        </div>
      </div>

      {/* Next session */}
      <div className="bg-slate-900/60 border border-white/8 rounded-xl p-4 flex items-center gap-3">
        <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
        <div>
          <div className="text-sm font-semibold text-white">Nächste Einheit</div>
          <div className="text-xs text-slate-400">Morgen, 10:00 Uhr · Taktiktraining · Kunstrasen A</div>
        </div>
      </div>
    </div>
  );
}
