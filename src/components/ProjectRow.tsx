import Link from "next/link";
import type { Project } from "@/content/projects";

/**
 * A row in the work index. The left column is the year, not a sequence number —
 * the list isn't a process, so numbering it would be decoration. The year is
 * information the reader actually wants.
 */
export function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block border-b border-rule py-5 transition-colors hover:bg-paper-raised"
    >
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-6">
        <span className="tabular w-20 shrink-0 text-xs text-muted">
          {project.year}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-display text-lg font-semibold leading-tight transition-colors group-hover:text-clay sm:text-xl">
              {project.title}
            </h3>
            {project.live ? (
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-widest text-clay">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                Live
              </span>
            ) : null}
            {project.access.kind === "closed" ? (
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">
                Not public
              </span>
            ) : null}
          </div>

          {/* The kicker is always present, not hover-only — hover-only content
              is invisible on touch, which is most of the traffic. */}
          <p className="mt-1 text-sm leading-snug text-muted">
            {project.kicker}
          </p>
        </div>

        <span className="eyebrow shrink-0 sm:w-36 sm:text-right">
          {project.category}
        </span>
      </div>
    </Link>
  );
}
