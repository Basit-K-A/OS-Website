import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/portfolio";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#141618",
          color: "#5eead4",
          fontSize: 72,
          fontWeight: 700,
          fontFamily: "ui-monospace, monospace",
        }}
      >
        {siteConfig.name
          .split(" ")
          .map((part) => part[0])
          .join("")}
      </div>
    ),
    size,
  );
}
