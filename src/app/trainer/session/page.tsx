"use client";

import Link from "next/link";
import { ArrowLeft, Download, Calendar, Target } from "lucide-react";
import { players, clubInfo } from "@/data/mockData";
import TrainerNav from "@/components/shared/TrainerNav";
import StatusBadge from "@/components/shared/StatusBadge";

const intensityMap = {
  red: { label: "Pause", color: "text-red-400 bg-red-500/10", pct: 0 },
  yellow: { label: "Leicht (−20%)", color: "text-amber-400 bg-amber-500/10", pct: 80 },
  green: { label: "Voll", color: "text-emerald-400 bg-emerald-500/10", pct: 100 },
};

export default function SessionPlanner() {
  const available = players.filter((p) => p.riskLevel !== "red");
  const avgACWR = (players.reduce((s, p) => s + p.acwr, 0) / players.length).toFixed(2);
  const squadIntensity =
    players.filter((p) => p.riskLevel === "red").length >= 3 ? 70 : 85;

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <TrainerNav />

      <div className="max-w-5xl mx-auto px-6 py-6">
        <Link href="/trainer" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-white">Session Planner</h1>
            <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {clubInfo.nextSession.date} · {clubInfo.nextSession.type} · {clubInfo.nextSession.location}
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg hover:bg-emerald-500/25 transition-colors">
            <Download className="w-4 h-4" />
            Sessionplan exportieren
          </button>
        </div>

        {/* Squad recommendation box */}
        <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-emerald-400">KI-Sessionempfehlung</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-slate-500 mb-1">Ø Squad-ACWR</div>
              <div className="text-3xl font-black text-white">{avgACWR}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Empfohlene Intensität</div>
              <div className="text-3xl font-black text-white">{squadIntensity}%</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Verfügbare Spieler</div>
              <div className="text-3xl font-black text-white">{available.length}<span className="text-slate-500 text-lg">/{players.length}</span></div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-emerald-500/20 text-sm text-slate-300">
            Empfehlung: <strong className="text-white">Taktik-Fokus, kein hochintensiver Sprint-Block.</strong>
            {" "}Luis Müller und Moritz Krause pausieren. Elias Weber und Lena Bauer mit reduzierter Belastung.
          </div>
        </div>

        {/* Player Availability Matrix */}
        <div className="bg-slate-900/60 border border-white/8 rounded-2xl p-5">
          <div className="text-sm font-semibold text-slate-300 mb-4">Kaderverfügbarkeit – Nächste Einheit</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-white/6">
                  <th className="text-left pb-3 pr-4">Spieler</th>
                  <th className="text-left pb-3 pr-4">Position</th>
                  <th className="text-left pb-3 pr-4">ACWR</th>
                  <th className="text-left pb-3 pr-4">Hooper</th>
                  <th className="text-left pb-3 pr-4">Status</th>
                  <th className="text-left pb-3">Intensität</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {players.map((player) => {
                  const intensity = intensityMap[player.riskLevel];
                  return (
                    <tr key={player.id} className="hover:bg-white/2 transition-colors">
                      <td className="py-3 pr-4">
                        <Link
                          href={`/trainer/player/${player.id}`}
                          className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                        >
                          <div className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-white ${
                            player.riskLevel === "red" ? "bg-red-500/20" : player.riskLevel === "yellow" ? "bg-amber-500/20" : "bg-emerald-500/20"
                          }`}>
                            {player.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span className="font-medium text-white">{player.name}</span>
                          {player.gender === "female" && (
                            <span className="text-[10px] px-1 py-0.5 bg-purple-500/15 text-purple-400 rounded-full">W</span>
                          )}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-slate-400">#{player.number} · {player.position}</td>
                      <td className="py-3 pr-4">
                        <span className={`font-bold ${
                          player.riskLevel === "red" ? "text-red-400" : player.riskLevel === "yellow" ? "text-amber-400" : "text-emerald-400"
                        }`}>{player.acwr.toFixed(2)}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`font-semibold ${
                          player.hooper.total <= 14 ? "text-emerald-400" : player.hooper.total <= 20 ? "text-amber-400" : "text-red-400"
                        }`}>{player.hooper.total}/28</span>
                      </td>
                      <td className="py-3 pr-4">
                        <StatusBadge risk={player.riskLevel} size="sm" />
                      </td>
                      <td className="py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${intensity.color}`}>
                          {intensity.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
