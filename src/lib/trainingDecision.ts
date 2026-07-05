import type { Player, RiskLevel } from "@/data/mockData";

export type TrainingDecisionType = "full" | "reduce" | "pause";

export interface TrainingDecision {
  type: TrainingDecisionType;
  severity: RiskLevel;
  label: string;
  tableLabel: string;
  intensity: string;
  recommendation: string;
  reason: string;
  detail: string;
}

export function getShortName(player: Player): string {
  const [first, last] = player.name.split(" ");
  return `${first} ${last?.[0] ?? ""}.`;
}

export function getTrainingDecision(player: Player): TrainingDecision {
  const hooper = `${player.hooper.total}/28 Hooper`;
  const acwr = `ACWR ${player.acwr.toFixed(2)}`;

  if (player.injured || player.riskLevel === "red") {
    return {
      type: "pause",
      severity: "red",
      label: "Pause/Abklärung",
      tableLabel: "Pause",
      intensity: "0-30%",
      recommendation: "Heute keine hochintensive Einheit einplanen.",
      reason: player.injured ? "Verletzt gemeldet" : `${acwr} über individueller Baseline`,
      detail: `${acwr}, ${hooper}; Belastung reduzieren und Rückmeldung nach Warm-up dokumentieren.`,
    };
  }

  if (player.riskLevel === "yellow") {
    return {
      type: "reduce",
      severity: "yellow",
      label: "Reduzieren",
      tableLabel: "Reduziert",
      intensity: "ca. 80%",
      recommendation: "Technische Rolle, keine wiederholten Tiefensprints.",
      reason: `${acwr} im Vorsichtsbereich`,
      detail: `${acwr}, ${hooper}; Wiederholte Sprintspitzen begrenzen und Pausen fest einplanen.`,
    };
  }

  return {
    type: "full",
    severity: "green",
    label: "Voll trainieren",
    tableLabel: "Voll",
    intensity: "100%",
    recommendation: "Normal einsetzbar im geplanten Teamblock.",
    reason: `${acwr} stabil zur Baseline`,
    detail: `${acwr}, ${hooper}; volle Teilnahme möglich, weiter über HRV und Check-in beobachten.`,
  };
}

export function getSquadSessionIntensity(redCount: number, yellowCount: number): number {
  if (redCount >= 3) return 70;
  if (redCount >= 2 || yellowCount >= 3) return 80;
  return 90;
}
