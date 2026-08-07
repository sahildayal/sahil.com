"use client";

import { useEffect, useState } from "react";

/**
 * The view off the Mutrah corniche: sky, the Hajar ridge coming down to the
 * water, sea. Flat bands, no gradients — the coast is arid and hard-edged, and
 * a soft blue gradient would be the stock-ocean cliché we're avoiding.
 *
 * Deliberately quiet. The split-flap board sits on top of this and needs to
 * stay the thing you look at.
 */

type Light = "dawn" | "day" | "dusk" | "night";

function lightFor(hour: number): Light {
  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "dusk";
  return "night";
}

/** Sky tint per time of day. Everything else stays on the palette tokens. */
const SKY: Record<Light, string> = {
  dawn: "color-mix(in oklab, var(--c-sky) 78%, var(--c-rock-bright))",
  day: "var(--c-sky)",
  dusk: "color-mix(in oklab, var(--c-sky) 70%, var(--c-rock-bright))",
  night: "color-mix(in oklab, var(--c-sky) 82%, var(--c-ink))",
};

export function Horizon() {
  // Rendered as `day` on the server, corrected after mount — the viewer's
  // clock isn't knowable during SSR and guessing would cause a hydration flip.
  const [light, setLight] = useState<Light>("day");

  useEffect(() => {
    setLight(lightFor(new Date().getHours()));
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[62%] overflow-hidden"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <rect width="1200" height="400" fill={SKY[light]} opacity="0.55" />

        {/* Far range, hazed by distance. */}
        <path
          d="M0 268 L 74 232 L 132 252 L 198 214 L 262 246 L 338 208 L 402 244
             L 470 220 L 548 252 L 618 226 L 700 256 L 774 222 L 852 250
             L 928 228 L 1010 258 L 1086 232 L 1152 254 L 1200 236
             L 1200 400 L 0 400 Z"
          fill="var(--c-ridge)"
          opacity="0.18"
        />

        {/* Near ridge. Asymmetric and eroded with flat mesa tops — the Hajar
            is weathered limestone, not a row of even triangles. */}
        <path
          d="M0 298 L 58 252 L 86 270 L 138 216 L 166 234 L 198 208 L 226 224
             L 252 258 L 286 246 L 312 278 L 356 224 L 382 238 L 412 200
             L 452 200 L 470 242 L 498 218 L 524 264 L 566 234 L 598 270
             L 626 252 L 664 288 L 700 246 L 728 262 L 768 228 L 806 270
             L 842 252 L 882 290 L 922 258 L 956 274 L 1000 242 L 1044 286
             L 1082 264 L 1124 296 L 1164 276 L 1200 304
             L 1200 400 L 0 400 Z"
          fill="var(--c-ridge)"
          opacity="0.34"
        />

        {/* the water */}
        <rect
          y="312"
          width="1200"
          height="88"
          fill="var(--c-water)"
          opacity="0.45"
        />
      </svg>

      {/* fade the whole thing out before it reaches the text */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-paper/55 to-paper" />
    </div>
  );
}
