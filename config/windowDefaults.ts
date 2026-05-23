import { WINDOW_MARGIN, type ViewportSize, type WindowSize } from "@/lib/windowTypes";
import type { WindowId } from "@/lib/windowTypes";

export type WindowDefinition = {
  id: WindowId;
  title: string;
  icon: string;
  defaultSize: WindowSize;
  anchor: { x: number; y: number };
};

export const WINDOW_DEFINITIONS: WindowDefinition[] = [
  {
    id: "terminal",
    title: "terminal — bash",
    icon: ">_",
    defaultSize: { width: 540, height: 600 },
    anchor: { x: 0.06, y: 0.08 },
  },
  {
    id: "about",
    title: "about — ~/profile",
    icon: "◎",
    defaultSize: { width: 380, height: 360 },
    anchor: { x: 0.52, y: 0.1 },
  },
  {
    id: "projects",
    title: "projects — ~/repos",
    icon: "⌂",
    defaultSize: { width: 400, height: 400 },
    anchor: { x: 0.12, y: 0.38 },
  },
  {
    id: "blog",
    title: "blog — ~/posts",
    icon: "✎",
    defaultSize: { width: 360, height: 340 },
    anchor: { x: 0.55, y: 0.42 },
  },
  {
    id: "experience",
    title: "experience — journal",
    icon: "◷",
    defaultSize: { width: 380, height: 360 },
    anchor: { x: 0.35, y: 0.22 },
  },
  {
    id: "contact",
    title: "contact — channels",
    icon: "✉",
    defaultSize: { width: 360, height: 320 },
    anchor: { x: 0.62, y: 0.55 },
  },
];

export function getDefaultPosition(
  anchor: { x: number; y: number },
  size: WindowSize,
  viewport: ViewportSize,
): { x: number; y: number } {
  const maxX = Math.max(WINDOW_MARGIN, viewport.width - size.width - WINDOW_MARGIN);
  const maxY = Math.max(
    WINDOW_MARGIN,
    viewport.height - size.height - WINDOW_MARGIN,
  );
  return {
    x: Math.round(Math.min(maxX, Math.max(WINDOW_MARGIN, anchor.x * viewport.width))),
    y: Math.round(Math.min(maxY, Math.max(WINDOW_MARGIN, anchor.y * viewport.height))),
  };
}
