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
  // One message, like the real board — three words in a row ran together into
  // a single illegible string and pushed the URL off the canvas.
  const message = "SWE MAY 2027";
  const status = "OPEN";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b2429",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#8a9a99",
              textTransform: "uppercase",
            }}
          >
            Backend &amp; AI engineer
          </div>
          <div
            style={{
              fontSize: 132,
              fontWeight: 800,
              color: "#e4eae4",
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
              color: "#bcc7c3",
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
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              background: "#061a1f",
              padding: "14px 18px",
              borderRadius: 4,
            }}
          >
            {[message, status].map((word, wi) => (
              <div key={wi} style={{ display: "flex", gap: 4 }}>
                {Array.from(word).map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 30,
                      height: 44,
                      background: "#0b2429",
                      color: "#e9c481",
                      fontSize: 24,
                      fontWeight: 600,
                      borderRadius: 3,
                    }}
                  >
                    {c === " " ? "" : c}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: 26,
              color: "#d28d3c",
              letterSpacing: 1,
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
