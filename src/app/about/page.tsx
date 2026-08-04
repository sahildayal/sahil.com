import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { profile, resumeUrl, headshot } from "@/content/profile";
import { Container, SectionHead, Tag } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: profile.intro,
};

export default function AboutPage() {
  return (
    <Container className="pt-14 pb-8 sm:pt-20">
      <h1 className="font-display display-wide text-[clamp(2.25rem,7vw,4rem)] font-bold uppercase leading-[0.9] tracking-tight">
        About
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-14">
        <div className="max-w-2xl space-y-6">
          {profile.about.map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-lg leading-relaxed text-ink-soft">{para}</p>
            </Reveal>
          ))}

          {resumeUrl ? (
            <Reveal>
              <a
                href={resumeUrl}
                className="inline-block border-b border-clay pb-0.5 font-mono text-sm text-clay transition-colors hover:border-clay-hover hover:text-clay-hover"
              >
                Download resume (PDF) →
              </a>
            </Reveal>
          ) : null}
        </div>

        <Reveal className="lg:pt-2">
          <figure>
            <Image
              src={headshot}
              alt={`Portrait of ${profile.name}`}
              width={545}
              height={573}
              sizes="(min-width: 1024px) 16rem, 60vw"
              className="w-full max-w-[16rem] border border-rule object-cover"
              priority
            />
            <figcaption className="eyebrow mt-3">{profile.location}</figcaption>
          </figure>
        </Reveal>
      </div>

      {/* ---------- education ---------- */}
      <div className="mt-20">
        <Reveal>
          <SectionHead eyebrow="Education" meta={profile.education.graduation} />
          <div className="mt-5">
            <h2 className="font-display text-xl font-semibold sm:text-2xl">
              {profile.education.school}
            </h2>
            <p className="mt-1 text-ink-soft">{profile.education.degree}</p>
            <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              <div>
                <dt className="eyebrow">GPA</dt>
                <dd className="tabular mt-1 text-sm">
                  {profile.education.gpa}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Focus</dt>
                <dd className="mt-1 text-sm text-ink-soft">
                  {profile.education.focus}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="eyebrow">Honors</dt>
                <dd className="mt-1 text-sm text-ink-soft">
                  {profile.education.honors}
                </dd>
              </div>
            </dl>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="eyebrow border-b border-rule pb-2">
                  Relevant coursework
                </h3>
                <ul className="mt-3 space-y-2">
                  {profile.education.coursework.map((c) => (
                    <li key={c.code} className="flex gap-3 text-sm">
                      <span className="tabular shrink-0 text-xs text-muted">
                        {c.code}
                      </span>
                      <span className="text-ink-soft">{c.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="eyebrow border-b border-rule pb-2">
                  Taking now — Fall 2026
                </h3>
                <ul className="mt-3 space-y-2">
                  {profile.education.current.map((c) => (
                    <li key={c.code} className="flex gap-3 text-sm">
                      <span className="tabular shrink-0 text-xs text-muted">
                        {c.code}
                      </span>
                      <span className="text-ink-soft">{c.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ---------- skills ---------- */}
      <div className="mt-20">
        <Reveal>
          <SectionHead eyebrow="Tools" />
          <div className="mt-6 space-y-6">
            {profile.skills.map((group) => (
              <div
                key={group.group}
                className="grid gap-3 sm:grid-cols-[8rem_1fr] sm:gap-6"
              >
                <h3 className="eyebrow sm:pt-1.5">{group.group}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ---------- certifications ---------- */}
      <div className="mt-20">
        <Reveal>
          <SectionHead
            eyebrow="Certifications"
            meta={`${profile.certifications.length}`}
          />
          <ul className="mt-2 divide-y divide-rule">
            {profile.certifications.map((cert) => (
              <li
                key={cert.name}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div>
                  <p className="text-sm leading-snug">{cert.name}</p>
                  <p className="eyebrow mt-1">{cert.issuer}</p>
                </div>
                <span className="tabular shrink-0 text-xs text-muted">
                  {cert.date}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="mt-20">
        <Reveal>
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
            There&apos;s a whole other page for the cooking, the football, and
            the piano.{" "}
            <Link
              href="/world"
              className="border-b border-clay pb-0.5 text-clay transition-colors hover:border-clay-hover hover:text-clay-hover"
            >
              It&apos;s laid out like a matchday programme.
            </Link>
          </p>
        </Reveal>
      </div>
    </Container>
  );
}
