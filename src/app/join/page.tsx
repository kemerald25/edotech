import { CustomRegistrationForm } from "@/components/forms/custom-registration-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { Sparkles, Shield, Building, Award, Users } from "lucide-react";

export const metadata = {
  title: "Join Us | Edo Tech Community",
  description:
    "Free membership onboarding and instant WhatsApp community access for Edo State technologists.",
};

/*
// Testimonials commented out until real responses are collected
const memberTestimonials = [
  {
    quote:
      "Joining Edo Tech unlocked a network of hardware mentors that helped us launch our clean energy startup in six months.",
    author: "Efe Osazuwa",
    role: "Founder, SolGrid Systems",
    hub: "Benin City",
    avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "The Paty Civic Lab paired our team with product engineers who understood public sector constraints and shipped fast pilots.",
    author: "Mary Asemota",
    role: "Civic Policy Lead",
    hub: "Benin City",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
];
*/

const joiningBenefits = [
  {
    title: "Hub & Co-Working Access",
    description: "Work and collaborate from verified tech hubs across Benin City, Auchi, and regional pods.",
    icon: Building,
  },
  {
    title: "Weekly Curated Alerts",
    description: "Priority notifications for verified jobs, grants, hackathons, and venture capital funding.",
    icon: Award,
  },
  {
    title: "Accountability Build Circles",
    description: "Join weekly sprint circles with peers to keep your product roadmap shipping on time.",
    icon: Users,
  },
  {
    title: "Verified Member Directory",
    description: "Showcase your portfolio and open-source contributions to recruiters and partners.",
    icon: Shield,
  },
];

const faqs = [
  {
    question: "Is membership really 100% free?",
    answer: "Yes, membership is completely free. We have no membership dues, fees, or hidden tiers.",
  },
  {
    question: "What happens after I apply?",
    answer: "You get instant access to the Edo Tech WhatsApp community immediately upon submitting your details!",
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
    <div className="mx-auto max-w-5xl space-y-12 sm:space-y-16 px-4 sm:px-6 py-8 sm:py-12">
      {/* 1. HERO HEADER */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          <Sparkles className="size-3.5" />
          <span>Membership Onboarding</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          Join the Edo Tech Community
        </h1>

        <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Connect with 2,600+ technologists, founders, and innovators. Fill in your details below to gain instant access to the active WhatsApp community.
        </p>
      </section>

      {/* 2. TESTIMONIALS (COMMENTED OUT TEMPORARILY) */}
      {/* 
      <section className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
        {memberTestimonials.map((item) => (
          <div
            key={item.author}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 flex flex-col justify-between space-y-3 transition hover:border-secondary/30"
          >
            <div className="flex items-start gap-2.5">
              <Quote className="size-4 text-secondary shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-white/5">
              <div className="size-8 rounded-full overflow-hidden border border-secondary/40 relative shrink-0">
                <Image src={item.avatar} alt={item.author} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{item.author}</h4>
                <p className="text-[11px] text-secondary truncate">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
      */}

      {/* 3. NATIVE REGISTRATION FORM */}
      <section className="max-w-3xl mx-auto">
        <CustomRegistrationForm />
      </section>

      {/* 4. PERKS & BENEFITS */}
      <section className="space-y-8 pt-6 border-t border-white/10">
        <SectionHeading
          eyebrow="Perks & Access"
          title="What every member unlocks"
          description="One community, shared benefits. Here is how we support your journey as a builder."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {joiningBenefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3 transition hover:border-secondary/40 shadow-sm flex flex-col justify-between"
              >
                <div className="size-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <Icon className="size-4.5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white font-heading">{benefit.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FAQs */}
      <section className="space-y-8">
        <SectionHeading
          eyebrow="FAQs"
          title="Frequently asked questions"
          description="Got questions before joining? Here is everything you need to know."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-2"
            >
              <h3 className="text-sm font-bold text-white font-heading">{faq.question}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
