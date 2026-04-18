import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Rocket } from "lucide-react";
import type { Locale, SiteCopy } from "@/lib/content";
import { routes, altLocaleHref } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface HeaderProps {
  locale: Locale;
  copy: SiteCopy;
}

export function SiteHeader({ locale, copy }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const r = routes(locale);
  const altHref = altLocaleHref(locale, location.pathname);
  const altLabel = locale === "es" ? "EN" : "ES";

  const links = [
    { to: r.home, label: copy.nav.home, exact: true },
    { to: r.subsystems, label: copy.nav.subsystems },
    { to: r.team, label: copy.nav.team },
    { to: r.gallery, label: copy.nav.gallery },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          to={r.home}
          className="flex items-center gap-2 font-display font-bold tracking-tight"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-glow)]">
            <Rocket className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="hidden sm:inline text-sm uppercase tracking-[0.2em]">
            Málaga Space Team
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.exact }}
              activeProps={{ className: "text-foreground bg-primary/10" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={altHref}
            className="rounded-md border border-border px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground hover:border-primary/50 transition"
            aria-label={`Switch language to ${altLabel}`}
          >
            {altLabel}
          </a>
          <a
            href={`mailto:${copy.contact.email}`}
            className="hidden sm:inline-flex rounded-md bg-gradient-to-r from-primary to-primary-glow px-4 py-1.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition"
          >
            {copy.join}
          </a>
          <button
            type="button"
            className="md:hidden rounded-md p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className={cn(
            "md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl",
          )}
        >
          <div className="container-page flex flex-col py-3 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.exact }}
                activeProps={{ className: "text-foreground bg-primary/10" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-md px-3 py-2 text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={`mailto:${copy.contact.email}`}
              className="mt-2 rounded-md bg-gradient-to-r from-primary to-primary-glow px-4 py-2 text-center text-sm font-semibold text-primary-foreground"
            >
              {copy.join}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
