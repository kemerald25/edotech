import {
  FAQ,
  Partner,
  Program,
  ResourceItem,
  TeamMember,
  TimelineItem,
  ValueCard,
} from "@/types/content";

export const missionStats = [
  { label: "Active members", value: 2600 },
  { label: "Community projects", value: 84 },
  { label: "Partner orgs", value: 32 },
];

export const featuredLogos = [
  "Andela",
  "Flutterwave",
  "Ingressive",
  "Google",
  "GitHub",
  "AWS",
];

export const timeline: TimelineItem[] = [
  {
    year: "2018",
    title: "Community inception",
    description:
      "Started as a small meetup of ten technologists in Benin City.",
  },
  {
    year: "2020",
    title: "Regional expansion",
    description: "Scaled to four Edo municipalities with hybrid programming.",
  },
  {
    year: "2023",
    title: "Innovation labs",
    description:
      "Launched maker labs focused on AI, blockchain, and clean tech.",
  },
  {
    year: "2025",
    title: "Global partnerships",
    description: "Secured strategic alliances with top African tech orgs.",
  },
];

export const values: ValueCard[] = [
  {
    title: "Open Collaboration",
    description:
      "We build in the open and encourage knowledge sharing across cohorts.",
    icon: "Sparkles",
  },
  {
    title: "Inclusive Growth",
    description:
      "Diverse voices from every corner of Edo State inform our programs.",
    icon: "Users",
  },
  {
    title: "Futurist Thinking",
    description:
      "We experiment with frontier technologies to solve local challenges.",
    icon: "Layers",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Adaeze Uwa",
    role: "Community Director",
    department: "Leadership",
    bio: "Drives the long-term strategy and partnerships for Edo Tech.",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/in/adaeze" },
      { platform: "x", url: "https://x.com/adaeze" },
    ],
  },
  {
    name: "Imade Iyamu",
    role: "Programs Lead",
    department: "Programs",
    bio: "Architect of the Paty pipeline and flagship hackathons.",
    socials: [{ platform: "x", url: "https://x.com/imade" }],
  },
  {
    name: "Tobi Okoh",
    role: "Engineering Guild Captain",
    department: "Engineering",
    bio: "Mentors contributor teams and steward of OSS initiatives.",
    socials: [{ platform: "github", url: "https://github.com/tobiokoh" }],
  },
  {
    name: "Boma Okei",
    role: "Design Systems",
    department: "Design",
    bio: "Champions accessibility-first tooling and brand experiences.",
    socials: [{ platform: "linkedin", url: "https://linkedin.com/in/bomaokei" }],
  },
];

export const programs: Program[] = [
  {
    title: "Paty Innovation Sprints",
    category: "Product Studio",
    description:
      "Rapid prototyping cycles pairing designers, engineers, and researchers to tackle civic briefs.",
    nextEvent: "Dec 12, 2025",
    cta: "/join",
  },
  {
    title: "FutureCraft Fellowship",
    category: "Talent",
    description:
      "12-week cohort focusing on AI safety, clean energy systems, and inclusive fintech.",
    nextEvent: "Jan 20, 2026",
    cta: "/join",
  },
  {
    title: "Open Source Commons",
    category: "Community",
    description:
      "Ongoing contribution drive to Edo-first OSS stacks with mentorship.",
    nextEvent: "Weekly sync",
    cta: "/resources",
  },
];

export const upcomingEvents = [
  {
    date: "2025-12-12",
    title: "Paty Innovation Sprint",
    location: "Benin City",
  },
  {
    date: "2026-01-20",
    title: "FutureCraft Fellowship Kickoff",
    location: "Remote + Hub",
  },
  {
    date: "2026-02-10",
    title: "Open Source Commons Demo Day",
    location: "Hybrid",
  },
];

export const pastEventGallery = [
  {
    title: "Grid Festival 2025",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Civic Data Jam",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Edo XR Residency",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
  },
];

export const partners: Partner[] = [
  {
    name: "Nebula Capital",
    tier: "platinum",
    description: "Catalyzing Edo founders through grants and venture support.",
    logo: "/logos/nebula.svg",
    testimonial: {
      quote:
        "Edo Tech Community has become the launchpad for frontier founders in West Africa.",
      author: "Zara Sule, Partner",
    },
  },
  {
    name: "SunCity Power",
    tier: "gold",
    description: "Powering eco-friendly labs and clean energy research.",
    logo: "/logos/suncity.svg",
  },
  {
    name: "NigerHub",
    tier: "silver",
    description: "Regional devrel partner for cloud-native upskilling.",
    logo: "/logos/nigerhub.svg",
  },
];

export const resources: ResourceItem[] = [
  {
    title: "Edo Tech Onboarding Kit",
    category: "Docs",
    description: "Everything you need to participate in our programs.",
    link: "/files/edo-onboarding.pdf",
  },
  {
    title: "GreenCity Dataset",
    category: "Data",
    description: "Open datasets for sustainability hackathons.",
    link: "https://data.edotech.community",
    contributor: "Civic Lab",
  },
  {
    title: "Paty Playbook",
    category: "Tutorial",
    description: "Step-by-step guide to running a Paty initiative.",
    link: "/files/paty-playbook.pdf",
  },
];

export const faqs: FAQ[] = [
  {
    question: "Who can join the Edo Tech Community?",
    answer:
      "Builders, designers, researchers, founders, policy shapers, and supporters who care about the Edo innovation ecosystem.",
  },
  {
    question: "Is membership free?",
    answer:
      "Core membership is free. Specialist tracks (like the Fellowship) may require sponsorship or co-investment.",
  },
  {
    question: "How are blog posts published?",
    answer:
      "Drop a markdown or MDX file into /content/blog, push to main, and Vercel rebuilds automatically.",
  },
];

