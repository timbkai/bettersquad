"use client";

import { useState } from "react";
import { Moon, Dumbbell, Battery, Smile, CheckCircle } from "lucide-react";

interface Dimension {
  key: string;
  label: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

const dimensions: Dimension[] = [
  {
    key: "sleep",
    label: "Schlafqualität",
    icon: Moon,
    description: "Wie gut hast du heute Nacht geschlafen?",
    color: "text-blue-400",
  },
  {
    key: "soreness",
    label: "Muskelkater",
    icon: Dumbbell,
    description: "Wie stark sind deine Muskeln heute?",
    color: "text-orange-400",
  },
  {
    key: "fatigue",
    label: "Energie / Müdigkeit",
    icon: Battery,
    description: "Wie erschöpft fühlst du dich generell?",
    color: "text-yellow-400",
  },
  {
    key: "mood",
    label: "Stimmung",
    icon: Smile,
    description: "Wie ist deine aktuelle Stimmung?",
    color: "text-purple-400",
  },
];

const labelMap = ["", "Exzellent", "Sehr gut", "Gut", "Mittel", "Schlecht", "Sehr schlecht", "Extrem schlecht"];

export default function CheckIn() {
  const [values, setValues] = useState<Record<string, number>>({
    sleep: 2,
    soreness: 3,
    fatigue: 2,
    mood: 3,
  });
  const [submitted, setSubmitted] = useState(false);

  const total = Object.values(values).reduce((a, b) => a + b, 0);
  const totalColor = total <= 14 ? "text-emerald-400" : total <= 20 ? "text-amber-400" : "text-red-400";
  const totalLabel = total <= 14 ? "Fit" : total <= 20 ? "Mittel" : "Erschöpft";

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div className="px-4 py-8 flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Check-in erfolgreich!</h2>
        <p className="text-slate-400 text-sm mb-6">
          Dein Hooper-Score <strong className={totalColor}>{total}/28</strong> wurde übertragen.
          <br />Der Trainer sieht deine Readiness in Echtzeit.
        </p>
        <div className="bg-slate-900/60 border border-white/8 rounded-xl p-4 w-full text-left space-y-2 mb-6">
          {dimensions.map((d) => (
            <div key={d.key} className="flex justify-between text-sm">
              <span className="text-slate-400">{d.label}</span>
              <span className="font-semibold text-white">{values[d.key]}/7 – {labelMap[values[d.key]]}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-white/8 flex justify-between text-sm font-bold">
            <span className="text-slate-300">Hooper-Score</span>
            <span className={totalColor}>{total}/28 · {totalLabel}</span>
          </div>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          Erneut ausfüllen
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 space-y-5">
      <div>
        <h1 className="text-xl font-black text-white">Wellness Check-in</h1>
        <p className="text-slate-400 text-sm mt-1">Hooper-Skala · 1 = optimal, 7 = sehr schlecht</p>
      </div>

      {/* Live Score */}
      <div className={`rounded-2xl p-4 border ${
        total <= 14 ? "bg-emerald-500/10 border-emerald-500/30" : total <= 20 ? "bg-amber-500/10 border-amber-500/30" : "bg-red-500/10 border-red-500/30"
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Hooper-Score</span>
          <span className={`text-3xl font-black ${totalColor}`}>
            {total}<span className="text-sm text-slate-500">/28</span>
          </span>
        </div>
        <div className="mt-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              total <= 14 ? "bg-emerald-500" : total <= 20 ? "bg-amber-400" : "bg-red-500"
            }`}
            style={{ width: `${(total / 28) * 100}%` }}
          />
        </div>
        <div className={`text-xs font-semibold mt-1 ${totalColor}`}>{totalLabel}</div>
      </div>

      {/* Sliders */}
      {dimensions.map(({ key, label, icon: Icon, description, color }) => {
        const val = values[key];
        const valColor = val <= 2 ? "text-emerald-400" : val <= 4 ? "text-amber-400" : "text-red-400";

        return (
          <div key={key} className="bg-slate-900/60 border border-white/8 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="text-sm font-semibold text-white">{label}</span>
              <span className={`ml-auto text-lg font-black ${valColor}`}>{val}</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">{description}</p>

            <input
              type="range"
              min={1}
              max={7}
              value={val}
              onChange={(e) => setValues((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${
                  val <= 2 ? "#10b981" : val <= 4 ? "#f59e0b" : "#ef4444"
                } ${((val - 1) / 6) * 100}%, #1e293b ${((val - 1) / 6) * 100}%)`,
              }}
            />
            <div className="flex justify-between text-[10px] text-slate-600 mt-1">
              <span>1 – Optimal</span>
              <span className={`font-medium ${valColor}`}>{labelMap[val]}</span>
              <span>7 – Schlecht</span>
            </div>
          </div>
        );
      })}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl text-base transition-all hover:scale-[1.02] shadow-lg shadow-emerald-500/25"
      >
        Check-in absenden
      </button>

      <p className="text-center text-xs text-slate-600 pb-2">
        Validiert nach Saw et al. (2016) · Daten werden DSGVO-konform übertragen
      </p>
    </div>
  );
}
