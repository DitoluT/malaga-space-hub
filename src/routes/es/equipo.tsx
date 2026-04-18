import { createFileRoute } from "@tanstack/react-router";
import { TeamPage } from "@/components/team-page";
import { getMembers, getSiteCopy } from "@/lib/content";

const LOCALE = "es" as const;

export const Route = createFileRoute("/es/equipo")({
  loader: () => ({
    copy: getSiteCopy(LOCALE),
    members: getMembers(LOCALE),
  }),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.copy.seo.teamTitle ?? "Equipo" },
      { name: "description", content: loaderData?.copy.seo.teamDescription ?? "" },
      { property: "og:title", content: loaderData?.copy.seo.teamTitle ?? "" },
      { property: "og:description", content: loaderData?.copy.seo.teamDescription ?? "" },
      { property: "og:locale", content: "es_ES" },
    ],
  }),
  component: () => {
    const data = Route.useLoaderData();
    return <TeamPage locale={LOCALE} {...data} />;
  },
});
