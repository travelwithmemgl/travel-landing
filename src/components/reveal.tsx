"use client";

import { useEffect } from "react";

/**
 * Fades `[data-reveal]` blocks in as they scroll into view.
 *
 * The hidden starting state lives behind `.reveal-ready` on <html>, which the
 * inline script in the layout sets before first paint — so the page renders in
 * full when JavaScript is off, and nothing flashes when it is on.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("reveal-ready")) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) {
      root.classList.remove("reveal-ready");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return null;
}
