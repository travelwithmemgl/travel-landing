import { statKeys, statValues, stepKeys } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";

const stepNumbers: Record<(typeof stepKeys)[number], string> = {
  brief: "01",
  shape: "02",
  go: "03",
};

export function HowItWorks({ dict }: { dict: Dictionary }) {
  return (
    <section id="how" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28">
      <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[11px] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-ink" />
        {dict.how.badge}
      </span>

      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="display text-4xl font-medium sm:text-5xl lg:text-6xl">
          {dict.how.line1}
          <br />
          {dict.how.line2}
        </h2>
        <p className="max-w-xs text-sm leading-relaxed text-muted">{dict.how.intro}</p>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {stepKeys.map((key) => (
          <div key={key} className="bg-white p-7 sm:p-9">
            <span className="text-[11px] text-muted">{stepNumbers[key]}</span>
            <h3 className="display mt-6 text-2xl font-medium">{dict.how.steps[key].title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{dict.how.steps[key].body}</p>
          </div>
        ))}
      </div>

      <dl className="mt-14 grid grid-cols-2 gap-8 sm:gap-6 lg:grid-cols-4">
        {statKeys.map((key) => (
          <div key={key}>
            <dt className="display text-4xl font-medium sm:text-5xl">{statValues[key]}</dt>
            <dd className="mt-2 text-[13px] text-muted">{dict.how.stats[key]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
