import { HubspotForm } from "@/components/forms/hubspot-form";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

const joiningBenefits = [
  "Hub access across Benin, Auchi, and remote pods",
  "Weekly curated jobs, grants, and funding alerts",
  "Accountability circles to ship your tech roadmap",
  "Verified builder directory & community perks",
];

const faqs = [
  {
    question: "Is membership free?",
    answer: "Yes, membership is 100% free with no hidden fees or tiers.",
  },
  {
    question: "What happens after I apply?",
    answer: "Our membership team will review your application and send your orientation details within 72 hours.",
  },
  {
    question: "Who can join?",
    answer: "Founders, developers, designers, students, civic leaders, and tech enthusiasts in Edo State or the diaspora.",
  },
];

export const metadata = {
  title: "Join Us | Edo Tech Community",
  description:
    "Join the Edo Tech Community. Connect with tech builders, access hubs, and discover funding opportunities.",
};

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:py-20 space-y-16">
      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1 text-xs font-medium text-secondary">
          <Sparkles className="size-3.5" />
          <span>Free Membership</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Join the Edo Tech Community
        </h1>
        <p className="text-lg text-neutral-300 leading-relaxed">
          Connect with developers, founders, and innovators shaping Edo State&apos;s tech ecosystem.
          Gain instant access to hubs, mentorship, and opportunities.
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Benefits & FAQs */}
        <div className="lg:col-span-6 space-y-10">
          {/* Key Benefits */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Why join us?</h2>
            <ul className="space-y-3">
              {joiningBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-neutral-200">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-secondary" />
                  <span className="text-sm sm:text-base">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Proof Quote */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 relative">
            <p className="text-sm italic text-neutral-300 leading-relaxed">
              &ldquo;Joining Edo Tech unlocked a network of mentors and partners that helped us launch our hardware startup in six months.&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="size-8 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-xs text-secondary">
                EO
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Efe Osazuwa</p>
                <p className="text-[11px] text-neutral-400">Founder, SolGrid</p>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-lg font-semibold text-white">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-white/10 bg-white/5 p-4 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-medium text-white text-sm">
                    {faq.question}
                    <span className="ml-2 text-neutral-400 group-open:rotate-180 transition-transform">
                      ↓
                    </span>
                  </summary>
                  <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: HubSpot Form Card */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-sm p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white font-heading">Complete Registration</h2>
              <p className="text-xs text-neutral-400">Fill in your details below to get started.</p>
            </div>

            <HubspotForm />

            <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="size-4 text-secondary shrink-0" />
              <span>100% free • No spam • Privacy protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



