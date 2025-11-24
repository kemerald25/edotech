"use client";

import { pastEventGallery } from "@/data/site-data";
import Image from "next/image";
import { useState } from "react";

export function PastEventGallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {pastEventGallery.map((event, index) => (
        <button
          key={event.title}
          onClick={() => setActive(index)}
          className="group relative overflow-hidden rounded-3xl border border-white/10"
        >
          <Image
            src={event.image}
            alt={event.title}
            width={400}
            height={280}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent text-left">
            <p className="absolute bottom-4 left-4 text-lg font-semibold text-white">
              {event.title}
            </p>
          </div>
        </button>
      ))}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setActive(null)}
        >
          <div className="max-w-3xl">
            <Image
              src={pastEventGallery[active].image}
              alt={pastEventGallery[active].title}
              width={900}
              height={600}
              className="rounded-3xl border border-white/10"
            />
            <p className="mt-4 text-center text-lg font-semibold">
              {pastEventGallery[active].title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

