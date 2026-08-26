import Image from "next/image";
import { heroImage } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";

const fieldKeys = ["activity", "location"] as const;

export function Hero({ dict }: { dict: Dictionary }) {
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/45" />

      <div className="relative flex min-h-[36rem] flex-col items-center justify-center px-6 pb-44 pt-24 text-center sm:min-h-[660px] sm:pb-40 sm:pt-28 lg:h-full">
        <span className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/75">
          <span className="h-px w-8 bg-white/50" />
          {dict.hero.eyebrow}
          <span className="h-px w-8 bg-white/50" />
        </span>

        <h1 className="display mt-4 text-[19vw] font-medium text-white sm:mt-5 sm:text-[18vw] lg:text-[12rem]">
          {dict.hero.title}
        </h1>

        <p className="mt-5 max-w-md text-balance text-[13px] leading-relaxed text-white/90 sm:text-[15px]">
          {dict.hero.slogan}
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div className="grid grid-cols-2 bg-black/25 backdrop-blur-md md:grid-cols-[repeat(2,1fr)_auto]">
          {fieldKeys.map((key, i) => {
            const field = dict.hero.fields[key];
            return (
              <button
                key={key}
                type="button"
                className={`group min-h-[3.75rem] px-4 py-3 text-left transition hover:bg-white/10 active:bg-white/15 md:min-h-0 md:px-7 md:py-5 ${
                  i > 0 ? "md:border-l md:border-white/15" : ""
                } ${i % 2 === 1 ? "border-l border-white/15 md:border-l" : ""} ${
                  i > 1 ? "border-t border-white/15 md:border-t-0" : ""
                }`}
              >
                <span className="block text-[11px] font-medium text-white sm:text-xs">
                  {field.label}
                </span>
                <span className="mt-1 block truncate text-[11px] text-white/55 sm:text-xs">
                  {field.value}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            className="col-span-2 min-h-[3.25rem] bg-white px-10 text-sm font-medium text-ink transition hover:bg-cream active:bg-sand md:col-span-1 md:py-5"
          >
            {dict.hero.explore}
          </button>
        </div>
      </div>
    </section>
  );
}
