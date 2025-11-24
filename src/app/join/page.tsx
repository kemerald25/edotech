import { AnimatedCounter } from "@/components/animated-counter";
import { HubspotForm } from "@/components/forms/hubspot-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { faqs, missionStats } from "@/data/site-data";
import { CheckCircle2, Quote, Shield } from "lucide-react";

const membershipTiers = [
  {
    name: "Explorer",
    price: "Free",
    description: "Community platform access, event invites, and the newsletter.",
    benefits: ["Monthly salons", "Partner discounts", "Resource portal"],
  },
  {
    name: "Builder",
    price: "₦25k / quarter",
    description: "Hands-on Paty cohorts with mentorship and tooling credits.",
    benefits: ["Priority program slots", "Tooling stipends", "Mentor pairing"],
    highlighted: true,
  },
  {
    name: "Operator",
    price: "Custom",
    description: "For institutions backing Edo innovation at scale.",
    benefits: ["Dedicated success partner", "Quarterly impact reviews", "Co-branded activations"],
  },
];

const joiningBenefits = [
  "Hub access across Benin, Auchi, and remote pods",
  "Jobs + funding alerts curated weekly",
  "Accountability circles to ship your roadmap",
  "Community directory with verified skill tags",
];

const quotes = [
  {
    quote:
      "Joining Edo Tech unlocked a network of mentors who helped me launch a climate hardware startup in six months.",
    author: "Efe Osazuwa · Founder, SolGrid",
  },
  {
    quote:
      "The Builder tier paired our civic lab with product designers that understood government constraints.",
    author: "Mary Asemota · Policy Lead",
  },
];

export const metadata = {
  title: "Join Us",
  description:
    "HubSpot-powered onboarding with tiered benefits, FAQs, and social proof for the Edo Tech Community.",
};

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
      <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-primary/20 via-background to-background p-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-secondary">
              Join the guild
            </p>
            <h1 className="mt-4 font-heading text-4xl font-semibold">
              Membership built for futurists, founders, and civic operators
            </h1>
            <p className="mt-4 text-lg text-neutral-200">
              Pick a tier, complete the HubSpot form, and our membership stewards
              will guide you through orientation within 72 hours.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-neutral-300">
              {joiningBenefits.map((benefit) => (
                <span key={benefit} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
                  <CheckCircle2 className="size-4 text-secondary" />
                  {benefit}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 rounded-3xl border border-white/10 bg-black/40 p-6">
            {missionStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-semibold text-secondary">
                  <AnimatedCounter value={stat.value} />+
                </p>
                <p className="text-sm text-neutral-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionHeading
        eyebrow="Membership"
        title="Choose your tier"
        description="All members commit to the Edo Tech community code of conduct."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {membershipTiers.map((tier) => (
          <article
            key={tier.name}
            className={`rounded-3xl border p-6 ${tier.highlighted ? "border-secondary/60 bg-secondary/10 shadow-glow" : "border-white/10 bg-white/5"}`}
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-semibold">{tier.name}</h3>
              <span className="text-sm text-neutral-400">{tier.price}</span>
            </div>
            <p className="mt-2 text-sm text-neutral-300">{tier.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-200">
              {tier.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <Shield className="size-4 text-secondary" />
                  {benefit}
                </li>
              ))}
            </ul>
            <Button className="mt-6 w-full" variant={tier.highlighted ? "secondary" : "primary"}>
              Select {tier.name}
            </Button>
          </article>
        ))}
      </div>

      <SectionHeading
        eyebrow="Apply"
        title="Complete the HubSpot form"
        description="Secure embed with validation, success states, and privacy consent."
      />
      <div className="space-y-4 rounded-[32px] border border-white/10 bg-white/5 p-6">
        <HubspotForm />
        <p className="text-xs text-neutral-400">
          By submitting the form you agree to our{" "}
          <a href="/privacy" className="text-secondary underline">
            privacy policy
          </a>{" "}
          and consent to be contacted about Edo Tech programs.
        </p>
      </div>

      <SectionHeading
        eyebrow="Community voices"
        title="Social proof"
        description="Testimonials from members spanning founders to policy shapers."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {quotes.map((item) => (
          <blockquote
            key={item.author}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 text-neutral-200"
          >
            <Quote className="mb-4 size-6 text-secondary" />
            “{item.quote}”
            <footer className="mt-4 text-xs uppercase tracking-[0.3em] text-secondary/80">
              {item.author}
            </footer>
          </blockquote>
        ))}
      </div>

      <SectionHeading
        eyebrow="FAQ"
        title="Membership questions"
        description="Transparent answers before you request an invite."
      />
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="rounded-3xl border border-white/10 bg-white/5 p-4"
          >
            <summary className="cursor-pointer text-lg font-semibold text-white">
              {faq.question}
            </summary>
            <p className="mt-2 text-sm text-neutral-300">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}


