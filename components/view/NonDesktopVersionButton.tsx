import Link from "next/link";
import { nonDesktopHomeHref } from "@/lib/viewMode";

export function NonDesktopVersionButton() {
  return (
    <Link
      href={nonDesktopHomeHref}
      className="panel-glass pointer-events-auto hidden rounded-md border border-white/10 px-3 py-2 font-mono text-[11px] text-white/90 transition hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] md:inline-flex"
    >
      Non-Desktop Version
    </Link>
  );
}
