"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "./icons";

export type Photo = { src: string; alt: string };

export type PhotoDialogLabels = { close: string; prev: string; next: string };

/**
 * Full-screen photo viewer shared by the gallery mosaic and the tour cards.
 * Arrow keys step through the set, Escape closes, and focus stays inside while
 * it is open.
 */
export function PhotoDialog({
  photos,
  startIndex = 0,
  labels,
  title,
  subtitle,
  details,
  onClose,
}: {
  photos: Photo[];
  startIndex?: number;
  labels: PhotoDialogLabels;
  title: string;
  subtitle?: string;
  details?: React.ReactNode;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + photos.length) % photos.length),
    [photos.length],
  );

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    closeRef.current?.focus();

    const focusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") return onClose();
      if (event.key === "ArrowRight") return step(1);
      if (event.key === "ArrowLeft") return step(-1);
      if (event.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, step]);

  const photo = photos[index];

  return (
    <div className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-sm">
      {/* Decoration: keyboard users close with Escape or the close button. */}
      <div aria-hidden onClick={onClose} className="absolute inset-0 cursor-zoom-out" />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="pb-safe relative flex h-full flex-col"
      >
        <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-8 sm:pt-8">
          <div className="min-w-0">
            <p className="truncate text-[15px] font-medium text-white">{title}</p>
            {subtitle && <p className="mt-0.5 truncate text-[12px] text-white/60">{subtitle}</p>}
          </div>

          <button
            ref={closeRef}
            type="button"
            aria-label={labels.close}
            onClick={onClose}
            className="focus-light flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white/15"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="pointer-events-none relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8">
          <div className="relative h-full w-full max-w-5xl">
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {photos.length > 1 && (
          <div className="relative flex shrink-0 items-center justify-center gap-3 px-5 sm:px-8">
            <ViewerButton label={labels.prev} onClick={() => step(-1)}>
              <ArrowLeftIcon className="h-4 w-4" />
            </ViewerButton>

            <div className="flex items-center gap-1.5">
              {photos.map((item, i) => (
                <button
                  key={item.src}
                  type="button"
                  aria-label={item.alt}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-white" : "w-1.5 bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            <ViewerButton label={labels.next} onClick={() => step(1)}>
              <ArrowRightIcon className="h-4 w-4" />
            </ViewerButton>
          </div>
        )}

        <div className="relative px-5 pb-5 pt-4 sm:px-8 sm:pb-8">
          <p className="text-[12px] leading-relaxed text-white/70">{photo.alt}</p>
          {details}
        </div>
      </div>
    </div>
  );
}

function ViewerButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="focus-light flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white/15"
    >
      {children}
    </button>
  );
}
