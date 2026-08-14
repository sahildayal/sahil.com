"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll reveal that degrades to visible.
 *
 * The previous version used Motion's `whileInView`, which server-renders
 * `style="opacity:0"` — nine such elements shipped on /about alone. The text
 * was in the HTML, so crawlers were fine, but a human whose JS was slow,
 * blocked, or broken saw blank space where the writing should be.
 *
 * Now nothing is hidden until JS is running and has confirmed the viewer
 * hasn't asked for reduced motion. No JS, or reduced motion, means the content
 * is simply there — the animation is additive rather than load-bearing.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    // Arm only now — before this line the element has never been hidden.
    el.dataset.reveal = "armed";
    if (delay) el.style.transitionDelay = `${delay}s`;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.reveal = "in";
            io.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
