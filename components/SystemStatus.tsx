"use client";

import { useClock } from "@/hooks/useClock";
import { useFakeUptime } from "@/hooks/useFakeUptime";

export function SystemStatus() {
  const uptime = useFakeUptime();
  const { time, date } = useClock();

  return (
    <div
      className="pointer-events-none absolute bottom-14 right-4 z-10 hidden font-mono text-[11px] leading-relaxed text-white/90 sm:block"
      aria-hidden
    >
      <div className="mb-1 border-b border-white/20 pb-1 text-right">
        <span className="text-[var(--color-accent-pink)]">uptime</span>{" "}
        <span>{uptime}</span>
      </div>
      <div className="space-y-0.5 text-right text-white/80">
        <div>
          <span className="text-[var(--color-accent-pink)]">status</span> online
        </div>
        <div>
          <span className="text-[var(--color-accent-pink)]">cpu</span> ~12%
        </div>
        <div>
          <span className="text-[var(--color-accent-pink)]">ram</span> 2.1G / 8G
        </div>
        <div className="pt-1 text-[10px] text-white/60" suppressHydrationWarning>
          {date} · {time}
        </div>
      </div>
    </div>
  );
}
