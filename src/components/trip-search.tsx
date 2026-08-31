"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { RegionKey, TripTypeKey } from "@/lib/data";

/** "" means "no filter" and renders the placeholder option. */
export type TripFilters = {
  destination: RegionKey | "";
  category: TripTypeKey | "";
};

export const emptyTripFilters: TripFilters = { destination: "", category: "" };

type TripSearchValue = {
  applied: TripFilters;
  /** Applies a filter set and brings the tour grid into view. */
  search: (filters: TripFilters) => void;
};

const TripSearchContext = createContext<TripSearchValue | null>(null);

/**
 * Shared between the hero search bar and the tour grid, so the fields on the
 * hero actually drive the list further down the page.
 */
export function TripSearchProvider({ children }: { children: React.ReactNode }) {
  const [applied, setApplied] = useState<TripFilters>(emptyTripFilters);

  const search = useCallback((filters: TripFilters) => {
    setApplied(filters);

    const target = document.getElementById("trips");
    if (!target) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  }, []);

  const value = useMemo(() => ({ applied, search }), [applied, search]);

  return <TripSearchContext.Provider value={value}>{children}</TripSearchContext.Provider>;
}

export function useTripSearch() {
  const value = useContext(TripSearchContext);
  if (!value) throw new Error("useTripSearch must be used inside <TripSearchProvider>");
  return value;
}
