import Image from "next/image";
import { testimonialAvatars, testimonialKeys } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { StarIcon } from "./icons";

export function Testimonials({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y border-line bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display text-5xl font-medium sm:text-6xl lg:text-7xl">
            {dict.testimonials.line1}
            <br />
            {dict.testimonials.line2}
          </h2>
          <span className="flex items-center gap-2 text-[13px] font-medium">
            <StarIcon className="h-3.5 w-3.5 text-amber-dot" />
            {dict.testimonials.rating}
          </span>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonialKeys.map((key) => {
            const item = dict.testimonials.items[key];
            return (
              <figure
                key={key}
                className="flex flex-col justify-between rounded-2xl border border-line bg-white p-7"
              >
                <blockquote className="text-[15px] leading-relaxed">“{item.quote}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={testimonialAvatars[key]}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </span>
                  <span>
                    <span className="block text-[13px] font-medium">{item.name}</span>
                    <span className="block text-[12px] text-muted">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
