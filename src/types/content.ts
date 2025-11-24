export type BlogFrontmatter = {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  slug: string;
  featured?: boolean;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  readingTime: string;
  content: React.ReactNode;
  related: BlogFrontmatter[];
};

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export type ValueCard = {
  title: string;
  description: string;
  icon: string;
};

export type TeamMember = {
  name: string;
  role: string;
  department: string;
  bio: string;
  photo?: string;
  socials: { platform: string; url: string }[];
};

export type Program = {
  title: string;
  category: string;
  description: string;
  nextEvent: string;
  cta: string;
};

export type Partner = {
  name: string;
  description: string;
  logo: string;
  focusArea?: string;
  testimonial?: { quote: string; author: string };
};

export type ResourceItem = {
  title: string;
  category: string;
  description: string;
  link: string;
  contributor?: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

