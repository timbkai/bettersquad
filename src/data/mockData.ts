export type RiskLevel = "green" | "yellow" | "red";
export type Position = "TW" | "IV" | "LA" | "RA" | "DM" | "ZM" | "OM" | "ST";
export type Gender = "male" | "female";

export interface DailyLoad {
  date: string;
  load: number; // arbitrary units, e.g. minutes × RPE
  distance: number; // km
  sprints: number;
  maxSpeed: number; // km/h
  hiRuns: number; // high-intensity runs
}

export interface HRVEntry {
  date: string;
  hrv: number; // ms
}

export interface HooperScore {
  sleep: number;       // 1–7 (1=excellent, 7=terrible)
  soreness: number;    // 1–7
  fatigue: number;     // 1–7
  mood: number;        // 1–7
  total: number;       // sum 4–28
  date: string;
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  gender: Gender;
  age: number;
  acwr: number;
  riskLevel: RiskLevel;
  dailyLoads: DailyLoad[];
  hrv: HRVEntry[];
  hooper: HooperScore;
  injured: boolean;
  todayAvailable: boolean;
  acwrHistory: { date: string; acwr: number }[];
}

function generateDates(daysBack: number): string[] {
  return Array.from({ length: daysBack }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (daysBack - 1 - i));
    return d.toISOString().split("T")[0];
  });
}

function generateLoads(days: number, baseLoad: number): DailyLoad[] {
  const dates = generateDates(days);
  return dates.map((date, i) => {
    const rest = i % 7 === 6; // Sunday = rest
    const load = rest ? 0 : Math.round(baseLoad * (0.7 + Math.random() * 0.6));
    return {
      date,
      load,
      distance: rest ? 0 : parseFloat((6 + Math.random() * 5).toFixed(1)),
      sprints: rest ? 0 : Math.floor(8 + Math.random() * 20),
      maxSpeed: rest ? 0 : parseFloat((24 + Math.random() * 10).toFixed(1)),
      hiRuns: rest ? 0 : Math.floor(15 + Math.random() * 30),
    };
  });
}

function generateHRV(days: number, base: number): HRVEntry[] {
  const dates = generateDates(days);
  let current = base;
  return dates.map((date) => {
    current = Math.max(45, Math.min(100, current + (Math.random() - 0.5) * 8));
    return { date, hrv: Math.round(current) };
  });
}

function calcACWR(loads: DailyLoad[]): number {
  const last28 = loads.slice(-28);
  const last7 = loads.slice(-7);
  const chronic = last28.reduce((s, d) => s + d.load, 0) / 28;
  const acute = last7.reduce((s, d) => s + d.load, 0) / 7;
  if (chronic === 0) return 1;
  return parseFloat((acute / chronic).toFixed(2));
}

function acwrToRisk(acwr: number): RiskLevel {
  if (acwr > 1.49) return "red";
  if (acwr >= 1.3) return "yellow";
  return "green";
}

function generateACWRHistory(loads: DailyLoad[]): { date: string; acwr: number }[] {
  return loads.slice(14).map((_, i) => {
    const slice = loads.slice(0, 14 + i + 1);
    return {
      date: loads[14 + i].date,
      acwr: calcACWR(slice),
    };
  });
}

function makePlayer(
  id: string,
  name: string,
  number: number,
  position: string,
  gender: Gender,
  age: number,
  baseLoad: number,
  hooperValues: [number, number, number, number],
  injured = false
): Player {
  const loads = generateLoads(35, baseLoad);
  const acwr = calcACWR(loads);
  const hooperTotal = hooperValues.reduce((a, b) => a + b, 0);
  return {
    id,
    name,
    number,
    position,
    gender,
    age,
    acwr,
    riskLevel: injured ? "red" : acwrToRisk(acwr),
    dailyLoads: loads,
    hrv: generateHRV(14, 62 + Math.floor(Math.random() * 18)),
    hooper: {
      sleep: hooperValues[0],
      soreness: hooperValues[1],
      fatigue: hooperValues[2],
      mood: hooperValues[3],
      total: hooperTotal,
      date: new Date().toISOString().split("T")[0],
    },
    injured,
    todayAvailable: !injured,
    acwrHistory: generateACWRHistory(loads),
  };
}

