import Image from "next/image";
import type { Shot } from "@/content/oman";

/**
 * Portrait photo grid.
 *
 * The `sizes` values are deliberately conservative: the sources are 750px
 * wide, so every breakpoint is capped below ~370px of display width. That
 * keeps them sharp on a retina screen and stops the browser from requesting a
 * size the original can't fill.
 */
export function PhotoGrid({
  shots,
  columns = 4,
}: {
  shots: Shot[];
  columns?: 2 | 3 | 4;
}) {
  const grid =
    columns === 2
      ? "grid-cols-2"
      : columns === 3
        ? "grid-cols-2 sm:grid-cols-3"
        : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  const sizes =
    columns === 2
      ? "(min-width: 640px) 300px, 45vw"
      : "(min-width: 1024px) 240px, (min-width: 640px) 300px, 45vw";

  return (
    <ul className={`grid gap-x-3 gap-y-6 ${grid}`}>
      {shots.map((shot) => (
        <li key={shot.src}>
          <figure>
            {/* Fixed 3:4 frame. The crops came out at differing heights, and
                letting them run natural turned the grid masonry — untidy
                against the rest of the page. Centre-cropped to a common
                ratio instead. */}
            <div className="aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] bg-paper-raised">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.w}
                height={shot.h}
                sizes={sizes}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
            <figcaption className="eyebrow mt-2.5">{shot.place}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
