"use client";

import { useState } from "react";
import { categories, type Project } from "@/content/projects";
import { ProjectRow } from "./ProjectRow";

export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  const filters = ["All", ...categories];

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-x-5 gap-y-2 border-b border-rule pb-4"
      >
        {filters.map((filter) => {
          const count =
            filter === "All"
              ? projects.length
              : projects.filter((p) => p.category === filter).length;
          const isActive = active === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={`eyebrow transition-colors hover:text-clay ${
                isActive ? "text-clay" : ""
              }`}
            >
              {filter}{" "}
              <span className="tabular text-[0.6rem] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-2">
        {filtered.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
