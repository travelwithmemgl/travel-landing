"use client";

import { useEffect, useState } from "react";
import { tabKeys, type TabKey } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { CompassIcon, HomeIcon, MailIcon, MapPinIcon, SparkIcon } from "./icons";

const tabIcons = {
  home: HomeIcon,
  experiences: SparkIcon,
  trips: MapPinIcon,
  services: CompassIcon,
  contact: MailIcon,
} as const;

/**
 * Phone-app style tab bar. Hidden from lg up, where the header nav takes over.
 * The active tab tracks whichever watched section currently owns the viewport.
 */
export function BottomNav({ dict }: { dict: Dictionary }) {
  const [active, setActive] = useState<TabKey>("home");

  useEffect(() => {
    const targets = tabKeys
      .map((tab) => {
        const el = document.getElementById(tab.section);
        return el ? ([el, tab.key] as const) : null;
      })
      .filter((entry): entry is readonly [HTMLElement, TabKey] => entry !== null);

    if (targets.length === 0) return;

    const visible = new Map<TabKey, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const match = targets.find(([el]) => el === entry.target);
          if (match) visible.set(match[1], entry.intersectionRatio);
        }
        // Whichever watched section shows the most of itself wins the highlight.
        let best: TabKey = "home";
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

  return (
    <nav
      aria-label={dict.tabs.label}
      className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/90 backdrop-blur-xl lg:hidden"
    >
      <ul className="mx-auto flex max-w-lg items-stretch">
        {tabKeys.map((tab) => {
          const Icon = tabIcons[tab.key];
          const on = active === tab.key;
          return (
            <li key={tab.key} className="flex-1">
              <a
                href={tab.href}
                aria-current={on ? "true" : undefined}
                className={`flex h-16 flex-col items-center justify-center gap-1 transition-colors ${
                  on ? "text-ink" : "text-muted"
                }`}
              >
                <span
                  className={`flex h-7 w-12 items-center justify-center rounded-full transition-colors ${
                    on ? "bg-cream" : "bg-transparent"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="text-[10px] leading-none">{dict.tabs[tab.key]}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
