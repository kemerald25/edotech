import { siteConfig } from "@/lib/utils";
import Link from "next/link";

const footerLinks = [
  {
    title: "Programs",
    items: [
      { label: "Programs overview", href: "/programs" },
      { label: "Paty residencies", href: "/programs" },
      { label: "Teams", href: "/teams" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Resource library", href: "/resources" },
      { label: "RSS feed", href: "/rss" },
    ],
  },
  {
    title: "Community",
    items: [
      { label: "About", href: "/about" },
      { label: "Partners", href: "/partners" },
      { label: "Join us", href: "/join" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:grid-cols-4">
        <div>
          <p className="text-lg font-heading text-gradient">Edo Tech Community</p>
          <p className="mt-3 text-sm text-neutral-400">{siteConfig.description}</p>
          <div className="mt-6 text-sm text-neutral-500">
            © {new Date().getFullYear()} Edo Tech Community
          </div>
        </div>
        {footerLinks.map((column) => (
          <div key={column.title}>
            <p className="text-sm uppercase tracking-widest text-neutral-400">{column.title}</p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-300">
              {column.items.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition hover:text-secondary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="text-sm uppercase tracking-widest text-neutral-400">
            Connect
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <Link href={siteConfig.socials.x} className="block text-neutral-300 transition hover:text-secondary">
              X / Twitter
            </Link>
            <Link href={siteConfig.socials.linkedin} className="block text-neutral-300 transition hover:text-secondary">
              LinkedIn
            </Link>
            <Link href={siteConfig.socials.github} className="block text-neutral-300 transition hover:text-secondary">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

