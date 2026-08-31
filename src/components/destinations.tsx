"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  regionKeys,
  tripGalleries,
  trips,
  tripTypeKeys,
  type RegionKey,
  type Trip,
  type TripTypeKey,
} from "@/lib/data";
import { fill, type Dictionary } from "@/lib/dictionary";
import { BedIcon, CarIcon, ChevronDownIcon, ExpandIcon, MealIcon } from "./icons";
import { PhotoDialog } from "./photo-dialog";
import { SectionHeader } from "./section-header";
import { useTripSearch, type TripFilters } from "./trip-search";

export function Destinations({ dict }: { dict: Dictionary }) {
  const { applied, search } = useTripSearch();
  const [filters, setFilters] = useState<TripFilters>(applied);
  const [seen, setSeen] = useState(applied);
  const [viewing, setViewing] = useState<Trip | null>(null);

  // A search run from the hero has to show up in these fields too.
  if (seen !== applied) {
    setSeen(applied);
    setFilters(applied);
  }

  const visible = useMemo(
    () =>
      trips.filter(
        (trip) =>
          (applied.destination === "" || trip.region === applied.destination) &&
          (applied.category === "" || trip.type === applied.category),
      ),
    [applied],
  );

  return (
    <section id="trips" className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32">
      <SectionHeader
        badge={dict.trips.badge}
        title={dict.trips.title}
        intro={dict.trips.intro}
        size="lg"
      />

      <div
        data-reveal
        className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-[repeat(2,1fr)_auto]"
      >
        <Field
          label={dict.trips.filters.destination}
          placeholder={dict.trips.placeholders.destination}
          value={filters.destination}
          options={regionKeys.map((k) => ({ value: k, label: dict.trips.regions[k] }))}
          onChange={(v) => setFilters((f) => ({ ...f, destination: v as RegionKey | "" }))}
        />
        <Field
          label={dict.trips.filters.category}
          placeholder={dict.trips.placeholders.category}
          value={filters.category}
          options={tripTypeKeys.map((k) => ({ value: k, label: dict.trips.types[k] }))}
          onChange={(v) => setFilters((f) => ({ ...f, category: v as TripTypeKey | "" }))}
        />

        <div className="col-span-2 flex items-center bg-white p-3 lg:col-span-1">
          <button
            type="button"
            onClick={() => search(filters)}
            className="min-h-12 w-full rounded-xl bg-accent px-8 text-[13px] font-medium text-white transition hover:bg-accent-strong active:scale-[0.99]"
          >
            {dict.trips.discover}
          </button>
        </div>
      </div>

      {/* Filtering is silent for screen readers unless the result count is announced. */}
      <p aria-live="polite" className="sr-only">
        {fill(dict.trips.results, { n: visible.length })}
      </p>

      <div className="no-scrollbar edge-scroll -mx-5 mt-8 flex items-start gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {visible.map((trip) => (
          <div
            key={trip.id}
            className="w-[85vw] max-w-sm shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink"
          >
            <TripCard trip={trip} dict={dict} onOpen={() => setViewing(trip)} />
          </div>
        ))}
      </div>

      {visible.length > 1 && (
        <p className="mt-4 text-center text-[11px] text-muted sm:hidden">{dict.trips.swipe}</p>
      )}

      {visible.length === 0 && (
        <p className="mt-16 text-center text-sm text-muted">{dict.trips.empty}</p>
      )}

      {viewing && <TripDialog trip={viewing} dict={dict} onClose={() => setViewing(null)} />}
    </section>
  );
}

function Field({
  label,
  placeholder,
  value,
  options,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex min-h-[4.25rem] flex-col justify-center gap-1 bg-white px-4 py-3 sm:px-5 sm:py-4">
      <span className="text-[12px] font-medium">{label}</span>
      <span className="relative flex items-center">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-[12px] text-muted"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-0 h-3.5 w-3.5 text-muted" />
      </span>
    </label>
  );
}

function TripCard({
  trip,
  dict,
  onOpen,
}: {
  trip: Trip;
  dict: Dictionary;
  onOpen: () => void;
}) {
  const item = dict.trips.items[trip.id as keyof typeof dict.trips.items];
  const typeLabel = dict.trips.types[trip.type];
  const photos = tripGalleries[trip.id] ?? [trip.image];

  return (
    <article className="rounded-2xl border border-line bg-white p-3">
      <header className="flex items-start justify-between gap-3 px-1 pb-3 pt-1">
        <div>
          <h3 className="text-sm font-medium">{item.name}</h3>
          <p className="mt-0.5 text-[12px] text-muted">{item.region}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-cream px-2.5 py-1 text-[11px] text-ink-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-dot" />
          {fill(dict.trips.slotLeft, { n: trip.slots })}
        </span>
      </header>

      {/* The whole photo opens the tour's picture set. */}
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={fill(dict.trips.showDetails, { name: item.name })}
        className="group relative block h-56 w-full overflow-hidden rounded-xl"
      >
        <Image
          src={trip.image}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-[11px] text-white backdrop-blur-md">
          {typeLabel}
        </span>
      </button>

      <footer className="flex items-center justify-between gap-3 px-1 pb-1 pt-4">
        <span className="text-[12px] text-muted">
          {fill(dict.trips.photoCount, { n: photos.length })}
        </span>
        <button
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          aria-label={fill(dict.trips.showDetails, { name: item.name })}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition hover:border-ink hover:text-ink active:bg-cream"
        >
          <ExpandIcon className="h-3.5 w-3.5" />
        </button>
      </footer>
    </article>
  );
}

/** The tour's photo set, with its practical details along the bottom. */
function TripDialog({
  trip,
  dict,
  onClose,
}: {
  trip: Trip;
  dict: Dictionary;
  onClose: () => void;
}) {
  const item = dict.trips.items[trip.id as keyof typeof dict.trips.items];
  const sources = tripGalleries[trip.id] ?? [trip.image];
  const photos = sources.map((src, i) => ({ src, alt: item.gallery[i] ?? item.alt }));

  return (
    <PhotoDialog
      photos={photos}
      title={item.name}
      subtitle={`${item.region} · ${dict.trips.types[trip.type]} · ${fill(dict.trips.slotLeft, {
        n: trip.slots,
      })}`}
      labels={{ close: dict.gallery.close, prev: dict.value.prev, next: dict.value.next }}
      onClose={onClose}
      details={
        <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-white/15 pt-4">
          <Detail icon={<BedIcon className="h-3.5 w-3.5" />} term={dict.trips.detailLabels.accommodation}>
            {item.accommodation}
          </Detail>
          <Detail icon={<CarIcon className="h-3.5 w-3.5" />} term={dict.trips.detailLabels.transport}>
            {item.transport}
          </Detail>
          <Detail icon={<MealIcon className="h-3.5 w-3.5" />} term={dict.trips.detailLabels.meals}>
            {item.meals}
          </Detail>
        </dl>
      }
    />
  );
}

function Detail({
  icon,
  term,
  children,
}: {
  icon: React.ReactNode;
  term: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[11px] text-white/60">
        {icon}
        {term}
      </dt>
      <dd className="mt-1 text-[12px] leading-snug text-white">{children}</dd>
    </div>
  );
}
