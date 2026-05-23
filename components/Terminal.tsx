"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { terminalResponses } from "@/data/portfolio";
import { siteConfig } from "@/data/portfolio";
import { useTypewriter } from "@/hooks/useTypewriter";
import { MENU_ITEMS, type MenuViewId } from "@/lib/types";
import type { AppWindowId } from "@/lib/windowTypes";

const PROMPT = `[${siteConfig.user}@${siteConfig.hostname}]:~$`;

const ARCH_ASCII = `
.          .
     ; 
     ;;
     ;';.
     ;  ;;
     ;   ;;
     ;    ;;
     ;    ;;
     ;   ;'
     ;  ' 
,;;;,; 
;;;;;;
;;;;
.          .
`.trim();

type TerminalProps = {
  maximized: boolean;
  focusedApp: AppWindowId | null;
  onOpenApp: (view: AppWindowId) => void;
};

function resolveOpenTarget(input: string): AppWindowId | null {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return null;

  const openMatch = trimmed.match(/^open\s+(.+)$/);
  const target = openMatch ? openMatch[1] : trimmed;

  const byNumber = MENU_ITEMS.find((item) => String(item.number) === target);
  if (byNumber) return byNumber.id;

  const byName = MENU_ITEMS.find(
    (item) => item.label === target || item.id === target,
  );
  return byName?.id ?? null;
}

export function Terminal({ maximized, focusedApp, onOpenApp }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [typingLines, setTypingLines] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [cursorOffset, setCursorOffset] = useState(0);
  const { displayLines, isTyping } = useTypewriter(typingLines);

  const textSize = maximized ? "text-[15px]" : "text-[13px]";
  const metaSize = maximized ? "text-sm" : "text-[11px] sm:text-xs";
  const asciiSize = maximized ? "text-xs" : "text-[10px]";

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      setHistory((prev) => [...prev, `${PROMPT} ${trimmed}`]);

      const view = resolveOpenTarget(trimmed);
      if (view) {
        setTypingLines(terminalResponses[view] ?? []);
        onOpenApp(view);
      } else if (trimmed === "help" || trimmed === "?") {
        setTypingLines([
          "Commands: open <app> | 1-5 | about, projects…",
          "Apps: about, projects, blog, experience, contact",
          "clear — reset output",
        ]);
      } else if (trimmed === "clear") {
        setHistory([]);
        setTypingLines([]);
      } else {
        setTypingLines([
          `bash: ${trimmed}: command not found`,
          "Try: open projects, help, 1, about…",
        ]);
      }

      setInput("");
    },
    [onOpenApp],
  );

  const handleMenuClick = (view: MenuViewId, label: string) => {
    runCommand(label);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (measureRef.current) {
      setCursorOffset(measureRef.current.offsetWidth);
    }
  }, [input, textSize]);

  useEffect(() => {
    const el = outputRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [history, displayLines]);

  return (
    <div
      className={`flex h-full min-h-0 w-full flex-col font-mono leading-relaxed text-gray-200 ${textSize}`}
      onClick={() => inputRef.current?.focus()}
      role="application"
      aria-label="Portfolio terminal"
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-4">
        <div className="flex shrink-0 gap-4 border-b border-white/5 pb-3">
          <pre
            className={`hidden leading-tight text-[var(--color-accent-pink)] sm:block ${asciiSize}`}
            aria-hidden
          >
            {ARCH_ASCII}
          </pre>
          <div className={metaSize}>
            <p>
              <span className="text-[var(--color-accent-pink)]">OS:</span> portfolioOS
            </p>
            <p>
              <span className="text-[var(--color-accent-pink)]">Host:</span>{" "}
              {siteConfig.hostname}
            </p>
            <p>
              <span className="text-[var(--color-accent-pink)]">Shell:</span> bash
            </p>
            <p>
              <span className="text-[var(--color-accent-pink)]">Theme:</span> i3-minimal
            </p>
            {focusedApp && (
              <p className="mt-1 text-[var(--color-accent)]">
                focused → {focusedApp}
              </p>
            )}
          </div>
        </div>

        <div className="mt-2 min-h-0 flex-1 overflow-hidden">
          <p className="shrink-0 text-[var(--color-accent)]">Welcome to portfolioOS.</p>
          <p className="mt-1 shrink-0 text-gray-500">
            Open apps from the menu, desktop icons, or{" "}
            <span className="text-gray-400">type commands below</span>
          </p>

          <nav className="mt-2 shrink-0 space-y-0.5" aria-label="Terminal menu">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleMenuClick(item.id, item.label)}
                className={`flex w-full items-center gap-2 rounded px-1 py-0.5 text-left transition hover:bg-white/5 hover:text-[var(--color-accent)] ${
                  focusedApp === item.id ? "text-[var(--color-accent)]" : ""
                }`}
              >
                <span className="text-[var(--color-accent-pink)]">{item.number}.</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div
            ref={outputRef}
            className="terminal-output panel-scroll mt-3 min-h-0 flex-1 overflow-y-auto text-gray-400"
          >
            <div className="space-y-0.5">
              {history.map((line, i) => (
                <p key={`h-${i}`} className="break-words text-gray-400">
                  {line}
                </p>
              ))}
              {displayLines.map((line, i) => (
                <p key={`t-${i}`} className="break-words text-gray-300">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        <form
          className="mt-2 flex shrink-0 items-center border-t border-white/10 pt-2 font-mono"
          onSubmit={(e) => {
            e.preventDefault();
            runCommand(input);
          }}
        >
          <label
            htmlFor="terminal-input"
            className="shrink-0 text-[var(--color-accent-pink)]"
          >
            {PROMPT}&nbsp;
          </label>
          <div className="relative min-w-0 flex-1">
            <span
              ref={measureRef}
              className="pointer-events-none invisible absolute left-0 top-0 whitespace-pre"
              aria-hidden
            >
              {input || "\u00a0"}
            </span>
            <span className="pointer-events-none whitespace-pre text-white">
              {input}
            </span>
            <span
              className={`pointer-events-none absolute top-1/2 inline-block h-4 w-2 -translate-y-1/2 bg-white ${
                isTyping ? "opacity-30" : "cursor-blink"
              }`}
              style={{ left: cursorOffset }}
              aria-hidden
            />
            <input
              id="terminal-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="absolute inset-0 w-full bg-transparent text-transparent caret-transparent outline-none selection:bg-[var(--color-accent)]/25"
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal command input"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
