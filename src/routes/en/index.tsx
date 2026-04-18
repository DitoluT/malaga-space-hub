import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import {
  getGallery,
  getMembers,
  getPhases,
  getSiteCopy,
  getSponsors,
  getSubsystems,
} from "@/lib/content";

const LOCALE = "en" as const;

export const Route = createFileRoute("/en/")({
  loader: () => ({
    copy: getSiteCopy(LOCALE),
    members: getMembers(LOCALE),
    sponsors: getSponsors(LOCALE),
    subsystems: getSubsystems(LOCALE),
    phases: getPhases(LOCALE),
    gallery: getGallery(LOCALE),
  }),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.copy.seo.homeTitle ?? "Málaga Space Team" },
      { name: "description", content: loaderData?.copy.seo.homeDescription ?? "" },
      { property: "og:title", content: loaderData?.copy.seo.homeTitle ?? "" },
      { property: "og:description", content: loaderData?.copy.seo.homeDescription ?? "" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
  errorComponent: ({ error }) => <div className="p-8">Error: {error.message}</div>,
});

function Page() {
  const data = Route.useLoaderData();
  return <HomePage locale={LOCALE} {...data} />;
}
