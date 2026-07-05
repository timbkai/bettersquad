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
  cycleOptIn: boolean;
  baselineDays: number;
  acwrHistory: { date: string; acwr: number }[];
}

export const demoContext = {
  today: "2026-07-05",
  label: "So, 05.07.2026",
};

function generateDates(daysBack: number): string[] {
  const anchor = new Date(`${demoContext.today}T12:00:00.000Z`);
  return Array.from({ length: daysBack }, (_, i) => {
    const d = new Date(anchor);
    d.setDate(d.getDate() - (daysBack - 1 - i));
    return d.toISOString().split("T")[0];
  });
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function seedFromString(value: string): number {
  return value.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function generateLoads(days: number, baseLoad: number, seed: number): DailyLoad[] {
  const dates = generateDates(days);
  return dates.map((date, i) => {
    const rest = i % 7 === 6; // Sunday = rest
    const loadNoise = seededRandom(seed + i * 17);
    const distanceNoise = seededRandom(seed + i * 23);
    const sprintNoise = seededRandom(seed + i * 31);
    const speedNoise = seededRandom(seed + i * 43);
    const hiRunNoise = seededRandom(seed + i * 59);
    const load = rest ? 0 : Math.round(baseLoad * (0.7 + loadNoise * 0.6));
    return {
      date,
      load,
      distance: rest ? 0 : parseFloat((6 + distanceNoise * 5).toFixed(1)),
      sprints: rest ? 0 : Math.floor(8 + sprintNoise * 20),
      maxSpeed: rest ? 0 : parseFloat((24 + speedNoise * 10).toFixed(1)),
      hiRuns: rest ? 0 : Math.floor(15 + hiRunNoise * 30),
    };
  });
}

function generateHRV(days: number, base: number, seed: number): HRVEntry[] {
  const dates = generateDates(days);
  let current = base;
  return dates.map((date, i) => {
    current = Math.max(45, Math.min(100, current + (seededRandom(seed + i * 37) - 0.5) * 8));
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
  const seed = seedFromString(id);
  const loads = generateLoads(35, baseLoad, seed);
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
    hrv: generateHRV(14, 62 + Math.floor(seededRandom(seed + 101) * 18), seed + 200),
    hooper: {
      sleep: hooperValues[0],
      soreness: hooperValues[1],
      fatigue: hooperValues[2],
      mood: hooperValues[3],
      total: hooperTotal,
      date: demoContext.today,
    },
    injured,
    todayAvailable: !injured,
    cycleOptIn: seededRandom(seed + 303) > 0.35,
    baselineDays: 42 + Math.floor(seededRandom(seed + 404) * 49),
    acwrHistory: generateACWRHistory(loads),
  };
}

export const players: Player[] = [
  makePlayer("p1", "Emma Fischer", 1, "TW", "female", 24, 55, [2, 2, 2, 2]),
  makePlayer("p2", "Lena Wagner", 4, "IV", "female", 22, 80, [2, 3, 3, 2]),
  makePlayer("p3", "Mia Schulz", 5, "IV", "female", 26, 75, [3, 4, 3, 3]),
  makePlayer("p4", "Aylin Yıldız", 3, "LA", "female", 21, 90, [4, 5, 4, 4], true),
  makePlayer("p5", "Lisa Braun", 2, "RA", "female", 23, 85, [2, 2, 3, 2]),
  makePlayer("p6", "Luisa Müller", 8, "DM", "female", 25, 105, [5, 6, 5, 4]),
  makePlayer("p7", "Naomi Asante", 6, "ZM", "female", 24, 95, [3, 3, 4, 3]),
  makePlayer("p8", "Elena Weber", 10, "OM", "female", 27, 110, [4, 5, 5, 4]),
  makePlayer("p9", "Lea Schmidt", 11, "LA", "female", 20, 88, [2, 3, 2, 2]),
  makePlayer("p10", "Fiona Richter", 7, "RA", "female", 22, 92, [3, 4, 4, 3]),
  makePlayer("p11", "Amira Hassan", 9, "ST", "female", 28, 120, [6, 6, 6, 5], false),
  makePlayer("p12", "Daria Klein", 18, "ST", "female", 23, 78, [2, 2, 2, 3]),
  makePlayer("p13", "Antonia Lefebvre", 14, "ZM", "female", 26, 82, [3, 3, 3, 3]),
  makePlayer("p14", "Paula Hartmann", 17, "IV", "female", 24, 70, [2, 2, 3, 2]),
  makePlayer("p15", "Erika König", 13, "LA", "female", 21, 76, [2, 3, 2, 2]),
  makePlayer("p16", "Anna Berger", 10, "OM", "female", 23, 85, [2, 2, 3, 2]),
  makePlayer("p17", "Laura Schneider", 7, "ST", "female", 21, 79, [3, 3, 3, 3]),
  makePlayer("p18", "Sophie Zimmermann", 5, "IV", "female", 25, 72, [2, 2, 2, 2]),
  makePlayer("p19", "Sofia Martínez", 4, "LA", "female", 22, 88, [4, 4, 4, 4]),
  makePlayer("p20", "Mia Wolf", 1, "TW", "female", 24, 58, [2, 2, 2, 3]),
];

// Force some specific ACWR values for demo realism
players[5].acwr = 1.54; players[5].riskLevel = "red";    // Luisa Müller – red
players[7].acwr = 1.48; players[7].riskLevel = "yellow"; // Elena Weber – yellow
players[10].acwr = 1.51; players[10].riskLevel = "red";  // Amira Hassan – red
players[18].acwr = 1.38; players[18].riskLevel = "yellow"; // Sofia Martínez – yellow

export const equipmentPool = {
  gpsTrackers: { total: 25, available: 22, inMaintenance: 3 },
  polarH10: { total: 25, available: 23, inMaintenance: 2 },
  replacementBands: 48,
};

export const clubInfo = {
  name: "FC Viktoria Köln (Frauen)",
  team: "Frauenabteilung · Regionalliga West",
  season: "2025/26",
  nextSession: {
    date: "Mo, 06.07.2026 · 10:00 Uhr",
    type: "Taktiktraining",
    location: "Kunstrasen A",
  },
  nextMatch: {
    date: "Sa, 11.07.2026",
    opponent: "SV Rödinghausen",
    venue: "Heimspiel",
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
    text: "Luisa Müller und Amira Hassan liegen oberhalb ihrer Belastungsbaseline. Für beide heute keine Spielform mit Kontakt- oder Sprintspitzen einplanen.",
  },
  {
    id: "ins2",
    severity: "yellow" as RiskLevel,
    text: "Elena Weber und Sofia Martínez sind reduziert einsetzbar. Technische Rollen und Pausensteuerung sind sinnvoller als wiederholte Tiefensprints.",
  },
  {
    id: "ins3",
    severity: "green" as RiskLevel,
    text: "Die verfügbare Gruppe erlaubt einen taktischen 8-gegen-8-Block. Sprintkorridore rechts dosieren, links primär Raumaufteilung und Pressing-Abstände coachen.",
  },
];
