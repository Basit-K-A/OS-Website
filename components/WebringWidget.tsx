"use client";

import type { CSSProperties } from "react";
import { siteConfig } from "@/data/portfolio";

export function WebringWidget() {
  return (
    <div
      className="pointer-events-auto absolute right-4 top-4 z-20"
      aria-label="Canadian builders webring"
    >
      <div
        data-webring="ca"
        data-member={siteConfig.webringMember}
        className="panel-glass rounded-md px-3 py-2 font-mono text-[12px] text-white/90"
        style={
          {
            "--webring-size": "1rem",
            "--webring-color": "rgba(255, 255, 255, 0.9)",
            "--webring-accent": "#5eead4",
          } as CSSProperties
        }
      />
    </div>
  );
}
