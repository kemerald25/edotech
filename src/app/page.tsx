import { LogoCloud } from "@/components/sections/logo-cloud";
import { NextEventSection } from "@/components/sections/next-event-section";
import { BlogCard } from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedCounter } from "@/components/animated-counter";
import { missionStats, programs } from "@/data/site-data";
import { getFeaturedNextEvent } from "@/lib/data-store";
import { getFeaturedPosts } from "@/lib/mdx";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import Link from "next/link";
import { ArrowRight, Compass, Radio, Sparkles } from "lucide-react";

const quickLinks = [
  { label: "Explore Programs", href: "/programs", icon: Compass },
  { label: "Community Blog", href: "/blog", icon: Radio },
  { label: "Partner With Us", href: "/partners", icon: Sparkles },
];

export default async function HomePage() {
  const featuredPosts = await getFeaturedPosts();
  const nextEvent = getFeaturedNextEvent();

  return (
    <div className="mx-auto flex max-w-6xl flex-col space-y-24 md:space-y-32 px-6 py-12 md:py-20">
      {/* 1. HERO SECTION (Unboxed for Maximum Presence & Breathing Room) */}
      <section className="relative pt-6 md:pt-12">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-[radial-gradient(circle,_rgba(108,36,201,0.35),_transparent_65%)] blur-2xl" />

        <div className="relative z-10 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
              <Sparkles className="size-3.5" />
              <span>Edo Tech Community</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-white">
              A futurist community shaping Edo&apos;s innovation economy.
            </h1>

            <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-2xl">
              We bring engineers, designers, researchers, and policymakers together to prototype equitable futures—from civic AI labs to climate-ready hardware.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button asChild size="lg" className="rounded-2xl px-8 py-6 text-sm font-bold shadow-xl shadow-secondary/10">
                <Link href="/join">Join the Movement</Link>
              </Button>
              <Button variant="ghost" size="lg" className="rounded-2xl px-6 py-6 text-sm font-semibold text-neutral-300 hover:text-white" asChild>
                <Link href="/about">
                  Explore Vision
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              {missionStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-3xl sm:text-4xl font-bold text-secondary">
                    <AnimatedCounter value={stat.value} />+
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Side Feature Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md p-6 sm:p-8 space-y-6 shadow-2xl">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-secondary font-bold">
                  Paty Spotlight
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white font-heading">
                  Efficient missions, inclusive build weeks, global partners.
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                {programs.slice(0, 3).map((program) => (
                  <div
                    key={program.title}
                    className="rounded-2xl border border-white/10 bg-black/40 p-4 transition hover:border-secondary/40"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">
                      {program.category}
                    </p>
                    <p className="mt-1 font-semibold text-white">
                      {program.title}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "NEXT EVENT" PROMINENT SHOWCASE */}
      <NextEventSection event={nextEvent} />

      {/* 3. PARTNER LOGOS (Unboxed Monochrome with Color Hover Reveal) */}
      <section className="space-y-4">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-neutral-500 font-semibold">
          Powering Innovation Across Edo State with Our Ecosystem Partners
        </p>
        <LogoCloud />
      </section>

      {/* 4. SPOTLIGHTS & MISSIONS */}
      <section className="space-y-12">
        <SectionHeading
          eyebrow="Missions"
          title="Build or learn—choose your own runway"
          description="Navigate to the tracks and resources you need most. Built for founders, builders, and civic operators."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-secondary/60 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <link.icon className="size-7 text-secondary" />
                <ArrowRight className="size-5 text-neutral-500 transition group-hover:translate-x-1 group-hover:text-white" />
              </div>
              <p className="mt-8 text-xl font-bold text-white font-heading">
                {link.label}
              </p>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                Explore active initiatives, documentation, and open partnerships.
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. JOURNAL / BLOG */}
      <section className="space-y-12">
        <SectionHeading
          eyebrow="Journal"
          title="Latest from the community blog"
          description="Research briefs, lab dispatches, and member stories published by the community."
          actions={
            <Button variant="ghost" asChild className="rounded-xl">
              <Link href="/blog">View all posts</Link>
            </Button>
          }
        />
        <div className="grid gap-8 md:grid-cols-2">
          {featuredPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} featured={index === 0} />
          ))}
        </div>
      </section>

      {/* 6. NEWSLETTER BRIEF */}
      <section className="rounded-[36px] border border-white/10 bg-gradient-to-br from-white/5 via-background to-background p-8 sm:p-14 space-y-8">
        <SectionHeading
          eyebrow="Stay in the loop"
          title="Newsletter & partner briefs"
          description="Monthly digests with program drops, grant alerts, and fellowship hiring announcements."
        />
        <NewsletterForm />
      </section>
    </div>
  );
}
