<h1 align="center">Edo Tech Community – Next.js 14 Experience</h1>

Modern, production-ready web experience for the Edo Tech Community. It blends a markdown-powered blog, HubSpot onboarding flow, Framer Motion animations, and Tailwind-driven futurist theming.

## ✨ Feature Highlights

- **App Router + TypeScript** on Next.js 16 (App Router) with strict mode.
- **Futurist UI system** using Tailwind CSS, custom palette, glassmorphism utilities, and reusable components (`Button`, `GlowCard`, `SectionHeading`).
- **Motion everywhere** powered by Framer Motion (`MotionProvider`, scroll/hover transitions, animated counters).
- **Markdown/MDX blog** sourced from `/content/blog/*.mdx` with gray-matter frontmatter, build-time generation, related posts, reading time, RSS feed, and SEO metadata.
- **Dynamic pages** for About, Teams, Programs (with filtering + calendar + gallery), Partners (tiered display + testimonial carousel), Resources (search/filter + submission form), and Join (HubSpot embed, tiers, FAQ, social proof).
- **HubSpot integration** via typed, client-side embed component with loading/error/missing states.
- **SEO toolkit** including structured data, sitemap, robots, per-page metadata, and Open Graph defaults.
- **Accessibility + performance** patterns: semantic layout, focus rings, optimized images, next/font, and lazy motion loading.

## 🗂️ Project Structure

```
/content/blog        → MDX posts with frontmatter
/src/app             → App Router routes (home, blog, teams, programs, partners, resources, join, etc.)
/src/components      → Reusable UI, layout, blog, resources, partner, and motion components
/src/data            → Type-safe content configuration (stats, programs, partners, resources, FAQs)
/src/lib             → Markdown utilities, helpers, site config
/styles/tailwind     → Tailwind theme config + global styles
```

## 🚀 Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
# open http://localhost:3000
```

Lint the project:

```bash
npm run lint
```

## ✍️ Publishing Content

- Add or edit blog posts inside `content/blog/*.mdx`. The filename becomes the slug. Frontmatter schema:

  ```yaml
  ---
  title: ""
  date: "2025-10-12"
  author: ""
  excerpt: ""
  coverImage: "https://"
  tags: ["ai", "community"]
  featured: true
  ---
  ```

- Inject custom MDX UI via components registered in `src/components/mdx/mdx-components.tsx` (e.g., `<Callout />`).
- Resources, FAQs, partners, and programs live in `src/data/site-data.ts`.

## 🔐 Environment Variables

Create a `.env.local` file and add:

```
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=xxxx
NEXT_PUBLIC_HUBSPOT_FORM_ID=xxxx
```

These enable the live HubSpot embed on the Join page; otherwise a helpful placeholder renders.

## 🚢 Deployment

- Target platform: **Vercel** with default Next.js build command (`next build`).
- Configure custom domain + SSL in Vercel.
- Optional: enable Vercel Analytics or drop in Google Analytics.

## ✅ QA Checklist

- [x] Lighthouse 90+ target (fast static builds, lazy motion, optimized images)
- [x] Accessibility (semantic HTML, focus states, aria labels, reduced-motion-friendly animations)
- [x] SEO (dynamic metadata, OG images, sitemap, RSS, structured data)
- [x] Content updates via Markdown/MDX and typed data files

Happy building for the Edo Tech Community! 🛰️
