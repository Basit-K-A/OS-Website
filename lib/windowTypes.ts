import type { MenuViewId } from "@/lib/types";

export type AppWindowId = MenuViewId;
export type WindowId = "terminal" | AppWindowId;

export type WindowSize = {
  width: number;
  height: number;
};

export type WindowPosition = {
  x: number;
  y: number;
};

export type WindowState = {
  id: WindowId;
  title: string;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  position: WindowPosition;
  size: WindowSize;
  zIndex: number;
  restoreBounds?: {
    position: WindowPosition;
    size: WindowSize;
  };
};

export type ViewportSize = {
  width: number;
  height: number;
};

export const TASKBAR_HEIGHT = 36;
export const WINDOW_MARGIN = 8;
export const SNAP_THRESHOLD = 20;
