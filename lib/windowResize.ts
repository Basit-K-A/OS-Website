import {
  WINDOW_MARGIN,
  type ViewportSize,
  type WindowPosition,
  type WindowSize,
} from "@/lib/windowTypes";

export const MIN_WINDOW_SIZE: WindowSize = {
  width: 280,
  height: 200,
};

export type ResizeDirection =
  | "n"
  | "s"
  | "e"
  | "w"
  | "ne"
  | "nw"
  | "se"
  | "sw";

export type WindowBounds = WindowPosition & WindowSize;

export function computeResizedBounds(
  origin: WindowBounds,
  delta: { dx: number; dy: number },
  direction: ResizeDirection,
  viewport: ViewportSize,
  minSize: WindowSize = MIN_WINDOW_SIZE,
): WindowBounds {
  let { x, y, width, height } = origin;
  const { dx, dy } = delta;

  const maxWidth = viewport.width - WINDOW_MARGIN * 2;
  const maxHeight = viewport.height - WINDOW_MARGIN * 2;

  const affectsWidth = direction.includes("e") || direction.includes("w");
  const affectsHeight = direction.includes("n") || direction.includes("s");

  if (affectsWidth) {
    if (direction.includes("e")) {
      width = origin.width + dx;
    } else {
      x = origin.x + dx;
      width = origin.width - dx;
    }
  }

  if (affectsHeight) {
    if (direction.includes("s")) {
      height = origin.height + dy;
    } else {
      y = origin.y + dy;
      height = origin.height - dy;
    }
  }

  if (width < minSize.width) {
    if (direction.includes("w")) {
      x = origin.x + origin.width - minSize.width;
    }
    width = minSize.width;
  }

  if (height < minSize.height) {
    if (direction.includes("n")) {
      y = origin.y + origin.height - minSize.height;
    }
    height = minSize.height;
  }

  width = Math.min(width, maxWidth);
  height = Math.min(height, maxHeight);

  if (direction.includes("w")) {
    x = Math.max(WINDOW_MARGIN, origin.x + origin.width - width);
  }

  if (direction.includes("n")) {
    y = Math.max(WINDOW_MARGIN, origin.y + origin.height - height);
  }

  const maxX = viewport.width - width - WINDOW_MARGIN;
  const maxY = viewport.height - height - WINDOW_MARGIN;

  x = Math.round(Math.min(maxX, Math.max(WINDOW_MARGIN, x)));
  y = Math.round(Math.min(maxY, Math.max(WINDOW_MARGIN, y)));
  width = Math.round(width);
  height = Math.round(height);

  return { x, y, width, height };
}

export const RESIZE_HANDLES: {
  dir: ResizeDirection;
  className: string;
  cursor: string;
  label: string;
}[] = [
  {
    dir: "n",
    className: "left-2 right-2 top-0 h-2",
    cursor: "cursor-ns-resize",
    label: "Resize top edge",
  },
  {
    dir: "s",
    className: "bottom-0 left-2 right-2 h-2",
    cursor: "cursor-ns-resize",
    label: "Resize bottom edge",
  },
  {
    dir: "e",
    className: "bottom-2 right-0 top-2 w-2",
    cursor: "cursor-ew-resize",
    label: "Resize right edge",
  },
  {
    dir: "w",
    className: "bottom-2 left-0 top-2 w-2",
    cursor: "cursor-ew-resize",
    label: "Resize left edge",
  },
  {
    dir: "nw",
    className: "left-0 top-0 h-3 w-3",
    cursor: "cursor-nwse-resize",
    label: "Resize top-left corner",
  },
  {
    dir: "ne",
    className: "right-0 top-0 h-3 w-3",
    cursor: "cursor-nesw-resize",
    label: "Resize top-right corner",
  },
  {
    dir: "sw",
    className: "bottom-0 left-0 h-3 w-3",
    cursor: "cursor-nesw-resize",
    label: "Resize bottom-left corner",
  },
  {
    dir: "se",
    className: "bottom-0 right-0 h-3 w-3",
    cursor: "cursor-nwse-resize",
    label: "Resize bottom-right corner",
  },
];
