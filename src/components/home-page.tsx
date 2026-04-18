import { Link } from "@tanstack/react-router";
import { ArrowRight, Rocket, Users, CheckCircle2, Clock, Circle, ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SubsystemIcon } from "@/components/subsystem-icon";
import {
  type Locale,
  type SiteCopy,
  type MemberData,
  type SponsorData,
  type SubsystemData,
  type PhaseData,
  type GalleryItem,
} from "@/lib/content";
import { routes } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface Props {
  locale: Locale;
  copy: SiteCopy;
  members: MemberData[];
  sponsors: SponsorData[];
  subsystems: SubsystemData[];
  phases: PhaseData[];
  gallery: GalleryItem[];
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-primary">
      {children}
    </span>
  );
}

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-10 text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span className="font-display text-2xl font-bold text-primary-foreground">
      {initials}
    </span>
  );
}

const statusIcon = {
  completed: CheckCircle2,
  "in-progress": Clock,
  upcoming: Circle,
} as const;

const statusColor = {
  completed: "text-success border-success/40 bg-success/10",
  "in-progress": "text-primary border-primary/50 bg-primary/10",
  upcoming: "text-muted-foreground border-border bg-muted/30",
} as const;

export function HomePage({
  locale,
  copy,
  members,
  sponsors,
  subsystems,
  phases,
  gallery,
}: Props) {
  const r = routes(locale);
  const featuredMembers = members.filter((m) => m.featured).slice(0, 4);
  const galleryPreview = gallery.slice(0, 6);

  const stats = [
    { value: members.length, label: copy.stats.members },
    { value: subsystems.length, label: copy.stats.subsystems },
    { value: 2023, label: copy.stats.founded },
    { value: 6, label: copy.stats.areas },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="starfield" aria-hidden />
      <SiteHeader locale={locale} copy={copy} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-page py-20 md:py-32 text-center">
          <div className="float-slow inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.3em] text-primary">
            <Rocket className="h-3.5 w-3.5" />
            CubeSat 1U · UMA
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-gradient glow-text">{copy.hero.title}</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">
            {copy.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#subsystems"
              className="group inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-primary-glow px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition"
            >
              {copy.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={`mailto:${copy.contact.email}`}
              className="inline-flex items-center gap-2 rounded-md border border-success/50 bg-success/10 px-6 py-3 text-sm font-semibold text-success hover:bg-success/20 transition"
            >
              <Users className="h-4 w-4" />
              {copy.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container-page -mt-8">
        <div className="glass rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-background/40 px-6 py-8 text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient">
                {s.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="container-page py-24">
        <SectionTitle eyebrow={copy.mission.eyebrow} title={copy.mission.title} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {copy.mission.pillars.map((p, i) => (
            <div
              key={p.title}
              className="glass rounded-xl p-6 hover:border-primary/40 transition group"
            >
              <div className="font-mono text-xs text-primary">0{i + 1}</div>
              <h3 className="mt-2 font-display text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="container-page py-12">
        <SectionTitle eyebrow={copy.timeline.eyebrow} title={copy.timeline.title} />
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
          <div className="space-y-6">
            {phases.map((phase, i) => {
              const Icon = statusIcon[phase.status];
              return (
                <div
                  key={phase.slug}
                  className={cn(
                    "relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-12",
                    i % 2 === 0 ? "md:text-right" : "md:[&>*:first-child]:order-2",
                  )}
                >
                  <div
                    className={cn(
                      "absolute left-0 md:left-1/2 top-3 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background",
                      statusColor[phase.status],
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className={cn(i % 2 !== 0 && "md:col-start-2")}>
                    <div className="glass rounded-xl p-5">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary">
                        <span>{phase.year}</span>
                        <span className="text-muted-foreground">·</span>
                        <span
                          className={cn(
                            phase.status === "completed" && "text-success",
                            phase.status === "in-progress" && "text-primary",
                            phase.status === "upcoming" && "text-muted-foreground",
                          )}
                        >
                          {copy.phaseStatus[phase.status]}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-lg font-bold">
                        {phase.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {phase.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUBSYSTEMS */}
      <section id="subsystems" className="container-page py-24 scroll-mt-20">
        <SectionTitle
          eyebrow={copy.subsystemsSection.eyebrow}
          title={copy.subsystemsSection.title}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subsystems.map((s) => (
            <Link
              key={s.slug}
              to={
                locale === "en"
                  ? "/en/subsystems/$slug"
                  : "/es/subsistemas/$slug"
              }
              params={{ slug: s.slug }}
              className="glass rounded-xl p-6 group hover:border-primary/50 transition flex flex-col"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary-glow/10 border border-primary/30">
                <SubsystemIcon name={s.icon} className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.short}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition">
                {copy.subsystemsSection.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="container-page py-12">
        <SectionTitle
          eyebrow={copy.teamSection.eyebrow}
          title={copy.teamSection.title}
        />
        <div className="grid gap-5 grid-cols-2 md:grid-cols-4">
          {featuredMembers.map((m) => (
            <div key={m.slug} className="glass rounded-xl p-5 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow overflow-hidden">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className="h-full w-full object-cover" />
                ) : (
                  <Initials name={m.name} />
                )}
              </div>
              <div className="mt-3 font-semibold">{m.name}</div>
              <div className="text-xs text-muted-foreground">{m.role}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to={r.team}
            className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/20 transition"
          >
            {copy.teamSection.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="container-page py-24">
        <SectionTitle
          eyebrow={copy.sponsorsSection.eyebrow}
          title={copy.sponsorsSection.title}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((s) => (
            <a
              key={s.slug}
              href={s.url ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="glass rounded-xl p-6 hover:border-primary/40 transition group flex flex-col"
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider",
                    s.tier === "platinum" && "bg-primary/20 text-primary",
                    s.tier === "gold" && "bg-success/20 text-success",
                    s.tier === "silver" && "bg-muted text-muted-foreground",
                    s.tier === "bronze" && "bg-accent/20 text-accent-foreground",
                  )}
                >
                  {s.tier}
                </span>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
              </div>
              <h3 className="mt-3 font-display text-lg font-bold">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground flex-1">
                {s.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="container-page py-12">
        <SectionTitle
          eyebrow={copy.gallerySection.eyebrow}
          title={copy.gallerySection.title}
        />
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
          {galleryPreview.map((g, i) => (
            <div
              key={g.slug}
              className={cn(
                "glass rounded-xl overflow-hidden aspect-square relative group",
                i === 0 && "md:col-span-2 md:row-span-2 md:aspect-[2/2]",
              )}
            >
              {g.image ? (
                <img
                  src={g.image}
                  alt={g.caption}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <Rocket className="h-10 w-10 text-primary/40" />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 text-xs">
                {g.caption}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to={r.gallery}
            className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/20 transition"
          >
            {copy.gallerySection.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="container-page py-24 scroll-mt-20">
        <SectionTitle eyebrow={copy.contact.eyebrow} title={copy.contact.title} />
        <div className="mx-auto max-w-2xl glass rounded-2xl p-8">
          <p className="text-center text-muted-foreground">{copy.contact.subtitle}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 text-sm">
            <div className="rounded-lg border border-border/50 p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {copy.contact.emailLabel}
              </div>
              <a
                href={`mailto:${copy.contact.email}`}
                className="mt-1 block font-medium text-primary"
              >
                {copy.contact.email}
              </a>
            </div>
            <div className="rounded-lg border border-border/50 p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {copy.contact.locationLabel}
              </div>
              <div className="mt-1 font-medium">{copy.contact.location}</div>
            </div>
          </div>
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const name = fd.get("name");
              const email = fd.get("email");
              const message = fd.get("message");
              const body = encodeURIComponent(
                `${name} (${email})\n\n${message}`,
              );
              window.location.href = `mailto:${copy.contact.email}?subject=${encodeURIComponent("Contact from website")}&body=${body}`;
            }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                name="name"
                required
                placeholder={copy.contact.formName}
                className="rounded-md border border-border bg-background/50 px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
              <input
                name="email"
                type="email"
                required
                placeholder={copy.contact.formEmail}
                className="rounded-md border border-border bg-background/50 px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <textarea
              name="message"
              required
              rows={4}
              placeholder={copy.contact.formMessage}
              className="w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-gradient-to-r from-primary to-primary-glow px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition"
            >
              {copy.contact.formSubmit}
            </button>
          </form>
        </div>
      </section>

      <SiteFooter locale={locale} copy={copy} />
    </div>
  );
}
