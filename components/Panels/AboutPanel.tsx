"use client";

import Link from "next/link";
import { about, siteConfig } from "@/data/portfolio";

export function AboutPanel() {
  return (
    <div className="space-y-4">
      <header>
        <p className="font-mono text-xs tracking-widest text-[var(--color-accent-pink)] uppercase">
          ~/about
        </p>
        <h2 className="mt-1 text-xl font-semibold text-white">{siteConfig.name}</h2>
        <p className="text-sm text-[var(--color-accent)]">
          {siteConfig.jobTitle} · {siteConfig.university.shortName}
        </p>
      </header>
      <p className="text-sm leading-relaxed text-gray-300">{about.bio}</p>
      <nav aria-label="Portfolio pages" className="flex flex-wrap gap-3 text-xs">
        <Link href="/about" className="text-[var(--color-accent)] os-link">
          About page
        </Link>
        <Link href="/projects" className="text-[var(--color-accent)] os-link">
          Projects
        </Link>
        <Link href="/blog" className="text-[var(--color-accent)] os-link">
          Blog
        </Link>
        <Link href="/contact" className="text-[var(--color-accent)] os-link">
          Contact
        </Link>
      </nav>
      <div>
        <p className="mb-2 font-mono text-xs text-gray-500">tech stack</p>
        <div className="flex flex-wrap gap-2">
          {about.stack.map((item) => (
            <span
              key={item}
              className="rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-gray-200 os-link"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