export const players: Player[] = [
  makePlayer("p1", "Lukas Becker", 1, "TW", "male", 24, 55, [2, 2, 2, 2]),
  makePlayer("p2", "Jonas Wagner", 4, "IV", "male", 22, 80, [2, 3, 3, 2]),
  makePlayer("p3", "Maximilian Schulz", 5, "IV", "male", 26, 75, [3, 4, 3, 3]),
  makePlayer("p4", "Tim Hoffmann", 3, "LA", "male", 21, 90, [4, 5, 4, 4]),
  makePlayer("p5", "Felix Braun", 2, "RA", "male", 23, 85, [2, 2, 3, 2]),
  makePlayer("p6", "Luis Müller", 8, "DM", "male", 25, 105, [5, 6, 5, 4]),
  makePlayer("p7", "Noah Fischer", 6, "ZM", "male", 24, 95, [3, 3, 4, 3]),
  makePlayer("p8", "Elias Weber", 10, "OM", "male", 27, 110, [4, 5, 5, 4]),
  makePlayer("p9", "Leon Schmidt", 11, "LA", "male", 20, 88, [2, 3, 2, 2]),
  makePlayer("p10", "Finn Richter", 7, "RA", "male", 22, 92, [3, 4, 4, 3]),
  makePlayer("p11", "Moritz Krause", 9, "ST", "male", 28, 120, [6, 6, 6, 5], false),
  makePlayer("p12", "David Klein", 18, "ST", "male", 23, 78, [2, 2, 2, 3]),
  makePlayer("p13", "Jan Vogel", 14, "ZM", "male", 26, 82, [3, 3, 3, 3]),
  makePlayer("p14", "Paul Hartmann", 17, "IV", "male", 24, 70, [2, 2, 3, 2]),
  makePlayer("p15", "Erik König", 13, "LA", "male", 21, 76, [2, 3, 2, 2]),
  makePlayer("p16", "Anna Berger", 10, "OM", "female", 23, 85, [2, 2, 3, 2]),
  makePlayer("p17", "Laura Schneider", 7, "ST", "female", 21, 79, [3, 3, 3, 3]),
  makePlayer("p18", "Sophie Zimmermann", 5, "IV", "female", 25, 72, [2, 2, 2, 2]),
  makePlayer("p19", "Lena Bauer", 4, "LA", "female", 22, 88, [4, 4, 4, 4]),
  makePlayer("p20", "Mia Wolf", 1, "TW", "female", 24, 58, [2, 2, 2, 3]),
];

// Force some specific ACWR values for demo realism
players[5].acwr = 1.54; players[5].riskLevel = "red";   // Luis Müller – red
players[7].acwr = 1.48; players[7].riskLevel = "yellow"; // Elias Weber – yellow
players[10].acwr = 1.51; players[10].riskLevel = "red";  // Moritz Krause – red
players[18].acwr = 1.38; players[18].riskLevel = "yellow"; // Lena Bauer – yellow

export const equipmentPool = {
  gpsTrackers: { total: 25, available: 22, inMaintenance: 3 },
  polarH10: { total: 25, available: 23, inMaintenance: 2 },
  replacementBands: 48,
};

export const clubInfo = {
  name: "FC Viktoria Köln",
  team: "Regionalliga West",
  season: "2025/26",
  nextSession: {
    date: "Morgen, 10:00 Uhr",
    type: "Taktiktraining",
    location: "Kunstrasen A",
  },
};

// Realistic 21-day squad load curve: steady base → spike around matchday block (day 10-14) → recovery
const ACWR_TREND = [
  1.02, 1.05, 1.08, 1.10, 1.12, 1.15, 1.18, 1.22, 1.28, 1.35,
  1.42, 1.48, 1.45, 1.38, 1.30, 1.22, 1.15, 1.10, 1.07, 1.05, 1.03,
];
const MAX_ACWR_TREND = [
  1.15, 1.18, 1.22, 1.25, 1.28, 1.32, 1.35, 1.40, 1.46, 1.52,
  1.58, 1.62, 1.59, 1.52, 1.44, 1.36, 1.28, 1.22, 1.18, 1.15, 1.12,
];

export const squadACWRHistory = (() => {
  const dates = generateDates(21);
  return dates.map((date, i) => ({
    date,
    avgACWR: ACWR_TREND[i],
    maxACWR: MAX_ACWR_TREND[i],
  }));
})();

export const aiInsights = [
  {
    id: "ins1",
    severity: "red" as RiskLevel,
    text: "Luis Müller (ACWR 1.54) und Moritz Krause (ACWR 1.51) überschreiten die kritische Schwelle. Nominierung für nächste Einheit überdenken.",
  },
  {
    id: "ins2",
    severity: "yellow" as RiskLevel,
    text: "Elias Weber & Lena Bauer im Gelbbereich (ACWR >1.3). Trainingsintensität um 20% reduzieren – Fokus auf Regeneration.",
  },
  {
    id: "ins3",
    severity: "green" as RiskLevel,
    text: "Squad-Gesamtbelastung liegt im optimalen Bereich. Planmäßiges High-Intensity-Training für Montag empfohlen.",
  },
];
