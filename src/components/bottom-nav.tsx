"use client";

import { useEffect, useState } from "react";
import { navKeys, type NavKey } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { ContactTrigger } from "./contact-trigger";
import { HeartIcon, HomeIcon, MailIcon, MapPinIcon } from "./icons";

const tabIcons = {
  home: HomeIcon,
  about: HeartIcon,
  trips: MapPinIcon,
} as const satisfies Record<NavKey, unknown>;

/** Three sections plus the contact action, so the rail is quartered. */
const TAB_WIDTH = `${100 / (navKeys.length + 1)}%`;

/**
 * Phone-app style tab bar. Hidden from lg up, where the header nav takes over.
 *
 * It stays put for the whole page — every tab keeps its icon and its label at
 * all times, and nothing slides away as you read. The only thing that moves is
 * the rule, which follows whichever section currently owns the viewport.
 */
export function BottomNav({ dict }: { dict: Dictionary }) {
  const [active, setActive] = useState<NavKey>("home");

  useEffect(() => {
    const targets = navKeys
      .map((tab) => {
        const el = document.getElementById(tab.section);
        return el ? ([el, tab.key] as const) : null;
      })
      .filter((entry): entry is readonly [HTMLElement, NavKey] => entry !== null);

    if (targets.length === 0) return;

    const visible = new Map<NavKey, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const match = targets.find(([el]) => el === entry.target);
          if (match) visible.set(match[1], entry.intersectionRatio);
        }
        // Whichever watched section shows the most of itself wins the highlight.
        let best: NavKey = "home";
        let bestRatio = 0;
        for (const [key, ratio] of visible) {
          if (ratio > bestRatio) {
            best = key;
            bestRatio = ratio;
          }
        }
        if (bestRatio > 0) setActive(best);
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.9], rootMargin: "-25% 0px -35% 0px" },
    );

    for (const [el] of targets) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const index = navKeys.findIndex((tab) => tab.key === active);

  return (
    <nav
      aria-label={dict.tabs.label}
      className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/90 backdrop-blur-xl lg:hidden"
    >
      <div className="relative mx-auto max-w-lg">
        {/* The rule slides to the tab the page has scrolled to. */}
        <span
          aria-hidden
          style={{ width: TAB_WIDTH, transform: `translateX(${index * 100}%)` }}
          className="absolute left-0 top-0 flex justify-center transition-transform duration-300 ease-out"
        >
          <span className="h-0.5 w-10 rounded-full bg-accent" />
        </span>

        <ul className="flex items-stretch">
          {navKeys.map((tab) => {
            const Icon = tabIcons[tab.key];
            const on = active === tab.key;
            return (
              <li key={tab.key} className="flex-1">
                <a
                  href={tab.href}
                  // The page never changes, only the place within it.
                  aria-current={on ? "location" : undefined}
                  className={`group flex h-16 flex-col items-center justify-center gap-1 transition-colors ${
                    on ? "text-accent" : "text-muted"
                  }`}
                >
                  <span
                    className={`flex h-7 w-12 items-center justify-center rounded-full transition duration-300 group-active:scale-90 ${
                      on ? "bg-accent/10" : "bg-transparent"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className={`text-[10px] leading-none ${on ? "font-medium" : ""}`}>
                    {dict.tabs[tab.key]}
                  </span>
                </a>
              </li>
            );
          })}

          {/* The last tab is the one action in the bar, so it carries a filled
              mark rather than the accent the current section wears. */}
          <li className="flex-1">
            <ContactTrigger
              dict={dict}
              className="group flex h-16 w-full flex-col items-center justify-center gap-1 text-ink"
            >
              <span className="flex h-7 w-12 items-center justify-center rounded-full bg-ink text-white transition duration-300 group-active:scale-90">
                <MailIcon className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[10px] font-medium leading-none">{dict.tabs.contact}</span>
            </ContactTrigger>
          </li>
        </ul>
      </div>
    </nav>
  );
}
