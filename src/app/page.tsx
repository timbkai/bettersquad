"use client";

import Link from "next/link";
import { Activity, Zap, Shield, Users } from "lucide-react";
import BetterSquadLogo from "@/components/shared/BetterSquadLogo";

const features = [
  {
    icon: Activity,
    title: "ACWR & HRV",
    desc: "Wissenschaftlich validierte Belastungssteuerung nach Gabbett et al. – externe und interne Last kombiniert.",
  },
  {
    icon: Zap,
    title: "KI-Trainingsempfehlung",
    desc: "Individuelle Empfehlungen vor jeder Einheit – ohne Sportwissenschaftler vor Ort.",
  },
  {
    icon: Shield,
    title: "Verletzungsprävention",
    desc: "Proaktive Warnung bei ACWR >1.3. Asymmetrie-Erkennung zeigt Risiken 5–10 Tage früher.",
  },
  {
    icon: Users,
    title: "Pool-Modell",
    desc: "Eine Vereinslizenz für alle Mannschaften. Männer, Frauen, Jugend – alles inklusive.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] relative overflow-hidden">
      {/* Pitch lines background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-[0.04]" viewBox="0 0 1200 800">
          <rect x="100" y="60" width="1000" height="680" rx="6" fill="none" stroke="white" strokeWidth="2" />
          <ellipse cx="600" cy="400" rx="120" ry="120" fill="none" stroke="white" strokeWidth="2" />
          <line x1="600" y1="60" x2="600" y2="740" stroke="white" strokeWidth="2" />
          <rect x="100" y="250" width="140" height="300" fill="none" stroke="white" strokeWidth="2" />
          <rect x="960" y="250" width="140" height="300" fill="none" stroke="white" strokeWidth="2" />
          <rect x="100" y="320" width="60" height="160" fill="none" stroke="white" strokeWidth="2" />
          <rect x="1040" y="320" width="60" height="160" fill="none" stroke="white" strokeWidth="2" />
        </svg>
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6">
          <BetterSquadLogo size="md" />
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 px-3 py-1 border border-white/10 rounded-full">
              WiSo Köln · Bachelorseminar 2024/25
            </span>
          </div>
        </header>

        {/* Hero */}
        <main className="flex flex-col items-center text-center px-6 pt-20 pb-24">
          <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-8 font-medium">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Erste integrierte GPS+Recovery-Plattform für Amateurfußball
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white max-w-4xl leading-tight mb-6">
            Investiere in deinen{" "}
            <span className="text-emerald-400">Kader.</span>
            <br />
            Nicht in einzelne Spieler.
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mb-12 leading-relaxed">
            BetterSquad bringt Bundesliga-Methodik in den Amateurfußball.
            ACWR-Belastungssteuerung, HRV-Recovery-Monitoring und KI-Trainingsempfehlungen –
            für <strong className="text-slate-300">219 €/Monat</strong> statt 15.000 $/Jahr.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link
              href="/trainer"
              className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-emerald-500/25"
            >
              <LayoutDashboardIcon />
              Trainer Dashboard
            </Link>
            <Link
              href="/player"
              className="group flex items-center gap-3 bg-white/8 hover:bg-white/12 border border-white/15 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
            >
              <SmartphoneIcon />
              Spieler App
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-20 flex flex-wrap justify-center gap-12">
            {[
              { val: "219 €", label: "/ Monat Starter" },
              { val: "85", label: "Vereine in Jahr 3" },
              { val: "~14:1", label: "LTV/CAC-Ratio" },
              { val: "DSGVO", label: "Konform · Made in DE" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-black text-white">{val}</div>
                <div className="text-sm text-slate-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </main>

        {/* Features */}
        <section className="px-6 pb-24 max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-slate-900/60 border border-white/8 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors"
              >
                <div className="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Packages */}
          <div className="mt-16">
            <h2 className="text-2xl font-black text-center text-white mb-8">Pakete</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "Starter", price: "219 €", deposit: "2.200 €", trackers: 15, teams: 2 },
                { name: "Pro", price: "349 €", deposit: "3.200 €", trackers: 25, teams: 4, highlight: true },
                { name: "Elite", price: "459 €", deposit: "4.200 €", trackers: 35, teams: "∞" },
              ].map((pkg) => (
                <div
                  key={pkg.name}
                  className={`rounded-2xl p-6 border transition-all ${
                    pkg.highlight
                      ? "bg-emerald-500/10 border-emerald-500/40 ring-1 ring-emerald-500/20"
                      : "bg-slate-900/60 border-white/8"
                  }`}
                >
                  {pkg.highlight && (
                    <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/15 px-2 py-0.5 rounded-full mb-3 inline-block">
                      Beliebteste Wahl
                    </span>
                  )}
                  <div className="text-lg font-bold text-white">{pkg.name}</div>
                  <div className="text-3xl font-black text-white mt-2">
                    {pkg.price}
                    <span className="text-sm font-normal text-slate-400">/mo</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-4">
                    + {pkg.deposit} Anzahlung (Hardware)
                  </div>
                  <ul className="text-sm text-slate-300 space-y-1.5">
                    <li>✓ {pkg.trackers} GPS-Tracker</li>
                    <li>✓ {pkg.trackers} Polar H10 Gurte</li>
                    <li>✓ Bis zu {pkg.teams} Mannschaften</li>
                    <li>✓ ACWR + HRV Analytics</li>
                    <li>✓ KI-Trainingsempfehlung</li>
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-600 mt-4">48 Monate Mindestlaufzeit · DSGVO-konform · Serverstandort Deutschland</p>
          </div>
        </section>
      </div>
    </div>
  );
}

function LayoutDashboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function SmartphoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeLinecap="round" />
    </svg>
  );
}
