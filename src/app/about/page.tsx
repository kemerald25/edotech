import { SectionHeading } from "@/components/ui/section-heading";
import { timeline, values, missionStats } from "@/data/site-data";
import { AnimatedCounter } from "@/components/animated-counter";
import { TeamTabs } from "@/components/teams/team-tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Compass, Shield, Users, Layers } from "lucide-react";

export const metadata = {
  title: "About Us | Edo Tech Community",
  description:
    "Vision, mission, history time-tree, and team directory for the Edo Tech Community.",
};

const valueIcons: Record<string, any> = {
  Sparkles,
  Users,
  Layers,
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col space-y-24 md:space-y-32 px-6 py-12 md:py-20">
      {/* 1. VISION & HERO */}
      <section className="relative pt-6">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-[radial-gradient(circle,_rgba(108,36,201,0.25),_transparent_65%)] blur-3xl" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
            <Sparkles className="size-3.5" />
            <span>Our Vision</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            We nurture technologists that design equitable futures for Edo State.
          </h1>

          <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed">
            From Paty innovation sprints to distributed regional labs, our community experiments with frontier technologies while grounding in local impact. Every initiative is co-created with the people it serves.
          </p>

          <div className="pt-2">
            <Button asChild size="lg" className="rounded-2xl px-8 py-6 text-sm font-bold shadow-xl shadow-secondary/10">
              <Link href="/join">Become a Member</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. TIME TREE TIMELINE */}
      <section className="space-y-12">
        <SectionHeading
          eyebrow="Milestones"
          title="Timeline of momentum"
          description="The pivotal years that shaped our guild into Edo State's frontier technology community."
        />

        <div className="relative border-l-2 border-secondary/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {timeline.map((item, index) => (
            <div key={item.year} className="relative group">
              {/* Timeline Tree Node */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 size-6 sm:size-7 rounded-full bg-background border-2 border-secondary flex items-center justify-center text-[10px] font-bold text-secondary shadow-glow group-hover:bg-secondary group-hover:text-black transition">
                {index + 1}
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 space-y-2 transition hover:border-secondary/50 hover:bg-white/[0.07] shadow-lg">
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-secondary">
                  Year {item.year}
                </span>
                <h3 className="text-2xl font-bold text-white font-heading">{item.title}</h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE GUIDING VALUES */}
      <section className="space-y-12">
        <SectionHeading
          eyebrow="Values"
          title="Guiding principles"
          description="The non-negotiable foundations anchoring every lab, sprint, and community activation."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => {
            const Icon = valueIcons[value.icon] || Sparkles;
            return (
              <div
                key={value.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-4 transition hover:-translate-y-1 hover:border-secondary/60 shadow-lg"
              >
                <div className="size-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">{value.title}</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. IMPACT COUNTERS */}
      <section className="rounded-[36px] border border-white/10 bg-gradient-to-br from-primary/20 via-white/5 to-background p-8 sm:p-12 space-y-8 shadow-xl">
        <SectionHeading
          eyebrow="Impact"
          title="Metrics we track"
          description="Progress across talent development, open-source repos, and partner coalitions."
        />
        <div className="grid gap-6 sm:grid-cols-3">
          {missionStats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/10 bg-black/40 p-6">
              <p className="font-heading text-4xl sm:text-5xl font-bold text-secondary">
                <AnimatedCounter value={stat.value} />+
              </p>
              <p className="text-sm text-neutral-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CONSOLIDATED TABBED TEAM DIRECTORY */}
      <section className="space-y-12">
        <SectionHeading
          eyebrow="Team"
          title="Humans behind the community"
          description="Our stewards, maintainers, designers, engineers, and community operators."
        />
        <TeamTabs />
      </section>
    </div>
  );
}
