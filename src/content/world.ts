/**
 * Content for /world — the matchday programme.
 *
 * PLACEHOLDER DATA is marked with `pending: true` and a TODO. Sahil is sending
 * the real material (World Cup fixtures attended, the full cooking list,
 * photos, current book). Swap the values, drop the flag, delete the TODO.
 */

export type Cap = {
  country: string;
  code: string; // ISO 3166-1 alpha-2, used for the flag glyph
  dish: string;
  week: number;
};

export type Fixture = {
  date: string;
  venue: string;
  home: string;
  away: string;
  score: string;
  note?: string;
};

export type Position = {
  slot: string; // e.g. "GK", "CB", "LW"
  name: string;
  detail: string;
  x: number; // 0–100, left to right across the pitch
  y: number; // 0–100, own goal to opposition goal
};

/** The starting XI: what I actually reach for, laid out 4-3-3. */
export const startingXI: Position[] = [
  { slot: "GK", name: "Linux", detail: "Everything stands on it", x: 50, y: 8 },
  { slot: "RB", name: "Docker", detail: "Containerization", x: 82, y: 26 },
  { slot: "CB", name: "Go", detail: "Primary language", x: 62, y: 22 },
  { slot: "CB", name: "Python", detail: "Primary language", x: 38, y: 22 },
  { slot: "LB", name: "SQL", detail: "Oracle, Postgres, SQL Server", x: 18, y: 26 },
  { slot: "CM", name: "MCP Protocol", detail: "How agents reach real systems", x: 50, y: 48 },
  { slot: "RM", name: "OpenShift", detail: "Where it all runs", x: 75, y: 52 },
  { slot: "LM", name: "LangGraph", detail: "Agent state machines", x: 25, y: 52 },
  { slot: "RW", name: "PySpark", detail: "When the data stops fitting", x: 80, y: 78 },
  { slot: "ST", name: "TypeScript", detail: "Front of house", x: 50, y: 84 },
  { slot: "LW", name: "Scikit-Learn", detail: "Classical ML", x: 20, y: 78 },
];

export const formation = "4-3-3";

/** TODO(sahil): send me the real fixtures — teams, scores, venues, dates. */
export const fixturesPending = true;
export const fixtures: Fixture[] = [
  {
    date: "Jun 2026",
    venue: "MetLife Stadium, NJ",
    home: "TBC",
    away: "TBC",
    score: "—",
    note: "Placeholder — awaiting real match details",
  },
  {
    date: "Jun 2026",
    venue: "TBC",
    home: "TBC",
    away: "TBC",
    score: "—",
    note: "Placeholder — awaiting real match details",
  },
];

/**
 * TODO(sahil): send the full list. These are the ones named in your content
 * doc plus placeholders to show the grid at full size.
 */
export const capsPending = true;
export const capsTotal = 40;
export const caps: Cap[] = [
  { country: "Morocco", code: "MA", dish: "Lamb tagine", week: 1 },
  { country: "Vietnam", code: "VN", dish: "Pho bo", week: 2 },
  { country: "Georgia", code: "GE", dish: "Khachapuri", week: 3 },
  { country: "India", code: "IN", dish: "—", week: 4 },
  { country: "Japan", code: "JP", dish: "—", week: 5 },
  { country: "Mexico", code: "MX", dish: "—", week: 6 },
  { country: "Italy", code: "IT", dish: "—", week: 7 },
  { country: "Thailand", code: "TH", dish: "—", week: 8 },
  { country: "Lebanon", code: "LB", dish: "—", week: 9 },
  { country: "Peru", code: "PE", dish: "—", week: 10 },
  { country: "Korea", code: "KR", dish: "—", week: 11 },
  { country: "Ethiopia", code: "ET", dish: "—", week: 12 },
  { country: "Spain", code: "ES", dish: "—", week: 13 },
  { country: "Turkey", code: "TR", dish: "—", week: 14 },
  { country: "Greece", code: "GR", dish: "—", week: 15 },
  { country: "China", code: "CN", dish: "—", week: 16 },
  { country: "France", code: "FR", dish: "—", week: 17 },
  { country: "Brazil", code: "BR", dish: "—", week: 18 },
  { country: "Poland", code: "PL", dish: "—", week: 19 },
  { country: "Egypt", code: "EG", dish: "—", week: 20 },
];

/** The rest of the off-hours column. */
export const offPitch = [
  {
    title: "Piano",
    body: "Grade 5 Electronic Keyboards, Trinity College London. Still play, still badly sight-read.",
  },
  {
    title: "Reading",
    body: "Crime thrillers and science fiction, in roughly that order.",
    pending: true, // TODO(sahil): current book
  },
  {
    title: "The kitchen rule",
    body: "One country a week, cooked properly — no substitutions for the ingredient that makes it the dish.",
  },
];
