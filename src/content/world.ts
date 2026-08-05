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
 * One country a week, cooked properly. Spread deliberately wide — six
 * continents, and mostly national dishes rather than the export-menu version
 * of each cuisine.
 */
export const capsTotal = 27;

export const caps: Cap[] = [
  { country: "Morocco", code: "MA", dish: "Lamb tagine", week: 1 },
  { country: "Vietnam", code: "VN", dish: "Pho bo", week: 2 },
  { country: "Georgia", code: "GE", dish: "Khachapuri", week: 3 },
  { country: "Peru", code: "PE", dish: "Ají de gallina", week: 4 },
  { country: "Ethiopia", code: "ET", dish: "Doro wat", week: 5 },
  { country: "Uzbekistan", code: "UZ", dish: "Plov", week: 6 },
  { country: "Philippines", code: "PH", dish: "Kare-kare", week: 7 },
  { country: "Poland", code: "PL", dish: "Bigos", week: 8 },
  { country: "Iran", code: "IR", dish: "Ghormeh sabzi", week: 9 },
  { country: "Senegal", code: "SN", dish: "Thieboudienne", week: 10 },
  { country: "Hungary", code: "HU", dish: "Chicken paprikash", week: 11 },
  { country: "Sri Lanka", code: "LK", dish: "Kottu roti", week: 12 },
  { country: "Jamaica", code: "JM", dish: "Ackee and saltfish", week: 13 },
  { country: "Norway", code: "NO", dish: "Fårikål", week: 14 },
  { country: "Malaysia", code: "MY", dish: "Nasi lemak", week: 15 },
  { country: "Ukraine", code: "UA", dish: "Borscht", week: 16 },
  { country: "Argentina", code: "AR", dish: "Locro", week: 17 },
  { country: "Nepal", code: "NP", dish: "Dal bhat", week: 18 },
  { country: "Portugal", code: "PT", dish: "Bacalhau à brás", week: 19 },
  { country: "Ghana", code: "GH", dish: "Waakye", week: 20 },
  { country: "Turkey", code: "TR", dish: "Manti", week: 21 },
  { country: "Fiji", code: "FJ", dish: "Kokoda", week: 22 },
  { country: "Indonesia", code: "ID", dish: "Beef rendang", week: 23 },
  { country: "Greece", code: "GR", dish: "Gemista", week: 24 },
  { country: "Mexico", code: "MX", dish: "Cochinita pibil", week: 25 },
  { country: "Japan", code: "JP", dish: "Okonomiyaki", week: 26 },
  { country: "Egypt", code: "EG", dish: "Koshari", week: 27 },
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
