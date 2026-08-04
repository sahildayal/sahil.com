/**
 * Content for /world — the matchday programme.
 *
 * Sections with no real content yet are switched OFF rather than filled with
 * placeholders, so nothing unfinished is public. Flip the flag and add the data
 * to bring a section back.
 */

export type Cap = {
  country: string;
  code: string; // ISO 3166-1 alpha-2
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

/**
 * TO RE-ENABLE: set `showFixtures = true` and add the real matches — teams,
 * scores, venues, dates. Hidden until then.
 */
export const showFixtures = false;
export const fixtures: Fixture[] = [];

/**
 * Only countries with a dish I can actually name. `capsTotal` is the real
 * running count; the grid shows the ones written up so far.
 * TO EXPAND: add entries here as you record them.
 */
export const capsTotal = 40;
export const caps: Cap[] = [
  { country: "Morocco", code: "MA", dish: "Lamb tagine", week: 1 },
  { country: "Vietnam", code: "VN", dish: "Pho bo", week: 2 },
  { country: "Georgia", code: "GE", dish: "Khachapuri", week: 3 },
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
