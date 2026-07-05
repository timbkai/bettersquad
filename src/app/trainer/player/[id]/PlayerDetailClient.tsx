"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { Activity, ArrowLeft, LockKeyhole, Navigation, ShieldCheck, Timer, Zap } from "lucide-react";
import { players } from "@/data/mockData";
import StatusBadge from "@/components/shared/StatusBadge";
import ACWRChart from "@/components/trainer/ACWRChart";
import HRVChart from "@/components/trainer/HRVChart";
import AIInsightCard from "@/components/trainer/AIInsightCard";
import { getTrainingDecision } from "@/lib/trainingDecision";

export default function PlayerDetailClient({ id }: { id: string }) {
  const player = players.find((p) => p.id === id);
  if (!player) notFound();

  const decision = getTrainingDecision(player);
  const lastLoad = player.dailyLoads[player.dailyLoads.length - 1];
  const weekLoad = player.dailyLoads.slice(-7);
  const weekDistance = weekLoad.reduce((s, d) => s + d.distance, 0).toFixed(1);
  const weekSprints = weekLoad.reduce((s, d) => s + d.sprints, 0);
  const maxSpeed = Math.max(...weekLoad.map((d) => d.maxSpeed)).toFixed(1);
  const weekHIRuns = weekLoad.reduce((s, d) => s + d.hiRuns, 0);

  const hooperDims = [
    { label: "Schlaf", val: player.hooper.sleep },
    { label: "Muskelkater", val: player.hooper.soreness },
    { label: "Energie", val: player.hooper.fatigue },
    { label: "Stimmung", val: player.hooper.mood },
  ];

  const acwrColor =
    player.riskLevel === "red" ? "text-rose-600" :
    player.riskLevel === "yellow" ? "text-amber-500" :
    "text-emerald-600";

  const avatarBg =
    player.riskLevel === "red" ? "bg-rose-100 text-rose-600" :
    player.riskLevel === "yellow" ? "bg-amber-100 text-amber-700" :
    "bg-emerald-100 text-emerald-700";

  return (
    <div className="max-w-6xl px-4 py-6 sm:px-6">
      <Link href="/trainer" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-800">
        <ArrowLeft className="h-4 w-4" />
        Squad-Übersicht
      </Link>

      <section className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div className={`flex h-16 w-16 items-center justify-center rounded-lg text-2xl font-black ${avatarBg}`}>
              {player.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-black text-slate-950">{player.name}</h1>
                <StatusBadge risk={player.riskLevel} light />
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  Female-informed Baseline
                </span>
              </div>
              <div className="mt-1 text-sm text-slate-500">
                #{player.number} · {player.position} · {player.age} Jahre · Baseline {player.baselineDays} Tage
              </div>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xs text-slate-400">ACWR</div>
            <div className={`text-4xl font-black ${acwrColor}`}>{player.acwr.toFixed(2)}</div>
            <div className="mt-1 text-xs font-semibold text-slate-500">{decision.label} · {decision.intensity}</div>
          </div>
        </div>
      </section>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Distanz (7d)", value: `${weekDistance} km`, icon: Navigation, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Sprints (7d)", value: weekSprints, icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
          { label: "Max. Tempo", value: `${maxSpeed} km/h`, icon: Timer, color: "text-sky-600", bg: "bg-sky-50" },
          { label: "HI-Läufe (7d)", value: weekHIRuns, icon: Activity, color: "text-slate-700", bg: "bg-slate-100" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
            <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${bg}`}>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <div className="mb-1 text-xs text-slate-400">{label}</div>
            <div className={`text-2xl font-black ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      <div className="mb-6 grid gap-5 lg:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <ACWRChart data={player.acwrHistory} title="ACWR-Verlauf gegen Baseline" light />
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <HRVChart data={player.hrv} light />
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">Heutiger Hooper-Score</span>
            <div className={`text-2xl font-black ${
              player.hooper.total <= 14 ? "text-emerald-600" : player.hooper.total <= 20 ? "text-amber-500" : "text-rose-600"
            }`}>
              {player.hooper.total}<span className="text-sm text-slate-400">/28</span>
            </div>
          </div>
          <div className="space-y-3">
            {hooperDims.map(({ label, val }) => (
              <div key={label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-slate-500">{label}</span>
                  <span className="font-semibold text-slate-700">{val}/7</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${
                      val <= 2 ? "bg-emerald-500" : val <= 4 ? "bg-amber-400" : "bg-rose-500"
                    }`}
                    style={{ width: `${(val / 7) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">Hooper-Skala: 1 = optimal, 7 = sehr schlecht · Grundlage für die Trainingssteuerung.</p>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold text-slate-700">Trainingsempfehlung</span>
          </div>
          <AIInsightCard severity={decision.severity} text={`${decision.label}: ${decision.detail}`} />

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Letzte Einheit</span>
              <span className="text-slate-700">{lastLoad.distance} km · {lastLoad.sprints} Sprints</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">HRV heute</span>
              <span className="text-slate-700">{player.hrv[player.hrv.length - 1].hrv} ms</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Session-Einsatz</span>
              <span className={`font-semibold ${
                decision.type === "pause" ? "text-rose-600" :
                decision.type === "reduce" ? "text-amber-500" :
                "text-emerald-600"
              }`}>
                {decision.tableLabel} · {decision.intensity}
              </span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="text-slate-500">Privatsphäre</span>
              <span className="flex items-center gap-1 text-right text-xs font-semibold text-slate-600">
                {player.cycleOptIn ? <LockKeyhole className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
                {player.cycleOptIn ? "Opt-in geschützt im Score" : "Kein Zyklus-Opt-in aktiv"}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
