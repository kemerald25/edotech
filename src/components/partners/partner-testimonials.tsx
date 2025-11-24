"use client";

import { Partner } from "@/types/content";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Quote } from "lucide-react";

type Props = {
  partners: Partner[];
};

export function PartnerTestimonials({ partners }: Props) {
  const testimonials = useMemo(
    () => partners.filter((partner) => partner.testimonial),
    [partners],
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % testimonials.length),
      6000,
    );
    return () => clearInterval(id);
  }, [testimonials]);

  if (testimonials.length === 0) {
    return null;
  }

  const active = testimonials[index]!;

  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
      <div className="mb-4 flex items-center gap-3 text-secondary">
        <Quote className="size-5" />
        <p className="text-xs uppercase tracking-[0.35em]">Partner voices</p>
      </div>
      <AnimatePresence mode="wait">
        <m.blockquote
          key={active.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-lg text-neutral-100"
        >
          “{active.testimonial?.quote}”
          <footer className="mt-4 text-xs uppercase tracking-[0.3em] text-secondary/80">
            {active.testimonial?.author}
          </footer>
        </m.blockquote>
      </AnimatePresence>
      <div className="mt-6 flex gap-2">
        {testimonials.map((partner, partnerIndex) => (
          <button
            key={partner.name}
            onClick={() => setIndex(partnerIndex)}
            aria-label={`Show testimonial from ${partner.name}`}
            className={`h-1 flex-1 rounded-full transition ${
              index === partnerIndex ? "bg-secondary" : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


