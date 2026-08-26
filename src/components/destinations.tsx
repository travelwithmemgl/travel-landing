"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  dateKeys,
  priceKeys,
  regionKeys,
  trips,
  tripTypeKeys,
  type DateKey,
  type PriceKey,
  type RegionKey,
  type Trip,
  type TripTypeKey,
} from "@/lib/data";
import { fill, type Dictionary } from "@/lib/dictionary";
import {
  BedIcon,
  CalendarIcon,
  CarIcon,
  ChevronDownIcon,
  ExpandIcon,
  GroupIcon,
  MealIcon,
  TagIcon,
} from "./icons";

/** "" means "no filter" and renders the placeholder option. */
type Filters = {
  destination: RegionKey | "";
  category: TripTypeKey | "";
  price: PriceKey | "";
  date: DateKey | "";
};

const emptyFilters: Filters = { destination: "", category: "", price: "", date: "" };

function matchesPrice(trip: Trip, key: PriceKey | "") {
  if (key === "lt1000") return trip.amount < 1000;
  if (key === "mid") return trip.amount >= 1000 && trip.amount <= 1500;
  if (key === "gt1500") return trip.amount > 1500;
  return true;
}

function matchesDate(trip: Trip, key: DateKey | "") {
  if (key === "" || key === "any") return true;
  return trip.month === key;
}

export function Destinations({ dict }: { dict: Dictionary }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [applied, setApplied] = useState<Filters>(emptyFilters);
  const [expanded, setExpanded] = useState<string | null>(trips[1].id);

  const visible = useMemo(
    () =>
      trips.filter(
        (trip) =>
          (applied.destination === "" || trip.region === applied.destination) &&
          (applied.category === "" || trip.type === applied.category) &&
          matchesPrice(trip, applied.price) &&
          matchesDate(trip, applied.date),
      ),
    [applied],
  );

  return (
    <section id="trips" className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32">
      <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[11px] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-ink" />
        {dict.trips.badge}
      </span>

      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="display text-5xl font-medium sm:text-6xl lg:text-7xl">{dict.trips.title}</h2>
        <p className="max-w-xs text-sm leading-relaxed text-muted">{dict.trips.intro}</p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-[repeat(4,1fr)_auto]">
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
        <Field
          label={dict.trips.filters.price}
          placeholder={dict.trips.placeholders.price}
          value={filters.price}
          options={priceKeys.map((k) => ({ value: k, label: dict.trips.prices[k] }))}
          onChange={(v) => setFilters((f) => ({ ...f, price: v as PriceKey | "" }))}
        />
        <Field
          label={dict.trips.filters.date}
          placeholder={dict.trips.placeholders.date}
          value={filters.date}
          options={dateKeys.map((k) => ({ value: k, label: dict.trips.dates[k] }))}
          onChange={(v) => setFilters((f) => ({ ...f, date: v as DateKey | "" }))}
        />

        <div className="col-span-2 flex items-center bg-white p-3 lg:col-span-1">
          <button
            type="button"
            onClick={() => setApplied(filters)}
            className="min-h-12 w-full rounded-xl bg-ink px-8 text-[13px] font-medium text-white transition hover:bg-ink-soft active:scale-[0.99]"
          >
            {dict.trips.discover}
          </button>
        </div>
      </div>

      <div className="no-scrollbar edge-scroll -mx-5 mt-8 flex items-start gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {visible.map((trip) => (
          <div
            key={trip.id}
            className="w-[85vw] max-w-sm shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink"
          >
            <TripCard
              trip={trip}
              dict={dict}
              open={expanded === trip.id}
              onToggle={() => setExpanded((id) => (id === trip.id ? null : trip.id))}
            />
          </div>
        ))}
      </div>

      {visible.length > 1 && (
        <p className="mt-4 text-center text-[11px] text-muted sm:hidden">{dict.trips.swipe}</p>
      )}

      {visible.length === 0 && (
        <p className="mt-16 text-center text-sm text-muted">{dict.trips.empty}</p>
      )}
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
          className="w-full appearance-none bg-transparent pr-6 text-[12px] text-muted outline-none"
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
  open,
  onToggle,
}: {
  trip: Trip;
  dict: Dictionary;
  open: boolean;
  onToggle: () => void;
}) {
  const item = dict.trips.items[trip.id as keyof typeof dict.trips.items];
  const typeLabel = dict.trips.types[trip.type];

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

      <div className="relative h-56 overflow-hidden rounded-xl">
        <Image
          src={trip.image}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
        <span className="absolute right-3 top-3 rounded-full bg-black/35 px-3 py-1 text-[11px] text-white backdrop-blur-md">
          {typeLabel}
        </span>

        <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center gap-1.5">
          <Pill icon={<TagIcon className="h-3.5 w-3.5" />}>{trip.priceLabel}</Pill>
          <Pill icon={<GroupIcon className="h-3.5 w-3.5" />}>{typeLabel}</Pill>
          <Pill icon={<CalendarIcon className="h-3.5 w-3.5" />}>{item.dates}</Pill>
        </div>
      </div>

      {open && (
        <dl className="grid grid-cols-3 gap-3 px-1 pt-4">
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
      )}

      <footer className="px-1 pb-1 pt-4">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-label={fill(open ? dict.trips.hideDetails : dict.trips.showDetails, {
            name: item.name,
          })}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition hover:border-ink hover:text-ink active:bg-cream"
        >
          <ExpandIcon className="h-3.5 w-3.5" />
        </button>
      </footer>
    </article>
  );
}

function Pill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 text-[11px] text-white backdrop-blur-md">
      {icon}
      {children}
    </span>
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
      <dt className="flex items-center gap-1.5 text-[11px] text-muted">
        {icon}
        {term}
      </dt>
      <dd className="mt-1 text-[12px] leading-snug">{children}</dd>
    </div>
  );
}
