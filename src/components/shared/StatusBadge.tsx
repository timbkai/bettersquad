import type { RiskLevel } from "@/data/mockData";

interface StatusBadgeProps {
  risk: RiskLevel;
  label?: string;
  size?: "sm" | "md";
  light?: boolean;
}

const darkConfig = {
  green: { dot: "bg-emerald-400", bg: "bg-emerald-500/15 border border-emerald-500/40", text: "text-emerald-300", label: "Fit" },
  yellow: { dot: "bg-amber-400", bg: "bg-amber-500/15 border border-amber-500/40", text: "text-amber-400", label: "Vorsicht" },
  red: { dot: "bg-rose-400", bg: "bg-rose-500/15 border border-rose-500/40", text: "text-rose-400", label: "Risiko" },
};

const lightConfig = {
  green: { dot: "bg-emerald-500", bg: "bg-emerald-50 border border-emerald-200", text: "text-emerald-700", label: "Fit" },
  yellow: { dot: "bg-amber-400", bg: "bg-amber-50 border border-amber-200", text: "text-amber-700", label: "Vorsicht" },
  red: { dot: "bg-rose-500", bg: "bg-rose-50 border border-rose-200", text: "text-rose-600", label: "Risiko" },
};

export default function StatusBadge({ risk, label, size = "md", light = false }: StatusBadgeProps) {
  const c = (light ? lightConfig : darkConfig)[risk];
  const txt = label ?? c.label;
  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${c.bg} ${c.text} ${padding}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`} />
      {txt}
    </span>
  );
}
