import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import type { RiskLevel } from "@/data/mockData";

interface AIInsightCardProps {
  severity: RiskLevel;
  text: string;
}

const config = {
  red: {
    icon: AlertTriangle,
    bg: "bg-[#251426] border-rose-500/25",
    iconColor: "text-rose-300",
    label: "Kritisch",
    labelBg: "bg-rose-500/15 text-rose-200",
  },
  yellow: {
    icon: Info,
    bg: "bg-[#211b2e] border-amber-400/25",
    iconColor: "text-amber-300",
    label: "Warnung",
    labelBg: "bg-amber-400/15 text-amber-200",
  },
  green: {
    icon: CheckCircle,
    bg: "bg-[#13263a] border-sky-400/20",
    iconColor: "text-sky-300",
    label: "Optimal",
    labelBg: "bg-sky-400/15 text-sky-200",
  },
};

export default function AIInsightCard({ severity, text }: AIInsightCardProps) {
  const c = config[severity];
  const Icon = c.icon;

  return (
    <div className={`flex items-start gap-3 rounded-lg border p-3.5 ${c.bg}`}>
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${c.iconColor}`} />
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${c.labelBg}`}>
            Coach · {c.label}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-200">{text}</p>
      </div>
    </div>
  );
}
