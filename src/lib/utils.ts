import clsx, { ClassValue } from "clsx";
import readingTime from "reading-time";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, locale = "en-NG") {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getReadingTime(text: string) {
  return readingTime(text).text;
}

export function chunkArray<T>(list: T[], size: number) {
  const chunks: T[][] = [];
  for (let i = 0; i < list.length; i += size) {
    chunks.push(list.slice(i, i + size));
  }
  return chunks;
}

export const siteConfig = {
  name: "Edo Tech Community",
  description:
    "A futuristic hub for Edo State technologists to learn, build, and grow together.",
  url: "https://edotech.community",
  ogImage: "/opengraph-image.svg",
  socials: {
    x: "https://x.com/edotech",
    github: "https://github.com/edotech",
    linkedin: "https://www.linkedin.com/company/edo-tech-community",
  },
};

