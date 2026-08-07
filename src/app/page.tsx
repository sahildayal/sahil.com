import Link from "next/link";
import { profile, resumeUrl } from "@/content/profile";
import { featuredProjects, projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { SplitFlap } from "@/components/SplitFlap";
import { ProjectRow } from "@/components/ProjectRow";
import { PredictorPanel } from "@/components/PredictorPanel";
import { Reveal } from "@/components/Reveal";
import { Horizon } from "@/components/Horizon";
import { TideLine } from "@/components/TideLine";
import { Container, SectionHead } from "@/components/primitives";

export default function Home() {
  const current = experience[0];

  return (
    <>
      {/* ---------- hero ---------- */}
      <div className="relative isolate">
        <Horizon />
        <Container className="pt-16 pb-20 sm:pt-24 sm:pb-28">
          <p className="eyebrow">Muscat → Rochester</p>
          <h1 className="mt-3 font-display display-wide text-[clamp(2.75rem,11vw,6.5rem)] font-bold leading-[0.86] tracking-[-0.02em]">
            Sahil
            <br />
            Dayal
          </h1>

        <div className="mt-8 sm:mt-10">
          <SplitFlap rows={profile.board} />
        </div>

        <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          {profile.intro}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/projects"
            className="border-b border-sea pb-0.5 font-mono text-sm text-sea transition-colors hover:border-sea-hover hover:text-sea-hover"
          >
            See the work
          </Link>
          {resumeUrl ? (
            <a
              href={resumeUrl}
              className="border-b border-sea/40 pb-0.5 font-mono text-sm transition-colors hover:border-sea hover:text-sea"
            >
              Download resume
            </a>
          ) : null}
          <a
            href={`mailto:${profile.email}`}
            className="border-b border-sea/40 pb-0.5 font-mono text-sm transition-colors hover:border-sea hover:text-sea"
          >
            Get in touch
          </a>
          </div>
        </Container>
      </div>

      <TideLine seed={0} />

      {/* ---------- currently ---------- */}
      <Container className="pb-20">
        <Reveal>
          <SectionHead
            eyebrow="Currently"
            meta={`${current.start} — ${current.end}`}
          />
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="font-display text-xl font-semibold sm:text-2xl">
              {current.title},{" "}
              <span className="text-sea">{current.company}</span>
            </p>
            <span className="eyebrow">{current.team} team</span>
          </div>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
            {current.headline}. Go MCP tooling used by 50+ engineers, an
            eight-agent migration pipeline running across 8 production
            microservices, and a data access layer that redacts PHI before
            anything reads it.
          </p>
          <Link
            href="/work"
            className="eyebrow mt-5 inline-block transition-colors hover:text-sea"
          >
            Full experience →
          </Link>
        </Reveal>
      </Container>

      <TideLine seed={1} className="mb-20" />

      {/* ---------- selected work ---------- */}
      <Container className="pb-20">
        <Reveal>
          <SectionHead
            eyebrow="Selected work"
            meta={`${featuredProjects.length} of ${projects.length}`}
          />
        </Reveal>
        <div className="mt-2">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.04}>
              <ProjectRow project={project} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link
            href="/projects"
            className="eyebrow mt-6 inline-block transition-colors hover:text-sea"
          >
            All projects →
          </Link>
        </Reveal>
      </Container>

      {/* ---------- the football panel ---------- */}
      <Container className="pb-20">
        <PredictorPanel />
      </Container>

      <TideLine seed={2} className="mb-20" />

      {/* ---------- off the clock ---------- */}
      <Container className="pb-8">
        <Reveal>
          <SectionHead eyebrow="Off the clock" />
          <div className="mt-6 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
              Every week I pick a country and cook something from it.
              Twenty-seven weeks in, that&apos;s become the other half of how I
              think about this site — and it has its own page, laid out like a
              matchday programme.
            </p>
            <Link
              href="/world"
              className="border-b border-sea pb-0.5 font-mono text-sm text-sea transition-colors hover:border-sea-hover hover:text-sea-hover"
            >
              Open the programme →
            </Link>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
