import { useMemo, useState } from "react";
import { Rocket, X } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { GalleryItem, Locale, SiteCopy } from "@/lib/content";
import { cn } from "@/lib/utils";

interface Props {
  locale: Locale;
  copy: SiteCopy;
  gallery: GalleryItem[];
}

type Filter = "all" | "cubesat" | "events" | "team";

export function GalleryPage({ locale, copy, gallery }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const items = useMemo(
    () => (filter === "all" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter, gallery],
  );

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: copy.gallerySection.filters.all },
    { key: "cubesat", label: copy.gallerySection.filters.cubesat },
    { key: "events", label: copy.gallerySection.filters.events },
    { key: "team", label: copy.gallerySection.filters.team },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="starfield" aria-hidden />
      <SiteHeader locale={locale} copy={copy} />
      <main className="container-page py-16 flex-1">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">
            {copy.gallerySection.eyebrow}
          </span>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            {copy.gallerySection.title}
          </h1>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition",
                filter === f.key
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
          {items.map((g) => (
            <button
              key={g.slug}
              type="button"
              onClick={() => setLightbox(g)}
              className="mb-3 block w-full break-inside-avoid glass rounded-xl overflow-hidden group text-left"
            >
              <div className="relative aspect-[4/3]">
                {g.image ? (
                  <img
                    src={g.image}
                    alt={g.caption}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <Rocket className="h-10 w-10 text-primary/40" />
                  </div>
                )}
              </div>
              <div className="p-3 text-xs text-muted-foreground">{g.caption}</div>
            </button>
          ))}
        </div>
      </main>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 rounded-full border border-border bg-background/80 p-2"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="max-w-4xl w-full glass rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.image ? (
              <img src={lightbox.image} alt={lightbox.caption} className="w-full" />
            ) : (
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Rocket className="h-16 w-16 text-primary/50" />
              </div>
            )}
            <div className="p-4 text-sm">{lightbox.caption}</div>
          </div>
        </div>
      )}

      <SiteFooter locale={locale} copy={copy} />
    </div>
  );
}
