import { Mail, MapPin, Github, Instagram, Linkedin } from "lucide-react";
import type { Locale, SiteCopy } from "@/lib/content";

interface Props {
  locale: Locale;
  copy: SiteCopy;
}

export function SiteFooter({ copy }: Props) {
  return (
    <footer className="mt-24 border-t border-border/40 bg-background/60 backdrop-blur-md">
      <div className="container-page py-10 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <div className="font-display text-base uppercase tracking-[0.2em]">
            Málaga Space Team
          </div>
          <p className="mt-2 text-muted-foreground max-w-xs">{copy.footer.builtBy}</p>
        </div>
        <div className="space-y-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            <a href={`mailto:${copy.contact.email}`} className="hover:text-foreground">
              {copy.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{copy.contact.location}</span>
          </div>
        </div>
        <div className="flex md:justify-end items-start gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground hover:border-primary/50"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground hover:border-primary/50"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground hover:border-primary/50"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-border/40 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {copy.footer.rights}
      </div>
    </footer>
  );
}
