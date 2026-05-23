"use client";

import { projects } from "@/data/portfolio";

export function ProjectsPanel() {
  return (
    <div className="space-y-3">
      <header>
        <p className="font-mono text-xs tracking-widest text-[var(--color-accent-pink)] uppercase">
          ~/projects
        </p>
        <h2 className="mt-1 text-lg font-semibold text-white">Repositories</h2>
      </header>
      <ul className="space-y-1.5">
        {projects.map((project) => (
          <li key={project.id}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded border border-white/10 bg-white/[0.03] p-2 os-link"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm text-[var(--color-accent)]">
                  {project.name}
                </span>
                <span className="font-mono text-[10px] text-gray-500">git →</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-gray-400">
                {project.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-[10px] text-gray-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
