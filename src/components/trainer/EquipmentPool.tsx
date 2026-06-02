import { Wifi, Heart } from "lucide-react";
import { equipmentPool } from "@/data/mockData";

export default function EquipmentPool() {
  const gps = equipmentPool.gpsTrackers;
  const polar = equipmentPool.polarH10;

  const GPSPct = Math.round((gps.available / gps.total) * 100);
  const PolarPct = Math.round((polar.available / polar.total) * 100);

  return (
    <div className="bg-slate-900/60 border border-white/8 rounded-xl p-5">
      <div className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
        <span>Equipment Pool</span>
        <span className="flex items-center gap-1.5 text-xs text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          QR-Checkout aktiv
        </span>
        <span className="ml-auto text-[11px] text-slate-600">vor 3 Min.</span>
      </div>

      <div className="space-y-4">
        {/* GPS Tracker */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 text-sm">
              <Wifi className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">GPS-Tracker</span>
            </div>
            <div className="text-sm font-bold text-white">
              {gps.available}
              <span className="text-slate-500 font-normal">/{gps.total}</span>
            </div>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${GPSPct}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {gps.inMaintenance} in Wartung
          </div>
        </div>

        {/* Polar H10 */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 text-sm">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-slate-300">Polar H10 Gurte</span>
            </div>
            <div className="text-sm font-bold text-white">
              {polar.available}
              <span className="text-slate-500 font-normal">/{polar.total}</span>
            </div>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-400 rounded-full"
              style={{ width: `${PolarPct}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {polar.inMaintenance} in Wartung
          </div>
        </div>

        <div className="pt-2 border-t border-white/6 text-xs text-slate-500">
          {equipmentPool.replacementBands} Ersatzbänder verfügbar
        </div>
      </div>
    </div>
  );
}
