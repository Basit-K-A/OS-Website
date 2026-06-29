"use client";

import type { CSSProperties } from "react";
import { siteConfig } from "@/data/portfolio";

export function WebringWidget() {
  return (
    <div aria-label="Canadian builders webring">
      <div
        data-webring="ca"
        data-member={siteConfig.webringMember}
        className="panel-glass pointer-events-auto rounded-md px-3 py-2 font-mono text-[12px] text-white/90"
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
