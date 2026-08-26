import { serviceKeys } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { CheckIcon, CompassIcon, MountainIcon, PassportIcon, PlaneIcon } from "./icons";

const serviceIcons = {
  outbound: PlaneIcon,
  domestic: MountainIcon,
  custom: CompassIcon,
  advice: PassportIcon,
} as const;

export function Services({ dict }: { dict: Dictionary }) {
  return (
    <section id="services" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28">
      <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[11px] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-ink" />
        {dict.services.badge}
      </span>

      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="display max-w-2xl text-4xl font-medium sm:text-5xl lg:text-6xl">
          {dict.services.line1}
          <br />
          {dict.services.line2}
        </h2>
        <p className="max-w-xs text-sm leading-relaxed text-muted">{dict.services.intro}</p>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
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

      <div className="mt-5 rounded-2xl bg-cream p-7 sm:p-10">
        <h3 className="display text-2xl font-medium sm:text-3xl">
          {dict.services.advantages.title}
        </h3>
        <ul className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {dict.services.advantages.items.map((advantage) => (
            <li key={advantage} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-white">
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
