"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Crosshair,
  Dumbbell,
  HeartPulse,
  LockKeyhole,
  Map as MapIcon,
  MessageSquareText,
  Radar,
  Route,
  Send,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { aiInsights, clubInfo, demoContext, players, squadACWRHistory } from "@/data/mockData";
import PlayerCard from "@/components/trainer/PlayerCard";
import ACWRChart from "@/components/trainer/ACWRChart";
import AIInsightCard from "@/components/trainer/AIInsightCard";
import EquipmentPool from "@/components/trainer/EquipmentPool";
import {
  getShortName,
  getSquadSessionIntensity,
  getTrainingDecision,
  type TrainingDecisionType,
} from "@/lib/trainingDecision";

type Filter = "all" | "risk" | "fit";
type TacticGraphicType = "heatmap" | "sprints" | "pressing" | "shape";

const decisionTone: Record<
  TrainingDecisionType,
  {
    bg: string;
    border: string;
    text: string;
    soft: string;
    dot: string;
  }
> = {
  full: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    soft: "bg-emerald-100",
    dot: "bg-emerald-500",
  },
  reduce: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    soft: "bg-amber-100",
    dot: "bg-amber-400",
  },
  pause: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-700",
    soft: "bg-rose-100",
    dot: "bg-rose-500",
  },
};

function TacticGraphic({ type }: { type: TacticGraphicType }) {
  const pitchLine = "absolute border border-white/55";

  return (
    <div className="relative mb-3 h-28 overflow-hidden rounded-lg bg-[#0f2a20] ring-1 ring-slate-200">
      <div className="absolute inset-2 rounded border border-white/45" />
      <div className="absolute left-1/2 top-2 h-[calc(100%-16px)] w-px bg-white/35" />
      <div className="absolute left-[calc(50%-18px)] top-[calc(50%-18px)] h-9 w-9 rounded-full border border-white/35" />
      <div className={`${pitchLine} left-2 top-[34px] h-10 w-8`} />
      <div className={`${pitchLine} right-2 top-[34px] h-10 w-8`} />

      {type === "heatmap" && (
        <>
          <div className="absolute left-6 top-7 h-14 w-20 rounded-full bg-rose-400/65 blur-xl" />
          <div className="absolute left-16 top-11 h-10 w-16 rounded-full bg-amber-300/55 blur-lg" />
          <div className="absolute right-10 top-8 h-10 w-12 rounded-full bg-sky-300/35 blur-lg" />
          <div className="absolute left-10 top-8 h-3 w-3 rounded-full bg-rose-100 shadow" />
          <div className="absolute left-28 top-14 h-2.5 w-2.5 rounded-full bg-white/90" />
          <div className="absolute right-14 top-12 h-2.5 w-2.5 rounded-full bg-white/80" />
        </>
      )}

      {type === "sprints" && (
        <>
          <div className="absolute left-7 top-14 h-0.5 w-32 rotate-[-12deg] rounded-full bg-rose-300" />
          <div className="absolute left-20 top-7 h-0.5 w-24 rotate-[16deg] rounded-full bg-sky-300" />
          <div className="absolute left-12 top-20 h-0.5 w-28 rotate-[-28deg] rounded-full bg-amber-300" />
          <div className="absolute left-[142px] top-[43px] h-2 w-2 rounded-full bg-rose-100" />
          <div className="absolute left-[154px] top-[72px] h-2 w-2 rounded-full bg-sky-100" />
          <div className="absolute right-8 top-7 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-black text-slate-950">
            34.1
          </div>
        </>
      )}

      {type === "pressing" && (
        <>
          <div className="absolute left-3 top-2 h-[calc(100%-16px)] w-[34%] bg-emerald-300/15" />
          <div className="absolute left-[37%] top-2 h-[calc(100%-16px)] w-[28%] bg-amber-300/20" />
          <div className="absolute right-3 top-2 h-[calc(100%-16px)] w-[31%] bg-rose-400/20" />
          {[18, 34, 50, 66].map((top, index) => (
            <div key={top} className="absolute h-2.5 w-2.5 rounded-full bg-rose-200" style={{ left: `${46 + index * 10}%`, top }} />
          ))}
          {[22, 42, 62].map((top, index) => (
            <div key={top} className="absolute h-2 w-2 rounded-full bg-white/85" style={{ left: `${25 + index * 5}%`, top }} />
          ))}
        </>
      )}

      {type === "shape" && (
        <>
          <div className="absolute left-10 top-10 h-0.5 w-24 rotate-[11deg] rounded-full bg-white/35" />
          <div className="absolute left-20 top-16 h-0.5 w-28 rotate-[-8deg] rounded-full bg-white/35" />
          <div className="absolute left-12 top-16 h-0.5 w-24 rotate-[-27deg] rounded-full bg-rose-300/80" />
          {[
            { left: 32, top: 52, color: "bg-emerald-300" },
            { left: 80, top: 36, color: "bg-emerald-300" },
            { left: 112, top: 68, color: "bg-emerald-300" },
            { right: 64, top: 48, color: "bg-rose-300" },
            { right: 32, top: 80, color: "bg-rose-300" },
          ].map(({ left, right, top, color }, index) => (
            <div
              key={index}
              className={`absolute h-3 w-3 rounded-full ${color} ring-2 ring-[#0f2a20]`}
              style={{ left, right, top }}
            />
          ))}
          <div className="absolute bottom-2 right-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-black text-slate-950">
            +6 m
          </div>
        </>
      )}
    </div>
  );
}

