import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MotionProvider } from "@/components/providers";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edotech.community"),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.svg`,
  sameAs: Object.values(siteConfig.socials),
  description: siteConfig.description,
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Paty Innovation Sprint",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  startDate: "2025-12-12T09:00:00+01:00",
  endDate: "2025-12-12T17:00:00+01:00",
  location: {
    "@type": "Place",
    name: "Edo Innovation Hub",
    address: "Benin City, Nigeria",
  },
  organizer: organizationJsonLd,
  image: [`${siteConfig.url}/opengraph-image.png`],
  description:
    "A day-long product studio where Edo technologists collaborate with civic partners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${space.variable} ${jetBrains.variable} bg-background text-white antialiased`}
      >
        <SiteHeader />
        <MotionProvider>
          <main className="relative min-h-screen overflow-hidden bg-background pt-[var(--header-height)]">
            <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:160px_160px] opacity-20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(108,36,201,0.3),_transparent_45%)]" />
            <div className="relative z-10">{children}</div>
          </main>
          <SiteFooter />
        </MotionProvider>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, eventJsonLd]),
          }}
        />
      </body>
    </html>
  );
}
