"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { slideImages, slideKeys } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";
import { SectionBadge } from "./section-header";

/** Staggered heights/offsets give the rail its scrapbook rhythm. */
const shape = [
  "h-64 w-[13rem] sm:h-72 sm:w-60 mt-0",
  "h-52 w-[11rem] sm:h-56 sm:w-52 mt-16",
  "h-56 w-[12rem] sm:h-64 sm:w-56 mt-6",
];

export function ValueCarousel({ dict }: { dict: Dictionary }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : rail.clientWidth * 0.6;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  const onScroll = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : 1;
    setActive(Math.min(slideKeys.length - 1, Math.round(rail.scrollLeft / step)));
  }, []);

  const current = dict.slides[slideKeys[active]];

  return (
    <section id="about" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
        <div data-reveal className="lg:pt-8">
          <SectionBadge>{dict.value.badge}</SectionBadge>

          <h2 className="display mt-6 text-4xl font-medium sm:text-5xl">
            {dict.value.line1}
            <br />
            {dict.value.line2}
          </h2>

          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{dict.value.body}</p>

          <p className="mt-5 max-w-xs border-l-2 border-accent pl-4 text-sm leading-relaxed text-ink-soft">
            {dict.value.mission}
          </p>

          <a
            href="#trips"
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-accent px-6 text-[13px] font-medium text-white transition hover:bg-accent-strong"
          >
            {dict.value.cta}
          </a>
        </div>

        <div className="min-w-0">
          <div
            ref={railRef}
            onScroll={onScroll}
            className="no-scrollbar flex snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-2"
          >
            {slideKeys.map((key, i) => {
              const slide = dict.slides[key];
              return (
                <figure
                  key={key}
                  className={`relative shrink-0 snap-start overflow-hidden rounded-2xl ${shape[i % shape.length]}`}
                >
                  <Image
                    src={slideImages[key]}
                    alt={slide.alt}
                    fill
                    sizes="(min-width: 640px) 15rem, 13rem"
                    className="object-cover"
                  />
                  <figcaption className="absolute bottom-3 right-3 rounded-full bg-black/45 px-3 py-1 text-[11px] text-white backdrop-blur-sm">
                    {slide.chip}
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium">{current.title}</p>
              <p className="mt-1 text-[13px] text-muted">{current.caption}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                className="flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-[12px] text-muted transition hover:border-ink hover:text-ink"
              >
                <ArrowLeftIcon className="h-3.5 w-3.5" />
                {dict.value.prev}
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                className="flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-[12px] text-muted transition hover:border-ink hover:text-ink"
              >
                {dict.value.next}
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
