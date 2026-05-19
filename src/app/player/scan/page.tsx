"use client";

import { useState } from "react";
import { CheckCircle, Wifi, Heart, ChevronRight } from "lucide-react";

type ScanState = "idle" | "scanning" | "assigned";

export default function QRScan() {
  const [state, setState] = useState<ScanState>("idle");
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setState("scanning");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setState("assigned");
          return 100;
        }
        return p + 5;
      });
    }, 80);
  };

  const reset = () => {
    setState("idle");
    setProgress(0);
  };

  return (
    <div className="px-4 py-5">
      <h1 className="text-xl font-black text-white mb-1">Equipment-Checkout</h1>
      <p className="text-slate-400 text-sm mb-6">Scanne den QR-Code am Tracker-Dock</p>

      {state === "idle" && (
        <div className="space-y-5">
          {/* Viewfinder */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/10 flex items-center justify-center">
            {/* Corner marks */}
            {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-8 h-8 border-emerald-400 border-2 ${
                  i === 0 ? "border-r-0 border-b-0 rounded-tl-md" :
                  i === 1 ? "border-l-0 border-b-0 rounded-tr-md" :
                  i === 2 ? "border-r-0 border-t-0 rounded-bl-md" :
                  "border-l-0 border-t-0 rounded-br-md"
                }`}
              />
            ))}

            {/* Fake QR Code SVG */}
            <svg width="160" height="160" viewBox="0 0 160 160" className="opacity-20">
              <rect x="10" y="10" width="50" height="50" fill="none" stroke="white" strokeWidth="3" />
              <rect x="20" y="20" width="30" height="30" fill="white" />
              <rect x="100" y="10" width="50" height="50" fill="none" stroke="white" strokeWidth="3" />
              <rect x="110" y="20" width="30" height="30" fill="white" />
              <rect x="10" y="100" width="50" height="50" fill="none" stroke="white" strokeWidth="3" />
              <rect x="20" y="110" width="30" height="30" fill="white" />
              <rect x="75" y="75" width="10" height="10" fill="white" />
              <rect x="90" y="75" width="10" height="10" fill="white" />
              <rect x="75" y="90" width="10" height="10" fill="white" />
              <rect x="90" y="90" width="10" height="10" fill="white" />
              <rect x="105" y="75" width="10" height="10" fill="white" />
              <rect x="120" y="90" width="10" height="10" fill="white" />
            </svg>

            <div className="absolute inset-0 flex items-end justify-center pb-6">
              <span className="text-xs text-slate-500 bg-black/40 px-3 py-1 rounded-full">
                Gerät vor Kamera halten
              </span>
            </div>
          </div>

          <button
            onClick={startScan}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl text-base transition-all hover:scale-[1.02]"
          >
            QR-Code scannen
          </button>

          <div className="bg-slate-900/60 border border-white/8 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-3">Verfügbare Geräte im Pool</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-white font-semibold">22</span>
                <span className="text-xs text-slate-500">GPS-Tracker</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm text-white font-semibold">23</span>
                <span className="text-xs text-slate-500">Polar H10</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {state === "scanning" && (
        <div className="space-y-5">
          {/* Viewfinder scanning */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-emerald-500/40 flex items-center justify-center">
            {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-8 h-8 border-emerald-400 border-2 ${
                  i === 0 ? "border-r-0 border-b-0 rounded-tl-md" :
                  i === 1 ? "border-l-0 border-b-0 rounded-tr-md" :
                  i === 2 ? "border-r-0 border-t-0 rounded-bl-md" :
                  "border-l-0 border-t-0 rounded-br-md"
                }`}
              />
            ))}

            {/* Scanning line */}
            <div
              className="absolute left-6 right-6 h-0.5 bg-emerald-400 transition-all duration-75 opacity-80"
              style={{ top: `${10 + (progress / 100) * 80}%` }}
            />

            <div className="absolute inset-0 bg-emerald-500/5" />

            <svg width="160" height="160" viewBox="0 0 160 160" className="opacity-30">
              <rect x="10" y="10" width="50" height="50" fill="none" stroke="#10b981" strokeWidth="3" />
              <rect x="20" y="20" width="30" height="30" fill="#10b981" />
              <rect x="100" y="10" width="50" height="50" fill="none" stroke="#10b981" strokeWidth="3" />
              <rect x="110" y="20" width="30" height="30" fill="#10b981" />
              <rect x="10" y="100" width="50" height="50" fill="none" stroke="#10b981" strokeWidth="3" />
              <rect x="20" y="110" width="30" height="30" fill="#10b981" />
            </svg>
          </div>

          {/* Progress */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>Verbindung wird hergestellt…</span>
              <span className="text-emerald-400 font-semibold">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="text-center text-sm text-slate-500">
            Tracker-Zuweisung wird verarbeitet…
          </div>
        </div>
      )}

      {state === "assigned" && (
        <div className="space-y-5">
          {/* Success */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-9 h-9 text-emerald-400" />
            </div>
            <h2 className="text-xl font-black text-white mb-1">Zuweisung erfolgreich!</h2>
            <p className="text-slate-400 text-sm">Dir wurde zugewiesen:</p>

            <div className="flex gap-4 mt-4">
              <div className="bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-2">
                <Wifi className="w-5 h-5 text-emerald-400" />
                <div className="text-left">
                  <div className="text-xs text-slate-500">GPS-Tracker</div>
                  <div className="text-lg font-black text-white">#14</div>
                </div>
              </div>
              <div className="bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                <div className="text-left">
                  <div className="text-xs text-slate-500">Polar H10</div>
                  <div className="text-lg font-black text-white">#14</div>
                </div>
              </div>
            </div>
          </div>

          {/* Next steps */}
          <div className="bg-slate-900/60 border border-white/8 rounded-xl p-4 space-y-3">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Nächste Schritte</p>
            {[
              { n: 1, text: "GPS-Tracker (Weste Rücken) anlegen" },
              { n: 2, text: "Polar H10 Pulsgurt befestigen & befeuchten" },
              { n: 3, text: "Bluetooth-Verbindung prüfen (App zeigt ✓)" },
              { n: 4, text: "Training kann beginnen 🏃" },
            ].map(({ n, text }) => (
              <div key={n} className="flex items-start gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {n}
                </div>
                <span className="text-slate-300">{text}</span>
              </div>
            ))}
          </div>

          <button
            onClick={reset}
            className="w-full border border-white/10 text-slate-400 hover:text-white hover:border-white/20 py-3 rounded-xl text-sm font-medium transition-colors"
          >
            Neuer Scan
          </button>
        </div>
      )}
    </div>
  );
}
