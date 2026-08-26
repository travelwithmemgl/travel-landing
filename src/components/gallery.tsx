import Image from "next/image";
import { galleryImages } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";

export function Gallery({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y border-line bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-[11px] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              {dict.gallery.badge}
            </span>
            <h2 className="display mt-6 text-4xl font-medium sm:text-5xl lg:text-6xl">
              {dict.gallery.title}
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted">{dict.gallery.caption}</p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {galleryImages.map((tile, i) => (
            <figure
              key={tile.src}
              className={`relative overflow-hidden rounded-2xl ${
                tile.wide ? "col-span-2 aspect-[8/3]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={tile.src}
                alt={dict.gallery.alts[i]}
                fill
                sizes="(min-width: 1024px) 25vw, 46vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
