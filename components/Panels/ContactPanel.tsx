"use client";

import { siteConfig } from "@/data/portfolio";

const links = [
  { label: "Email", value: "khan8019@mylaurier.ca"},
  { label: "GitHub", value: "github.com/Basit-K-A", href: siteConfig.github },
  { label: "LinkedIn", value: "linkedin.com", href: siteConfig.linkedin },
  { label: "Instagram", value: "instagram.com", href: siteConfig.instagram },
];

export function ContactPanel() {
  return (
    <div className="space-y-4">
      <header>
        <p className="font-mono text-xs tracking-widest text-[var(--color-accent-pink)] uppercase">
          ~/contact
        </p>
        <h2 className="mt-1 text-lg font-semibold text-white">Open a channel</h2>
      </header>
      <p className="text-sm text-gray-400">
        Reach out on Email, GitHub or LinkedIn I am happy to connect.
      </p>
      <ul className="space-y-2 font-mono text-sm">
        {links.map((link) => (
          <li key={link.label} className="flex items-center gap-3 rounded border border-white/10 bg-white/[0.03] px-3 py-2">
            <span className="w-20 text-[var(--color-accent-pink)]">{link.label}</span>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-[var(--color-accent)] os-link"
            >
              {link.value}
            </a>
          </li>
        ))}
      </ul>
      <p className="font-mono text-[10px] text-gray-600">
        $ echo &quot;Let&apos;s build something minimal.&quot;
      </p>
    </div>
  );
}
