import type { ReactNode } from "react";

/** Badges read "02 Featured experiences" — the number carries the accent. */
export function SectionBadge({ children }: { children: string }) {
  const numbered = /^(\d+)\s+(.+)$/.exec(children);

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[11px] text-muted">
      {numbered ? (
        <>
          <span className="font-medium text-accent">{numbered[1]}</span>
          {numbered[2]}
        </>
      ) : (
        <>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {children}
        </>
      )}
    </span>
  );
}

const headingSizes = {
  lg: "text-5xl sm:text-6xl lg:text-7xl",
  md: "text-4xl sm:text-5xl lg:text-6xl",
} as const;

/**
 * The badge + headline + standfirst opener shared by every section, so they
 * stay in step instead of drifting apart across six copies.
 */
export function SectionHeader({
  badge,
  title,
  intro,
  size = "md",
  className = "",
}: {
  badge?: string;
  title: ReactNode;
  intro?: string;
  size?: keyof typeof headingSizes;
  className?: string;
}) {
  return (
    <div className={className} data-reveal>
      {badge && <SectionBadge>{badge}</SectionBadge>}

      <div
        className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
          badge ? "mt-6" : ""
        }`}
      >
        <h2 className={`display font-medium ${headingSizes[size]}`}>{title}</h2>
        {intro && <p className="max-w-xs text-sm leading-relaxed text-muted">{intro}</p>}
      </div>
    </div>
  );
}
