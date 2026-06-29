import Link from "next/link";
import type { ReactNode } from "react";
import { DesktopVersionLink } from "@/components/view/DesktopVersionLink";
import { siteConfig } from "@/data/portfolio";
import { SiteNav } from "@/components/seo/SiteNav";

type SeoPageShellProps = {
  children: ReactNode;
};

export function SeoPageShell({ children }: SeoPageShellProps) {
  return (
    <div className="min-h-dvh bg-[var(--color-terminal)] text-gray-100">
      <header className="border-b border-white/10 bg-black/40">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="font-mono text-sm text-[var(--color-accent)]">
              {siteConfig.osName}
            </Link>
            <DesktopVersionLink />
          </div>
          <SiteNav />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>

      <footer className="border-t border-white/10 bg-black/30">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-8 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Computer Science
            student at {siteConfig.university.name}.
          </p>
          <SiteNav />
        </div>
      </footer>
    </div>
  );
}
