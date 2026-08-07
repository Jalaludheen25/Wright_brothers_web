import { ImageResponse } from "next/og";

export const alt =
  "Wright Brothers — luxury residential design and build in Dubai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #0c0f10 0%, #14191a 55%, #1e2426 100%)",
          padding: "72px 80px",
          color: "#faf8f4",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="64" height="64" viewBox="0 0 40 40" fill="none">
            <rect
              x="0.75"
              y="0.75"
              width="38.5"
              height="38.5"
              stroke="#a9834e"
              strokeWidth="1"
              opacity="0.6"
            />
            <path
              d="M8 11.5 L14.4 26 L20 15.2 L25.6 26 L32 11.5"
              stroke="#faf8f4"
              strokeWidth="2"
              strokeLinecap="square"
            />
            <path d="M8 30.5 H32" stroke="#a9834e" strokeWidth="1.2" />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#c9a87a",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            Wright Brothers
          </div>
        </div>

        {/* Statement */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 82, lineHeight: 1.05 }}>
            Houses are built.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              lineHeight: 1.05,
              color: "#c9a87a",
              fontStyle: "italic",
            }}
          >
            Homes are wrought.
          </div>
        </div>

        {/* Footer rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(250,248,244,0.2)",
            paddingTop: 28,
            fontSize: 21,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(250,248,244,0.6)",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          <div style={{ display: "flex" }}>Residential Design &amp; Build</div>
          <div style={{ display: "flex" }}>Dubai, UAE</div>
        </div>
      </div>
    ),
    size
  );
}
