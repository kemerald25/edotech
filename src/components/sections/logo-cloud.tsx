import { featuredLogos } from "@/data/site-data";
import Image from "next/image";

const marqueeLogos = [...featuredLogos, ...featuredLogos, ...featuredLogos];

export function LogoCloud() {
  return (
    <div className="relative overflow-hidden py-8">
      {/* Subtle fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex overflow-hidden">
        <div className="flex min-w-full items-center gap-12 whitespace-nowrap px-6 animate-logo-marquee">
          {marqueeLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex w-[140px] flex-shrink-0 items-center justify-center p-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-pointer"
            >
              <Image
                src={logo.image}
                alt={`${logo.name} logo`}
                width={120}
                height={50}
                className="h-9 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
