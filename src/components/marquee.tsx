import type { Dictionary } from "@/lib/dictionary";

export function Marquee({ dict }: { dict: Dictionary }) {
  const row = [...dict.marquee, ...dict.marquee];

  return (
    <div className="overflow-hidden border-y border-line bg-cream py-5">
      <div className="flex w-max animate-marquee items-center">
        {row.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center whitespace-nowrap">
            <span className="display px-8 text-2xl font-medium text-ink/80 sm:text-3xl">{word}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
