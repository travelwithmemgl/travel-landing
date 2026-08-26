import type en from "@/dictionaries/en.json";

/** Shape of every locale file — English is the source of truth. */
export type Dictionary = typeof en;

/** Fills {name}/{n} placeholders in a dictionary string. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match,
  );
}