export default function TrainerDashboard() {
  const [filter, setFilter] = useState<Filter>("risk");

  const playerDecisions = players.map((player) => ({
    player,
    decision: getTrainingDecision(player),
  }));

  const pausePlayers = playerDecisions.filter(({ decision }) => decision.type === "pause");
  const reducedPlayers = playerDecisions.filter(({ decision }) => decision.type === "reduce");
  const fullPlayers = playerDecisions.filter(({ decision }) => decision.type === "full");
  const checkInCount = players.filter((p) => Boolean(p.hooper.date)).length;
  const optInCount = players.filter((p) => p.cycleOptIn).length;
  const avgACWR = (players.reduce((s, p) => s + p.acwr, 0) / players.length).toFixed(2);
  const avgHRV = Math.round(
    players.reduce((sum, player) => sum + (player.hrv.at(-1)?.hrv ?? 0), 0) / players.length
  );
  const avgBaselineDays = Math.round(players.reduce((sum, player) => sum + player.baselineDays, 0) / players.length);
  const teamIntensity = getSquadSessionIntensity(pausePlayers.length, reducedPlayers.length);

  const filtered = players.filter((p) =>
    filter === "risk"
      ? p.riskLevel === "red" || p.riskLevel === "yellow"
      : filter === "fit"
      ? p.riskLevel === "green"
      : true
  );

  const prioritizedActions = playerDecisions
    .filter(({ decision }) => decision.type !== "full")
    .sort((a, b) => {
      if (a.decision.type !== b.decision.type) return a.decision.type === "pause" ? -1 : 1;
      return b.player.acwr - a.player.acwr;
    });

  const pauseNames = pausePlayers.map(({ player }) => getShortName(player)).join(", ");
  const reducedNames = reducedPlayers.map(({ player }) => getShortName(player)).join(", ");

  const kpis = [
    {
      label: "Voll trainieren",
      value: fullPlayers.length,
      detail: "100% Intensität möglich",
      icon: CheckCircle2,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
    },
    {
      label: "Reduzieren",
      value: reducedPlayers.length,
      detail: "Sprintspitzen begrenzen",
      icon: AlertTriangle,
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      label: "Pause/Abklärung",
      value: pausePlayers.length,
      detail: "kein hochintensiver Block",
      icon: Activity,
      color: "text-rose-700",
      bg: "bg-rose-50",
    },
    {
      label: "Check-ins",
      value: `${checkInCount}/${players.length}`,
      detail: `${optInCount} Opt-ins geschützt`,
      icon: ClipboardCheck,
      color: "text-slate-900",
      bg: "bg-slate-100",
    },
  ];

  const tacticalOutputs = [
    {
      title: "Belastungsraum links",
      graphic: "heatmap" as const,
      metric: "linker Flügel +18%",
      output: "Links primär Raumaufteilung coachen; rechte Seite für kontrollierte Sprintkorridore nutzen.",
      icon: MapIcon,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
    },
    {
      title: "Sprintkorridor rechts",
      graphic: "sprints" as const,
      metric: "42 High-Speed Runs",
      output: "Wiederholte Tiefenläufe nur für grüne Spielerinnen; reduzierte Gruppe in Passrollen halten.",
      icon: Route,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
    },
    {
      title: "Pressing-Fenster",
      graphic: "pressing" as const,
      metric: "12.-18. Minute",
      output: "Pressingblock kurz halten und vor jeder Wiederholung Abstände im Zentrum prüfen.",
      icon: Crosshair,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Linienabstand",
      graphic: "shape" as const,
      metric: "IV-DM +6 m",
      output: "8-gegen-8 mit Korrektur der Abstände statt langer Umschaltserie planen.",
      icon: Radar,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-700",
    },
  ];

  return (
    <div className="px-4 py-5 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#10172a] px-3 py-1 text-xs font-bold text-white">
              Female-informed Decision Layer
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
              {clubInfo.team} · {clubInfo.season}
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
              Demo-Stand: {demoContext.label}
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">Heute entscheiden</h1>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Aus GPS/GNSS, HRV und Hooper-Check-ins wird eine klare Trainingsentscheidung: voll trainieren,
            reduzieren oder pausieren.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-600 shadow-sm">
            <Clock className="h-4 w-4 text-slate-700" />
            <span>
              Einheit: <strong className="font-bold text-slate-950">{clubInfo.nextSession.date}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-600 shadow-sm">
            <CalendarDays className="h-4 w-4 text-sky-600" />
            <span>
              {clubInfo.nextMatch.date} · <strong className="font-bold text-slate-950">{clubInfo.nextMatch.opponent}</strong>
            </span>
          </div>
        </div>
      </div>

      <section className="mb-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                <Target className="h-4 w-4 text-slate-800" />
              </div>
              <div>
                <h2 className="text-sm font-black text-slate-950">Tagesentscheidung für die nächste Einheit</h2>
                <p className="text-xs text-slate-500">
                  {clubInfo.nextSession.type} · {clubInfo.nextSession.location} · Teamintensität {teamIntensity}%
                </p>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                <div className="text-xs font-bold text-emerald-700">Voll einplanen</div>
                <div className="mt-1 text-2xl font-black text-emerald-700">{fullPlayers.length}</div>
                <p className="mt-1 text-xs leading-5 text-emerald-800/80">Teamblock regulär möglich.</p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                <div className="text-xs font-bold text-amber-700">Reduziert steuern</div>
                <div className="mt-1 text-2xl font-black text-amber-700">{reducedPlayers.length}</div>
                <p className="mt-1 text-xs leading-5 text-amber-800/80">{reducedNames || "Keine Spielerin"} ohne Sprintserie.</p>
              </div>
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-3">
                <div className="text-xs font-bold text-rose-700">Pausieren/prüfen</div>
                <div className="mt-1 text-2xl font-black text-rose-700">{pausePlayers.length}</div>
                <p className="mt-1 text-xs leading-5 text-rose-800/80">{pauseNames || "Keine Spielerin"} heute schützen.</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-950">
              <Dumbbell className="h-4 w-4 text-slate-700" />
              Session-Vorschlag
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Intensität</span>
                <span className="font-bold text-slate-950">{teamIntensity}%</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Fokus</span>
                <span className="font-bold text-slate-950">Taktik + Recovery</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Monitoring</span>
                <span className="font-bold text-slate-950">GNSS + HRV</span>
              </div>
            </div>
            <Link
              href="/trainer/session"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-slate-950 transition-colors hover:text-emerald-700"
            >
              Session Planner öffnen
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map(({ label, value, detail, icon: Icon, color, bg }) => (
          <div key={label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${bg}`}>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Heute</span>
            </div>
            <div className={`text-3xl font-black ${color}`}>{value}</div>
            <div className="mt-1 text-xs font-semibold text-slate-500">{label}</div>
            <div className="mt-0.5 text-[11px] text-slate-400">{detail}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-black text-slate-950">Priorisierte Maßnahmen</h2>
                <p className="text-xs text-slate-500">Die nächsten Entscheidungen vor Trainingsbeginn.</p>
              </div>
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500">
                {prioritizedActions.length} Spielerinnen priorisiert
              </span>
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              {prioritizedActions.map(({ player, decision }) => {
                const tone = decisionTone[decision.type];
                return (
                  <Link
                    key={player.id}
                    href={`/trainer/player/${player.id}`}
                    className={`rounded-lg border ${tone.border} ${tone.bg} p-3 transition-all hover:-translate-y-0.5 hover:shadow-sm`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${tone.dot}`} />
                          <span className="truncate text-sm font-black text-slate-950">{player.name}</span>
                        </div>
                        <div className="mt-1 text-xs text-slate-500">
                          #{player.number} · {player.position} · Baseline {player.baselineDays} Tage
                        </div>
                      </div>
                      <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-black ${tone.soft} ${tone.text}`}>
                        {decision.label}
                      </span>
                    </div>
                    <div className="mt-3 text-xs font-bold text-slate-700">{decision.reason}</div>
                    <p className="mt-1 text-xs leading-5 text-slate-600">{decision.recommendation}</p>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
                  <TrendingUp className="h-4 w-4 text-emerald-700" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-slate-950">Readiness gegen individuelle Baselines</h2>
                  <p className="text-xs text-slate-500">
                    ACWR, HRV und Hooper werden als Trainingshinweis für die nächste Einheit interpretiert.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1 text-xs font-bold">
                <span className="rounded-full bg-white px-3 py-1 text-slate-950 shadow-sm">21T</span>
                <span className="px-2 py-1 text-slate-400">7T</span>
                <span className="px-2 py-1 text-slate-400">28T</span>
              </div>
            </div>
            <ACWRChart data={squadACWRHistory} showLegend light />
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50">
                  <BarChart3 className="h-4 w-4 text-sky-700" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-slate-950">GNSS-Output für die Einheit</h2>
                  <p className="text-xs text-slate-500">
                    Bewegungsdaten werden in konkrete Trainingssteuerung übersetzt.
                  </p>
                </div>
              </div>
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500">
                Live aus 22 GPS/GNSS-Trackern
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {tacticalOutputs.map(({ title, graphic, metric, output, icon: Icon, iconBg, iconColor }) => (
                <div key={title} className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                  <TacticGraphic type={graphic} />
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
                      <Icon className={`h-4 w-4 ${iconColor}`} />
                    </div>
                    <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">
                      Trainer-Output
                    </span>
                  </div>
                  <div className="text-sm font-black text-slate-950">{title}</div>
                  <div className="mt-1 text-xs font-bold text-slate-700">{metric}</div>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{output}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-black text-slate-950">Squad-Ampel</h2>
                  <p className="text-xs text-slate-500">
                    {checkInCount}/{players.length} Check-ins · HRV-Schnitt {avgHRV} ms
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1">
                  {(["all", "risk", "fit"] as Filter[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                        filter === f ? "bg-[#10172a] text-white shadow-sm" : "text-slate-500 hover:text-slate-950"
                      }`}
                    >
                      {f === "all" ? "Alle" : f === "risk" ? "Risiko" : "Fit"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                {filtered.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </section>

            <div className="space-y-5">
              <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <HeartPulse className="h-4 w-4 text-sky-700" />
                  <h2 className="text-sm font-black text-slate-950">Baseline & Privacy</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                    <span className="text-xs font-semibold text-slate-500">Ø Squad-ACWR</span>
                    <span className="text-lg font-black text-slate-950">{avgACWR}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2">
                    <span className="text-xs font-semibold text-emerald-700">Ø Baseline-Historie</span>
                    <span className="text-lg font-black text-emerald-700">{avgBaselineDays}T</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                    <span className="text-xs font-semibold text-slate-500">Zyklus-Opt-ins</span>
                    <span className="text-lg font-black text-slate-950">{optInCount}/{players.length}</span>
                  </div>
                </div>
              </section>

              <EquipmentPool />
            </div>
          </div>
        </div>

        <aside className="rounded-lg bg-[#12162b] p-5 text-white shadow-xl shadow-slate-300/40 xl:sticky xl:top-20 xl:self-start">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="text-sm font-black">KI-Coach Beta</span>
              </div>
              <p className="text-xs leading-5 text-slate-400">
                Entscheidungsassistenz für Trainingssteuerung. Trainer:innen behalten die finale Verantwortung.
              </p>
            </div>
            <span className="rounded-full bg-sky-400/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-sky-200">
              Assistenz
            </span>
          </div>

          <div className="mb-4 rounded-lg border border-white/10 bg-white/[0.04] p-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-200">
              <MessageSquareText className="h-4 w-4 text-sky-300" />
              Session-Vorschlag
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-slate-400">Intensität</span>
                <span className="font-bold text-white">{teamIntensity}% moderat</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-slate-400">Fokus</span>
                <span className="font-bold text-white">Taktik + Readiness</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-slate-400">Nicht planen</span>
                <span className="font-bold text-white">lange Sprintserie</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {aiInsights.map((insight) => (
              <AIInsightCard key={insight.id} severity={insight.severity} text={insight.text} />
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-3">
            <div className="flex items-start gap-2">
              <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" />
              <p className="text-xs leading-5 text-emerald-50">
                Zykluskontext ist freiwillig, verschlüsselt und im Trainer-Dashboard nur als geschützter Kontext im Score enthalten.
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1.5">
            <span className="flex-1 px-3 text-xs text-slate-500">Warum ist Elena heute reduziert?</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white transition-colors hover:bg-emerald-400" aria-label="Frage senden">
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
