import { featuredLogos } from "@/data/site-data";
import Image from "next/image";

export function LogoCloud() {
  return (
    <div className="glass-panel relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-50" />
      <div className="relative z-10 grid grid-cols-2 gap-6 text-center md:grid-cols-3 lg:grid-cols-6">
        {featuredLogos.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center justify-center p-4 opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
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
  );
}

