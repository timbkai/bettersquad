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
  acwr?: number;
  avgACWR?: number;
  maxACWR?: number;
}

interface ACWRChartProps {
  data: DataPoint[];
  title?: string;
  showLegend?: boolean;
  light?: boolean;
}

interface ChartTooltipPayload {
  name: string;
  value: number;
  color?: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayload[];
  label?: string;
}

const DarkTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-white/10 rounded-lg p-3 text-xs shadow-xl">
        <div className="text-slate-400 mb-1.5">{label}</div>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-slate-300">{p.name}:</span>
            <span className="font-bold" style={{ color: p.color }}>{p.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const LightTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs shadow-lg">
        <div className="text-slate-500 mb-1.5">{label}</div>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-slate-600">{p.name}:</span>
            <span className="font-bold" style={{ color: p.color }}>{p.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ACWRChart({ data, title, showLegend = false, light = false }: ACWRChartProps) {
  const formatted = data.map((d) => ({
    ...d,
    date: d.date.slice(5),
  }));

  const hasMultiple = data[0]?.avgACWR !== undefined;
  const gridStroke = light ? "rgba(226,232,240,0.8)" : "rgba(255,255,255,0.05)";
  const tickColor = "#64748b";
  const activeDotStroke = light ? "#ffffff" : "#0a0f1a";

  return (
    <div className="w-full">
      {title && (
        <div className={`text-sm font-semibold mb-3 ${light ? "text-slate-700" : "text-slate-300"}`}>
          {title}
        </div>
      )}
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={formatted} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
          <ReferenceArea y1={1.3} y2={1.5} fill="rgba(251,191,36,0.08)" />
          <ReferenceArea y1={1.5} y2={2.1} fill="rgba(225,29,72,0.08)" />
          <ReferenceLine y={1.3} stroke="rgba(251,191,36,0.5)" strokeDasharray="4 4" />
          <ReferenceLine y={1.5} stroke="rgba(225,29,72,0.6)" strokeDasharray="4 4" />

          <XAxis dataKey="date" tick={{ fontSize: 11, fill: tickColor }} tickLine={false} axisLine={false} />
          <YAxis
            domain={[0.6, 1.8]}
            tick={{ fontSize: 11, fill: tickColor }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={light ? <LightTooltip /> : <DarkTooltip />} />
          {showLegend && <Legend />}

          {hasMultiple ? (
            <>
              <Line
                type="monotone"
                dataKey="avgACWR"
                name="Ø Team"
                stroke="#0f766e"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#0f766e", stroke: activeDotStroke, strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="maxACWR"
                name="Max"
                stroke="#e11d48"
                strokeWidth={1.5}
                strokeDasharray="4 2"
                dot={false}
                activeDot={{ r: 4, fill: "#e11d48" }}
              />
            </>
          ) : (
            <Line
              type="monotone"
              dataKey="acwr"
              name="ACWR"
              stroke="#0f766e"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#0f766e", strokeWidth: 2, stroke: activeDotStroke }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-amber-400/60" />
          <span>Vorsicht &gt;1.3</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-rose-500/60" />
          <span>Risiko &gt;1.5</span>
        </div>
      </div>
    </div>
  );
}
