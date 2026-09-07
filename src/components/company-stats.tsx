import { statKeys, statValues } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";

/** The four numbers that say how far the company reaches. */
export function CompanyStats({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y border-line bg-cream">
      <dl
        data-reveal
        className="mx-auto grid max-w-[1440px] grid-cols-2 gap-10 px-5 py-16 sm:gap-6 sm:px-8 sm:py-20 lg:grid-cols-4"
      >
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
