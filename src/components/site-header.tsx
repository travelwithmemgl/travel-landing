"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { navKeys } from "@/lib/data";
import { ArrowUpRightIcon, CloseIcon, GlobeIcon, MenuIcon } from "./icons";
import { LanguageSwitcher } from "./language-switcher";

/**
 * Transparent over the hero, then flips to a solid light bar once the hero
 * has scrolled past.
 */
export function SiteHeader({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // While the sheet is up it owns the keyboard: Escape closes it, Tab cycles
  // inside it, and focus returns to the button that opened it.
  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const trigger = triggerRef.current;
    if (!sheet) return;

    const focusable = () =>
      Array.from(
        sheet.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !sheet.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  const tone = solid ? "text-ink" : "text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-line bg-white/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className={`mx-auto flex h-14 max-w-[1440px] items-center gap-4 px-5 sm:h-16 sm:px-8 ${tone}`}>
        <a href="#top" aria-label="Travel With Me" className="flex shrink-0 items-center">
          {/* Over the hero the mark is knocked out to white; on the solid bar it keeps its blue. */}
          <Image
            src="/logo.png"
            alt="Travel With Me"
            width={1596}
            height={979}
            priority
            className={`h-10 w-auto transition duration-300 sm:h-12 ${
              solid ? "" : "brightness-0 invert"
            }`}
          />
        </a>

        <nav className="ml-auto hidden items-center gap-6 lg:flex">
          {navKeys.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`rounded text-[13px] opacity-80 transition hover:opacity-100 ${
                solid ? "" : "focus-light"
              }`}
            >
              {dict.nav[item.key]}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden lg:ml-4 lg:block">
          <LanguageSwitcher dict={dict} lang={lang} tone={solid ? "solid" : "ghost"} />
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <LanguageSwitcher dict={dict} lang={lang} tone={solid ? "solid" : "ghost"} />
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label={dict.header.openMenu}
            aria-expanded={open}
            className={`-mr-2 flex h-11 w-11 items-center justify-center rounded-full ${
              solid ? "" : "focus-light"
            }`}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <>
          <div
            aria-hidden
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px] lg:hidden"
          />

          <div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label={dict.header.openMenu}
            className="pb-safe fixed inset-x-0 bottom-0 z-50 max-h-[85svh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl shadow-black/25 lg:hidden"
            style={{ animation: "sheet-up 260ms cubic-bezier(0.32, 0.72, 0, 1)" }}
          >
            <div className="sticky top-0 flex flex-col items-center gap-3 rounded-t-3xl bg-white pt-3">
              <span aria-hidden className="h-1 w-10 rounded-full bg-line" />
              <div className="flex w-full items-center justify-between px-5 pb-3">
                <span className="flex items-center gap-2 text-[15px] font-medium tracking-tight text-ink">
                  <GlobeIcon className="h-[18px] w-[18px]" />
                  Travel With Me
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={dict.header.closeMenu}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cream"
                >
                  <CloseIcon className="h-5 w-5 text-ink" />
                </button>
              </div>
            </div>

            <nav className="flex flex-col px-3 pb-2">
              {navKeys.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center justify-between rounded-2xl px-4 text-[17px] font-medium text-ink transition active:bg-cream"
                >
                  {dict.nav[item.key]}
                  <ArrowUpRightIcon className="h-4 w-4 text-muted" />
                </a>
              ))}
            </nav>

            <div className="border-t border-line px-5 pb-6 pt-5">
              <p className="text-[11px] text-muted">{dict.header.language}</p>
              <div className="mt-3">
                <LanguageSwitcher dict={dict} lang={lang} tone="solid" />
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
