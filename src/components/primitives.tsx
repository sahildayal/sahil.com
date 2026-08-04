import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-5xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Section heading. The eyebrow is a label, not decoration — it names what the
 * section contains so the page can be skimmed by its rules alone.
 */
export function SectionHead({
  eyebrow,
  title,
  meta,
}: {
  eyebrow: string;
  title?: string;
  meta?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
      <div className="flex items-baseline gap-4">
        <span className="eyebrow">{eyebrow}</span>
        {title ? (
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide">
            {title}
          </h2>
        ) : null}
      </div>
      {meta ? <span className="eyebrow shrink-0">{meta}</span> : null}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="border border-rule px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
      {children}
    </span>
  );
}

/** A number that earns its size. Used for the metrics that carry the story. */
export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-rule-strong pt-3">
      <p className="tabular text-xl font-medium leading-none text-clay sm:text-2xl">
        {value}
      </p>
      <p className="mt-2 text-sm leading-snug text-muted">{label}</p>
    </div>
  );
}
