import { TeamTabs } from "@/components/teams/team-tabs";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Teams | Edo Tech Community",
  description:
    "Meet the humans leading guilds, labs, design systems, and contributor circles across Edo State.",
};

export default function TeamsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6 py-12 md:py-20">
      <section className="relative pt-6 max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
          <Sparkles className="size-3.5" />
          <span>Guild Directory</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
          Maintainers, chairs, and guild captains.
        </h1>

        <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed">
          Filter by role to discover designers, developers, operators, and executive stewards shaping the community.
        </p>
      </section>

      <TeamTabs />
    </div>
  );
}
