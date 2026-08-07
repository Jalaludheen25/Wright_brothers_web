import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Wright Brothers — luxury residential design and build in Dubai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Satori cannot fetch relative URLs, so the lockup is inlined as a data URI.
 * Read at build time — this route is prerendered.
 */
async function logoDataUri() {
  const file = await readFile(
    join(process.cwd(), "public", "logo", "white_logo.png")
  );
  return `data:image/png;base64,${file.toString("base64")}`;
}

export default async function OpengraphImage() {
  const logo = await logoDataUri();

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
        {/* Brand lockup — 2892×652, scaled to a 400px width */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={400} height={90} alt="" />
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
