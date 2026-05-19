import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import type { RiskLevel } from "@/data/mockData";

interface AIInsightCardProps {
  severity: RiskLevel;
  text: string;
}

const config = {
  red: {
    icon: AlertTriangle,
    bg: "bg-red-500/10 border-red-500/25",
    iconColor: "text-red-400",
    label: "Kritisch",
    labelBg: "bg-red-500/20 text-red-400",
  },
  yellow: {
    icon: Info,
    bg: "bg-amber-500/10 border-amber-500/25",
    iconColor: "text-amber-400",
    label: "Warnung",
    labelBg: "bg-amber-500/20 text-amber-400",
  },
  green: {
    icon: CheckCircle,
    bg: "bg-emerald-500/10 border-emerald-500/25",
    iconColor: "text-emerald-400",
    label: "Optimal",
    labelBg: "bg-emerald-500/20 text-emerald-400",
  },
};

export default function AIInsightCard({ severity, text }: AIInsightCardProps) {
  const c = config[severity];
  const Icon = c.icon;

  return (
    <div className={`flex items-start gap-3 border rounded-xl p-4 ${c.bg}`}>
      <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${c.iconColor}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${c.labelBg}`}>
            KI · {c.label}
          </span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
