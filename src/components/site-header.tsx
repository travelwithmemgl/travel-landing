"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navKeys } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { ContactTrigger } from "./contact-trigger";
import { MailIcon } from "./icons";
import { LanguageSwitcher } from "./language-switcher";

/**
 * Transparent over the hero, then flips to a solid light bar once the hero has
 * scrolled past.
 *
 * The whole site is one page: the links move between its sections, and contact
 * opens a dialog. Below lg the mobile tab bar carries the same set instead.
 */
export function SiteHeader({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tone = solid ? "text-ink" : "text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-line bg-white/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex h-14 max-w-[1440px] items-center gap-3 px-5 sm:h-16 sm:px-8 ${tone}`}
      >
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

        {/*
          Tracked small caps, the same voice as the section badges and the hero
          eyebrow, so the bar reads as part of the page rather than chrome.
        */}
        <nav className="ml-auto hidden items-center gap-8 lg:flex">
          {navKeys.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`group relative rounded pb-1 text-[11px] font-medium uppercase tracking-[0.16em] transition-opacity ${
                solid ? "opacity-70 hover:opacity-100" : "opacity-90 hover:opacity-100 focus-light"
              }`}
            >
              {dict.nav[item.key]}
              <span
                aria-hidden
                className={`absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                  solid ? "bg-accent" : "bg-white"
                }`}
              />
            </a>
          ))}
        </nav>

        <span
          aria-hidden
          className={`ml-8 hidden h-4 w-px lg:block ${solid ? "bg-line" : "bg-white/25"}`}
        />

        <div className="ml-auto flex items-center gap-2.5 lg:ml-4 lg:gap-3">
          {/* Contact is the one thing we actually want tapped, so it is a button
              rather than another line of nav — and it opens a dialog in place. */}
          <ContactTrigger
            dict={dict}
            className={`hidden min-h-9 items-center rounded-full px-5 text-[11px] font-medium uppercase tracking-[0.16em] transition lg:flex ${
              solid
                ? "bg-ink text-white hover:bg-ink-soft"
                : "border border-white/40 text-white hover:bg-white/15"
            }`}
          >
            {dict.nav.contact}
          </ContactTrigger>

          {/* Below lg the tab bar carries navigation, so the header keeps only
              contact — as an icon, which leaves the language pill room. */}
          <ContactTrigger
            dict={dict}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition lg:hidden ${
              solid ? "bg-ink text-white hover:bg-ink-soft" : "border border-white/40 hover:bg-white/15"
            }`}
          >
            <MailIcon className="h-4 w-4" />
            <span className="sr-only">{dict.nav.contact}</span>
          </ContactTrigger>

          <LanguageSwitcher dict={dict} lang={lang} tone={solid ? "solid" : "ghost"} />
        </div>
      </div>
    </header>
  );
}
