import { programs } from "@/data/site-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { EventCalendar } from "@/components/programs/event-calendar";
import { PastEventGallery } from "@/components/programs/past-event-gallery";
import { ProgramList } from "@/components/programs/program-list";

export const metadata = {
  title: "Programs & Paty",
  description:
    "Explore ongoing initiatives, calendar integrations, galleries, and registration pathways.",
};

export default function ProgramsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-10">
        <h1 className="font-heading text-4xl font-semibold">
          Programs, residencies, and Paty activations
        </h1>
        <p className="mt-4 text-lg text-neutral-300">
          Browse categories, highlight upcoming events, and relive past
          experiences through immersive galleries.
        </p>
      </section>

      <SectionHeading
        eyebrow="Categories"
        title="Choose your mission stream"
        description="Filter content by Product Studio, Talent, or Community initiatives."
      />
      <ProgramList items={programs} />

      <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <SectionHeading
            eyebrow="Calendar"
            title="Event calendar integration"
            description="Syncs with HubSpot + Google Calendar so community members never miss a sprint."
          />
          <EventCalendar />
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <SectionHeading
            eyebrow="Gallery"
            title="Past event gallery"
            description="Click tiles to open a lightbox view."
          />
          <PastEventGallery />
        </div>
      </section>
    </div>
  );
}

