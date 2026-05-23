"use client";

import type { ReactNode } from "react";
import { WINDOW_DEFINITIONS, type WindowDefinition } from "@/config/windowDefaults";
import { siteConfig } from "@/data/portfolio";
import { useClock } from "@/hooks/useClock";
import { useWindowManagerContext } from "@/components/window/WindowManagerContext";

type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
};

function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A8.203 8.203 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const socialLinks: SocialLink[] = [
  { id: "github", label: "GitHub", href: siteConfig.github, icon: <IconGitHub /> },
  { id: "linkedin", label: "LinkedIn", href: siteConfig.linkedin, icon: <IconLinkedIn /> },
  { id: "instagram", label: "Instagram", href: siteConfig.instagram, icon: <IconInstagram /> },
];

type AppEntryProps = {
  def: WindowDefinition;
  state: "closed" | "open" | "minimized" | "focused";
  onClick: () => void;
};

function AppEntry({ def, state, onClick }: AppEntryProps) {
  const base =
    "group relative flex h-7 shrink-0 items-center gap-1.5 rounded px-2 transition";

  const stateClass =
    state === "focused"
      ? "bg-[var(--color-accent)]/20 text-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/40"
      : state === "open"
        ? "text-gray-200 hover:bg-white/10 hover:text-white"
        : state === "minimized"
          ? "text-gray-500 hover:bg-white/5 hover:text-gray-300"
          : "text-gray-400 opacity-70 hover:bg-white/10 hover:text-white hover:opacity-100";

  const indicator =
    state === "focused"
      ? "bg-[var(--color-accent)]"
      : state === "open"
        ? "bg-gray-300"
        : state === "minimized"
          ? "bg-gray-600"
          : "bg-transparent";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={state === "focused"}
      title={def.title}
      className={`${base} ${stateClass}`}
    >
      <span aria-hidden className="font-mono text-[12px] leading-none">
        {def.icon}
      </span>
      <span className="hidden font-mono text-[11px] sm:inline">{def.id}</span>
      <span
        aria-hidden
        className={`absolute -bottom-[3px] left-2 right-2 h-[2px] rounded ${indicator}`}
      />
    </button>
  );
}

export function Taskbar() {
  const { time, date } = useClock();
  const { windows, focusedId, toggleWindow } = useWindowManagerContext();

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-[1000] flex h-9 items-center gap-2 border-t border-white/10 bg-[var(--color-taskbar)] px-2 font-mono text-[11px] text-gray-300"
      role="contentinfo"
    >
      <div className="flex min-w-0 shrink-0 items-center gap-2">
        <span className="truncate font-semibold text-white">{siteConfig.osName}</span>
        <span
          className="hidden text-gray-500 lg:inline"
          suppressHydrationWarning
        >
          {date}
        </span>
        <span
          className="hidden text-[var(--color-accent-pink)] sm:inline"
          suppressHydrationWarning
        >
          {time}
        </span>
      </div>

      <nav
        className="flex min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto px-1"
        aria-label="Applications"
      >
        {WINDOW_DEFINITIONS.map((def) => {
          const win = windows[def.id];
          const state: AppEntryProps["state"] = !win?.open
            ? "closed"
            : win.minimized
              ? "minimized"
              : focusedId === def.id
                ? "focused"
                : "open";
          return (
            <AppEntry
              key={def.id}
              def={def}
              state={state}
              onClick={() => toggleWindow(def.id)}
            />
          );
        })}
      </nav>

      <div className="hidden shrink-0 text-[var(--color-accent-pink)] md:block">
        [ ~ ]
      </div>

      <nav className="flex shrink-0 items-center gap-1" aria-label="Social links">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-7 w-7 items-center justify-center rounded text-gray-400 transition hover:bg-white/10 hover:text-[var(--color-accent)]"
            aria-label={link.label}
          >
            {link.icon}
            <span className="pointer-events-none absolute -top-8 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded bg-black/90 px-2 py-0.5 text-[10px] text-white opacity-0 shadow transition group-hover:opacity-100">
              {link.label}
            </span>
          </a>
        ))}
      </nav>
    </footer>
  );
}
