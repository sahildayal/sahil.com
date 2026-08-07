import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectIndex } from "@/components/ProjectIndex";
import { Container } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Agent systems, data pipelines, and machine learning — what I've built and what each one taught me.",
};

export default function ProjectsPage() {
  return (
    <Container className="pt-14 pb-8 sm:pt-20">
      <h1 className="font-display display-wide text-[clamp(2.25rem,7vw,4rem)] font-bold leading-[0.9] tracking-tight">
        Projects
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
        Agent systems, data pipelines, and a long-running argument with football
        prediction. Some of this is proprietary and described rather than
        published — those rows say so.
      </p>

      <div className="mt-12">
        <ProjectIndex projects={[...projects]} />
      </div>
    </Container>
  );
}
