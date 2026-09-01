import { resources, communityProjects } from "@/data/site-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { ResourceSubmissionForm } from "@/components/resources/resource-submission-form";
import { Library, Users, Sparkles } from "lucide-react";
import { ResourceTabs } from "@/components/resources/resource-tabs";

export const metadata = {
  title: "Resources | Edo Tech Community",
  description:
    "Searchable resource library with docs, datasets, tutorials, and contribution workflows.",
};

export default function ResourcesPage() {
  const communityContributions = resources.filter((item) => item.contributor);

  return (
    <div className="mx-auto max-w-6xl space-y-24 md:space-y-32 px-6 py-12 md:py-20">
      {/* 1. HERO HEADER */}
      <section className="relative pt-6 max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
          <Sparkles className="size-3.5" />
          <span>Open Knowledge Commons</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
          Toolkits, open datasets, and community playbooks.
        </h1>

        <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed">
          Open-source resources, playbooks, and municipal datasets that power Edo Tech activations.
        </p>
      </section>

      {/* 2. RESOURCE EXPLORER */}
      <section className="space-y-12">
        <SectionHeading
          eyebrow="Library"
          title="Search, filter, and download"
          description="Browse documentation, playbooks, and open-source civic projects built by Edo creators."
        />
        <ResourceTabs resources={resources} projects={communityProjects} />
      </section>

      {/* 3. COMMUNITY CONTRIBUTIONS */}
      <section className="space-y-12">
        <SectionHeading
          eyebrow="Community"
          title="Featured contributions"
          description="Open-source spirit means everyone can drop knowledge for the next cohort."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {communityContributions.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col justify-between space-y-4 shadow-lg transition hover:border-secondary/50"
            >
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-white font-heading">{item.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{item.description}</p>
              </div>

              <p className="pt-4 border-t border-white/10 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                <Users className="size-4 text-secondary" />
                <span>{item.contributor}</span>
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 4. SUBMISSION FORM */}
      <section className="rounded-[36px] border border-white/10 bg-gradient-to-br from-white/5 via-background to-background p-8 sm:p-12 space-y-8">
        <SectionHeading
          eyebrow="Contribute"
          title="Share an open resource"
          description="Submit a dataset, tutorial, or tooling repository for review by our maintainers."
        />
        <ResourceSubmissionForm />
      </section>
    </div>
  );
}
