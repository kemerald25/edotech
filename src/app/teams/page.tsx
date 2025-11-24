import { SectionHeading } from "@/components/ui/section-heading";
import { TeamGrid } from "@/components/teams/team-grid";

export const metadata = {
  title: "Teams",
  description:
    "Meet the humans leading guilds, labs, and contributor circles.",
};

export default function TeamsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-10">
        <h1 className="font-heading text-4xl font-semibold">
          Maintainers, chairs, and guild captains
        </h1>
        <p className="mt-4 text-lg text-neutral-300">
          Filter by discipline and dive into extended bios with a click.
        </p>
      </section>
      <SectionHeading
        eyebrow="Directory"
        title="Find the right collaborator"
        description="Hover for quick context, tap for extended details."
      />
      <TeamGrid />
    </div>
  );
}

