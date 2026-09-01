import { CustomRegistrationForm } from "@/components/forms/custom-registration-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { Quote, Sparkles, Shield, Building, Award, Users } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Join Us | Edo Tech Community",
  description:
    "Free membership onboarding, social proof, and community benefits for the Edo Tech Community.",
};

const memberTestimonials = [
  {
    quote:
      "Joining Edo Tech unlocked a network of hardware mentors that helped us build and launch our clean energy startup in six months.",
    author: "Efe Osazuwa",
    role: "Founder, SolGrid Systems",
    hub: "Benin City Hub",
    avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=400&q=80",
    bgImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    quote:
      "The Paty Civic Lab paired our municipal team with product engineers who understood public sector constraints and built fast telemetry pilots.",
    author: "Mary Asemota",
    role: "Civic Policy Lead",
    hub: "Benin City Hub",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
];

const joiningBenefits = [
  {
    title: "Hub & Co-Working Access",
    description: "Work, build, and collaborate from verified tech hubs across Benin City, Auchi, and remote pods.",
    icon: Building,
  },
  {
    title: "Weekly Curated Alerts",
    description: "Receive priority notifications for verified jobs, grants, hackathons, and venture capital funding.",
    icon: Award,
  },
  {
    title: "Accountability Build Circles",
    description: "Join weekly sprint circles with senior peers to keep your product roadmap shipping on time.",
    icon: Users,
  },
  {
    title: "Verified Guild Directory",
    description: "Showcase your portfolio, skill tags, and open-source contributions to regional and global recruiters.",
    icon: Shield,
  },
];

const faqs = [
  {
    question: "Is membership really 100% free?",
    answer: "Yes, membership is completely free. We have no membership dues, fees, or hidden tiers.",
  },
  {
    question: "What happens after I submit the form?",
    answer: "Your application is processed and synced with our community team. You will receive an invitation to our Discord guild and orientation within 72 hours.",
  },
  {
    question: "Who can join the Edo Tech Community?",
    answer: "Engineers, product designers, researchers, founders, students, and tech enthusiasts based in Edo State or the diaspora.",
  },
  {
    question: "Can I participate remotely if I am outside Benin City?",
    answer: "Yes! All our Paty sprints, community demo days, and accountability circles have hybrid and virtual tracks.",
  },
];

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-24 md:space-y-32 px-6 py-12 md:py-20">
      {/* 1. HERO HEADER */}
      <section className="relative pt-6 max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
          <Sparkles className="size-3.5" />
          <span>Membership Onboarding</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
          Join a guild of builders shaping Edo&apos;s digital future.
        </h1>

        <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed">
          Connect with over 2,600 technologists, founders, and civic innovators. Gain access to physical hubs, mentorship circles, and curated funding opportunities.
        </p>
      </section>

      {/* 2. STEP 1: SOCIAL PROOF & TESTIMONIALS (With Visual Cards) */}
      <section className="space-y-8">
        <SectionHeading
          eyebrow="Community Voices"
          title="Built with and for technologists"
          description="Hear from community members who have launched startups and civic labs through the guild."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {memberTestimonials.map((item) => (
            <div
              key={item.author}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-black/40 p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-2xl transition hover:border-secondary/40"
            >
              {/* Background ambient image overlay */}
              <div className="absolute inset-0 opacity-15 transition-opacity duration-500 group-hover:opacity-25">
                <Image src={item.bgImage} alt="" fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E17] via-[#0B0E17]/80 to-transparent" />

              <div className="relative z-10 space-y-4">
                <Quote className="size-8 text-secondary/70" />
                <p className="text-base sm:text-lg italic text-neutral-200 leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="size-12 rounded-full overflow-hidden border border-secondary/40 relative">
                  <Image src={item.avatar} alt={item.author} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-heading">{item.author}</h4>
                  <p className="text-xs text-secondary font-medium">{item.role}</p>
                  <p className="text-[11px] text-neutral-400">{item.hub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. STEP 2: NATIVE CUSTOM REGISTRATION FORM */}
      <section className="space-y-6">
        <CustomRegistrationForm />
      </section>

      {/* 4. STEP 3: DETAILED CONTENT & BENEFITS */}
      <section className="space-y-12">
        <SectionHeading
          eyebrow="Perks & Access"
          title="What every member unlocks"
          description="One guild, shared benefits. Here is how we support your journey as a builder."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {joiningBenefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-4 transition hover:-translate-y-1 hover:border-secondary/50 shadow-lg flex flex-col justify-between"
              >
                <div className="size-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <Icon className="size-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white font-heading">{benefit.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. STEP 4: INTERACTIVE FAQS */}
      <section className="space-y-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Clear answers before you complete your membership application."
        />

        <div className="space-y-4 max-w-4xl">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-white text-base sm:text-lg">
                {faq.question}
                <span className="ml-4 text-secondary group-open:rotate-180 transition-transform font-mono text-sm">
                  ↓
                </span>
              </summary>
              <p className="mt-4 text-sm text-neutral-300 leading-relaxed pt-2 border-t border-white/5">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
