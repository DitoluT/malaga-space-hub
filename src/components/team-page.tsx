import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { Locale, MemberData, SiteCopy } from "@/lib/content";
import { Linkedin } from "lucide-react";

interface Props {
  locale: Locale;
  copy: SiteCopy;
  members: MemberData[];
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
    <span className="font-display text-3xl font-bold text-primary-foreground">
      {initials}
    </span>
  );
}

export function TeamPage({ locale, copy, members }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="starfield" aria-hidden />
      <SiteHeader locale={locale} copy={copy} />
      <main className="container-page py-16 flex-1">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">
            {copy.teamSection.eyebrow}
          </span>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            {copy.teamSection.title}
          </h1>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((m) => (
            <div key={m.slug} className="glass rounded-xl p-6 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow overflow-hidden">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className="h-full w-full object-cover" />
                ) : (
                  <Initials name={m.name} />
                )}
              </div>
              <h2 className="mt-4 font-display text-lg font-bold">{m.name}</h2>
              <div className="text-sm text-primary">{m.role}</div>
              {m.area && (
                <div className="mt-1 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {m.area}
                </div>
              )}
              {m.bio && (
                <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
              )}
              {m.linkedin && (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
              )}
            </div>
          ))}
        </div>
      </main>
      <SiteFooter locale={locale} copy={copy} />
    </div>
  );
}
