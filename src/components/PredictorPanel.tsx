import Link from "next/link";
import { Reveal } from "./Reveal";

/**
 * Surfaces output from the football forecasting model.
 *
 * NOT YET WIRED. The panel renders an honest "offline" state rather than
 * invented fixtures — a portfolio that fakes live data is worse than one that
 * doesn't have any. To bring it online, EPL_LALIGA_PREDICTOR needs to publish
 * its output as JSON (a GitHub Actions job writing to a gist or the repo is
 * enough), then `/api/predictions` reads it and this switches to the live path.
 */

type Prediction = {
  home: string;
  away: string;
  kickoff: string;
  homeWinProbability: number;
};

async function getPredictions(): Promise<Prediction[] | null> {
  const source = process.env.PREDICTIONS_URL;
  if (!source) return null;

  try {
    const res = await fetch(source, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return (await res.json()) as Prediction[];
  } catch {
    return null;
  }
}

export async function PredictorPanel() {
  const predictions = await getPredictions();

  return (
    <Reveal>
      <section className="rounded-[var(--radius-card)] bg-paper-raised p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                predictions ? "bg-sea" : "bg-muted"
              }`}
              aria-hidden="true"
            />
            <span className="eyebrow">
              {predictions ? "Model output · live" : "Model output · offline"}
            </span>
          </div>
          <Link
            href="/projects/football-forecasting"
            className="eyebrow transition-colors hover:text-sea"
          >
            How it works →
          </Link>
        </div>

        {predictions ? (
          <ul className="mt-6 space-y-5">
            {predictions.slice(0, 3).map((p) => (
              <li key={`${p.home}-${p.away}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-sm font-semibold tracking-wide">
                    {p.home} <span className="text-muted">v</span> {p.away}
                  </p>
                  <span className="tabular text-xs text-muted">{p.kickoff}</span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div
                    className="h-1.5 flex-1 overflow-hidden bg-paper-sunk"
                    role="img"
                    aria-label={`${Math.round(p.homeWinProbability * 100)} percent home win probability`}
                  >
                    <div
                      className="h-full bg-sea"
                      style={{ width: `${p.homeWinProbability * 100}%` }}
                    />
                  </div>
                  <span className="tabular w-12 shrink-0 text-right text-xs text-ink-soft">
                    {Math.round(p.homeWinProbability * 100)}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6">
            <p className="font-display display-wide text-xl font-bold leading-tight sm:text-2xl">
              Predicting football,
              <br />
              three times over
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
              Three years of models, from a binary home-win classifier to a
              six-model comparison across 25 seasons. This panel goes live once
              the current predictor starts publishing its output.
            </p>
            <Link
              href="/projects/football-forecasting"
              className="mt-5 inline-block border-b border-sea pb-0.5 font-mono text-sm text-sea transition-colors hover:border-sea-hover hover:text-sea-hover"
            >
              Read the case study
            </Link>
          </div>
        )}
      </section>
    </Reveal>
  );
}
