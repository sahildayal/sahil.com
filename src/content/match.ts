/**
 * The eleven defenders on /world's playable match.
 *
 * Each one you beat flips up a card. Mix is deliberate: engineering wins a
 * recruiter should absorb, personal facts that make me a person, and a few
 * genuine opinions — a run of eleven identical brag cards would be worse than
 * no game at all.
 *
 * `x` is the defender's starting position across the pitch, 0 (left touchline)
 * to 1 (right). Vary it or the run becomes a straight line.
 */

export type EggKind = "work" | "life" | "opinion";

export type Defender = {
  id: number;
  kind: EggKind;
  label: string;
  title: string;
  body: string;
  x: number;
};

export const kindLabel: Record<EggKind, string> = {
  work: "On the job",
  life: "Off the clock",
  opinion: "For the record",
};

export const defenders: Defender[] = [
  {
    id: 1,
    kind: "work",
    label: "Scale",
    title: "9.11 minutes → O(1)",
    body: "Migrated 25.2M validated tracks out of 106M+ Postgres rows into a read-shaped Mongo schema. The joins people actually ran stopped taking nine minutes.",
    x: 0.35,
  },
  {
    id: 2,
    kind: "opinion",
    label: "The real bug",
    title: "It said out of memory. It meant shuffle.",
    body: "Spark kept dying on 1.6M artist records. The cause wasn't memory — it was a global distributed self-join moving data between every partition. I've recognised that shape of bug several times since.",
    x: 0.7,
  },
  {
    id: 3,
    kind: "life",
    label: "The kitchen",
    title: "27 countries, one a week",
    body: "Pick a country, cook it properly, no substituting the ingredient that makes it the dish. Currently competent at tagine, pho, and khachapuri.",
    x: 0.25,
  },
  {
    id: 4,
    kind: "work",
    label: "Agents",
    title: "Two days of work, down to thirty minutes",
    body: "Eight agents, each owning one phase of an OpenShift probe and OpenTelemetry migration. Shipped across 8 production microservices.",
    x: 0.6,
  },
  {
    id: 5,
    kind: "opinion",
    label: "How I build",
    title: "Agents are distributed systems, not prompts",
    body: "Explicit state, deterministic routing, checkpoint every node, hard-gate anything irreversible. Almost every agent failure I've debugged was a state-management failure in a costume.",
    x: 0.8,
  },
  {
    id: 6,
    kind: "life",
    label: "Summer 2026",
    title: "A World Cup on home soil",
    body: "Having the tournament in the US this year was genuinely surreal. Football is the other thing I'd talk about for an hour if you let me.",
    x: 0.2,
  },
  {
    id: 7,
    kind: "work",
    label: "Adoption",
    title: "50+ engineers, 7 integrations",
    body: "Production MCP tooling in Go — Webex over OAuth, Oracle through a custom TNS resolver, SQL Server, Grafana Tempo, and more. Plus a data layer that redacts PHI across 36+ patterns before anything reads it.",
    x: 0.45,
  },
  {
    id: 8,
    kind: "opinion",
    label: "Restraint",
    title: "The best feature I didn't build",
    body: "My job-search tool ranks ~18k postings a night and will never apply to one. Auto-applying was the easy feature and the one most likely to waste a recruiter's time. Ranking was the hard part worth doing.",
    x: 0.75,
  },
  {
    id: 9,
    kind: "life",
    label: "Grade 5",
    title: "Piano, Trinity College London",
    body: "Still play. Still sight-read badly. Also read more crime thrillers than I'll comfortably admit to.",
    x: 0.3,
  },
  {
    id: 10,
    kind: "work",
    label: "Detection",
    title: "86% on a 15:1 imbalance",
    body: "Caught user-space keyloggers from behaviour alone — 17 process metrics, a class-balanced random forest, auto-terminating at 90% confidence. The tell is a trickle of small reads and a handle it never releases.",
    x: 0.55,
  },
  {
    id: 11,
    kind: "opinion",
    label: "Three attempts",
    title: "Still beaten by the draw",
    body: "Three years of football models, from a binary classifier to a six-model comparison over 25 seasons. Draws are where confident models go to be humbled. Calibration beats accuracy — the betting sim taught me that expensively.",
    x: 0.5,
  },
];

/** Tuning. World units: the pitch is 100 wide. */
export const MATCH = {
  pitchWidth: 100,
  leadIn: 46,
  spacing: 88,
  runOut: 120,
  /** Forward speed, world units per second. ~45s for a full run. */
  runSpeed: 24,
  /** Lateral steering speed. */
  steerSpeed: 46,
  playerRadius: 2.4,
  defenderRadius: 2.9,
  /**
   * Defenders close you down only once you're this near, and slowly.
   * Tuned by simulating full runs: at range 150 / speed 8.5 a defender had
   * six seconds to track you and could cross half the pitch, so it always
   * caught you and steering was pointless — a perfect run scored 0/11.
   * At 60 / 6, never steering beats 4 of 11 and steering well beats 10–11.
   */
  homingRange: 60,
  homingSpeed: 6,
  /**
   * The pitch renders as a vertical strip, never the full canvas width — a
   * top-down pitch stretched across a 1280px desktop makes every object
   * enormous and puts the defenders off-screen.
   */
  maxFieldAspect: 0.72,
} as const;

export const totalDistance =
  MATCH.leadIn + defenders.length * MATCH.spacing + MATCH.runOut;

/** World-space y for each defender. */
export function defenderY(index: number) {
  return MATCH.leadIn + (index + 1) * MATCH.spacing;
}
