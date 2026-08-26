export const locales = ["mn", "en", "ko"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "mn";

/** Native label + short code shown in the header switcher. */
export const localeLabels: Record<Locale, { native: string; short: string }> = {
  mn: { native: "Монгол", short: "MN" },
  en: { native: "English", short: "EN" },
  ko: { native: "한국어", short: "KO" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
