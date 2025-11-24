"use client";

import { Project } from "@/types/content";
import Link from "next/link";

type Props = {
  projects: Project[];
};

export function ProjectsGallery({ projects }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project) => {
        const isExternal = project.link.startsWith("http");
        return (
          <article
            key={project.title}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/10 via-background to-background p-6"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-secondary/80">
              {project.category}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{project.title}</h3>
            <p className="mt-2 text-sm text-neutral-300">{project.description}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-neutral-400">
              Built by {project.builtBy}
            </p>
            {project.tech && (
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-400">
                {project.tech.map((stack) => (
                  <span
                    key={stack}
                    className="rounded-full border border-white/10 px-3 py-1"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            )}
            <Link
              href={project.link}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary transition hover:gap-3"
            >
              View project →
            </Link>
          </article>
        );
      })}
    </div>
  );
}


