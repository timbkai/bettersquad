"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Zap, Navigation, Timer, Activity } from "lucide-react";
import { players } from "@/data/mockData";
import TrainerNav from "@/components/shared/TrainerNav";
import StatusBadge from "@/components/shared/StatusBadge";
import ACWRChart from "@/components/trainer/ACWRChart";
import HRVChart from "@/components/trainer/HRVChart";
import AIInsightCard from "@/components/trainer/AIInsightCard";

export default function PlayerDetail({ params }: { params: { id: string } }) {
  const player = players.find((p) => p.id === params.id);
  if (!player) notFound();

  const lastLoad = player.dailyLoads[player.dailyLoads.length - 1];
  const weekLoad = player.dailyLoads.slice(-7);
  const weekDistance = weekLoad.reduce((s, d) => s + d.distance, 0).toFixed(1);
  const weekSprints = weekLoad.reduce((s, d) => s + d.sprints, 0);
  const maxSpeed = Math.max(...weekLoad.map((d) => d.maxSpeed)).toFixed(1);
  const weekHIRuns = weekLoad.reduce((s, d) => s + d.hiRuns, 0);

  const hoooperDims = [
    { label: "Schlaf", val: player.hooper.sleep },
    { label: "Muskelkater", val: player.hooper.soreness },
    { label: "Energie", val: player.hooper.fatigue },
    { label: "Stimmung", val: player.hooper.mood },
  ];

  const acwrRisk =
    player.riskLevel === "red"
      ? { severity: "red" as const, text: `ACWR ${player.acwr} liegt über der kritischen Schwelle von 1.5. Training heute NICHT empfohlen – aktive Regeneration (Schwimmen, Radfahren niedrig) stattdessen.` }
      : player.riskLevel === "yellow"
      ? { severity: "yellow" as const, text: `ACWR ${player.acwr} im Gelbbereich. Trainingsbelastung um 15–20% reduzieren. Kein hochintensiver Sprint-Block heute.` }
      : { severity: "green" as const, text: `ACWR ${player.acwr} im optimalen Bereich. Normale Trainingsbelastung empfohlen. High-Intensity-Block planmäßig möglich.` };

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <TrainerNav />

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Back */}
        <Link href="/trainer" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Squad-Übersicht
        </Link>

        {/* Player Header */}
        <div className="bg-slate-900/60 border border-white/8 rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white ${
                player.riskLevel === "red" ? "bg-red-500/20" : player.riskLevel === "yellow" ? "bg-amber-500/20" : "bg-emerald-500/20"
              }`}>
                {player.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-black text-white">{player.name}</h1>
                  <StatusBadge risk={player.riskLevel} />
                  {player.gender === "female" && (
                    <span className="text-xs px-2 py-0.5 bg-purple-500/15 text-purple-400 border border-purple-500/30 rounded-full">
                      Frauen-Modul aktiv
                    </span>
                  )}
                </div>
                <div className="text-slate-400 text-sm mt-1">
                  #{player.number} · {player.position} · {player.age} Jahre
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">ACWR</div>
              <div className={`text-4xl font-black ${
                player.riskLevel === "red" ? "text-red-400" : player.riskLevel === "yellow" ? "text-amber-400" : "text-emerald-400"
              }`}>{player.acwr.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* GPS Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Distanz (7d)", value: `${weekDistance} km`, icon: Navigation, color: "text-emerald-400" },
            { label: "Sprints (7d)", value: weekSprints, icon: Zap, color: "text-amber-400" },
            { label: "Max. Tempo", value: `${maxSpeed} km/h`, icon: Timer, color: "text-blue-400" },
            { label: "HI-Läufe (7d)", value: weekHIRuns, icon: Activity, color: "text-purple-400" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-slate-900/60 border border-white/8 rounded-xl px-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-xs text-slate-500">{label}</span>
              </div>
              <div className={`text-2xl font-black ${color}`}>{value}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-5 mb-6">
          <div className="bg-slate-900/60 border border-white/8 rounded-xl p-5">
            <ACWRChart data={player.acwrHistory} title="ACWR-Verlauf (4 Wochen)" />
          </div>
          <div className="bg-slate-900/60 border border-white/8 rounded-xl p-5">
            <HRVChart data={player.hrv} />
          </div>
        </div>

        {/* Hooper + AI */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Hooper Score */}
          <div className="bg-slate-900/60 border border-white/8 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-300">Heutiger Hooper-Score</span>
              <div className={`text-2xl font-black ${
                player.hooper.total <= 14 ? "text-emerald-400" : player.hooper.total <= 20 ? "text-amber-400" : "text-red-400"
              }`}>
                {player.hooper.total}<span className="text-sm text-slate-500">/28</span>
              </div>
            </div>
            <div className="space-y-3">
              {hoooperDims.map(({ label, val }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{label}</span>
                    <span className="text-slate-300 font-semibold">{val}/7</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        val <= 2 ? "bg-emerald-500" : val <= 4 ? "bg-amber-400" : "bg-red-500"
                      }`}
                      style={{ width: `${(val / 7) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-600 mt-3">Hooper-Skala: 1 = optimal, 7 = sehr schlecht · Saw et al. 2016</p>
          </div>

          {/* AI Recommendation */}
          <div className="bg-slate-900/60 border border-white/8 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-slate-300">KI-Trainingsempfehlung</span>
            </div>
            <AIInsightCard severity={acwrRisk.severity} text={acwrRisk.text} />

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">Letztes Training</span>
                <span className="text-slate-300">{lastLoad.distance} km · {lastLoad.sprints} Sprints</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">HRV gestern</span>
                <span className="text-slate-300">{player.hrv[player.hrv.length - 1].hrv} ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Einsatz empfohlen</span>
                <span className={`font-semibold ${player.riskLevel === "red" ? "text-red-400" : player.riskLevel === "yellow" ? "text-amber-400" : "text-emerald-400"}`}>
                  {player.riskLevel === "red" ? "Nein – Pause" : player.riskLevel === "yellow" ? "Eingeschränkt" : "Ja – Vollbelastung"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
