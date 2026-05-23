"use client";

import { type RefObject, useEffect, useState } from "react";
import type { ViewportSize } from "@/lib/windowTypes";

export function useDesktopBounds(ref: RefObject<HTMLElement | null>) {
  const [bounds, setBounds] = useState<ViewportSize>({ width: 0, height: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => {
      const rect = node.getBoundingClientRect();
      setBounds({ width: rect.width, height: rect.height });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return bounds;
}
