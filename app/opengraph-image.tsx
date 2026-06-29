import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/portfolio";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.jobTitle} at ${siteConfig.university.shortName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(135deg, #141618 0%, #1f2a30 45%, #7aabb5 100%)",
          color: "#f3f4f6",
          fontFamily: "ui-monospace, monospace",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: 28, color: "#5eead4" }}>portfolioOS</div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: "900px",
            }}
          >
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 34, color: "#f0a0c0", maxWidth: "900px" }}>
            {siteConfig.jobTitle} at {siteConfig.university.name}
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#d1d5db", maxWidth: "900px" }}>
          Software engineering, backend development, and cloud infrastructure.
        </div>
      </div>
    ),
    size,
  );
}
