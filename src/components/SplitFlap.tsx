"use client";

import { useEffect, useRef, useState } from "react";

const ALPHABET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/-.&";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * One flap. Cycles forward through the alphabet until it lands on `target`,
 * which is how a real board works — it can't jump, it has to run the drum.
 */
function Flap({
  target,
  delay,
  reduced,
}: {
  target: string;
  delay: number;
  reduced: boolean;
}) {
  const [char, setChar] = useState(" ");
  const charRef = useRef(" ");

  useEffect(() => {
    charRef.current = char;
  }, [char]);

  useEffect(() => {
    const upper = (target || " ").toUpperCase();
    const targetIdx = Math.max(0, ALPHABET.indexOf(upper));

    if (reduced) {
      setChar(ALPHABET[targetIdx]);
      return;
    }

    let cur = ALPHABET.indexOf(charRef.current.toUpperCase());
    if (cur < 0) cur = 0;
    if (cur === targetIdx) return;

    let cancelled = false;
    let stepTimer: ReturnType<typeof setTimeout>;

    const startTimer = setTimeout(() => {
      const step = () => {
        if (cancelled) return;
        cur = (cur + 1) % ALPHABET.length;
        setChar(ALPHABET[cur]);
        if (cur !== targetIdx) stepTimer = setTimeout(step, 30);
      };
      step();
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      clearTimeout(stepTimer);
    };
  }, [target, delay, reduced]);

  return (
    <span
      aria-hidden="true"
      className="relative inline-flex h-[1.9em] w-[1.2em] items-center justify-center overflow-hidden rounded-[2px] bg-flap text-flap-face"
      style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
    >
      <span className="leading-none">{char === " " ? " " : char}</span>
      {/* the seam every split-flap has across its middle */}
      <span
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-flap-seam opacity-70"
        aria-hidden="true"
      />
    </span>
  );
}

function Word({
  text,
  width,
  offset,
  reduced,
}: {
  text: string;
  width: number;
  offset: number;
  reduced: boolean;
}) {
  const padded = text.toUpperCase().padEnd(width, " ").slice(0, width);
  return (
    <span className="flex gap-[3px]">
      {Array.from(padded).map((c, i) => (
        <Flap
          key={i}
          target={c}
          delay={(offset + i) * 42}
          reduced={reduced}
        />
      ))}
    </span>
  );
}

export type BoardRow = { left: string; right: string };

export function SplitFlap({
  rows,
  interval = 3600,
}: {
  rows: readonly BoardRow[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  const leftWidth = Math.max(...rows.map((r) => r.left.length));
  const rightWidth = Math.max(...rows.map((r) => r.right.length));

  useEffect(() => {
    if (reduced || rows.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % rows.length),
      interval,
    );
    return () => clearInterval(id);
  }, [rows.length, interval, reduced]);

  const row = rows[index];

  return (
    <div className="inline-block max-w-full overflow-x-auto">
      {/* The live region carries the text; the flaps themselves are aria-hidden
          so a screen reader gets the message, not forty individual letters. */}
      <p className="sr-only" aria-live="polite">
        {row.left} — {row.right}
      </p>
      {/* The board is one object, not floating cells — the housing is what
          makes it read as a departure board rather than as decoration. */}
      <div className="inline-flex items-center gap-3 rounded-[3px] bg-flap px-3 py-3 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_8px_20px_-12px_rgba(0,0,0,0.6)] sm:gap-5 sm:px-4">
        <div className="flex items-center gap-[3px] font-mono text-[clamp(0.8rem,2.4vw,1.35rem)] font-medium tracking-tight">
          <Word text={row.left} width={leftWidth} offset={0} reduced={reduced} />
        </div>
        <span
          className="h-3 w-px shrink-0 bg-flap-face/25 sm:h-5"
          aria-hidden="true"
        />
        <div className="flex items-center gap-[3px] font-mono text-[clamp(0.8rem,2.4vw,1.35rem)] font-medium tracking-tight">
          <Word
            text={row.right}
            width={rightWidth}
            offset={leftWidth}
            reduced={reduced}
          />
        </div>
      </div>
    </div>
  );
}
