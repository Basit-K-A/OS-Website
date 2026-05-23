"use client";

import { experience } from "@/data/portfolio";

export function ExperiencePanel() {
  return (
    <div className="space-y-3">
      <header>
        <p className="font-mono text-xs tracking-widest text-[var(--color-accent-pink)] uppercase">
          ~/experience
        </p>
        <h2 className="mt-1 text-lg font-semibold text-white">Work history</h2>
      </header>
      <ol className="relative space-y-4 border-l border-white/10 pl-4">
        {experience.map((job, index) => (
          <li key={job.id} className="relative">
            <span
              className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border border-[var(--color-accent)] bg-[var(--color-terminal)]"
              aria-hidden
            />
            {index === 0 && (
              <span className="absolute -left-[21px] top-4 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent)]/40 to-transparent" />
            )}
            <p className="font-mono text-[10px] text-[var(--color-accent)]">{job.period}</p>
            <h3 className="text-sm font-semibold text-white">{job.role}</h3>
            <p className="text-xs text-[var(--color-accent-pink)]">{job.company}</p>
            <p className="mt-1 text-xs leading-relaxed text-gray-400">{job.summary}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
