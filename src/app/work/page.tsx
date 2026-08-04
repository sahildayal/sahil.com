import type { Metadata } from "next";
import { experience, agenticPrinciples } from "@/content/experience";
import { Container, SectionHead, Tag } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Two Paychex co-ops, a security analyst summer, and the agentic design rules I've landed on.",
};

export default function WorkPage() {
  return (
    <Container className="pt-14 pb-8 sm:pt-20">
      <h1 className="font-display display-wide text-[clamp(2.25rem,7vw,4rem)] font-bold uppercase leading-[0.9] tracking-tight">
        Work
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
        Two co-ops at Paychex either side of a security summer in Muscat.
      </p>

      <div className="mt-16 space-y-16">
        {experience.map((role) => (
          <Reveal key={role.id}>
            <section>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-rule pb-3">
                <span className="eyebrow">
                  {role.company}
                  {role.team ? ` · ${role.team}` : ""}
                </span>
                <span className="tabular text-xs text-muted">
                  {role.start} — {role.end}
                  {role.current ? (
                    <span className="ml-2 text-clay">now</span>
                  ) : null}
                </span>
              </div>

              <h2 className="mt-5 font-display text-2xl font-semibold leading-tight sm:text-3xl">
                {role.title}
              </h2>
              <p className="mt-2 text-lg text-clay">{role.headline}</p>
              <p className="eyebrow mt-2">{role.location}</p>

              <ul className="mt-6 max-w-2xl space-y-4">
                {role.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      className="mt-2.5 h-px w-4 shrink-0 bg-rule-strong"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-ink-soft">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {role.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      {/* The rules, separated out — this is the part that took longest to learn. */}
      <div className="mt-24">
        <Reveal>
          <SectionHead
            eyebrow="How I build agents"
            meta={`${agenticPrinciples.length} rules`}
          />
          <p className="mt-5 max-w-2xl leading-relaxed text-ink-soft">
            I treat agents like distributed systems rather than prompts. Almost
            every agent failure I&apos;ve debugged was a state-management failure
            wearing a costume.
          </p>
          <dl className="mt-8 divide-y divide-rule border-t border-rule">
            {agenticPrinciples.map((p) => (
              <div
                key={p.pattern}
                className="grid gap-1 py-4 sm:grid-cols-2 sm:gap-8"
              >
                <dt className="font-mono text-sm leading-relaxed">
                  {p.pattern}
                </dt>
                <dd className="text-sm leading-relaxed text-muted">{p.why}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Container>
  );
}
