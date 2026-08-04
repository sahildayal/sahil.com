import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

const base = "https://sahildayal.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = ["", "/work", "/projects", "/world", "/about"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const caseStudies = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...caseStudies];
}
