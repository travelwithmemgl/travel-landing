import Image from "next/image";
import { contact, ctaImage } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { ArrowUpRightIcon, FacebookIcon, MailIcon, PhoneIcon } from "./icons";

export function CallToAction({ dict }: { dict: Dictionary }) {
  // No inbox behind a newsletter form, so the CTA hands over to real channels.
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(dict.cta.mailSubject)}`;

  return (
    <section id="contact" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28">
      <div data-reveal className="relative isolate overflow-hidden rounded-3xl">
        <Image
          src={ctaImage}
          alt={dict.cta.alt}
          fill
          sizes="(min-width: 1440px) 1376px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative flex flex-col items-center px-6 py-24 text-center sm:py-32">
          <h2 className="display text-balance text-5xl font-medium text-white sm:text-7xl lg:text-8xl">
            {dict.cta.title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/90">{dict.cta.body}</p>

          <div className="mt-9 flex w-full max-w-md flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
            <a
              href={mailto}
              className="focus-light flex min-h-12 items-center justify-center gap-1.5 rounded-full bg-white px-7 text-[13px] font-medium text-ink transition hover:bg-cream"
            >
              <MailIcon className="h-4 w-4" />
              {dict.cta.submit}
              <ArrowUpRightIcon className="h-4 w-4" />
            </a>

            <a
              href={contact.phoneHref}
              className="focus-light flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/40 px-6 text-[13px] font-medium text-white transition hover:bg-white/15"
            >
              <PhoneIcon className="h-4 w-4" />
              <span className="sm:hidden">{dict.cta.call}</span>
              <span className="hidden sm:inline">{contact.phone}</span>
            </a>

            <a
              href={contact.facebook}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={dict.cta.facebook}
              className="focus-light flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/40 px-6 text-[13px] font-medium text-white transition hover:bg-white/15"
            >
              <FacebookIcon className="h-4 w-4" />
              <span className="sm:hidden">{dict.cta.facebook}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
