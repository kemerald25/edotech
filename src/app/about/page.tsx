import { SectionHeading } from "@/components/ui/section-heading";
import { timeline, values, teamMembers, missionStats } from "@/data/site-data";
import { AnimatedCounter } from "@/components/animated-counter";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "Vision, mission, and impact metrics for the Edo Tech Community.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16">
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(108,36,201,0.35),_transparent_55%)]" />
        <div className="relative z-10 space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-secondary">
            Vision
          </p>
          <h1 className="max-w-3xl font-heading text-5xl font-semibold">
            We nurture technologists that design equitable futures for Edo State.
          </h1>
          <p className="text-lg text-neutral-200">
            From Paty programs to distributed labs, our community experiments
            with frontier technologies while grounding in local impact. Every
            initiative is co-created with the people it serves.
          </p>
          <Button asChild size="lg">
            <Link href="/join">Become a member</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Milestones"
          title="Timeline of momentum"
          description="Scroll through the pivotal years that shaped Edo Tech."
        />
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div
              key={item.year}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-secondary/60"
              style={{
                transform: `translateY(${index % 2 === 0 ? 0 : 10}px)`,
              }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-secondary/80">
                {item.year}
              </p>
              <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
              <p className="text-neutral-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Values"
          title="Guiding principles"
          description="Interactive cards revealing what anchors every initiative."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-2 hover:border-secondary/60"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-secondary">
                {value.icon}
              </p>
              <h3 className="mt-4 text-xl font-semibold">{value.title}</h3>
              <p className="text-neutral-300">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8 rounded-[32px] border border-white/10 bg-white/5 p-10">
        <SectionHeading
          eyebrow="Impact"
          title="Metrics we track"
          description="Animated counters showing our progress."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {missionStats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/10 p-6">
              <p className="text-4xl font-semibold">
                <AnimatedCounter value={stat.value} />+
              </p>
              <p className="text-sm text-neutral-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Team"
          title="Humans behind the community"
          description="A preview of the team before you explore the full directory."
          actions={
            <Button variant="ghost" asChild>
              <Link href="/teams">View teams</Link>
            </Button>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {teamMembers.slice(0, 2).map((member) => (
            <div
              key={member.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-secondary/80">
                {member.department}
              </p>
              <h3 className="mt-2 text-2xl font-semibold">{member.name}</h3>
              <p className="text-sm text-neutral-400">{member.role}</p>
              <p className="mt-4 text-neutral-300">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

