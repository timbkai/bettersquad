"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Download, ShieldCheck, Target } from "lucide-react";
import { clubInfo, players } from "@/data/mockData";
import StatusBadge from "@/components/shared/StatusBadge";
import { getShortName, getSquadSessionIntensity, getTrainingDecision } from "@/lib/trainingDecision";

const intensityStyles = {
  pause: "text-rose-700 bg-rose-50 border border-rose-200",
  reduce: "text-amber-700 bg-amber-50 border border-amber-200",
  full: "text-emerald-700 bg-emerald-50 border border-emerald-200",
};

export default function SessionPlanner() {
  const decisions = players.map((player) => ({
    player,
    decision: getTrainingDecision(player),
  }));
  const pausePlayers = decisions.filter(({ decision }) => decision.type === "pause");
  const reducedPlayers = decisions.filter(({ decision }) => decision.type === "reduce");
  const available = decisions.filter(({ decision }) => decision.type !== "pause");
  const avgACWR = (players.reduce((s, p) => s + p.acwr, 0) / players.length).toFixed(2);
  const squadIntensity = getSquadSessionIntensity(pausePlayers.length, reducedPlayers.length);
  const pauseNames = pausePlayers.map(({ player }) => getShortName(player)).join(", ");
  const reducedNames = reducedPlayers.map(({ player }) => getShortName(player)).join(", ");

  return (
    <div className="max-w-6xl px-4 py-6 sm:px-6">
      <Link href="/trainer" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-800">
        <ArrowLeft className="h-4 w-4" />
        Dashboard
      </Link>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Session Planner</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <Calendar className="h-4 w-4" />
            {clubInfo.nextSession.date} · {clubInfo.nextSession.type} · {clubInfo.nextSession.location}
          </p>
        </div>
        <button className="flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
          <Download className="h-4 w-4" />
          Sessionplan exportieren
        </button>
      </div>

      <section className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
            <Target className="h-4 w-4 text-emerald-700" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-950">Session-Vorschlag</h2>
            <p className="text-xs text-slate-500">Abgeleitet aus ACWR, HRV, Hooper und individuellen Baselines.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <div className="mb-1 text-xs text-slate-500">Ø Squad-ACWR</div>
            <div className="text-3xl font-black text-slate-950">{avgACWR}</div>
          </div>
          <div>
            <div className="mb-1 text-xs text-slate-500">Empfohlene Intensität</div>
            <div className="text-3xl font-black text-slate-950">{squadIntensity}%</div>
          </div>
          <div>
            <div className="mb-1 text-xs text-slate-500">Einplanbare Spielerinnen</div>
            <div className="text-3xl font-black text-slate-950">
              {available.length}<span className="text-lg text-slate-400">/{players.length}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600">
          Empfehlung: <strong className="text-slate-950">Taktik-Fokus, kurze Belastungsspitzen, kein langer Sprint-Block.</strong>{" "}
          {pauseNames || "Keine Spielerin"} pausiert oder wird vor Start geprüft. {reducedNames || "Keine Spielerin"} trainiert reduziert.
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-black text-slate-950">Kaderverfügbarkeit · Nächste Einheit</h2>
            <p className="text-xs text-slate-500">Ampellogik mit Klartext-Empfehlung statt Rohdatenliste.</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
            <ShieldCheck className="h-3.5 w-3.5" />
            Zykluskontext nicht im Klartext sichtbar
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-400">
                <th className="pb-3 pr-4 text-left">Spielerin</th>
                <th className="pb-3 pr-4 text-left">Position</th>
                <th className="pb-3 pr-4 text-left">ACWR</th>
                <th className="pb-3 pr-4 text-left">Hooper</th>
                <th className="pb-3 pr-4 text-left">Status</th>
                <th className="pb-3 pr-4 text-left">Intensität</th>
                <th className="pb-3 text-left">Empfehlung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {decisions.map(({ player, decision }) => (
                <tr key={player.id} className="transition-colors hover:bg-slate-50">
                  <td className="py-3 pr-4">
                    <Link
                      href={`/trainer/player/${player.id}`}
                      className="flex items-center gap-2 transition-colors hover:text-emerald-700"
                    >
                      <div className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold ${
                        player.riskLevel === "red"
                          ? "bg-rose-100 text-rose-600"
                          : player.riskLevel === "yellow"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {player.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="font-medium text-slate-800">{player.name}</span>
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-slate-500">#{player.number} · {player.position}</td>
                  <td className="py-3 pr-4">
                    <span className={`font-bold ${
                      player.riskLevel === "red" ? "text-rose-600" : player.riskLevel === "yellow" ? "text-amber-500" : "text-emerald-600"
                    }`}>{player.acwr.toFixed(2)}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`font-semibold ${
                      player.hooper.total <= 14 ? "text-emerald-600" : player.hooper.total <= 20 ? "text-amber-500" : "text-rose-600"
                    }`}>{player.hooper.total}/28</span>
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge risk={player.riskLevel} size="sm" light />
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`rounded-lg px-2 py-1 text-xs font-semibold ${intensityStyles[decision.type]}`}>
                      {decision.tableLabel} · {decision.intensity}
                    </span>
                  </td>
                  <td className="max-w-[260px] py-3 text-xs leading-5 text-slate-500">{decision.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
