"use client";

import { siteConfig } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const footerLinks = [
  {
    title: "Programs",
    items: [
      { label: "Programs overview", href: "/programs" },
      { label: "Paty residencies", href: "/programs" },
      { label: "About team", href: "/about" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Community Blog", href: "/blog" },
      { label: "Resource library", href: "/resources" },
      { label: "RSS feed", href: "/rss" },
    ],
  },
  {
    title: "Community",
    items: [
      { label: "About & Vision", href: "/about" },
      { label: "Ecosystem Partners", href: "/partners" },
      { label: "Join the Community", href: "/join" },
    ],
  },
];

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-3 text-lg font-heading tracking-wide w-[150px]">
            <Image
              src="/images/logo-white.svg"
              alt="Edo Tech Community logo"
              width={40}
              height={40}
              className="w-full"
              priority
            />
          </Link>
          <p className="mt-3 text-sm text-neutral-400">{siteConfig.description}</p>
          <div className="mt-6 text-sm text-neutral-500">
            © {new Date().getFullYear()} Edo Tech Community
          </div>
        </div>
        {footerLinks.map((column) => (
          <div key={column.title}>
            <p className="text-sm uppercase tracking-widest text-neutral-400 font-semibold">{column.title}</p>
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
          <p className="text-sm uppercase tracking-widest text-neutral-400 font-semibold">
            Connect
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <Link href={siteConfig.socials.x} target="_blank" className="block text-neutral-300 transition hover:text-secondary">
              X / Twitter
            </Link>
            <Link href={siteConfig.socials.linkedin} target="_blank" className="block text-neutral-300 transition hover:text-secondary">
              LinkedIn
            </Link>
            <Link href={siteConfig.socials.github} target="_blank" className="block text-neutral-300 transition hover:text-secondary">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
