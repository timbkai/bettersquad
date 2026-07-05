"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { HRVEntry } from "@/data/mockData";

interface HRVChartProps {
  data: HRVEntry[];
  light?: boolean;
}

interface HRVTooltipPayload {
  value: number;
}

interface HRVTooltipProps {
  active?: boolean;
  payload?: HRVTooltipPayload[];
  label?: string;
}

const DarkTooltip = ({ active, payload, label }: HRVTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-white/10 rounded-lg p-3 text-xs shadow-xl">
        <div className="text-slate-400 mb-1">{label}</div>
        <div className="font-bold text-sky-300">{payload[0].value} ms</div>
      </div>
    );
  }
  return null;
};

const LightTooltip = ({ active, payload, label }: HRVTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs shadow-lg">
        <div className="text-slate-500 mb-1">{label}</div>
        <div className="font-bold text-sky-600">{payload[0].value} ms</div>
      </div>
    );
  }
  return null;
};

export default function HRVChart({ data, light = false }: HRVChartProps) {
  const avg = Math.round(data.reduce((s, d) => s + d.hrv, 0) / data.length);
  const formatted = data.map((d) => ({ ...d, date: d.date.slice(5) }));
  const gridStroke = light ? "rgba(226,232,240,0.8)" : "rgba(255,255,255,0.06)";

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-sm font-semibold ${light ? "text-slate-700" : "text-slate-300"}`}>
          HRV-Trend (14 Tage)
        </span>
        <span className={`text-sm ${light ? "text-slate-500" : "text-slate-400"}`}>
          Ø <strong className={light ? "text-slate-800" : "text-white"}>{avg} ms</strong>
        </span>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={formatted} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="hrvGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0284c7" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
          <ReferenceLine y={avg} stroke="rgba(2,132,199,0.4)" strokeDasharray="4 4" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} axisLine={false} />
          <YAxis domain={[45, 100]} tick={{ fontSize: 10, fill: "#64748b" }} tickLine={false} axisLine={false} />
          <Tooltip content={light ? <LightTooltip /> : <DarkTooltip />} />
          <Area
            type="monotone"
            dataKey="hrv"
            stroke="#0284c7"
            strokeWidth={2}
            fill="url(#hrvGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#0284c7" }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="text-xs text-slate-500 mt-1">HRV (ms) · Magene H603 · RMSSD</div>
    </div>
  );
}
