import type { Metadata } from "next";
import {
  startingXI,
  formation,
  fixtures,
  fixturesPending,
  caps,
  capsPending,
  capsTotal,
  offPitch,
} from "@/content/world";
import { Pitch } from "@/components/Pitch";
import { Container, SectionHead } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "World",
  description:
    "A matchday programme: one country cooked a week, the 2026 World Cup, and the eleven tools I actually reach for.",
};

function Pending({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 border-l-2 border-clay bg-clay-wash px-4 py-3 font-mono text-xs leading-relaxed text-ink-soft">
      {children}
    </p>
  );
}

export default function WorldPage() {
  return (
    <Container className="pt-14 pb-8 sm:pt-20">
      {/* ---------- programme masthead ---------- */}
      <header className="border-b-2 border-ink pb-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <span className="eyebrow">Matchday programme</span>
          <span className="tabular text-xs text-muted">2026</span>
        </div>
        <h1 className="mt-4 font-display display-wide text-[clamp(2.25rem,9vw,5rem)] font-bold uppercase leading-[0.88] tracking-tight">
          Off the
          <br />
          clock
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
          One country cooked a week. A World Cup on home soil. And the eleven
          tools I&apos;d actually put on the teamsheet.
        </p>
      </header>

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

      {/* ---------- fixtures ---------- */}
      <section className="mt-20">
        <Reveal>
          <SectionHead
            eyebrow="Fixtures attended"
            title="World Cup 2026"
            meta={`${fixtures.length} matches`}
          />
          {fixturesPending ? (
            <Pending>
              Placeholder fixtures. Sahil — send me the teams, scores, venues
              and dates and I&apos;ll swap these in.
            </Pending>
          ) : null}
          <ul className="mt-4 divide-y divide-rule border-t border-rule">
            {fixtures.map((f, i) => (
              <li
                key={i}
                className="grid gap-2 py-4 sm:grid-cols-[6rem_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span className="tabular text-xs text-muted">{f.date}</span>
                <div>
                  <p className="font-display text-base font-semibold uppercase tracking-wide">
                    {f.home} <span className="text-muted">v</span> {f.away}
                  </p>
                  <p className="eyebrow mt-1">{f.venue}</p>
                </div>
                <span className="tabular text-lg text-clay">{f.score}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

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
            that makes it the dish.
          </p>
          {capsPending ? (
            <Pending>
              Showing {caps.length} of {capsTotal}, and most dishes are still
              blank. Sahil — send the full list with what you made and I&apos;ll
              fill the grid.
            </Pending>
          ) : null}
        </Reveal>
        <Reveal>
          <ul className="mt-6 grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-4">
            {caps.map((cap) => (
              <li key={cap.country} className="bg-paper p-4">
                {/* The ISO code, not a flag emoji — Windows has no flag font,
                    so emoji would render differently per platform. */}
                <div className="flex items-baseline justify-between gap-2">
                  <span className="tabular text-sm font-semibold text-clay">
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
              <div key={item.title} className="border-t border-rule-strong pt-4">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
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
