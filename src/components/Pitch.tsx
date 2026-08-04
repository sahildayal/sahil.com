import type { Position } from "@/content/world";

export function Pitch({
  players,
  formation,
}: {
  players: Position[];
  formation: string;
}) {
  return (
    <div className="relative w-full overflow-hidden border border-rule bg-pitch-wash">
      {/* Pitch markings. Portrait so it stays readable on a phone. */}
      <div className="relative aspect-[3/4] w-full sm:aspect-[4/3]">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <g
            stroke="var(--c-pitch)"
            strokeWidth="0.4"
            fill="none"
            opacity="0.65"
          >
            <rect x="3" y="3" width="94" height="94" />
            <line x1="3" y1="50" x2="97" y2="50" />
            <circle cx="50" cy="50" r="11" />
            <circle cx="50" cy="50" r="0.7" fill="var(--c-pitch)" />
            {/* own box */}
            <rect x="26" y="3" width="48" height="14" />
            <rect x="38" y="3" width="24" height="6" />
            {/* opposition box */}
            <rect x="26" y="83" width="48" height="14" />
            <rect x="38" y="91" width="24" height="6" />
          </g>
        </svg>

        <span className="eyebrow absolute left-4 top-3 text-pitch">
          {formation}
        </span>

        {players.map((p) => (
          <div
            key={p.name}
            className="absolute flex w-24 -translate-x-1/2 translate-y-[-50%] flex-col items-center text-center sm:w-28"
            style={{ left: `${p.x}%`, top: `${100 - p.y}%` }}
          >
            <span className="tabular flex h-7 w-7 items-center justify-center rounded-full bg-pitch text-[0.6rem] font-semibold text-paper sm:h-8 sm:w-8">
              {p.slot}
            </span>
            <span className="mt-1.5 font-display text-[0.72rem] font-semibold leading-tight text-ink sm:text-xs">
              {p.name}
            </span>
            <span className="mt-0.5 hidden text-[0.64rem] leading-tight text-ink-soft sm:block">
              {p.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
