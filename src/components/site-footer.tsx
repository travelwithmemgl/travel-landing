import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { contact, footerColumnKeys, footerColumnSlugs, pagePath, photoCredits } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { ContactTrigger } from "./contact-trigger";
import {
  ArrowUpIcon,
  ArrowUpRightIcon,
  ChevronDownIcon,
  FacebookIcon,
  MailIcon,
  PhoneIcon,
} from "./icons";

type ContactCard = {
  key: "phone" | "email" | "facebook";
  href: string;
  value: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  external?: boolean;
};

const contactCards: ContactCard[] = [
  { key: "phone", href: contact.phoneHref, value: contact.phone, Icon: PhoneIcon },
  { key: "email", href: `mailto:${contact.email}`, value: contact.email, Icon: MailIcon },
  { key: "facebook", href: contact.facebook, value: "Travel With Me", Icon: FacebookIcon, external: true },
];

/**
 * The closing wordmark is filled with the Flaming Cliffs at sundown — blue sky
 * running into red rock — instead of a flat tint. `getImageProps` sends the
 * file through the image optimizer, and its 1x/2x srcSet maps straight onto
 * `image-set()`, so the letters get a resized AVIF/WebP, not the source JPEG.
 */
const wordmarkFill = (() => {
  const { srcSet = "" } = getImageProps({
    src: "/photos/gen-gobi-cliffs.jpg",
    alt: "",
    width: 1024,
    height: 688,
  }).props;
  const set = srcSet
    .split(", ")
    .map((entry) => {
      const [url, density] = entry.split(" ");
      return `url("${url}") ${density}`;
    })
    .join(", ");
  return `image-set(${set})`;
})();

/** Small tracked caps — the same voice as the header nav and section badges. */
const eyebrow = "text-[11px] font-medium uppercase tracking-[0.16em] text-white/45";

/** A hairline that draws in under the text on hover, as in the header nav. */
const linkStyle =
  "bg-linear-to-r from-white to-white bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 text-left text-[14px] text-white/70 transition-[color,background-size] duration-300 hover:bg-[length:100%_1px] hover:text-white";

export function SiteFooter({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <footer className="relative isolate mt-auto overflow-hidden bg-ink text-white">
      {/* A faint wash of the brand blue, so the black has some depth to it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-96 w-[min(80rem,160%)] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            {/* The mark knocked out to white, as it is over the hero. */}
            <Image
              src="/logo.png"
              alt="Travel With Me"
              width={1596}
              height={979}
              className="h-14 w-auto brightness-0 invert sm:h-16"
            />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/65">
              {dict.footer.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-7">
            {footerColumnKeys.map((key) => (
              <div key={key}>
                <h3 className={eyebrow}>{dict.footer.columns[key].title}</h3>
                <ul className="mt-5 flex flex-col items-start gap-3">
                  {dict.footer.columns[key].links.map((link, i) => {
                    const slug = footerColumnSlugs[key][i];
                    return (
                      <li key={link}>
                        {slug === null ? (
                          <ContactTrigger dict={dict} className={linkStyle}>
                            {link}
                          </ContactTrigger>
                        ) : (
                          <Link href={pagePath(lang, slug ?? "")} className={linkStyle}>
                            {link}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* The three ways to reach us, each one a card with its number or address in full. */}
        <div className="mt-16 sm:mt-20">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h3 className={eyebrow}>{dict.footer.contact}</h3>
            <p className="text-[12px] text-white/45">{dict.channels.note}</p>
          </div>

          <ul className="mt-5 grid gap-3 md:grid-cols-3">
            {contactCards.map(({ key, href, value, Icon, external }) => (
              <li key={key}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  className="focus-light group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:border-white/25 hover:bg-white/[0.07] sm:p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition duration-300 group-hover:bg-white group-hover:text-ink">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] text-white/50">{dict.channels[key]}</span>
                    <span className="mt-0.5 block truncate text-[15px] font-medium tracking-tight sm:text-base">
                      {value}
                    </span>
                  </span>
                  <ArrowUpRightIcon className="ml-auto h-4 w-4 shrink-0 text-white/35 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/*
          Sized in container units so the name spans the column edge to edge at
          every width. The fill colour stands in until the photograph arrives.
        */}
        <div aria-hidden className="@container mt-16 select-none sm:mt-24">
          <p
            className="display whitespace-nowrap bg-[#c4552b] bg-cover bg-clip-text text-center text-[length:14.8cqw] font-semibold text-transparent"
            style={{ backgroundImage: wordmarkFill, backgroundPosition: "center 16%" }}
          >
            Travel With Me
          </p>
        </div>

        <details className="group mt-10 border-t border-white/10 pt-5">
          <summary className="flex cursor-pointer list-none items-center gap-1.5 text-[12px] font-medium text-white/60 transition hover:text-white [&::-webkit-details-marker]:hidden">
            {dict.credits.title} · {photoCredits.length}
            <ChevronDownIcon className="h-3 w-3 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 max-w-2xl text-[12px] leading-relaxed text-white/55">
            {dict.credits.note}
          </p>
          <ul className="mt-4 gap-x-8 sm:columns-2 lg:columns-3">
            {photoCredits.map((credit) => (
              <li key={credit.file} className="mb-1.5 break-inside-avoid text-[11px] leading-relaxed text-white/60">
                <a
                  href={credit.page}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline decoration-white/25 underline-offset-2 transition hover:text-white"
                >
                  {credit.file}
                </a>
                {" — "}
                {credit.author} · {credit.license}
              </li>
            ))}
          </ul>
        </details>

        <div className="mt-5 flex flex-col gap-4 border-t border-white/10 py-6 text-[12px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <span>{dict.footer.copyright}</span>
          <a
            href="#top"
            className="focus-light group inline-flex items-center gap-2 self-start font-medium text-white/70 transition hover:text-white sm:self-auto"
          >
            {dict.footer.backToTop}
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition duration-300 group-hover:-translate-y-0.5 group-hover:border-white/60">
              <ArrowUpIcon className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
