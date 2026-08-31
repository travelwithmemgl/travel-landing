import { serviceKeys } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { CheckIcon, CompassIcon, MountainIcon, PassportIcon, PlaneIcon } from "./icons";
import { SectionHeader } from "./section-header";

const serviceIcons = {
  outbound: PlaneIcon,
  domestic: MountainIcon,
  custom: CompassIcon,
  advice: PassportIcon,
} as const;

export function Services({ dict }: { dict: Dictionary }) {
  return (
    <section id="services" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeader
        badge={dict.services.badge}
        title={
          <>
            {dict.services.line1}
            <br />
            {dict.services.line2}
          </>
        }
        intro={dict.services.intro}
      />

      <div data-reveal className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {serviceKeys.map((key) => {
          const Icon = serviceIcons[key];
          return (
            <div key={key} className="bg-white p-7 sm:p-8">
              <Icon className="h-6 w-6 text-accent" />
              <h3 className="mt-6 text-[15px] font-medium">{dict.services.items[key].title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {dict.services.items[key].body}
              </p>
            </div>
          );
        })}
      </div>

      <div data-reveal className="mt-5 rounded-2xl bg-cream p-7 sm:p-10">
        <h3 className="display text-2xl font-medium sm:text-3xl">
          {dict.services.advantages.title}
        </h3>
        <ul className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {dict.services.advantages.items.map((advantage) => (
            <li key={advantage} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                <CheckIcon className="h-3 w-3" />
              </span>
              <span className="text-sm leading-relaxed">{advantage}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
