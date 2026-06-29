"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { siteConfig } from "@/data/portfolio";
import { initWebringEmbed } from "@/lib/webringEmbed";

type WebringWidgetProps = {
  className?: string;
};

export function WebringWidget({
  className = "absolute right-4 top-4 z-20",
}: WebringWidgetProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    initWebringEmbed(el);
  }, []);

  return (
    <div
      className={`pointer-events-auto ${className}`}
      aria-label="Canadian builders webring"
    >
      <div
        ref={hostRef}
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
