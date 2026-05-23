import { SNAP_THRESHOLD, WINDOW_MARGIN, type ViewportSize, type WindowSize } from "@/lib/windowTypes";

export function clampPosition(
  x: number,
  y: number,
  size: WindowSize,
  viewport: ViewportSize,
): { x: number; y: number } {
  const maxX = Math.max(WINDOW_MARGIN, viewport.width - size.width - WINDOW_MARGIN);
  const maxY = Math.max(WINDOW_MARGIN, viewport.height - size.height - WINDOW_MARGIN);
  return {
    x: Math.round(Math.min(maxX, Math.max(WINDOW_MARGIN, x))),
    y: Math.round(Math.min(maxY, Math.max(WINDOW_MARGIN, y))),
  };
}

export function snapToEdges(
  x: number,
  y: number,
  size: WindowSize,
  viewport: ViewportSize,
): { x: number; y: number } {
  const maxX = viewport.width - size.width - WINDOW_MARGIN;
  const maxY = viewport.height - size.height - WINDOW_MARGIN;

  let nx = x;
  let ny = y;

  if (nx - WINDOW_MARGIN < SNAP_THRESHOLD) nx = WINDOW_MARGIN;
  if (maxX - nx < SNAP_THRESHOLD) nx = maxX;
  if (ny - WINDOW_MARGIN < SNAP_THRESHOLD) ny = WINDOW_MARGIN;
  if (maxY - ny < SNAP_THRESHOLD) ny = maxY;

  return clampPosition(nx, ny, size, viewport);
}

export function getMaximizedBounds(viewport: ViewportSize): {
  position: { x: number; y: number };
  size: WindowSize;
} {
  return {
    position: { x: WINDOW_MARGIN, y: WINDOW_MARGIN },
    size: {
      width: viewport.width - WINDOW_MARGIN * 2,
      height: viewport.height - WINDOW_MARGIN * 2,
    },
  };
}

export function getDragConstraints(
  position: { x: number; y: number },
  size: WindowSize,
  viewport: ViewportSize,
) {
  return {
    left: WINDOW_MARGIN - position.x,
    top: WINDOW_MARGIN - position.y,
    right: viewport.width - size.width - WINDOW_MARGIN - position.x,
    bottom: viewport.height - size.height - WINDOW_MARGIN - position.y,
  };
}
