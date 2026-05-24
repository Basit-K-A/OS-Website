"use client";

import { WINDOW_DEFINITIONS } from "@/config/windowDefaults";
import type { WindowId } from "@/lib/windowTypes";

type DesktopIconsProps = {
  onOpen: (id: WindowId) => void;
};

export function DesktopIcons({ onOpen }: DesktopIconsProps) {
  const open = (id: WindowId) => {
    onOpen(id);
  };

  return (
    <div
      className="pointer-events-auto absolute left-4 top-4 z-[8] flex flex-col gap-3"
      aria-label="Desktop shortcuts"
    >
      {WINDOW_DEFINITIONS.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => open(item.id)}
          onDoubleClick={() => open(item.id)}
          className="group flex w-16 flex-col items-center gap-1 rounded-md p-1 text-center transition hover:bg-white/10"
        >
          <span className="flex h-13 w-13 items-center justify-center rounded-md border border-white/20 bg-black/30 font-mono text-sm text-[var(--color-accent)] shadow-lg backdrop-blur-sm">
            {item.icon}
          </span>
          <span className="font-mono text-[13px] text-white/90 group-hover:text-[var(--color-accent)]">
            {item.id}
          </span>
        </button>
      ))}
    </div>
  );
}
