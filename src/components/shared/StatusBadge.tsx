import type { RiskLevel } from "@/data/mockData";

interface StatusBadgeProps {
  risk: RiskLevel;
  label?: string;
  size?: "sm" | "md";
}

const config = {
  green: {
    dot: "bg-emerald-400",
    bg: "bg-emerald-500/15 border border-emerald-500/40",
    text: "text-emerald-400",
    label: "Fit",
  },
  yellow: {
    dot: "bg-amber-400",
    bg: "bg-amber-500/15 border border-amber-500/40",
    text: "text-amber-400",
    label: "Vorsicht",
  },
  red: {
    dot: "bg-red-400",
    bg: "bg-red-500/15 border border-red-500/40",
    text: "text-red-400",
    label: "Risiko",
  },
};

export default function StatusBadge({ risk, label, size = "md" }: StatusBadgeProps) {
  const c = config[risk];
  const txt = label ?? c.label;
  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${c.bg} ${c.text} ${padding}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`} />
      {txt}
    </span>
  );
}
