import Link from "next/link";
import { desktopHomeHref } from "@/lib/viewMode";

export function DesktopVersionLink() {
  return (
    <Link
      href={desktopHomeHref}
      className="rounded border border-white/10 px-3 py-1.5 text-xs text-gray-300 transition hover:border-[var(--color-accent)]/40 hover:text-white"
    >
      Open desktop portfolio
    </Link>
  );
}
