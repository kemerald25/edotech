"use client";

import { useState, useEffect } from "react";
import { programs } from "@/data/site-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { EventCalendar } from "@/components/programs/event-calendar";
import { PastEventGallery } from "@/components/programs/past-event-gallery";
import { EventRegistrationModal } from "@/components/programs/event-registration-modal";
import { getAllEvents, PlatformEvent } from "@/lib/data-store";
import { Calendar, MapPin, Sparkles, ArrowRight, Video, Users } from "lucide-react";
import Image from "next/image";

export default function ProgramsPage() {
  const [events, setEvents] = useState<PlatformEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<PlatformEvent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setEvents(getAllEvents());
  }, []);

  const handleRegisterClick = (evt: PlatformEvent) => {
    setSelectedEvent(evt);
    setModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-24 md:space-y-32 px-6 py-12 md:py-20">
      {/* 1. HERO HEADER */}
      <section className="relative pt-6 max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
          <Sparkles className="size-3.5" />
          <span>Programs & Sprints</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
          Activations, residencies, and Paty product studios.
        </h1>

        <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed">
          Explore upcoming innovation sprints, fellowship cohorts, and open-source contribution days hosted across Edo State hubs.
        </p>
      </section>

      {/* 2. UPCOMING SELF-HOSTED EVENTS */}
      <section className="space-y-12">
        <SectionHeading
          eyebrow="Upcoming Sessions"
          title="Self-hosted events calendar"
          description="Register for upcoming sessions with instant RSVP and calendar invites."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="group rounded-3xl border border-white/10 bg-white/5 overflow-hidden flex flex-col justify-between transition hover:-translate-y-1 hover:border-secondary/50 shadow-xl"
            >
              <div className="space-y-4">
                <div className="relative aspect-16/9 overflow-hidden">
                  <Image
                    src={evt.bannerUrl}
                    alt={evt.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-black bg-secondary px-2.5 py-1 rounded-full shadow-md">
                      {evt.category}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
                      {evt.locationType}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-secondary font-semibold">
                    <Calendar className="size-3.5" />
                    <span>{new Date(evt.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-heading line-clamp-2">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="pt-2 text-xs text-neutral-400 flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-secondary shrink-0" />
                    <span className="truncate">{evt.venueName}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between mt-4">
                <span className="text-xs text-neutral-400">
                  <strong className="text-white">{evt.registeredCount}</strong> RSVPs
                </span>

                <button
                  onClick={() => handleRegisterClick(evt)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/90 text-xs font-bold text-black transition cursor-pointer shadow-md"
                >
                  <span>Register</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CALENDAR & PAST HIGHLIGHTS */}
      <section className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6 rounded-[32px] border border-white/10 bg-white/5 p-8">
          <SectionHeading
            eyebrow="Calendar Integration"
            title="Community schedule"
            description="Syncs across Google Calendar and HubSpot so you never miss a sprint."
          />
          <EventCalendar />
        </div>

        <div className="lg:col-span-5 rounded-[32px] border border-white/10 bg-white/5 p-8 space-y-6">
          <SectionHeading
            eyebrow="Gallery"
            title="Past activations"
            description="Moments from our previous hackathons and maker residencies."
          />
          <PastEventGallery />
        </div>
      </section>

      {/* Registration Modal */}
      {selectedEvent && (
        <EventRegistrationModal
          event={selectedEvent}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
