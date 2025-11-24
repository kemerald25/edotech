import { featuredLogos } from "@/data/site-data";

export function LogoCloud() {
  return (
    <div className="glass-panel relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-50" />
      <div className="relative z-10 grid grid-cols-2 gap-6 text-center text-sm uppercase tracking-[0.3em] text-neutral-400 md:grid-cols-3 lg:grid-cols-6">
        {featuredLogos.map((logo) => (
          <div key={logo} className="animate-[float_8s_ease-in-out_infinite]">
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}

