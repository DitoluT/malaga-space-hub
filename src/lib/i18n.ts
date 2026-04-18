import type { Locale } from "./content";

const ROUTES_ES = {
  home: "/es",
  team: "/es/equipo",
  subsystems: "/es/subsistemas",
  gallery: "/es/galeria",
} as const;

const ROUTES_EN = {
  home: "/en",
  team: "/en/team",
  subsystems: "/en/subsystems",
  gallery: "/en/gallery",
} as const;

export function routes(locale: Locale) {
  return locale === "en" ? ROUTES_EN : ROUTES_ES;
}

export function altLocaleHref(locale: Locale, current: string): string {
  // Map a path in current locale to the equivalent in the other locale.
  if (locale === "es") {
    return current
      .replace(/^\/es\/equipo/, "/en/team")
      .replace(/^\/es\/subsistemas/, "/en/subsystems")
      .replace(/^\/es\/galeria/, "/en/gallery")
      .replace(/^\/es/, "/en");
  }
  return current
    .replace(/^\/en\/team/, "/es/equipo")
    .replace(/^\/en\/subsystems/, "/es/subsistemas")
    .replace(/^\/en\/gallery/, "/es/galeria")
    .replace(/^\/en/, "/es");
}
