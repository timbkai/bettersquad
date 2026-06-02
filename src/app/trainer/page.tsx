"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { players, squadACWRHistory, aiInsights, clubInfo } from "@/data/mockData";
import TrainerNav from "@/components/shared/TrainerNav";
import PlayerCard from "@/components/trainer/PlayerCard";
import ACWRChart from "@/components/trainer/ACWRChart";
import AIInsightCard from "@/components/trainer/AIInsightCard";
import EquipmentPool from "@/components/trainer/EquipmentPool";

type Filter = "all" | "risk" | "fit";

export default function TrainerDashboard() {
  const [filter, setFilter] = useState<Filter>("risk");

  const redCount = players.filter((p) => p.riskLevel === "red").length;
  const yellowCount = players.filter((p) => p.riskLevel === "yellow").length;
  const fitCount = players.filter((p) => p.riskLevel === "green").length;

  const filtered = players.filter((p) => {
    if (filter === "risk") return p.riskLevel === "red" || p.riskLevel === "yellow";
    if (filter === "fit") return p.riskLevel === "green";
    return true;
  });

  const avgACWR = (players.reduce((s, p) => s + p.acwr, 0) / players.length).toFixed(2);
  const redPlayerNames = players
    .filter((p) => p.riskLevel === "red")
    .map((p) => {
      const parts = p.name.split(" ");
      return `${parts[0]} ${parts[1][0]}.`;
    })
    .join(", ");

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <TrainerNav />

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-white">{clubInfo.name}</h1>
            <p className="text-slate-400 text-sm mt-1">
              {clubInfo.team} · {clubInfo.season}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/60 border border-white/8 rounded-xl px-4 py-2.5">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-slate-300">
              Nächste Einheit: <strong className="text-white">{clubInfo.nextSession.date}</strong>
            </span>
            <span className="text-xs text-slate-500">· {clubInfo.nextSession.type}</span>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Ø Squad-ACWR", value: avgACWR, icon: TrendingUp, color: "text-slate-300" },
            { label: "Fit (Grün)", value: fitCount, icon: CheckCircle, color: "text-emerald-400" },
            { label: "Vorsicht (Gelb)", value: yellowCount, icon: AlertTriangle, color: "text-amber-400" },
            { label: "Risiko (Rot)", value: redCount, icon: AlertTriangle, color: "text-red-400" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-slate-900/60 border border-white/8 rounded-xl px-4 py-3.5">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-xs text-slate-500">{label}</span>
              </div>
              <div className={`text-3xl font-black ${color}`}>{value}</div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Squad + Chart */}
          <div className="lg:col-span-2 space-y-5">
            {/* ACWR Squad Chart */}
            <div className="bg-slate-900/60 border border-white/8 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-slate-300">Squad ACWR – Letzte 21 Tage</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Ø Team</div>
                  <div className="text-lg font-black text-white">{avgACWR}</div>
                </div>
              </div>
              <ACWRChart data={squadACWRHistory} showLegend />
            </div>

            {/* Squad Ampel */}
            <div className="bg-slate-900/60 border border-white/8 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-300">Squad-Ampel</span>
                <div className="flex items-center gap-1">
                  {(["all", "risk", "fit"] as Filter[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
                        filter === f
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      {f === "all" ? "Alle" : f === "risk" ? "Risiko" : "Fit"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filtered.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: AI + Equipment */}
          <div className="space-y-5">
            {/* AI Insights */}
            <div className="bg-slate-900/60 border border-white/8 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-slate-300">KI-Empfehlungen</span>
              </div>
              <div className="space-y-3">
                {aiInsights.map((insight) => (
                  <AIInsightCard key={insight.id} severity={insight.severity} text={insight.text} />
                ))}
              </div>
            </div>

            {/* Equipment Pool */}
            <EquipmentPool />

            {/* Next Session */}
            <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-5">
              <div className="text-sm font-semibold text-emerald-400 mb-3">Empfohlene Session</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Intensität</span>
                  <span className="font-semibold text-white">Moderat (−20%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fokus</span>
                  <span className="font-semibold text-white">Taktik + Regeneration</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pause: {redPlayerNames}</span>
                  <span className="font-semibold text-red-400">Ruhe</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Monitoring</span>
                  <span className="font-semibold text-white">GPS + HRV aktiv</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
