import { resources } from "@/data/site-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { ResourceLibrary } from "@/components/resources/resource-library";
import { ResourceSubmissionForm } from "@/components/resources/resource-submission-form";
import { Library, Users } from "lucide-react";

export const metadata = {
  title: "Resources",
  description:
    "Searchable resource library with docs, datasets, tutorials, and contribution workflows.",
};

export default function ResourcesPage() {
  const communityContributions = resources.filter((item) => item.contributor);

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-secondary">
              Library
            </p>
            <h1 className="mt-4 font-heading text-4xl font-semibold">
              Downloadable toolkits and open resources
            </h1>
            <p className="mt-3 text-neutral-300">
              Markdown docs, datasets, and playbooks that power Edo Tech
              activations. Everything ships via Markdown so updates are a PR away.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 text-sm text-neutral-300">
            <p className="flex items-center gap-2 text-secondary">
              <Library className="size-4" />
              Always-on curation
            </p>
            <p className="mt-2">
              Resources are generated staticly at build time. Add a new file under
              <code className="ml-1 rounded bg-black/60 px-2 py-1 text-xs text-white">
                src/data/site-data.ts
              </code>{" "}
              or submit via the form below.
            </p>
          </div>
        </div>
      </section>

      <SectionHeading
        eyebrow="Explore"
        title="Search, filter, and download"
        description="All cards include quick descriptions, contributors, and outbound links."
      />
      <ResourceLibrary items={resources} />

      <SectionHeading
        eyebrow="Community"
        title="Featured contributions"
        description="Open-source spirit means everyone can drop knowledge for the next cohort."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {communityContributions.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 via-background to-background p-6"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-secondary/70">
              {item.category}
            </p>
            <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-neutral-300">{item.description}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-neutral-400">
              <Users className="size-4" />
              {item.contributor}
            </p>
          </article>
        ))}
      </div>

      <SectionHeading
        eyebrow="Submit"
        title="Share a resource"
        description="No-code submission form for new docs, tutorials, or tooling."
      />
      <ResourceSubmissionForm />
    </div>
  );
}


