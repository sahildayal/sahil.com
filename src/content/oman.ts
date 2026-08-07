/**
 * Photographs from Oman, for the tour on /world.
 *
 * Sources are 750px story exports with their stickers cropped off, so nothing
 * here is ever displayed wider than about 370px — they stay sharp at that size
 * and would go soft if pushed larger.
 *
 * ⚠ SAHIL — four captions are marked `check: true`. I named the ones the
 * stickers told me (Bimmah, Nizwa, Bandar Al Khairan) and described the rest
 * rather than guessing at a wadi or a beach I can't identify. Correct them.
 */

export type Shot = {
  src: string;
  alt: string;
  place: string;
  /** true where I'm describing rather than naming — needs your correction. */
  check?: boolean;
  /** Portrait ratio after cropping, for layout without shift. */
  w: number;
  h: number;
};

export const oman: Shot[] = [
  {
    src: "/oman/wadi.jpg",
    alt: "A waterfall running down an ochre cliff into a green pool, date palms either side, the top of the ridge lit gold by low sun.",
    place: "A wadi in the Hajar",
    check: true,
    w: 750,
    h: 1185,
  },
  {
    src: "/oman/sinkhole.jpg",
    alt: "A limestone sinkhole with clear green water at the bottom, layered orange rock walls rising all around.",
    place: "Bimmah Sinkhole",
    w: 750,
    h: 1006,
  },
  {
    src: "/oman/coast.jpg",
    alt: "Turquoise shallows against a pale limestone headland, low white buildings and mountains behind.",
    place: "The coast near Muscat",
    check: true,
    w: 750,
    h: 1000,
  },
  {
    src: "/oman/shore.jpg",
    alt: "Friends walking out along a pale limestone shelf above flat blue sea at dusk.",
    place: "Out on the rocks at dusk",
    check: true,
    w: 750,
    h: 998,
  },
  {
    src: "/oman/kahwa.jpg",
    alt: "Omani kahwa poured from an engraved brass dallah into a small painted cup, inside a desert camp tent.",
    place: "Kahwa, desert camp",
    check: true,
    w: 750,
    h: 1023,
  },
  {
    src: "/oman/spices.jpg",
    alt: "Open sacks of grains, pulses, nuts and dried limes lined up at a spice stall.",
    place: "Nizwa Souq",
    w: 750,
    h: 883,
  },
  {
    src: "/oman/souq.jpg",
    alt: "A stone archway into Nizwa Souq, goods hung along both walls, an Omani flag by the entrance.",
    place: "Nizwa Souq",
    w: 750,
    h: 1114,
  },
  {
    src: "/oman/bandar.jpg",
    alt: "A wide sky of broken cloud over silhouetted friends and a parked 4x4 at a coastal viewpoint.",
    place: "Bandar Al Khairan",
    w: 750,
    h: 1005,
  },
];

/** The two that belong with the cooking, not with the landscape. */
export const kitchenShots = oman.filter((s) =>
  ["/oman/kahwa.jpg", "/oman/spices.jpg"].includes(s.src),
);

/** Everything else, for the main tour. */
export const tourShots = oman.filter(
  (s) => !["/oman/kahwa.jpg", "/oman/spices.jpg"].includes(s.src),
);

/**
 * Used on /about beside the portrait — home next to where he lives now, which
 * is the hero's "Muscat → Rochester" said in pictures. Deliberately not the
 * wadi: that one leads the tour on /world and repeating it across pages makes
 * eight photos feel like six.
 */
export const aboutShot = oman.find((s) => s.src === "/oman/coast.jpg")!;
