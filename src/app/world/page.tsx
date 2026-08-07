import type { Metadata } from "next";
import {
  startingXI,
  formation,
  fixtures,
  MAX_FIXTURES,
  caps,
  capsTotal,
  offPitch,
} from "@/content/world";
import { Pitch } from "@/components/Pitch";
import { TideLine } from "@/components/TideLine";
import { Container, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "World",
  description:
    "A matchday programme: one country cooked a week, the 2026 World Cup, and the eleven tools I actually reach for.",
};

export default function WorldPage() {
  return (
    <Container className="pt-14 pb-8 sm:pt-20">
      {/* ---------- programme masthead ---------- */}
      <header className="pb-2">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <span className="eyebrow">Matchday programme</span>
          <span className="tabular text-xs text-muted">2026</span>
        </div>
        <h1 className="mt-4 font-display display-wide text-[clamp(2.25rem,9vw,5rem)] font-bold leading-[0.88] tracking-tight">
          Off the
          <br />
          clock
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
          One country cooked a week. A World Cup on home soil. And the eleven
          tools I&apos;d actually put on the teamsheet.
        </p>
      </header>

      <TideLine seed={0} className="mt-8" />

      {/* ---------- starting XI ---------- */}
      <section className="mt-16">
        <Reveal>
          <SectionHead
            eyebrow="Starting XI"
            title="What I reach for"
            meta={formation}
          />
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Not a skills list ranked by confidence — a teamsheet. These are the
            eleven I&apos;d pick if the work started tomorrow, in roughly the
            positions they play.
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-6">
            <Pitch players={[...startingXI]} formation={formation} />
          </div>
        </Reveal>
      </section>

      {/* ---------- next two matches ---------- */}
      {fixtures.length > 0 ? (
        <section className="mt-20">
          <Reveal>
            <SectionHead
              eyebrow="On the calendar"
              title="What I'm watching next"
              meta="Premier League"
            />
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Two matches, updated as the season goes. The predictor has an
              opinion on most of these — it&apos;s usually wrong about the draw.
            </p>
            <ul className="mt-6 space-y-2">
              {fixtures.slice(0, MAX_FIXTURES).map((f, i) => (
                <li
                  key={i}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-5"
                >
                  <div className="min-w-0">
                    <p className="font-display text-base font-semibold tracking-wide sm:text-lg">
                      {f.home} <span className="text-muted">v</span> {f.away}
                    </p>
                    {f.note ? <p className="eyebrow mt-1.5">{f.note}</p> : null}
                  </div>
                  <div className="flex shrink-0 items-baseline gap-3">
                    <span className="tabular text-xs text-muted">{f.date}</span>
                    <span className="tabular text-lg text-sea">
                      {f.kickoff}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      ) : null}

      {/* ---------- the kitchen table ---------- */}
      <section className="mt-20">
        <Reveal>
          <SectionHead
            eyebrow="The kitchen table"
            title="Countries cooked"
            meta={`${capsTotal} caps`}
          />
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            One country a week, cooked properly — no substituting the ingredient
            that makes it the dish. {capsTotal} weeks in, {capsTotal} countries
            deep.
          </p>
        </Reveal>
        <Reveal>
          <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {caps.map((cap) => (
              <li key={cap.country} className="rounded-[var(--radius-card)] bg-paper-raised p-4">
                {/* The ISO code, not a flag emoji — Windows has no flag font,
                    so emoji would render differently per platform. */}
                <div className="flex items-baseline justify-between gap-2">
                  <span className="tabular text-sm font-semibold text-sea">
                    {cap.code}
                  </span>
                  <span className="tabular text-[0.65rem] text-muted">
                    {String(cap.week).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-2 font-display text-sm font-semibold leading-tight">
                  {cap.country}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-muted">
                  {cap.dish}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ---------- everything else ---------- */}
      <section className="mt-20">
        <Reveal>
          <SectionHead eyebrow="Also" />
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {offPitch.map((item) => (
              <div
                key={item.title}
                className="pt-1"
              >
                <h3 className="font-display text-sm font-semibold tracking-wide">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </Container>
  );
}
