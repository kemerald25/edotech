import { LogoCloud } from "@/components/sections/logo-cloud";
import { BlogCard } from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedCounter } from "@/components/animated-counter";
import { missionStats, programs } from "@/data/site-data";
import { getFeaturedPosts } from "@/lib/mdx";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import Link from "next/link";
import { ArrowRight, Compass, Radio, Sparkles } from "lucide-react";

const quickLinks = [
  { label: "View Programs", href: "/programs", icon: Compass },
  { label: "Read the Blog", href: "/blog", icon: Radio },
  { label: "Partner with us", href: "/partners", icon: Sparkles },
];

export default async function HomePage() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16">
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-primary/30 via-background to-background p-10">
        <div className="pointer-events-none absolute inset-0 animate-pulse-glow bg-[radial-gradient(circle_at_top,_rgba(108,36,201,0.6),_transparent_45%)]" />
        <div className="relative z-10 grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <p className="text-xs uppercase tracking-[0.4em] text-secondary">
              Edo tech community
            </p>
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-6xl">
              A futurist guild shaping Edo State&apos;s innovation economy.
            </h1>
            <p className="text-lg text-neutral-200">
              We bring engineers, designers, researchers, and policymakers
              together to prototype equitable futures—from civic AI labs to
              climate-ready hardware.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/join">Join the movement</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/about">
                  Explore vision
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {missionStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-semibold">
                    <AnimatedCounter value={stat.value} />+
                  </p>
                  <p className="text-sm text-neutral-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel relative flex flex-col justify-between gap-6 p-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-secondary">
                Paty spotlight
              </p>
              <p className="mt-4 text-2xl font-semibold">
                Efficient missions, inclusive build weeks, global partners.
              </p>
            </div>
            <div className="space-y-4 text-sm text-neutral-300">
              {programs.map((program) => (
                <div
                  key={program.title}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-secondary/80">
                    {program.category}
                  </p>
                  <p className="mt-2 font-semibold text-white">
                    {program.title}
                  </p>
                  <p className="text-neutral-400">{program.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LogoCloud />

      <section className="space-y-10">
        <SectionHeading
          eyebrow="missions"
          title="Build or learn—choose your own runway"
          description="Navigate to the pages you need most. Everything ships with smooth scroll and fluid interactions."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-secondary/60"
            >
              <div className="flex items-center justify-between">
                <link.icon className="size-6 text-secondary" />
                <ArrowRight className="size-4 text-neutral-500 transition group-hover:translate-x-1" />
              </div>
              <p className="mt-6 text-lg font-semibold text-white">
                {link.label}
              </p>
              <p className="mt-2 text-sm text-neutral-400">
                Tap to explore resources, programs, and collaborations.
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow="journal"
          title="Latest from the community blog"
          description="File-based markdown posts with MDX enhancements, generated at build time for speed."
          actions={
            <Button variant="ghost" asChild>
              <Link href="/blog">View all</Link>
            </Button>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {featuredPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} featured={index === 0} />
          ))}
        </div>
      </section>

      <section className="space-y-8 rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 via-background to-background p-10">
        <SectionHeading
          eyebrow="stay in the loop"
          title="Newsletter + partner briefs"
          description="Monthly digests with program drops, funding calls, and hiring alerts."
        />
        <NewsletterForm />
      </section>
    </div>
  );
}
