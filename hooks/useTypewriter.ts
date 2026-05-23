"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useTypewriter(lines: string[], speed = 18, linePause = 120) {
  const [displayLines, setDisplayLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const runId = useRef(0);

  const reset = useCallback(() => {
    runId.current += 1;
    setDisplayLines([]);
    setIsTyping(false);
  }, []);

  useEffect(() => {
    if (lines.length === 0) {
      reset();
      return;
    }

    const currentRun = ++runId.current;
    setDisplayLines([]);
    setIsTyping(true);

    let lineIndex = 0;
    let charIndex = 0;
    const built: string[] = [];

    const tick = () => {
      if (currentRun !== runId.current) return;

      const line = lines[lineIndex] ?? "";
      built[lineIndex] = line.slice(0, charIndex + 1);
      setDisplayLines([...built]);

      charIndex += 1;

      if (charIndex < line.length) {
        window.setTimeout(tick, speed);
        return;
      }

      charIndex = 0;
      lineIndex += 1;

      if (lineIndex < lines.length) {
        window.setTimeout(tick, linePause);
        return;
      }

      setIsTyping(false);
    };

    const start = window.setTimeout(tick, 40);
    return () => window.clearTimeout(start);
  }, [lines, speed, linePause, reset]);

  return { displayLines, isTyping, reset };
}
