import Link from "next/link";
import { SeoPageShell } from "@/components/seo/SeoPageShell";
import { experience, siteConfig } from "@/data/portfolio";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: `Experience | ${siteConfig.name}`,
  description: `Work experience for ${siteConfig.name}, including roles in IT, technical support, and university lab assistance while studying Computer Science at ${siteConfig.university.shortName}.`,
  path: "/experience",
  keywords: [
    "Basit Khan Experience",
    "Basit Khan Software Engineer",
    "Wilfrid Laurier University",
    "IT Technician",
  ],
});

export default function ExperiencePage() {
  return (
    <SeoPageShell>
      <article>
        <header className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-pink)]">
            Experience
          </p>
          <h1 className="text-3xl font-semibold text-white">
            {siteConfig.name}&apos;s Experience
          </h1>
          <p className="text-base text-gray-300">
            Professional experience across healthcare IT, retail technical
            support, and university maker spaces.
          </p>
        </header>

        <section className="mt-8">
          <ol className="space-y-6 border-l border-white/10 pl-5">
            {experience.map((job) => (
              <li key={job.id} className="relative">
                <h2 className="text-lg font-semibold text-white">{job.role}</h2>
                <p className="text-sm text-[var(--color-accent-pink)]">
                  {job.company}
                </p>
                <p className="mt-1 font-mono text-xs text-[var(--color-accent)]">
                  {job.period}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">
                  {job.summary}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">Related pages</h2>
          <ul className="mt-4 space-y-2 text-[var(--color-accent)]">
            <li>
              <Link href="/about">About {siteConfig.name}</Link>
            </li>
            <li>
              <Link href="/projects">View projects</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </section>
      </article>
    </SeoPageShell>
  );
}
