import { HeartPulse, RadioTower } from "lucide-react";
import { equipmentPool } from "@/data/mockData";

export default function EquipmentPool() {
  const gps = equipmentPool.gpsTrackers;
  const chest = equipmentPool.polarH10;

  const GPSPct = Math.round((gps.available / gps.total) * 100);
  const ChestPct = Math.round((chest.available / chest.total) * 100);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-950">
        <span>Hardware-Pool</span>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          Tracker-Dock aktiv
        </span>
        <span className="ml-auto text-[11px] font-medium text-slate-400">vor 3 Min.</span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <RadioTower className="h-4 w-4 text-sky-600" />
              <span className="font-medium text-slate-700">GPS/GNSS-Tracker</span>
            </div>
            <div className="text-sm font-black text-slate-950">
              {gps.available}
              <span className="font-normal text-slate-400">/{gps.total}</span>
            </div>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-sky-500" style={{ width: `${GPSPct}%` }} />
          </div>
          <div className="mt-1 text-xs text-slate-500">{gps.inMaintenance} in Wartung</div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <HeartPulse className="h-4 w-4 text-rose-600" />
              <span className="font-medium text-slate-700">Magene H603-Brustgurte</span>
            </div>
            <div className="text-sm font-black text-slate-950">
              {chest.available}
              <span className="font-normal text-slate-400">/{chest.total}</span>
            </div>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-rose-500" style={{ width: `${ChestPct}%` }} />
          </div>
          <div className="mt-1 text-xs text-slate-500">{chest.inMaintenance} in Wartung</div>
        </div>

        <div className="border-t border-slate-100 pt-2 text-xs text-slate-500">
          {equipmentPool.replacementBands} Ersatzbänder verfügbar
        </div>
      </div>
    </div>
  );
}
