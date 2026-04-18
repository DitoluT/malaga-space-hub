import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    // Detect language from browser, fallback to Spanish.
    let target: "/es" | "/en" = "/es";
    if (typeof window !== "undefined") {
      const lang = window.navigator.language?.toLowerCase() ?? "";
      if (lang.startsWith("en")) target = "/en";
    }
    throw redirect({ to: target });
  },
  component: () => null,
});
