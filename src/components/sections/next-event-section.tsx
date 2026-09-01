"use client";

import { useState } from "react";
import { PlatformEvent } from "@/lib/data-store";
import { EventRegistrationModal } from "@/components/programs/event-registration-modal";
import { Calendar, MapPin, Sparkles, ArrowRight, Users, Video } from "lucide-react";
import Image from "next/image";

interface NextEventSectionProps {
  event?: PlatformEvent;
}

export function NextEventSection({ event }: NextEventSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  // Fallback default flagship event if none passed
  const activeEvent: PlatformEvent = event || {
    id: "evt-flagship",
    title: "Paty Innovation Sprint: Civic AI & Smart Transit",
    slug: "paty-innovation-sprint-civic-ai",
    description:
      "A high-velocity co-creation weekend where engineers, product designers, and civic operators prototype autonomous transit telemetry and public dashboard systems for Edo State.",
    category: "Product Studio",
    date: "2026-10-18T09:00:00Z",
    locationType: "hybrid",
    venueName: "Edo Innovation Hub (Main Auditorium)",
    address: "Benin City, Edo State",
    virtualLink: "https://meet.edotech.community",
    bannerUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    capacity: 200,
    registeredCount: 84,
    status: "published",
    featured: true,
    createdAt: "2026-08-01T00:00:00Z",
  };

  const eventDate = new Date(activeEvent.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-primary/25 via-background to-[#0B0E17] p-8 sm:p-12 lg:p-16 shadow-2xl">
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-secondary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 size-96 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Event Details & Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1 text-xs font-bold text-secondary tracking-wide uppercase">
                <Sparkles className="size-3.5" />
                <span>Next Upcoming Event</span>
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                {activeEvent.category} · {activeEvent.locationType}
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {activeEvent.title}
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              {activeEvent.description}
            </p>

            {/* Event Key Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm">
                <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary shrink-0">
                  <Calendar className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 font-medium">Date & Time</p>
                  <p className="text-sm font-bold text-white mt-0.5">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm">
                <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary shrink-0">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 font-medium">Venue Location</p>
                  <p className="text-sm font-bold text-white mt-0.5">{activeEvent.venueName}</p>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-3 rounded-2xl bg-secondary hover:bg-secondary/90 px-8 py-4 text-sm font-bold text-black shadow-xl shadow-secondary/15 transition hover:scale-[1.02] cursor-pointer"
              >
                <span>Register for Event</span>
                <ArrowRight className="size-4.5 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="size-2 rounded-full bg-green-400 animate-ping" />
                <span>
                  <strong className="text-white">{activeEvent.registeredCount} RSVPs</strong> registered · 100% Free
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Graphic Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src={activeEvent.bannerUrl}
                alt={activeEvent.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-secondary font-bold">Registration Mode</p>
                  <p className="text-xs font-bold text-white">Live RSVP Open</p>
                </div>
                <span className="text-xs text-neutral-300 font-medium">
                  {activeEvent.capacity - activeEvent.registeredCount} spots remaining
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      <EventRegistrationModal
        event={activeEvent}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
