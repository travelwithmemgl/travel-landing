import Image from "next/image";
import { ctaImage } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { ArrowUpRightIcon } from "./icons";

export function CallToAction({ dict }: { dict: Dictionary }) {
  return (
    <section id="contact" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28">
      <div className="relative isolate overflow-hidden rounded-3xl">
        <Image
          src={ctaImage}
          alt={dict.cta.alt}
          fill
          sizes="(min-width: 1440px) 1376px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative flex flex-col items-center px-6 py-24 text-center sm:py-32">
          <h2 className="display text-5xl font-medium text-white sm:text-7xl lg:text-8xl">
            {dict.cta.title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85">{dict.cta.body}</p>

          <form
            className="mt-9 flex w-full max-w-md flex-col gap-2 sm:flex-row"
            action="#"
            aria-label={dict.cta.formLabel}
          >
            <input
              type="email"
              required
              placeholder={dict.cta.placeholder}
              aria-label={dict.cta.emailLabel}
              className="w-full rounded-full bg-white/15 px-5 py-3.5 text-sm text-white placeholder:text-white/55 outline-none backdrop-blur-md focus:bg-white/25"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-white px-6 py-3.5 text-[13px] font-medium text-ink transition hover:bg-cream"
            >
              {dict.cta.submit}
              <ArrowUpRightIcon className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
