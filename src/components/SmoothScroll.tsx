"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum scrolling.
 *
 * Overriding native scroll is a real trade-off — it can fight trackpads,
 * screen readers and browser find-in-page — so this is deliberately narrow:
 *
 *  - Off entirely for anyone who has asked for reduced motion, and it stays
 *    off if they change that preference mid-session.
 *  - Off on coarse pointers. Phones already have native momentum and Lenis
 *    only makes touch scrolling feel laggy.
 *  - Anchor links are handed to Lenis explicitly so in-page jumps still work.
 *  - Exposes `window.__lenis` so the command palette can stop scrolling while
 *    it holds the screen, and resume afterwards.
 */
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");

    let lenis: Lenis | undefined;
    let raf = 0;

    const start = () => {
      if (lenis || reduce.matches || coarse.matches) return;

      lenis = new Lenis({
        duration: 0.9,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      });
      window.__lenis = lenis;

      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = undefined;
      window.__lenis = undefined;
    };

    start();

    // In-page anchors bypass Lenis unless we route them through it.
    const onClick = (e: MouseEvent) => {
      if (!lenis) return;
      const target = (e.target as HTMLElement | null)?.closest("a");
      const href = target?.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
    };

    const onPrefChange = () => (reduce.matches ? stop() : start());

    document.addEventListener("click", onClick);
    reduce.addEventListener("change", onPrefChange);
    coarse.addEventListener("change", onPrefChange);

    return () => {
      document.removeEventListener("click", onClick);
      reduce.removeEventListener("change", onPrefChange);
      coarse.removeEventListener("change", onPrefChange);
      stop();
    };
  }, []);

  return null;
}
