import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SubsystemIcon } from "@/components/subsystem-icon";
import type { Locale, SiteCopy, SubsystemData } from "@/lib/content";
import { routes } from "@/lib/i18n";

interface Props {
  locale: Locale;
  copy: SiteCopy;
  subsystem: SubsystemData;
}

export function SubsystemPage({ locale, copy, subsystem }: Props) {
  const r = routes(locale);
  const backLabel = locale === "es" ? "Volver al inicio" : "Back to home";

  return (
    <div className="min-h-screen flex flex-col">
      <div className="starfield" aria-hidden />
      <SiteHeader locale={locale} copy={copy} />
      <main className="container-page py-16 flex-1">
        <Link
          to={r.home}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {backLabel}
        </Link>

        <div className="mt-8 flex items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary-glow/10 border border-primary/30">
            <SubsystemIcon name={subsystem.icon} className="h-8 w-8 text-primary" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">
              {subsystem.lead}
            </span>
            <h1 className="mt-1 font-display text-4xl md:text-5xl font-bold">
              {subsystem.title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
              {subsystem.short}
            </p>
          </div>
        </div>

        <article className="mt-10 glass rounded-2xl p-8 prose prose-invert max-w-none whitespace-pre-line text-foreground/90 leading-relaxed">
          {subsystem.body}
        </article>
      </main>
      <SiteFooter locale={locale} copy={copy} />
    </div>
  );
}
