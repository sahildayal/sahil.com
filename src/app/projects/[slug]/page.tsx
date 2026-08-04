import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import { Container, Stat, Tag } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.kicker,
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article>
      <Container className="pt-14 pb-16 sm:pt-20">
        <Link
          href="/projects"
          className="eyebrow transition-colors hover:text-clay"
        >
          ← Projects
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="eyebrow">{project.category}</span>
            <span className="tabular text-xs text-muted">{project.year}</span>
            {project.live ? (
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-widest text-clay">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                Live
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 font-display display-wide text-[clamp(2rem,6.5vw,3.75rem)] font-bold uppercase leading-[0.92] tracking-tight">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            {project.kicker}
          </p>

          {/* Access is stated up front. A reader looking for code should find
              out here, not after scrolling to a missing link. */}
          <div className="mt-6">
            {project.access.kind === "public" ? (
              <a
                href={project.access.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="border-b border-clay pb-0.5 font-mono text-sm text-clay transition-colors hover:border-clay-hover hover:text-clay-hover"
              >
                View source on GitHub →
              </a>
            ) : project.access.kind === "soon" ? (
              <p className="font-mono text-sm text-muted">
                {project.access.note}
              </p>
            ) : (
              <p className="font-mono text-sm text-muted">
                {project.access.note}
              </p>
            )}
          </div>
        </header>
      </Container>

      {project.metrics?.length ? (
        <Container className="pb-16">
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {project.metrics.map((m) => (
                <Stat key={m.label} value={m.value} label={m.label} />
              ))}
            </div>
          </Reveal>
        </Container>
      ) : null}

      <Container className="pb-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16">
          <div className="prose-case max-w-2xl">
            <Reveal>
              <h2 className="eyebrow">The problem</h2>
              <p>{project.problem}</p>
            </Reveal>

            <Reveal>
              <h2 className="eyebrow mt-12">What I did</h2>
              <ul className="mt-4 space-y-4">
                {project.approach.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="tabular mt-1 shrink-0 text-xs text-clay">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed text-ink-soft">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="eyebrow mt-12">Where it landed</h2>
              <p>{project.outcome}</p>
            </Reveal>

            {project.chapters?.length ? (
              <Reveal>
                <h2 className="eyebrow mt-12">The three attempts</h2>
                <ol className="mt-4 space-y-8">
                  {project.chapters.map((c) => (
                    <li
                      key={c.name}
                      className="border-l-2 border-rule-strong pl-5"
                    >
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="tabular text-xs text-clay">
                          {c.year}
                        </span>
                        <h3 className="font-display text-base font-semibold">
                          {c.name}
                        </h3>
                      </div>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                        {c.what}
                      </p>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                        <span className="font-mono text-[0.65rem] uppercase tracking-widest">
                          Took away ·{" "}
                        </span>
                        {c.learned}
                      </p>
                      {c.repo ? (
                        <a
                          href={c.repo}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-2 inline-block font-mono text-xs text-clay transition-colors hover:text-clay-hover"
                        >
                          Source →
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </Reveal>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="eyebrow border-b border-rule pb-3">Built with</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
