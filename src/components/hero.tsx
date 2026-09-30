"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  heroPoster,
  heroVideo,
  regionKeys,
  tripTypeKeys,
  type RegionKey,
  type TripTypeKey,
} from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { blurOf } from "@/lib/blur";
import { ChevronDownIcon } from "./icons";
import { emptyTripFilters, useTripSearch, type TripFilters } from "./trip-search";

/**
 * The hero is pinned, and long.
 *
 * Scrolling does not push it away: the film stays and the page reads it a
 * chapter at a time, the way the four movements were shot. Each chapter gets
 * its own line, and the lines alternate left and right so the eye travels with
 * the scroll rather than sitting still while the picture changes behind it.
 *
 * The count is not a setting. It is how the film is cut, and the component
 * divides the running time by it, so a recut lands in the same beats.
 *
 * A chapter is worth more than one screen of scrolling. At exactly one, the
 * hero holds for three screens and lets go while it still feels like the
 * opening — it reads as the hero sliding away rather than a film that ended.
 * At 1.3 it holds for more than four, which is long enough for four lines to
 * land and be read.
 */
const CHAPTERS = 4;
const SCREENS_PER_CHAPTER = 1.3;

export function Hero({ dict }: { dict: Dictionary }) {
  const { search } = useTripSearch();
  const [filters, setFilters] = useState<TripFilters>(emptyTripFilters);

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [chapter, setChapter] = useState(0);

  /**
   * Whether this visitor gets the film at all.
   *
   * A phone does not: fourteen megabytes to decorate a screen nobody asked to
   * have decorated is somebody's data plan, and the poster is the same frame
   * the film opens on, so nothing is missing — the picture simply holds still.
   * Neither does anybody who has asked their system for less motion.
   *
   * It starts false so the server and the first client render agree; the film
   * is a second-paint luxury either way.
   */
  const [wantsFilm, setWantsFilm] = useState(false);

  useEffect(() => {
    const roomy = window.matchMedia("(min-width: 768px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setWantsFilm(roomy.matches && !calm.matches);
    decide();
    roomy.addEventListener("change", decide);
    calm.addEventListener("change", decide);
    return () => {
      roomy.removeEventListener("change", decide);
      calm.removeEventListener("change", decide);
    };
  }, []);

  /** Which chapter the scroll position is inside. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const read = () => {
      const travel = section.offsetHeight - window.innerHeight;
      if (travel <= 0) return setChapter(0);
      const passed = Math.min(Math.max(-section.getBoundingClientRect().top, 0), travel);
      const progress = passed / travel;

      setChapter(Math.min(CHAPTERS - 1, Math.floor(progress * CHAPTERS)));

      /*
       * The film does not play. It is scrubbed.
       *
       * Its frame is a function of the scroll position and nothing else, so the
       * reader is not watching a video that happens to be behind some text —
       * they are turning it. Stop scrolling and it stops on that frame; scroll
       * back and it runs backwards.
       *
       * Playing it instead, even a chapter at a time, leaves it a still picture
       * for most of the time anybody is looking at it, which is what it looked
       * like: a video sitting there.
       *
       * The small delta guard keeps a queue of seeks from forming while the
       * wheel is spinning; below about a frame's worth there is nothing to see.
       */
      const video = videoRef.current;
      if (video?.duration) {
        const at = Math.min(video.duration - 0.05, progress * video.duration);
        if (Math.abs(video.currentTime - at) > 0.02) video.currentTime = at;
      }
    };

    /*
     * Read on the event itself rather than inside requestAnimationFrame.
     *
     * A frame-throttled handler is the usual advice, and it is wrong here: rAF
     * does not run in a background tab, so a tab restored mid-page — or driven
     * by anything that is not the frontmost window — sticks on whichever
     * chapter it was left holding. The work being throttled is one
     * `getBoundingClientRect` and a `setState` that mostly sets the value it
     * already had; the browser already coalesces scroll events, and React
     * already drops a state write that changes nothing.
     */
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  const current = dict.hero.chapters[chapter];

  return (
    <section ref={sectionRef} id="top" style={{ height: `${CHAPTERS * SCREENS_PER_CHAPTER * 100}svh` }}
      className="relative">
      <div className="sticky top-0 isolate h-svh min-h-[34rem] overflow-hidden">
        <Image
          src={heroPoster}
          placeholder={blurOf(heroPoster)}
          alt={dict.hero.alt}
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover"
        />

        {wantsFilm && (
          <video
            ref={videoRef}
            src={heroVideo}
            poster={heroPoster}
            muted
            playsInline
            /* The whole film, not just its header: every frame is a seek
               target, and seeking into a part that has not arrived is the
               stutter people mean when they say scroll video is janky. */
            preload="auto"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Heavy enough at both ends to keep the headline and the search legible. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/75" />

        <div className="relative flex h-full flex-col justify-center px-6 pb-48 pt-24 sm:px-10 sm:pb-44 lg:px-16">
          <div
            /* The key restarts the fade, so each chapter arrives rather than
               cross-dissolving into the one before it. */
            key={chapter}
            className={`max-w-3xl motion-safe:animate-[fade-up_700ms_cubic-bezier(0.16,1,0.3,1)_both] ${
              chapter % 2 === 1 ? "self-end text-right" : "self-start text-left"
            }`}
          >
            <span className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/85">
              {chapter % 2 === 1 && <span className="h-px w-8 bg-white/50" />}
              {dict.hero.eyebrow}
              {chapter % 2 === 0 && <span className="h-px w-8 bg-white/50" />}
            </span>

            {/* clamp() rather than raw vw: the long Mongolian and Korean lines
                still have to fit the same box the one-word English does. */}
            <h1 className="display mt-4 text-balance text-[clamp(2.75rem,7.5vw,6.5rem)] font-medium leading-[0.95] text-white">
              {current.title}
            </h1>

            <p className="mt-5 max-w-lg text-balance text-[13px] leading-relaxed text-white/90 sm:text-[15px]">
              {current.sub}
            </p>
          </div>
        </div>

        {/* Where the film has got to. Reading them is the whole point, so they
            are buttons: a chapter is a place on the page, and a place on the
            page should be reachable without a mouse wheel. */}
        <div className="absolute inset-x-0 bottom-20 flex justify-end gap-6 px-6 sm:bottom-24 sm:px-10 lg:px-16">
          {dict.hero.chapters.map((entry, index) => (
            <button
              key={entry.label}
              type="button"
              aria-current={index === chapter}
              onClick={() => {
                const section = sectionRef.current;
                if (!section) return;
                const travel = section.offsetHeight - window.innerHeight;
                window.scrollTo({
                  top: section.offsetTop + (travel * index) / CHAPTERS + 1,
                  behavior: "smooth",
                });
              }}
              className={`focus-light border-b pb-1 text-[11px] tracking-wide transition ${
                index === chapter
                  ? "border-accent text-white"
                  : "border-transparent text-white/60 hover:text-white/90"
              }`}
            >
              {entry.label}
            </button>
          ))}
        </div>

        {/* Drives the tour grid further down the page. */}
        <form
          className="absolute inset-x-0 bottom-0"
          onSubmit={(e) => {
            e.preventDefault();
            search(filters);
          }}
        >
          <div className="grid grid-cols-2 bg-black/40 backdrop-blur-md md:grid-cols-[repeat(2,1fr)_auto]">
            <HeroField
              label={dict.trips.filters.destination}
              placeholder={dict.trips.placeholders.destination}
              value={filters.destination}
              options={regionKeys.map((key) => ({ value: key, label: dict.trips.regions[key] }))}
              onChange={(value) =>
                setFilters((f) => ({ ...f, destination: value as RegionKey | "" }))
              }
            />
            <HeroField
              label={dict.trips.filters.category}
              placeholder={dict.trips.placeholders.category}
              value={filters.category}
              options={tripTypeKeys.map((key) => ({ value: key, label: dict.trips.types[key] }))}
              onChange={(value) => setFilters((f) => ({ ...f, category: value as TripTypeKey | "" }))}
              bordered
            />

            <button
              type="submit"
              className="focus-light col-span-2 min-h-[3.25rem] bg-accent px-10 text-sm font-medium text-white transition hover:bg-accent-strong active:bg-accent-strong md:col-span-1 md:py-5"
            >
              {dict.hero.explore}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function HeroField({
  label,
  placeholder,
  value,
  options,
  onChange,
  bordered = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  bordered?: boolean;
}) {
  return (
    <label
      className={`group flex min-h-[3.75rem] flex-col justify-center px-4 py-3 text-left transition hover:bg-white/10 md:min-h-0 md:px-7 md:py-5 ${
        bordered ? "border-l border-white/15" : ""
      }`}
    >
      <span className="block text-[11px] font-medium text-white sm:text-xs">{label}</span>
      <span className="relative mt-1 flex items-center">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="focus-light w-full cursor-pointer appearance-none bg-transparent pr-5 text-[11px] text-white/80 sm:text-xs"
        >
          {/* Native option lists paint on the OS surface, so force a dark label. */}
          <option value="" className="text-ink">
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-ink">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-0 h-3.5 w-3.5 text-white/70" />
      </span>
    </label>
  );
}
