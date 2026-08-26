import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  mn: () => import("@/dictionaries/mn.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  ko: () => import("@/dictionaries/ko.json").then((m) => m.default),
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
