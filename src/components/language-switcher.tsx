"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionary";
import { localeLabels, locales, type Locale } from "@/lib/i18n";
import { CheckIcon, ChevronDownIcon, TranslateIcon } from "./icons";

type Props = {
  dict: Dictionary;
  lang: Locale;
  /** `solid` on a light bar, `ghost` when floating over the hero image. */
  tone: "solid" | "ghost";
};

export function LanguageSwitcher({ dict, lang, tone }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const trigger =
    tone === "solid"
      ? "border-line text-ink hover:bg-cream"
      : "border-white/25 text-white hover:bg-white/15";

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={dict.header.changeLanguage}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium transition ${trigger}`}
      >
        <TranslateIcon className="h-4 w-4" />
        {localeLabels[lang].short}
        <ChevronDownIcon
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={dict.header.language}
          className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-line bg-white p-1 shadow-lg shadow-black/5"
        >
          {locales.map((locale) => {
            const active = locale === lang;
            return (
              <Link
                key={locale}
                href={`/${locale}`}
                hrefLang={locale}
                role="menuitem"
                aria-current={active ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] transition ${
                  active ? "bg-cream text-ink" : "text-ink-soft hover:bg-cream"
                }`}
              >
                <span className="w-7 shrink-0 text-[11px] font-medium text-muted">
                  {localeLabels[locale].short}
                </span>
                {localeLabels[locale].native}
                {active && <CheckIcon className="ml-auto h-3.5 w-3.5 text-ink" />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
