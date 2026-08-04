import { ImageResponse } from "next/og";

export const alt = "Sahil Dayal — Backend & AI engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The social card. Carries the same vocabulary as the site — ink ground, clay
 * accent, and the split-flap strip — so a shared link looks like the page it
 * opens.
 */
export default async function OpenGraphImage() {
  const board = ["ROCHESTER NY", "BACKEND / AI", "SWE MAY 2027"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14181f",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#9a9288",
              textTransform: "uppercase",
            }}
          >
            Backend &amp; AI engineer
          </div>
          <div
            style={{
              fontSize: 132,
              fontWeight: 800,
              color: "#f0ebe3",
              lineHeight: 1,
              marginTop: 24,
              letterSpacing: -3,
            }}
          >
            SAHIL DAYAL
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#c4beb4",
              marginTop: 28,
              maxWidth: 820,
              lineHeight: 1.35,
            }}
          >
            Pipelines, developer tooling, and agent systems that quietly make
            everyone else&apos;s job easier.
          </div>
        </div>

        {/* split-flap strip */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {board.map((word, wi) => (
            <div key={wi} style={{ display: "flex", gap: 4 }}>
              {Array.from(word).map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 26,
                    height: 38,
                    background: "#05070a",
                    color: "#ece6dc",
                    fontSize: 20,
                    fontWeight: 600,
                    borderRadius: 3,
                  }}
                >
                  {c === " " ? "" : c}
                </div>
              ))}
            </div>
          ))}
          <div
            style={{
              marginLeft: "auto",
              fontSize: 24,
              color: "#e4693a",
              letterSpacing: 2,
            }}
          >
            sahildayal.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
