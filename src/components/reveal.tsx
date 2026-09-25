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

    // The ones still waiting. A block leaves this set the moment it is shown,
    // which is also how the sweep below knows when it has nothing left to do.
    const waiting = new Set(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (waiting.size === 0) {
      root.classList.remove("reveal-ready");
      return;
    }

    const show = (target: HTMLElement) => {
      target.classList.add("is-visible");
      waiting.delete(target);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );

    /**
     * Show anything the page never scrolled *through*.
     *
     * An IntersectionObserver reports only what crosses the viewport while it
     * is watching. A block that was jumped over never crosses anything, so it
     * is never reported and stays at `opacity: 0` until the reader happens to
     * scroll back up through it.
     *
     * That is not an edge case on this page. The header links jump to sections,
     * a reload puts the reader back where they were, and a flick on a phone
     * skips whole screens. Measured here: a jump to the footer left eleven of
     * the nineteen blocks invisible — the page read as half empty.
     *
     * The fade still runs for these, above the scroll position where nobody is
     * looking, which costs nothing and keeps one code path instead of two.
     */
    const sweep = () => {
      for (const target of [...waiting]) {
        if (target.getBoundingClientRect().bottom > 0) continue;
        show(target);
        observer.unobserve(target);
      }
      if (waiting.size === 0) window.removeEventListener("scroll", onScroll);
    };

    // One sweep per frame at most: scroll fires far more often than it can
    // matter, and every sweep measures.
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        sweep();
      });
    };

    for (const target of waiting) observer.observe(target);

    // Once for the arrival itself — a restored scroll position or a link
    // straight to an anchor has already happened by the time this runs — and
    // then after every jump for the rest of the visit.
    sweep();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
