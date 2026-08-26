import Image from "next/image";
import { experienceImages, experienceKeys } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { ArrowUpRightIcon } from "./icons";

/**
 * The long-form stories. Each block alternates sides on large screens; the
 * inset photo tucks into the corner the text is leaving free.
 */
export function Experiences({ dict }: { dict: Dictionary }) {
  return (
    <section id="experiences" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28">
      <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[11px] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-ink" />
        {dict.experiences.badge}
      </span>

      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="display text-5xl font-medium sm:text-6xl lg:text-7xl">
          {dict.experiences.line1}
          <br />
          {dict.experiences.line2}
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted">{dict.experiences.intro}</p>
      </div>

      <div className="mt-16 flex flex-col gap-20 sm:gap-28">
        {experienceKeys.map((key, i) => {
          const item = dict.experiences.items[key];
          const images = experienceImages[key];
          const flipped = i % 2 === 1;

          return (
            <article
              key={key}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div
                className={`relative ${flipped ? "lg:order-2" : ""}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src={images.main}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 92vw"
                    className="object-cover"
                  />
                </div>

                <div
                  className={`absolute -bottom-8 hidden aspect-square w-40 overflow-hidden rounded-2xl ring-8 ring-white sm:block xl:w-48 ${
                    flipped ? "right-6" : "left-6"
                  }`}
                >
                  <Image
                    src={images.inset}
                    alt={item.altInset}
                    fill
                    sizes="192px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className={flipped ? "lg:order-1" : ""}>
                <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.12em] text-muted">
                  <span className="h-px w-8 bg-accent" />
                  {item.kicker}
                </p>

                <h3 className="display mt-5 text-3xl font-medium sm:text-4xl lg:text-[2.75rem]">
                  {item.title}
                </h3>

                <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{item.lead}</p>

                <div className="mt-4 flex flex-col gap-3">
                  {item.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <ul className="mt-7 flex flex-col gap-2.5 border-t border-line pt-6">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-[13px]">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <a
                  href="#trips"
                  className="mt-8 inline-flex min-h-12 items-center gap-1.5 rounded-full bg-ink px-6 text-[13px] font-medium text-white transition hover:bg-ink-soft active:scale-[0.98]"
                >
                  {dict.experiences.readMore}
                  <ArrowUpRightIcon className="h-4 w-4" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
