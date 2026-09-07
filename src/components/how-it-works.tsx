import { stepKeys } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { SectionHeader } from "./section-header";

const stepNumbers: Record<(typeof stepKeys)[number], string> = {
  brief: "01",
  shape: "02",
  go: "03",
};

export function HowItWorks({ dict }: { dict: Dictionary }) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeader
        badge={dict.how.badge}
        title={
          <>
            {dict.how.line1}
            <br />
            {dict.how.line2}
          </>
        }
        intro={dict.how.intro}
      />

      <div
        data-reveal
        className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3"
      >
        {stepKeys.map((key) => (
          <div key={key} className="bg-white p-7 sm:p-9">
            <span className="text-[11px] font-medium text-accent">{stepNumbers[key]}</span>
            <h3 className="display mt-6 text-2xl font-medium">{dict.how.steps[key].title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{dict.how.steps[key].body}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
