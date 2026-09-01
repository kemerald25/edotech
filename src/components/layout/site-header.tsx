"use client";

import { cn } from "@/lib/utils";
import { Menu, X, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/partners", label: "Partners" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
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

  // Hide public header on admin pages to provide full screen admin experience
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[80px] transition-all duration-300",
        scrolled
          ? "backdrop-blur-lg bg-background/80 border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[var(--header-height)] max-w-6xl items-center justify-between gap-6 px-6">
        <Link href="/" className="flex items-center gap-3 text-lg font-heading tracking-wide">
          <Image
            src="/images/logo-white.svg"
            alt="Edo Tech Community logo"
            width={40}
            height={40}
            className="w-full"
            priority
          />
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-neutral-200 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition hover:text-secondary",
                pathname === link.href && "text-secondary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-neutral-300 transition"
          >
            <Shield className="size-3 text-secondary" />
            <span>Admin</span>
          </Link>
          <Link
            href="/join"
            className="hidden md:block rounded-full bg-secondary px-5 py-2 text-sm font-bold text-background shadow-glow transition hover:-translate-y-0.5"
          >
            Join the Guild
          </Link>
          <button
            className="focus-ring rounded-full border border-white/10 p-2 lg:hidden"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <div
        className={cn(
          "lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
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
                  pathname === link.href && "bg-white/10 text-secondary"
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-neutral-300 hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              <Shield className="size-4 text-secondary" />
              <span>Admin Portal</span>
            </Link>
            <Link
              href="/join"
              className="rounded-2xl bg-secondary px-4 py-3 text-center font-bold text-background shadow-glow"
              onClick={() => setOpen(false)}
            >
              Join the Guild
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
