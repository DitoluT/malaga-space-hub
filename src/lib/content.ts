import matter from "gray-matter";

export type Locale = "es" | "en";

export interface MemberData {
  slug: string;
  name: string;
  role: string;
  area?: string;
  photo?: string;
  linkedin?: string;
  order: number;
  featured: boolean;
  bio?: string;
}

export interface SponsorData {
  slug: string;
  name: string;
  logo?: string;
  url?: string;
  tier: "platinum" | "gold" | "silver" | "bronze";
  description: string;
  order: number;
}

export interface SubsystemData {
  slug: string;
  icon: string;
  order: number;
  title: string;
  short: string;
  lead: string;
  body: string;
}

export interface PhaseData {
  slug: string;
  order: number;
  year: string;
  status: "completed" | "in-progress" | "upcoming";
  title: string;
  desc: string;
}

export interface GalleryItem {
  slug: string;
  image?: string;
  video?: string;
  caption: string;
  category: "cubesat" | "events" | "team";
  date: string;
  order: number;
}

export interface SiteCopy {
  nav: Record<string, string>;
  join: string;
  hero: {
    tagline: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  stats: Record<string, string>;
  mission: {
    eyebrow: string;
    title: string;
    pillars: { title: string; desc: string }[];
  };
  timeline: { eyebrow: string; title: string };
  subsystemsSection: { eyebrow: string; title: string; cta: string };
  teamSection: { eyebrow: string; title: string; cta: string };
  sponsorsSection: { eyebrow: string; title: string; cta: string };
  gallerySection: {
    eyebrow: string;
    title: string;
    cta: string;
    filters: { all: string; cubesat: string; events: string; team: string };
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    emailLabel: string;
    email: string;
    locationLabel: string;
    location: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
  };
  phaseStatus: { completed: string; "in-progress": string; upcoming: string };
  footer: { rights: string; builtBy: string };
  seo: Record<string, string>;
}

// Eager-load all markdown as raw strings (works in SSR + client)
const siteFiles = import.meta.glob("/content/site/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const memberFiles = import.meta.glob("/content/members/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const sponsorFiles = import.meta.glob("/content/sponsors/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const subsystemFiles = import.meta.glob("/content/subsystems/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const phaseFiles = import.meta.glob("/content/phases/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const galleryFiles = import.meta.glob("/content/gallery/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? "";
  return file.replace(/\.md$/, "");
}

function pick<T = string>(
  data: Record<string, unknown>,
  base: string,
  locale: Locale,
  fallback: T = "" as unknown as T,
): T {
  const localized = data[`${base}_${locale}`];
  if (localized !== undefined && localized !== null && localized !== "")
    return localized as T;
  const other = data[`${base}_${locale === "es" ? "en" : "es"}`];
  if (other !== undefined && other !== null && other !== "") return other as T;
  const plain = data[base];
  if (plain !== undefined && plain !== null) return plain as T;
  return fallback;
}

export function getSiteCopy(locale: Locale): SiteCopy {
  const path = `/content/site/${locale}.md`;
  const raw = siteFiles[path];
  if (!raw) throw new Error(`Missing site copy for locale ${locale}`);
  const { data } = matter(raw);
  return data as SiteCopy;
}

export function getMembers(locale: Locale): MemberData[] {
  return Object.entries(memberFiles)
    .map(([path, raw]) => {
      const { data, content } = matter(raw);
      return {
        slug: slugFromPath(path),
        name: data.name ?? "",
        role: pick<string>(data, "role", locale),
        area: data.area,
        photo: data.photo,
        linkedin: data.linkedin,
        order: data.order ?? 999,
        featured: !!data.featured,
        bio: pick<string>(data, "bio", locale, content.trim()),
      } satisfies MemberData;
    })
    .sort((a, b) => a.order - b.order);
}

export function getSponsors(locale: Locale): SponsorData[] {
  return Object.entries(sponsorFiles)
    .map(([path, raw]) => {
      const { data } = matter(raw);
      return {
        slug: slugFromPath(path),
        name: data.name ?? "",
        logo: data.logo,
        url: data.url,
        tier: (data.tier ?? "silver") as SponsorData["tier"],
        description: pick<string>(data, "description", locale),
        order: data.order ?? 999,
      } satisfies SponsorData;
    })
    .sort((a, b) => a.order - b.order);
}

export function getSubsystems(locale: Locale): SubsystemData[] {
  return Object.entries(subsystemFiles)
    .map(([path, raw]) => {
      const { data, content } = matter(raw);
      // Split body by ---LANG-EN--- marker
      const parts = content.split(/^---LANG-EN---$/m);
      const bodyEs = (parts[0] ?? "").trim();
      const bodyEn = (parts[1] ?? parts[0] ?? "").trim();
      return {
        slug: data.slug ?? slugFromPath(path),
        icon: data.icon ?? "Satellite",
        order: data.order ?? 999,
        title: pick<string>(data, "title", locale),
        short: pick<string>(data, "short", locale),
        lead: pick<string>(data, "lead", locale),
        body: locale === "en" ? bodyEn : bodyEs,
      } satisfies SubsystemData;
    })
    .sort((a, b) => a.order - b.order);
}

export function getSubsystem(
  slug: string,
  locale: Locale,
): SubsystemData | undefined {
  return getSubsystems(locale).find((s) => s.slug === slug);
}

export function getPhases(locale: Locale): PhaseData[] {
  return Object.entries(phaseFiles)
    .map(([path, raw]) => {
      const { data } = matter(raw);
      return {
        slug: slugFromPath(path),
        order: data.order ?? 999,
        year: String(data.year ?? ""),
        status: (data.status ?? "upcoming") as PhaseData["status"],
        title: pick<string>(data, "title", locale),
        desc: pick<string>(data, "desc", locale),
      } satisfies PhaseData;
    })
    .sort((a, b) => a.order - b.order);
}

export function getGallery(locale: Locale): GalleryItem[] {
  return Object.entries(galleryFiles)
    .map(([path, raw]) => {
      const { data } = matter(raw);
      return {
        slug: slugFromPath(path),
        image: data.image,
        video: data.video,
        caption: pick<string>(data, "caption", locale),
        category: (data.category ?? "cubesat") as GalleryItem["category"],
        date: String(data.date ?? ""),
        order: data.order ?? 999,
      } satisfies GalleryItem;
    })
    .sort((a, b) => a.order - b.order);
}
