import { contact, footerColumnHrefs, footerColumnKeys, photoCredits } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { FacebookIcon, GlobeIcon, MailIcon, PhoneIcon } from "./icons";

type ContactLink = {
  key: string;
  href: string;
  label: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  external?: boolean;
};

const contactLinks: ContactLink[] = [
  { key: "phone", href: contact.phoneHref, label: contact.phone, Icon: PhoneIcon },
  { key: "email", href: `mailto:${contact.email}`, label: contact.email, Icon: MailIcon },
  { key: "facebook", href: contact.facebook, label: "Facebook", Icon: FacebookIcon, external: true },
];

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <span className="flex items-center gap-2 text-[15px] font-medium tracking-tight">
              <GlobeIcon className="h-[18px] w-[18px]" />
              Travel With Me
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{dict.footer.tagline}</p>

            {/* The three ways to reach us, always one tap away. */}
            <ul className="mt-6 flex items-center gap-2.5">
              {contactLinks.map(({ key, href, label, Icon, external }) => (
                <li key={key}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                    aria-label={label}
                    title={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/60 hover:bg-white/10"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-16 lg:grid-cols-4">
            {footerColumnKeys.map((key) => (
              <div key={key}>
                <h3 className="text-[12px] font-medium">{dict.footer.columns[key].title}</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {dict.footer.columns[key].links.map((link, i) => (
                    <li key={link}>
                      <a
                        href={footerColumnHrefs[key][i] ?? "#top"}
                        className="text-[13px] text-white/70 transition hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-[12px] font-medium">{dict.footer.contact}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {contactLinks.map(({ key, href, label, Icon, external }) => (
                  <li key={key}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                      className="flex items-center gap-2 text-[13px] text-white/70 transition hover:text-white"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <details className="mt-14 border-t border-white/15 pt-6">
          <summary className="cursor-pointer list-none text-[12px] font-medium text-white/70 transition hover:text-white">
            {dict.credits.title} · {photoCredits.length}
          </summary>
          <p className="mt-3 max-w-2xl text-[12px] leading-relaxed text-white/60">
            {dict.credits.note}
          </p>
          <ul className="mt-4 flex flex-col gap-1.5">
            {photoCredits.map((credit) => (
              <li key={credit.file} className="text-[11px] leading-relaxed text-white/70">
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

        <p
          aria-hidden
          className="display mt-14 select-none text-[13vw] font-medium leading-none text-white/10"
        >
          Travel With Me
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-6 text-[12px] text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <span>{dict.footer.copyright}</span>
          <a href={contact.facebook} target="_blank" rel="noreferrer noopener" className="transition hover:text-white">
            facebook.com/travelwithme
          </a>
        </div>
      </div>
    </footer>
  );
}
