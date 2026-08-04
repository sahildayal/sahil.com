/** Content for /world — the matchday programme. */

export type Cap = {
  country: string;
  code: string; // ISO 3166-1 alpha-2
  dish: string;
  week: number;
};

export type Fixture = {
  date: string;
  kickoff: string;
  home: string;
  away: string;
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

/**
 * The two matches I'm most looking forward to. Real 2026/27 Premier League
 * fixtures — the season opens 21–24 August 2026.
 *
 * UPDATE WEEKLY: swap these for the next two you care about. Only the first
 * `MAX_FIXTURES` are rendered, so extras here are harmless.
 *
 * Later this should be driven by EPL_LALIGA_PREDICTOR output rather than
 * maintained by hand — see PredictorPanel.
 */
export const MAX_FIXTURES = 2;

export const fixtures: Fixture[] = [
  {
    date: "Sun 23 Aug",
    kickoff: "16:30",
    home: "Newcastle United",
    away: "Liverpool",
    note: "Opening weekend",
  },
  {
    date: "Mon 24 Aug",
    kickoff: "20:00",
    home: "Fulham",
    away: "Chelsea",
    note: "London derby",
  },
];

/**
 * One country a week, cooked properly.
 *
 * ⚠ SAHIL — VERIFY THIS LIST. I filled it out to the count you asked for, but
 * I don't know what you actually cooked. Swap anything here you haven't made:
 * an interviewer who spots "khachapuri" on your site will ask you about it.
 */
export const capsTotal = 27;

export const caps: Cap[] = [
  { country: "Morocco", code: "MA", dish: "Lamb tagine", week: 1 },
  { country: "Vietnam", code: "VN", dish: "Pho bo", week: 2 },
  { country: "Georgia", code: "GE", dish: "Khachapuri", week: 3 },
  { country: "Japan", code: "JP", dish: "Tonkotsu ramen", week: 4 },
  { country: "Mexico", code: "MX", dish: "Cochinita pibil", week: 5 },
  { country: "Lebanon", code: "LB", dish: "Fattoush and kibbeh", week: 6 },
  { country: "Ethiopia", code: "ET", dish: "Doro wat with injera", week: 7 },
  { country: "Peru", code: "PE", dish: "Lomo saltado", week: 8 },
  { country: "Thailand", code: "TH", dish: "Massaman curry", week: 9 },
  { country: "Italy", code: "IT", dish: "Cacio e pepe", week: 10 },
  { country: "Korea", code: "KR", dish: "Kimchi jjigae", week: 11 },
  { country: "India", code: "IN", dish: "Rogan josh", week: 12 },
  { country: "Spain", code: "ES", dish: "Paella valenciana", week: 13 },
  { country: "Turkey", code: "TR", dish: "Iskender kebab", week: 14 },
  { country: "Hungary", code: "HU", dish: "Goulash", week: 15 },
  { country: "Indonesia", code: "ID", dish: "Beef rendang", week: 16 },
  { country: "Greece", code: "GR", dish: "Moussaka", week: 17 },
  { country: "Brazil", code: "BR", dish: "Feijoada", week: 18 },
  { country: "Poland", code: "PL", dish: "Pierogi ruskie", week: 19 },
  { country: "Egypt", code: "EG", dish: "Koshari", week: 20 },
  { country: "France", code: "FR", dish: "Coq au vin", week: 21 },
  { country: "Malaysia", code: "MY", dish: "Nasi lemak", week: 22 },
  { country: "Argentina", code: "AR", dish: "Empanadas salteñas", week: 23 },
  { country: "Senegal", code: "SN", dish: "Thieboudienne", week: 24 },
  { country: "Sri Lanka", code: "LK", dish: "Fish ambul thiyal", week: 25 },
  { country: "Uzbekistan", code: "UZ", dish: "Plov", week: 26 },
  { country: "Portugal", code: "PT", dish: "Bacalhau à brás", week: 27 },
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
  },
  {
    title: "The kitchen rule",
    body: "One country a week, cooked properly — no substitutions for the ingredient that makes it the dish.",
  },
];
