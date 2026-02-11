import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["es", "en"],

  // Used when no locale matches
  defaultLocale: "es",

  // Disable accept-language header detection so the site
  // always defaults to Spanish unless the user explicitly switches
  localeDetection: false,
});
