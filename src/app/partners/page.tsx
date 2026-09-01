import { partners } from "@/data/site-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PartnerTestimonials } from "@/components/partners/partner-testimonials";
import { ExternalLink, Sparkles, Handshake, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Partners | Edo Tech Community",
  description:
    "Explore the collaborators powering Edo Tech Community. Every partnership is grounded in shared impact—no paywalls or tiered access.",
};

const benefits = [
  "Direct pipeline to vetted Edo engineering and design talent",
  "Co-hosting rights for Paty sprints, workshops, and demo days",
  "Custom research and civic telemetry briefs",
  "Brand prominence across regional hubs and global livestreams",
];

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-24 md:space-y-32 px-6 py-12 md:py-20">
      {/* 1. HERO HEADER */}
      <section className="relative pt-6 max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
          <Sparkles className="size-3.5" />
          <span>Ecosystem Coalitions</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
          Meet the allies powering Edo&apos;s innovation future.
        </h1>

        <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed">
          Every collaboration is rooted in open knowledge-sharing, bandwidth access, and equity for community builders across Edo State.
        </p>
      </section>

      {/* 2. PARTNER DIRECTORY WITH VISIT WEBSITE CTAs */}
      <section className="space-y-12">
        <SectionHeading
          eyebrow="Collaborators"
          title="Allies across sectors"
          description="Hardware studios, ISPs, venture funds, and developer organizations co-building with us."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between space-y-6 transition hover:-translate-y-1 hover:border-secondary/60 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/40 p-2.5">
                    <Image src={partner.logo} alt={partner.name} width={40} height={40} className="object-contain" />
                  </div>
                  {partner.focusArea && (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
                      {partner.focusArea}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-heading">{partner.name}</h3>
                  <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>

              {/* Direct Visit Website CTA */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href={`https://${partner.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-secondary hover:text-black hover:border-secondary px-4 py-2.5 text-xs font-semibold text-white transition cursor-pointer"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TESTIMONIALS */}
      <section className="space-y-12">
        <SectionHeading
          eyebrow="Testimonials"
          title="Why leaders partner with us"
          description="Reflections from our venture, hardware, and civic partners."
        />
        <PartnerTestimonials partners={partners} />
      </section>

      {/* 4. BENEFITS */}
      <section className="space-y-12">
        <SectionHeading
          eyebrow="Benefits"
          title="Shared ecosystem advantages"
          description="What your organization unlocks by joining the Edo Tech coalition."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 flex items-start gap-4 shadow-lg"
            >
              <div className="size-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 font-bold text-sm">
                0{idx + 1}
              </div>
              <p className="text-base text-neutral-200 leading-relaxed font-medium mt-1.5">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BECOME A PARTNER CTA */}
      <section className="rounded-[36px] border border-secondary/40 bg-gradient-to-br from-secondary/15 via-white/5 to-background p-8 sm:p-14 text-center space-y-6 shadow-2xl">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
          Ready to Co-Create with Edo&apos;s Tech Leaders?
        </h2>
        <p className="text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Tell us how your organization wants to plug into our residency, sponsorship, or talent pipelines.
        </p>
        <Button size="lg" className="rounded-2xl px-8 py-6 text-sm font-bold shadow-xl" asChild>
          <a href="mailto:partners@edotech.community">Become a Partner</a>
        </Button>
      </section>
    </div>
  );
}
