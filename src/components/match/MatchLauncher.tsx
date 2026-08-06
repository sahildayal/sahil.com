"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { defenders } from "@/content/match";
import { MatchGame } from "./MatchGame";

/**
 * The game is a mode you enter, never a wall you land on. /world keeps all its
 * content; this panel is the only way in, and the game always has a way out.
 */
export function MatchLauncher() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Stop the page behind from scrolling while the pitch is up.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div className="border border-rule bg-paper-raised p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <span className="eyebrow">The match</span>
          <span className="eyebrow">~1 min</span>
        </div>

        <h2 className="mt-4 font-display display-wide text-2xl font-bold uppercase leading-[0.95] tracking-tight sm:text-3xl">
          Dribble past eleven
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
          A programme should come with a match. You run forward on your own and
          only steer — get past a defender and they give something away. Eleven
          of them, and none of it is on the rest of this page.
        </p>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-6 border border-clay bg-clay px-5 py-2.5 font-mono text-sm text-paper transition-colors hover:bg-clay-hover"
        >
          ▶ Kick off
        </button>
        <p className="eyebrow mt-3">
          {defenders.length} defenders · arrows, or drag on mobile
        </p>
      </div>

      {/* Portalled to body: <main> carries `relative z-10`, which creates a
          stacking context the game could never escape — the nav would sit on
          top of the pitch and hide the exit button. */}
      {open && mounted
        ? createPortal(
            <MatchGame onExit={() => setOpen(false)} />,
            document.body,
          )
        : null}
    </>
  );
}
