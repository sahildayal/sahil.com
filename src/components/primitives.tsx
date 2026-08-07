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
 * Section heading. No underline rule — separation comes from space and from
 * the tide lines between sections. The label is a quiet italic rather than
 * spaced-out mono caps.
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
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <div className="flex flex-wrap items-baseline gap-x-3">
        <span className="eyebrow">{eyebrow}</span>
        {title ? (
          <h2 className="font-display text-lg font-semibold sm:text-xl">
            {title}
          </h2>
        ) : null}
      </div>
      {meta ? (
        <span className="tabular shrink-0 text-xs text-muted">{meta}</span>
      ) : null}
    </div>
  );
}

/** Tech tag — a soft chip in the sea wash rather than an outlined box. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-[var(--radius-card)] bg-sea-wash px-2.5 py-1 font-mono text-[0.7rem] text-ink-soft">
      {children}
    </span>
  );
}

/** A number that earns its size. Set in the rock colour so figures read warm. */
export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[var(--radius-card)] bg-paper-raised px-4 py-4">
      <p className="tabular text-xl font-medium leading-none text-rock sm:text-2xl">
        {value}
      </p>
      <p className="mt-2 text-sm leading-snug text-muted">{label}</p>
    </div>
  );
}
