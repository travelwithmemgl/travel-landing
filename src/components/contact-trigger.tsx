"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { contact } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import {
  ArrowUpRightIcon,
  CloseIcon,
  FacebookIcon,
  GlobeIcon,
  MailIcon,
  PhoneIcon,
} from "./icons";

/**
 * Contact is an action rather than a destination: every "Contact" control on
 * the site opens this dialog with the three real channels, so the phone number
 * is one tap away from wherever the reader happens to be.
 *
 * Each trigger owns its own dialog — only one can be open at a time, and the
 * markup only exists while it is. It renders into <body> rather than in place:
 * the triggers sit inside the header and the footer, which set their own text
 * colour and a backdrop filter, and both would otherwise reach the panel — the
 * filter even traps `position: fixed` inside the header's own box.
 */
export function ContactTrigger({
  dict,
  className,
  children,
}: {
  dict: Dictionary;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={className}
      >
        {children}
      </button>

      {open &&
        createPortal(
          <ContactDialog
            dict={dict}
            onClose={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
          />,
          document.body,
        )}
    </>
  );
}

type Channel = {
  key: string;
  label: string;
  value: string;
  href: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  external?: boolean;
};

function ContactDialog({ dict, onClose }: { dict: Dictionary; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(dict.cta.mailSubject)}`;
  const channels: Channel[] = [
    { key: "phone", label: dict.channels.phone, value: contact.phone, href: contact.phoneHref, Icon: PhoneIcon },
    { key: "email", label: dict.channels.email, value: contact.email, href: mailto, Icon: MailIcon },
    {
      key: "facebook",
      label: dict.channels.facebook,
      value: "facebook.com/travelwithme",
      href: contact.facebook,
      Icon: FacebookIcon,
      external: true,
    },
  ];

  // While it is up the dialog owns the keyboard and the scroll. The previous
  // overflow is restored rather than cleared, in case something else had
  // already locked the page before this opened on top of it.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const focusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") return onClose();
      if (event.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <div
        aria-hidden
        onClick={onClose}
        className="dialog-backdrop absolute inset-0 bg-ink/55 backdrop-blur-[3px]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="dialog-panel pb-safe relative max-h-[92svh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white text-ink shadow-2xl shadow-black/30 sm:rounded-3xl"
      >
        {/* Docked to the bottom edge on a phone, so it gets a sheet's grab handle. */}
        <div aria-hidden className="flex justify-center pt-3 sm:hidden">
          <span className="h-1 w-10 rounded-full bg-line" />
        </div>

        <div className="border-b border-line bg-cream px-6 pb-7 pt-6 sm:px-9 sm:pt-8">
          <div className="flex items-start justify-between gap-4">
            <span className="flex items-center gap-2 text-[12px] font-medium text-ink-soft">
              <GlobeIcon className="h-[18px] w-[18px] text-accent" />
              {dict.proof.brand}
            </span>

            <button
              type="button"
              onClick={onClose}
              aria-label={dict.gallery.close}
              className="-mr-1 -mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink transition hover:bg-sand"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <h2 id={titleId} className="display mt-5 text-3xl font-medium text-ink sm:text-4xl">
            {dict.channels.title}
          </h2>
          <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-muted">
            {dict.channels.note}
          </p>
        </div>

        <ul className="flex flex-col">
          {channels.map(({ key, label, value, href, Icon, external }) => (
            <li key={key} className="border-b border-line last:border-b-0">
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                className="group flex items-center gap-4 px-6 py-5 transition hover:bg-cream sm:gap-5 sm:px-9 sm:py-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream text-ink transition duration-300 group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-muted">
                    {label}
                  </span>
                  <span className="display mt-1 block truncate text-lg font-medium text-ink sm:text-xl">
                    {value}
                  </span>
                </span>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition group-hover:border-ink group-hover:text-ink">
                  <ArrowUpRightIcon className="h-4 w-4" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
