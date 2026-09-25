"use client";

import Image from "next/image";
import { useState } from "react";
import { galleryImages } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { PhotoDialog } from "./photo-dialog";
import { SectionHeader } from "./section-header";
import { blurOf } from "@/lib/blur";

export function Gallery({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState<number | null>(null);

  const photos = galleryImages.map((tile, i) => ({
    src: tile.src,
    alt: dict.gallery.alts[i],
  }));

  return (
    <section className="border-y border-line bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeader badge={dict.gallery.badge} title={dict.gallery.title} intro={dict.gallery.caption} />

        {/* `dense` so the tall tile does not leave a hole beside it: without it the
            grid refuses to backfill the gap a row-spanning item opens up. */}
        <div
          data-reveal
          className="mt-12 grid grid-flow-row-dense grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {galleryImages.map((tile, i) => (
            <button
              key={tile.src}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${dict.gallery.view} — ${dict.gallery.alts[i]}`}
              className={`group relative overflow-hidden rounded-2xl ${
                tile.wide
                  ? "col-span-2 aspect-[8/3]"
                  : tile.tall
                    ? "row-span-2"
                    : "aspect-[4/3]"
              }`}
            >
              <Image
                src={tile.src}
                placeholder={blurOf(tile.src)}
                alt={dict.gallery.alts[i]}
                fill
                sizes="(min-width: 1024px) 25vw, 46vw"
                quality={90}
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <PhotoDialog
          photos={photos}
          startIndex={open}
          title={dict.gallery.title}
          labels={{ close: dict.gallery.close, prev: dict.value.prev, next: dict.value.next }}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
