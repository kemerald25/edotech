import { partners } from "@/data/site-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PartnerTestimonials } from "@/components/partners/partner-testimonials";

export const metadata = {
  title: "Partners",
  description:
    "Explore partner tiers, testimonials, and how to collaborate with Edo Tech.",
};

const benefits = [
  "Access to Edo innovation pipelines",
  "Talent residency + hiring support",
  "Custom research briefs",
  "Brand visibility across events",
];

export default function PartnersPage() {
  const tiers = ["platinum", "gold", "silver"] as const;

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-10">
        <h1 className="font-heading text-4xl font-semibold">
          Meet the allies funding Edo&apos;s innovation future
        </h1>
        <p className="mt-4 text-lg text-neutral-300">
          Tiered visibility, community impact metrics, and co-created programs.
        </p>
      </section>

      <SectionHeading
        eyebrow="Tiers"
        title="Partner grid"
        description="Logos glow by tier, hover for benefits."
      />
      <div className="space-y-6">
        {tiers.map((tier) => (
          <div key={tier}>
            <p className="text-sm uppercase tracking-[0.4em] text-secondary/70">
              {tier}
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {partners
                .filter((partner) => partner.tier === tier)
                .map((partner) => (
                  <div
                    key={partner.name}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center transition hover:-translate-y-1 hover:border-secondary/60"
                  >
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-secondary/40 bg-black/30">
                      <Image src={partner.logo} alt={partner.name} width={48} height={48} />
                    </div>
                    <p className="mt-4 text-xl font-semibold">{partner.name}</p>
                    <p className="text-sm text-neutral-400">
                      {partner.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <SectionHeading
        eyebrow="Testimonials"
        title="Why they partner with us"
        description="Carousel rotates quotes from across tiers."
      />
      <PartnerTestimonials partners={partners} />

      <SectionHeading
        eyebrow="Benefits"
        title="Partnership benefits"
        description="Every tier unlocks shared data rooms, local insights, and co-branded activations."
      />
      <ul className="grid gap-4 md:grid-cols-2">
        {benefits.map((benefit) => (
          <li
            key={benefit}
            className="rounded-3xl border border-white/10 bg-white/5 p-4 text-neutral-200"
          >
            {benefit}
          </li>
        ))}
      </ul>

      <section className="rounded-[32px] border border-secondary/40 bg-secondary/10 p-10 text-center">
        <h2 className="font-heading text-3xl font-semibold text-secondary">
          Ready to co-create?
        </h2>
        <p className="mt-4 text-neutral-200">
          Tell us how you want to plug into Edo Tech’s roadmap.
        </p>
        <Button variant="secondary" className="mt-6" asChild>
          <a href="mailto:partners@edotech.community">Become a partner</a>
        </Button>
      </section>
    </div>
  );
}

