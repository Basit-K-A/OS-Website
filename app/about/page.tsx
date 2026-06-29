import Link from "next/link";
import { SeoPageShell } from "@/components/seo/SeoPageShell";
import { about, siteConfig } from "@/data/portfolio";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: `About ${siteConfig.name} | ${siteConfig.jobTitle} at ${siteConfig.university.shortName}`,
  description: `${siteConfig.name} is a ${siteConfig.jobTitle.toLowerCase()} at ${siteConfig.university.name} interested in software engineering, backend development, and cloud infrastructure.`,
  path: "/about",
  keywords: [
    "Basit Khan",
    "Basit Khan WLU",
    "Basit Khan Computer Science",
    "About Basit Khan",
    "Wilfrid Laurier University",
  ],
});

export default function AboutPage() {
  return (
    <SeoPageShell>
      <article>
        <header className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-pink)]">
            About
          </p>
          <h1 className="text-3xl font-semibold text-white">{siteConfig.name}</h1>
          <p className="text-lg text-[var(--color-accent)]">
            {siteConfig.jobTitle} · {siteConfig.university.name}
          </p>
        </header>

        <section className="mt-8 space-y-4 text-base leading-relaxed text-gray-300">
          <p>{about.bio}</p>
          <p>{siteConfig.tagline}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">Tech stack</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {about.stack.map((item) => (
              <li
                key={item}
                className="rounded border border-white/10 bg-white/5 px-3 py-1 font-mono text-sm text-gray-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">Explore more</h2>
          <ul className="mt-4 space-y-2 text-[var(--color-accent)]">
            <li>
              <Link href="/projects">View projects by {siteConfig.name}</Link>
            </li>
            <li>
              <Link href="/experience">Read work experience</Link>
            </li>
            <li>
              <Link href="/blog">Read blog posts</Link>
            </li>
            <li>
              <Link href="/contact">Contact {siteConfig.name}</Link>
            </li>
          </ul>
        </section>
      </article>
    </SeoPageShell>
  );
}
