"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/teams", label: "Teams" },
  { href: "/programs", label: "Programs" },
  { href: "/partners", label: "Partners" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
  { href: "/join", label: "Join Us" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 h-[80px]",
        scrolled ? "backdrop-blur-lg bg-background/80 border-b border-white/10" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[var(--header-height)] max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-heading tracking-wide">
          <span className="text-gradient font-semibold">Edo Tech</span>
          <span className="text-neutral-400"> Community</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-200 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition hover:text-secondary",
                pathname === link.href && "text-secondary",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/join"
            className="rounded-full bg-secondary px-4 py-2 text-background shadow-glow transition hover:-translate-y-0.5"
          >
            Join the Network
          </Link>
        </nav>
        <button
          className="focus-ring rounded-full border border-white/10 p-2 lg:hidden"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      <div
        className={cn(
          "lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="mx-4 mb-4 rounded-3xl border border-white/10 bg-background/95 p-6 shadow-glass">
          <nav className="flex flex-col gap-4 text-base">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-xl px-3 py-2 transition hover:bg-white/5",
                  pathname === link.href && "bg-white/10 text-secondary",
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/join"
              className="rounded-2xl bg-secondary px-4 py-3 text-center font-semibold text-background shadow-glow"
              onClick={() => setOpen(false)}
            >
              Join the Network
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

