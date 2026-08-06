"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  defenders,
  defenderY,
  kindLabel,
  MATCH,
  totalDistance,
  type Defender,
} from "@/content/match";

type Status = "ready" | "playing" | "done";
type Outcome = "beaten" | "missed";

type LiveDefender = {
  def: Defender;
  x: number;
  y: number;
  outcome: Outcome | null;
};

type Palette = {
  pitch: string;
  pitchWash: string;
  line: string;
  clay: string;
  ink: string;
  paper: string;
};

/** Reads the site's own tokens so the game follows the active theme. */
function readPalette(el: HTMLElement): Palette {
  const s = getComputedStyle(el);
  const v = (name: string, fallback: string) =>
    s.getPropertyValue(name).trim() || fallback;
  return {
    pitch: v("--c-pitch", "#1d4d3b"),
    pitchWash: v("--c-pitch-wash", "#e3ece7"),
    line: v("--c-rule-strong", "#c3b8a4"),
    clay: v("--c-clay", "#b34a22"),
    ink: v("--c-ink", "#14181f"),
    paper: v("--c-paper", "#fbf7f0"),
  };
}

export function MatchGame({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const [status, setStatus] = useState<Status>("ready");
  const [beaten, setBeaten] = useState(0);
  const [card, setCard] = useState<Defender | null>(null);
  const [results, setResults] = useState<Map<number, Outcome>>(new Map());

  // Everything the loop mutates lives in a ref — putting it in React state
  // would re-render sixty times a second.
  const game = useRef({
    playerX: MATCH.pitchWidth / 2,
    playerY: 0,
    dir: 0,
    pointerX: null as number | null,
    stumbleUntil: 0,
    trail: [] as { x: number; y: number }[],
    live: [] as LiveDefender[],
    running: false,
    last: 0,
  });

  const reset = useCallback(() => {
    game.current.playerX = MATCH.pitchWidth / 2;
    game.current.playerY = 0;
    game.current.dir = 0;
    game.current.pointerX = null;
    game.current.stumbleUntil = 0;
    game.current.trail = [];
    game.current.live = defenders.map((def, i) => ({
      def,
      x: def.x * MATCH.pitchWidth,
      y: defenderY(i),
      outcome: null,
    }));
    setBeaten(0);
    setCard(null);
    setResults(new Map());
  }, []);

  const start = useCallback(() => {
    reset();
    setStatus("playing");
  }, [reset]);

  // ---------- input ----------
  useEffect(() => {
    if (status !== "playing") return;

    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        game.current.dir = -1;
        e.preventDefault();
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        game.current.dir = 1;
        e.preventDefault();
      } else if (e.key === "Escape") {
        setStatus("ready");
      }
    };
    const up = (e: KeyboardEvent) => {
      const left = e.key === "ArrowLeft" || e.key === "a" || e.key === "A";
      const right = e.key === "ArrowRight" || e.key === "d" || e.key === "D";
      if ((left && game.current.dir === -1) || (right && game.current.dir === 1)) {
        game.current.dir = 0;
      }
    };

    window.addEventListener("keydown", down, { passive: false });
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [status]);

  // ---------- the loop ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let palette = readPalette(wrap);
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Re-read tokens when the theme flips.
    const mo = new MutationObserver(() => {
      palette = readPalette(wrap);
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 1 / 20);
      last = now;

      const g = game.current;
      // The playable strip is centred; anything either side is out of play.
      const fieldW = Math.min(width, height * MATCH.maxFieldAspect);
      const fieldX = (width - fieldW) / 2;
      const scale = fieldW / MATCH.pitchWidth;
      const sx0 = (worldX: number) => fieldX + worldX * scale;
      const playerScreenY = height * 0.72;

      // ---- update ----
      if (status === "playing") {
        const stumbling = now < g.stumbleUntil;
        const speed = MATCH.runSpeed * (stumbling ? 0.32 : 1);
        g.playerY += speed * dt;

        if (g.pointerX !== null) {
          const target = (g.pointerX - fieldX) / scale;
          const delta = target - g.playerX;
          const step = MATCH.steerSpeed * dt;
          g.playerX += Math.abs(delta) < step ? delta : Math.sign(delta) * step;
        } else if (g.dir !== 0) {
          g.playerX += g.dir * MATCH.steerSpeed * dt;
        }

        const margin = MATCH.playerRadius + 1;
        g.playerX = Math.max(
          margin,
          Math.min(MATCH.pitchWidth - margin, g.playerX),
        );

        g.trail.push({ x: g.playerX, y: g.playerY });
        if (g.trail.length > 26) g.trail.shift();

        const reach = MATCH.playerRadius + MATCH.defenderRadius;
        for (const d of g.live) {
          if (d.outcome) continue;

          // Close down the ball as it approaches — otherwise steering is free.
          const ahead = d.y - g.playerY;
          if (ahead > 0 && ahead < MATCH.homingRange) {
            const delta = g.playerX - d.x;
            const step = MATCH.homingSpeed * dt;
            d.x += Math.abs(delta) < step ? delta : Math.sign(delta) * step;
            d.x = Math.max(
              MATCH.defenderRadius,
              Math.min(MATCH.pitchWidth - MATCH.defenderRadius, d.x),
            );
          }

          const dy = g.playerY - d.y;
          if (Math.abs(dy) < reach) {
            if (Math.abs(g.playerX - d.x) < reach) {
              d.outcome = "missed";
              g.stumbleUntil = now + 420;
              setResults((prev) => new Map(prev).set(d.def.id, "missed"));
            }
          } else if (dy >= reach) {
            d.outcome = "beaten";
            setBeaten((b) => b + 1);
            setCard(d.def);
            setResults((prev) => new Map(prev).set(d.def.id, "beaten"));
          }
        }

        if (g.playerY >= totalDistance) {
          setStatus("done");
        }
      }

      // ---- draw ----
      const worldToScreenY = (y: number) =>
        playerScreenY - (y - g.playerY) * scale;

      ctx.clearRect(0, 0, width, height);

      // out of play
      ctx.fillStyle = palette.paper;
      ctx.fillRect(0, 0, width, height);

      // the pitch itself
      ctx.fillStyle = palette.pitchWash;
      ctx.fillRect(fieldX, 0, fieldW, height);

      // mown stripes — the clearest cue that you're actually moving
      const band = 22 * scale;
      const offset = (g.playerY * scale) % (band * 2);
      ctx.save();
      ctx.beginPath();
      ctx.rect(fieldX, 0, fieldW, height);
      ctx.clip();
      ctx.globalAlpha = 0.07;
      ctx.fillStyle = palette.pitch;
      for (let i = -2; i < height / band + 2; i++) {
        ctx.fillRect(fieldX, i * band * 2 + offset, fieldW, band);
      }
      ctx.restore();

      ctx.strokeStyle = palette.pitch;
      ctx.globalAlpha = 0.55;
      ctx.lineWidth = 1.5;

      // touchlines
      ctx.beginPath();
      ctx.moveTo(sx0(2), 0);
      ctx.lineTo(sx0(2), height);
      ctx.moveTo(sx0(98), 0);
      ctx.lineTo(sx0(98), height);
      ctx.stroke();

      // the box and goal, drawn in world space so they arrive as you do
      const goalY = worldToScreenY(totalDistance);
      const boxY = worldToScreenY(totalDistance - 50);
      if (boxY < height + 200) {
        ctx.beginPath();
        ctx.rect(sx0(22), goalY, (58 / 100) * fieldW, boxY - goalY);
        ctx.moveTo(sx0(2), goalY);
        ctx.lineTo(sx0(98), goalY);
        ctx.stroke();

        ctx.globalAlpha = 0.95;
        ctx.strokeStyle = palette.clay;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(sx0(36), goalY);
        ctx.lineTo(sx0(64), goalY);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // defenders
      for (const d of g.live) {
        const sy = worldToScreenY(d.y);
        if (sy < -60 || sy > height + 60) continue;
        const sx = sx0(d.x);
        const r = MATCH.defenderRadius * scale;

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        if (d.outcome === "beaten") {
          ctx.globalAlpha = 0.28;
          ctx.fillStyle = palette.pitch;
        } else if (d.outcome === "missed") {
          ctx.globalAlpha = 0.6;
          ctx.fillStyle = palette.clay;
        } else {
          ctx.globalAlpha = 1;
          ctx.fillStyle = palette.pitch;
        }
        ctx.fill();
        ctx.globalAlpha = 1;

        if (!d.outcome) {
          ctx.fillStyle = palette.paper;
          ctx.font = `600 ${Math.round(r * 0.85)}px ui-monospace, monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(String(d.def.id), sx, sy + 0.5);
        }
      }

      // trail
      ctx.strokeStyle = palette.clay;
      ctx.lineCap = "round";
      for (let i = 1; i < g.trail.length; i++) {
        const a = g.trail[i - 1];
        const b = g.trail[i];
        ctx.globalAlpha = (i / g.trail.length) * 0.34;
        ctx.lineWidth = (i / g.trail.length) * MATCH.playerRadius * scale * 0.9;
        ctx.beginPath();
        ctx.moveTo(sx0(a.x), worldToScreenY(a.y));
        ctx.lineTo(sx0(b.x), worldToScreenY(b.y));
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // the ball
      const px = sx0(g.playerX);
      ctx.beginPath();
      ctx.arc(px, playerScreenY, MATCH.playerRadius * scale, 0, Math.PI * 2);
      ctx.fillStyle = palette.clay;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = palette.paper;
      ctx.stroke();

      last = now;
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
    };
  }, [status]);

  // ---------- pointer steering ----------
  const pointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (status !== "playing") return;
    const rect = e.currentTarget.getBoundingClientRect();
    game.current.pointerX = e.clientX - rect.left;
  };
  const pointerLeave = () => {
    game.current.pointerX = null;
  };

  const missed = defenders.length - beaten;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-paper">
      {/* ---------- hud ---------- */}
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-rule px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={onExit}
          className="eyebrow transition-colors hover:text-clay"
        >
          ← Leave the pitch
        </button>
        <div className="flex items-center gap-3">
          <span className="eyebrow">Beaten</span>
          <div className="flex gap-1" aria-hidden="true">
            {defenders.map((d) => {
              const o = results.get(d.id);
              return (
                <span
                  key={d.id}
                  className={`h-1.5 w-3 rounded-[1px] ${
                    o === "beaten"
                      ? "bg-clay"
                      : o === "missed"
                        ? "bg-rule-strong"
                        : "bg-rule"
                  }`}
                />
              );
            })}
          </div>
          <span className="tabular text-xs text-ink-soft">
            {beaten}/{defenders.length}
          </span>
        </div>
      </div>

      {/* ---------- pitch + card ---------- */}
      <div className="relative flex min-h-0 flex-1 flex-col lg:flex-row">
        <div ref={wrapRef} className="relative min-h-0 flex-1">
          <canvas
            ref={canvasRef}
            onPointerMove={pointerMove}
            onPointerDown={pointerMove}
            onPointerLeave={pointerLeave}
            onPointerUp={pointerLeave}
            className="block h-full w-full touch-none"
            aria-label="Football pitch. Steer the ball past the defenders."
          />

          {status === "ready" ? (
            <Overlay>
              <span className="eyebrow">The match</span>
              <h2 className="mt-3 font-display display-wide text-[clamp(1.75rem,6vw,3rem)] font-bold uppercase leading-[0.92] tracking-tight">
                Dribble past
                <br />
                eleven
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
                You run forward on your own — you only steer. Every defender you
                get past gives something away. Takes about a minute.
              </p>
              <p className="eyebrow mt-5">
                ← → or A D · or just drag on the pitch
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <button
                  type="button"
                  onClick={start}
                  className="border border-clay bg-clay px-5 py-2.5 font-mono text-sm text-paper transition-colors hover:bg-clay-hover"
                >
                  Kick off
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setResults(
                      new Map(defenders.map((d) => [d.id, "beaten" as const])),
                    );
                    setBeaten(defenders.length);
                    setStatus("done");
                  }}
                  className="border-b border-rule-strong pb-0.5 font-mono text-sm transition-colors hover:border-clay hover:text-clay"
                >
                  Just show me the eleven
                </button>
              </div>
            </Overlay>
          ) : null}

          {status === "done" ? (
            <Overlay scroll>
              <span className="eyebrow">Full time</span>
              <h2 className="mt-3 font-display display-wide text-[clamp(1.75rem,6vw,3rem)] font-bold uppercase leading-[0.92] tracking-tight">
                {beaten === defenders.length
                  ? "Cleared the lot"
                  : `Beat ${beaten} of ${defenders.length}`}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
                {beaten === defenders.length
                  ? "Every defender beaten. Here's everything you turned up."
                  : `${missed} got a foot in — but you're not losing the content over it. All eleven are below.`}
              </p>

              <ul className="mt-8 space-y-6">
                {defenders.map((d) => (
                  <li
                    key={d.id}
                    className="border-l-2 pl-4"
                    style={{
                      borderColor:
                        results.get(d.id) === "beaten"
                          ? "var(--c-clay)"
                          : "var(--c-rule)",
                    }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="tabular text-xs text-muted">
                        {String(d.id).padStart(2, "0")}
                      </span>
                      <span className="eyebrow">{kindLabel[d.kind]}</span>
                    </div>
                    <h3 className="mt-1.5 font-display text-base font-semibold leading-tight">
                      {d.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {d.body}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-rule pt-6">
                <button
                  type="button"
                  onClick={start}
                  className="border border-clay bg-clay px-5 py-2.5 font-mono text-sm text-paper transition-colors hover:bg-clay-hover"
                >
                  Go again
                </button>
                <a
                  href="/resume.pdf"
                  className="border-b border-rule-strong pb-0.5 font-mono text-sm transition-colors hover:border-clay hover:text-clay"
                >
                  Download resume
                </a>
                <a
                  href="mailto:sd8804@rit.edu"
                  className="border-b border-rule-strong pb-0.5 font-mono text-sm transition-colors hover:border-clay hover:text-clay"
                >
                  Get in touch
                </a>
                <button
                  type="button"
                  onClick={onExit}
                  className="eyebrow transition-colors hover:text-clay"
                >
                  Back to the programme
                </button>
              </div>
            </Overlay>
          ) : null}
        </div>

        {/* latest unlock — a rail on desktop, a strip on mobile */}
        <aside
          className="shrink-0 border-t border-rule bg-paper-raised px-4 py-4 sm:px-6 lg:w-80 lg:border-l lg:border-t-0 lg:px-6 lg:py-6"
          aria-live="polite"
        >
          {card ? (
            <div key={card.id} className="animate-[fadeUp_0.35s_ease-out]">
              <div className="flex items-baseline gap-3">
                <span className="tabular text-xs text-clay">
                  {String(card.id).padStart(2, "0")}
                </span>
                <span className="eyebrow">{kindLabel[card.kind]}</span>
              </div>
              <h3 className="mt-2 font-display text-base font-semibold leading-tight sm:text-lg">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {card.body}
              </p>
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-muted">
              {status === "playing"
                ? "Get past a defender and whatever they're hiding lands here."
                : "Beat a defender to turn something up."}
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

function Overlay({
  children,
  scroll = false,
}: {
  children: React.ReactNode;
  scroll?: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center bg-paper/94 px-5 py-8 backdrop-blur-sm sm:px-10 ${
        scroll ? "overflow-y-auto" : ""
      }`}
    >
      <div className={scroll ? "mx-auto w-full max-w-xl" : "mx-auto w-full max-w-xl"}>
        {children}
      </div>
    </div>
  );
}
