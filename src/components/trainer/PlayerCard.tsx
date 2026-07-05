"use client";

import Link from "next/link";
import { Player } from "@/data/mockData";
import { getTrainingDecision } from "@/lib/trainingDecision";

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const decision = getTrainingDecision(player);

  const acwrColor =
    player.riskLevel === "red"
      ? "text-rose-600"
      : player.riskLevel === "yellow"
      ? "text-amber-600"
      : "text-emerald-600";

  const borderColor =
    player.injured || player.riskLevel === "red"
      ? "border-l-rose-500"
      : player.riskLevel === "yellow"
      ? "border-l-amber-400"
      : "border-l-emerald-500";

  const avatarBg =
    player.riskLevel === "red"
      ? "bg-rose-50 text-rose-700"
      : player.riskLevel === "yellow"
      ? "bg-amber-50 text-amber-700"
      : "bg-emerald-50 text-emerald-700";

  const hooperColor =
    player.hooper.total <= 14
      ? "text-emerald-600"
      : player.hooper.total <= 20
      ? "text-amber-600"
      : "text-rose-600";

  const riskBadge =
    player.riskLevel === "red"
      ? "bg-rose-50 text-rose-700 ring-rose-100"
      : player.riskLevel === "yellow"
      ? "bg-amber-50 text-amber-700 ring-amber-100"
      : "bg-emerald-50 text-emerald-700 ring-emerald-100";

  return (
    <Link href={`/trainer/player/${player.id}`}>
      <div
        className={`min-h-[154px] cursor-pointer rounded-lg border border-slate-200 border-l-4 bg-white p-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md ${borderColor}`}
      >
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${avatarBg}`}>
              {player.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold leading-tight text-slate-950">{player.name}</div>
              <div className="text-xs text-slate-500">
                #{player.number} · {player.position} · Baseline {player.baselineDays}T
              </div>
            </div>
          </div>
          {player.injured && (
            <span className="rounded-full border border-rose-100 bg-rose-50 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700">
              Verletzt
            </span>
          )}
        </div>

        <div className="mt-2 flex items-end justify-between">
          <div>
            <div className="mb-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">ACWR</div>
            <div className={`text-2xl font-black ${acwrColor}`}>{player.acwr.toFixed(2)}</div>
          </div>
          <div className="text-right">
            <div className="mb-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Hooper</div>
            <div className={`text-lg font-bold ${hooperColor}`}>
              {player.hooper.total}<span className="text-xs text-slate-400">/28</span>
            </div>
            <div className={`text-[10px] ${hooperColor}`}>
              {player.hooper.total <= 14 ? "Erholt" : player.hooper.total <= 20 ? "Mäßig" : "Erschöpft"}
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all ${
                player.riskLevel === "red"
                  ? "bg-rose-500"
                  : player.riskLevel === "yellow"
                  ? "bg-amber-400"
                  : "bg-emerald-500"
              }`}
              style={{ width: `${Math.min((player.acwr / 2) * 100, 100)}%` }}
            />
          </div>
          <div className="mt-0.5 flex justify-between text-[10px] text-slate-400">
            <span>0</span>
            <span className="text-amber-500/70">1.3</span>
            <span className="text-rose-500/70">1.5</span>
            <span>2.0</span>
          </div>
        </div>

        <div className="mt-3">
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ring-1 ${riskBadge}`}>
            {decision.label}
          </span>
        </div>
      </div>
    </Link>
  );
}
