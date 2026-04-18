import { createFileRoute, notFound } from "@tanstack/react-router";
import { SubsystemPage } from "@/components/subsystem-page";
import { getSiteCopy, getSubsystem } from "@/lib/content";

const LOCALE = "es" as const;

export const Route = createFileRoute("/es/subsistemas/$slug")({
  loader: ({ params }) => {
    const subsystem = getSubsystem(params.slug, LOCALE);
    if (!subsystem) throw notFound();
    return {
      copy: getSiteCopy(LOCALE),
      subsystem,
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.subsystem.title ?? ""} — Málaga Space Team` },
      { name: "description", content: loaderData?.subsystem.short ?? "" },
      { property: "og:title", content: loaderData?.subsystem.title ?? "" },
      { property: "og:description", content: loaderData?.subsystem.short ?? "" },
      { property: "og:locale", content: "es_ES" },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground mt-2">Subsistema no encontrado</p>
        <a href="/es" className="mt-4 inline-block text-primary">Volver al inicio</a>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => <div className="p-8">Error: {error.message}</div>,
  component: () => {
    const data = Route.useLoaderData();
    return <SubsystemPage locale={LOCALE} {...data} />;
  },
});
