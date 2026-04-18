import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/gallery-page";
import { getGallery, getSiteCopy } from "@/lib/content";

const LOCALE = "es" as const;

export const Route = createFileRoute("/es/galeria")({
  loader: () => ({
    copy: getSiteCopy(LOCALE),
    gallery: getGallery(LOCALE),
  }),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.copy.seo.galleryTitle ?? "Galería" },
      { name: "description", content: loaderData?.copy.seo.galleryDescription ?? "" },
      { property: "og:title", content: loaderData?.copy.seo.galleryTitle ?? "" },
      { property: "og:description", content: loaderData?.copy.seo.galleryDescription ?? "" },
      { property: "og:locale", content: "es_ES" },
    ],
  }),
  component: () => {
    const data = Route.useLoaderData();
    return <GalleryPage locale={LOCALE} {...data} />;
  },
});
