/**
 * Section divider — the edge a wave leaves on sand, not a hairline rule.
 *
 * Three hand-drawn paths rather than one, picked by `seed`, so consecutive
 * dividers on a page are never identical. A repeated identical squiggle would
 * read as a texture; varied ones read as a shoreline.
 */

const PATHS = [
  "M0 12 C 40 4, 78 18, 120 10 S 198 2, 242 12 S 318 20, 360 10 S 438 3, 480 12",
  "M0 9 C 46 17, 84 4, 128 11 S 206 19, 250 8 S 322 3, 366 12 S 440 18, 480 9",
  "M0 13 C 38 6, 82 15, 126 8 S 200 16, 246 11 S 324 4, 368 13 S 442 9, 480 11",
];

export function TideLine({
  seed = 0,
  className = "",
}: {
  seed?: number;
  className?: string;
}) {
  const d = PATHS[Math.abs(seed) % PATHS.length];

  return (
    <div className={`relative h-5 w-full ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 480 20"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        {/* the wet sand the water just left */}
        <path
          d={`${d} L 480 20 L 0 20 Z`}
          fill="var(--c-sea-wash)"
          opacity="0.85"
        />
        <path
          d={d}
          fill="none"
          stroke="var(--c-sea)"
          strokeWidth="1"
          opacity="0.45"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
