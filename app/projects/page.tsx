import Link from "next/link";
import { SeoPageShell } from "@/components/seo/SeoPageShell";
import { projects, siteConfig } from "@/data/portfolio";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: `Projects | ${siteConfig.name} Portfolio`,
  description: `Software projects by ${siteConfig.name}, including backend systems, infrastructure tooling, and computer science coursework at ${siteConfig.university.shortName}.`,
  path: "/projects",
  keywords: [
    "Basit Khan Projects",
    "Basit Khan Portfolio",
    "Software Engineering Projects",
    "Backend Development",
  ],
});

export default function ProjectsPage() {
  return (
    <SeoPageShell>
      <article>
        <header className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-pink)]">
            Projects
          </p>
          <h1 className="text-3xl font-semibold text-white">
            {siteConfig.name}&apos;s Projects
          </h1>
          <p className="text-base text-gray-300">
            Selected repositories and software projects focused on backend
            engineering, infrastructure, and practical systems.
          </p>
        </header>

        <section className="mt-8">
          <ul className="space-y-4">
            {projects.map((project) => (
              <li
                key={project.id}
                className="rounded border border-white/10 bg-white/[0.03] p-5"
              >
                <h2 className="text-xl font-semibold text-[var(--color-accent)]">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.name}
                  </a>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">
                  {project.description}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded bg-black/30 px-2 py-1 font-mono text-xs text-gray-400"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">Related pages</h2>
          <ul className="mt-4 space-y-2 text-[var(--color-accent)]">
            <li>
              <Link href="/about">About {siteConfig.name}</Link>
            </li>
            <li>
              <Link href="/blog">Read the blog</Link>
            </li>
            <li>
              <Link href="/contact">Get in touch</Link>
            </li>
          </ul>
        </section>
      </article>
    </SeoPageShell>
  );
}
