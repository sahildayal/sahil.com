import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** A single split-flap cell — the site's signature, at favicon scale. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b2429",
          color: "#e9c481",
          fontSize: 20,
          fontWeight: 700,
          position: "relative",
          borderRadius: 4,
        }}
      >
        SD
        {/* the seam */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: 1,
            background: "#000",
            opacity: 0.75,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
