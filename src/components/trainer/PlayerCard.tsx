"use client";

import Link from "next/link";
import { Player } from "@/data/mockData";
import StatusBadge from "@/components/shared/StatusBadge";

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const acwrColor =
    player.riskLevel === "red"
      ? "text-red-400"
      : player.riskLevel === "yellow"
      ? "text-amber-400"
      : "text-emerald-400";

  const borderColor =
    player.riskLevel === "red"
      ? "border-red-500/30 hover:border-red-500/60"
      : player.riskLevel === "yellow"
      ? "border-amber-500/30 hover:border-amber-500/60"
      : "border-white/8 hover:border-emerald-500/30";

  const hoooperColor =
    player.hooper.total <= 14
      ? "text-emerald-400"
      : player.hooper.total <= 20
      ? "text-amber-400"
      : "text-red-400";

  return (
    <Link href={`/trainer/player/${player.id}`}>
      <div
        className={`bg-slate-900/60 border ${borderColor} rounded-xl p-4 cursor-pointer transition-all hover:bg-slate-900/80 hover:scale-[1.02] group`}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm text-white ${
              player.riskLevel === "red"
                ? "bg-red-500/20"
                : player.riskLevel === "yellow"
                ? "bg-amber-500/20"
                : "bg-emerald-500/20"
            }`}>
              {player.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <div className="text-sm font-semibold text-white leading-tight">{player.name}</div>
              <div className="text-xs text-slate-500">#{player.number} · {player.position}</div>
            </div>
          </div>
          {player.gender === "female" && (
            <span className="text-[10px] px-1.5 py-0.5 bg-purple-500/15 text-purple-400 border border-purple-500/30 rounded-full">
              W
            </span>
          )}
        </div>

        {/* ACWR */}
        <div className="flex items-end justify-between mt-2">
          <div>
            <div className="text-xs text-slate-500 mb-0.5">ACWR</div>
            <div className={`text-2xl font-black ${acwrColor}`}>{player.acwr.toFixed(2)}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 mb-0.5">Hooper</div>
            <div className={`text-lg font-bold ${hoooperColor}`}>{player.hooper.total}<span className="text-xs text-slate-600">/28</span></div>
          </div>
        </div>

        {/* ACWR bar */}
        <div className="mt-3">
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                player.riskLevel === "red"
                  ? "bg-red-500"
                  : player.riskLevel === "yellow"
                  ? "bg-amber-400"
                  : "bg-emerald-500"
              }`}
              style={{ width: `${Math.min((player.acwr / 2) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
            <span>0</span>
            <span className="text-amber-600">1.3</span>
            <span className="text-red-600">1.5</span>
            <span>2.0</span>
          </div>
        </div>

        <div className="mt-3">
          <StatusBadge risk={player.riskLevel} size="sm" />
        </div>
      </div>
    </Link>
  );
}
