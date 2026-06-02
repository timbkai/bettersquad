"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataPoint {
  date: string;
  acwr: number;
  avgACWR?: number;
  maxACWR?: number;
}

interface ACWRChartProps {
  data: DataPoint[];
  title?: string;
  showLegend?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-white/10 rounded-lg p-3 text-xs shadow-xl">
        <div className="text-slate-400 mb-1.5">{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-slate-300">{p.name}:</span>
            <span className="font-bold" style={{ color: p.color }}>
              {p.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ACWRChart({ data, title, showLegend = false }: ACWRChartProps) {
  const formatted = data.map((d) => ({
    ...d,
    date: d.date.slice(5), // "MM-DD"
  }));

  const hasMultiple = data[0]?.avgACWR !== undefined;

  return (
    <div className="w-full">
      {title && <div className="text-sm font-semibold text-slate-300 mb-3">{title}</div>}
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={formatted} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          {/* Warning zone */}
          <ReferenceArea y1={1.3} y2={1.5} fill="rgba(251,191,36,0.08)" />
          {/* Danger zone */}
          <ReferenceArea y1={1.5} y2={2.1} fill="rgba(239,68,68,0.08)" />
          {/* Warning line */}
          <ReferenceLine y={1.3} stroke="rgba(251,191,36,0.5)" strokeDasharray="4 4" />
          {/* Danger line */}
          <ReferenceLine y={1.5} stroke="rgba(239,68,68,0.6)" strokeDasharray="4 4" />

          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
          <YAxis
            domain={[0.6, 1.8]}
            tick={{ fontSize: 11, fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          {showLegend && <Legend />}

          {hasMultiple ? (
            <>
              <Line
                type="monotone"
                dataKey="avgACWR"
                name="Ø Team"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#10b981" }}
              />
              <Line
                type="monotone"
                dataKey="maxACWR"
                name="Max"
                stroke="#ef4444"
                strokeWidth={1.5}
                strokeDasharray="4 2"
                dot={false}
                activeDot={{ r: 4, fill: "#ef4444" }}
              />
            </>
          ) : (
            <Line
              type="monotone"
              dataKey="acwr"
              name="ACWR"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#10b981", strokeWidth: 2, stroke: "#0a0f1a" }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-amber-400/60 border-dashed border-b border-amber-400" />
          <span>Vorsicht &gt;1.3</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-red-500/60" />
          <span>Risiko &gt;1.5</span>
        </div>
      </div>
    </div>
  );
}
