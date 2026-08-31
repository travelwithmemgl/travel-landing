"use client";

import Image from "next/image";
import { useState } from "react";
import {
  heroImage,
  regionKeys,
  tripTypeKeys,
  type RegionKey,
  type TripTypeKey,
} from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { ChevronDownIcon } from "./icons";
import { emptyTripFilters, useTripSearch, type TripFilters } from "./trip-search";

export function Hero({ dict }: { dict: Dictionary }) {
  const { search } = useTripSearch();
  const [filters, setFilters] = useState<TripFilters>(emptyTripFilters);

  return (
    <section id="top" className="relative isolate min-h-[36rem] w-full overflow-hidden sm:min-h-[660px] lg:h-[94svh]">
      <Image
        src={heroImage}
        alt={dict.hero.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Heavy enough at both ends to keep the headline and slogan readable. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/65" />

      <div className="relative flex min-h-[36rem] flex-col items-center justify-center px-6 pb-44 pt-24 text-center sm:min-h-[660px] sm:pb-40 sm:pt-28 lg:h-full">
        <span className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/85">
          <span className="h-px w-8 bg-white/50" />
          {dict.hero.eyebrow}
          <span className="h-px w-8 bg-white/50" />
        </span>

        {/* clamp() rather than raw vw: long Mongolian and Korean titles still fit. */}
        <h1 className="display mt-4 text-balance text-[clamp(3.25rem,17vw,12rem)] font-medium text-white sm:mt-5">
          {dict.hero.title}
        </h1>

        <p className="mt-5 max-w-md text-balance text-[13px] leading-relaxed text-white sm:text-[15px]">
          {dict.hero.slogan}
        </p>
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
            onChange={(value) =>
              setFilters((f) => ({ ...f, category: value as TripTypeKey | "" }))
            }
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
