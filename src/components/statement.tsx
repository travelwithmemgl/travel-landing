import Image from "next/image";
import { proofAvatars, proofExtra } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { CrosshairIcon, HeartIcon, StarIcon } from "./icons";

export function Statement({ dict }: { dict: Dictionary }) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-14 sm:px-8 sm:pt-20">
      <div className="flex items-center justify-between gap-6">
        <div className="hidden flex-1 md:block" />

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="flex items-center gap-2 text-[13px] font-medium">
            <HeartIcon className="h-3.5 w-3.5 text-accent" />
            {dict.proof.brand}
          </span>
          <span className="flex items-center gap-2 text-[13px] font-medium">
            <StarIcon className="h-3.5 w-3.5 text-amber-dot" />
            {dict.proof.rating}
          </span>
        </div>

        <div className="hidden flex-1 justify-end md:flex">
          <div className="flex items-center">
            {proofAvatars.map((src, i) => (
              <span
                key={src}
                className="relative -ml-2 h-9 w-9 overflow-hidden rounded-lg ring-2 ring-white first:ml-0"
                style={{ zIndex: proofAvatars.length - i }}
              >
                <Image src={src} alt="" fill sizes="36px" className="object-cover" />
              </span>
            ))}
            <span className="-ml-2 flex h-9 w-9 items-center justify-center rounded-lg bg-cream text-[11px] font-medium text-muted ring-2 ring-white">
              {proofExtra}
            </span>
          </div>
        </div>
      </div>

      <div className="relative mt-14 sm:mt-20">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-y-1/3 translate-x-6 rounded-full bg-sand/70 blur-[2px] sm:h-56 sm:w-56"
        />
        <h2 className="display relative text-balance text-center text-[8vw] font-medium sm:text-[6.5vw] lg:text-[4.5rem]">
          {dict.statement.line1}
          <br />
          {dict.statement.line2}
        </h2>
      </div>

      <div className="mt-10 flex items-center justify-center gap-0 sm:mt-14">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="h-px w-24 border-t border-dashed border-accent/60 sm:w-32" />
        <CrosshairIcon className="h-6 w-6 text-accent" />
      </div>
    </section>
  );
}
