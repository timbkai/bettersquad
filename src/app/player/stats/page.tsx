"use client";

import { players } from "@/data/mockData";
import ACWRChart from "@/components/trainer/ACWRChart";
import HRVChart from "@/components/trainer/HRVChart";
import { Navigation, Zap, Timer, Activity, TrendingUp } from "lucide-react";

const myPlayer = players[6];

export default function PlayerStats() {
  const weekLoad = myPlayer.dailyLoads.slice(-7);
  const weekDistance = weekLoad.reduce((s, d) => s + d.distance, 0).toFixed(1);
  const weekSprints = weekLoad.reduce((s, d) => s + d.sprints, 0);
  const maxSpeed = Math.max(...weekLoad.map((d) => d.maxSpeed)).toFixed(1);
  const weekHIRuns = weekLoad.reduce((s, d) => s + d.hiRuns, 0);

  const teamAvgACWR = (players.reduce((s, p) => s + p.acwr, 0) / players.length).toFixed(2);
  const myACWR = myPlayer.acwr.toFixed(2);
  const vsTeam = (myPlayer.acwr - parseFloat(teamAvgACWR)).toFixed(2);
  const vsTeamPositive = parseFloat(vsTeam) >= 0;

  return (
    <div className="px-4 py-5 space-y-5">
      <div>
        <h1 className="text-xl font-black text-white">Meine Statistiken</h1>
        <p className="text-slate-400 text-sm mt-1">{myPlayer.name} · #{myPlayer.number} · {myPlayer.position}</p>
      </div>

      {/* This week GPS */}
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Diese Woche</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Distanz", value: `${weekDistance} km`, icon: Navigation, color: "text-emerald-400" },
            { label: "Sprints", value: weekSprints, icon: Zap, color: "text-amber-400" },
            { label: "Max-Tempo", value: `${maxSpeed} km/h`, icon: Timer, color: "text-blue-400" },
            { label: "HI-Läufe", value: weekHIRuns, icon: Activity, color: "text-purple-400" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-slate-900/60 border border-white/8 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Icon className={`w-3.5 h-3.5 ${color}`} />
                <span className="text-xs text-slate-500">{label}</span>
              </div>
              <div className={`text-xl font-black ${color}`}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team comparison */}
      <div className="bg-slate-900/60 border border-white/8 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-slate-300">Vergleich Team</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1 text-center">
            <div className="text-xs text-slate-500 mb-1">Mein ACWR</div>
            <div className="text-2xl font-black text-white">{myACWR}</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-black ${vsTeamPositive ? "text-red-400" : "text-emerald-400"}`}>
              {vsTeamPositive ? "+" : ""}{vsTeam}
            </div>
            <div className="text-xs text-slate-600">vs. Team</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-xs text-slate-500 mb-1">Ø Team</div>
            <div className="text-2xl font-black text-slate-400">{teamAvgACWR}</div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-white/6 text-xs text-slate-500 text-center">
          {vsTeamPositive
            ? "Deine Belastung liegt über dem Teamdurchschnitt."
            : "Du bist weniger belastet als der Teamdurchschnitt."}
        </div>
      </div>

      {/* ACWR Chart */}
      <div className="bg-slate-900/60 border border-white/8 rounded-xl p-4">
        <ACWRChart data={myPlayer.acwrHistory} title="Mein ACWR-Verlauf" />
      </div>

      {/* HRV Chart */}
      <div className="bg-slate-900/60 border border-white/8 rounded-xl p-4">
        <HRVChart data={myPlayer.hrv} />
      </div>

      {/* Hooper history mini */}
      <div className="bg-slate-900/60 border border-white/8 rounded-xl p-4 pb-6">
        <div className="text-sm font-semibold text-slate-300 mb-3">Heutiger Hooper-Score</div>
        <div className="space-y-2.5">
          {[
            { label: "Schlaf", val: myPlayer.hooper.sleep },
            { label: "Muskelkater", val: myPlayer.hooper.soreness },
            { label: "Energie", val: myPlayer.hooper.fatigue },
            { label: "Stimmung", val: myPlayer.hooper.mood },
          ].map(({ label, val }) => (
            <div key={label}>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>{label}</span>
                <span className="font-semibold text-white">{val}/7</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${val <= 2 ? "bg-emerald-500" : val <= 4 ? "bg-amber-400" : "bg-red-500"}`}
                  style={{ width: `${(val / 7) * 100}%` }}
                />
              </div>
            </div>
          ))}
          <div className="pt-2 border-t border-white/6 flex justify-between text-sm font-bold">
            <span className="text-slate-400">Gesamt</span>
            <span className={myPlayer.hooper.total <= 14 ? "text-emerald-400" : myPlayer.hooper.total <= 20 ? "text-amber-400" : "text-red-400"}>
              {myPlayer.hooper.total}/28
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
