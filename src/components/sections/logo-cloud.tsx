import { featuredLogos } from "@/data/site-data";
import Image from "next/image";

const marqueeLogos = [...featuredLogos, ...featuredLogos];

export function LogoCloud() {
  return (
    <div className="glass-panel relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 opacity-70" />
      <div className="relative z-10 flex overflow-hidden">
        <div className="flex min-w-full items-center gap-10 whitespace-nowrap px-6 py-6 animate-logo-marquee">
          {marqueeLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex w-[140px] flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-glow"
            >
              <Image
                src={logo.image}
                alt={`${logo.name} logo`}
                width={120}
                height={60}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

