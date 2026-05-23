"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  WINDOW_DEFINITIONS,
  getDefaultPosition,
} from "@/config/windowDefaults";
import { clampPosition, getMaximizedBounds } from "@/lib/windowBounds";
import type { AppWindowId } from "@/lib/windowTypes";
import type { ViewportSize, WindowId, WindowState } from "@/lib/windowTypes";

function fitSize(size: WindowState["size"], viewport: ViewportSize) {
  const maxW = Math.max(280, viewport.width - 24);
  const maxH = Math.max(240, viewport.height - 24);
  return {
    width: Math.min(size.width, maxW),
    height: Math.min(size.height, maxH),
  };
}

function buildInitialWindows(viewport: ViewportSize): Record<WindowId, WindowState> {
  let z = 10;
  const record = {} as Record<WindowId, WindowState>;

  for (const def of WINDOW_DEFINITIONS) {
    const size = fitSize(def.defaultSize, viewport);
    const position = getDefaultPosition(def.anchor, size, viewport);
    record[def.id] = {
      id: def.id,
      title: def.title,
      open: def.id === "terminal",
      minimized: false,
      maximized: false,
      position,
      size,
      zIndex: z,
    };
    z += 1;
  }

  return record;
}

export function useWindowManager(viewport: ViewportSize) {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(() =>
    buildInitialWindows(
      viewport.width > 0 ? viewport : { width: 1280, height: 720 },
    ),
  );
  const [focusedId, setFocusedId] = useState<WindowId | null>("terminal");
  const topZ = useRef(20);
  const initialized = useRef(false);

  useEffect(() => {
    if (viewport.width <= 0 || viewport.height <= 0 || initialized.current) return;
    initialized.current = true;
    setWindows(buildInitialWindows(viewport));
  }, [viewport.width, viewport.height]);

  const bringToFront = useCallback((id: WindowId) => {
    topZ.current += 1;
    const z = topZ.current;
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: z },
    }));
    setFocusedId(id);
  }, []);

  const openWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          open: true,
          minimized: false,
        },
      }));
      bringToFront(id);
    },
    [bringToFront],
  );

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        open: false,
        minimized: false,
        maximized: false,
      },
    }));
    setFocusedId((current) => (current === id ? null : current));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], minimized: true },
    }));
    setFocusedId((current) => (current === id ? null : current));
  }, []);

  const restoreWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], open: true, minimized: false },
      }));
      bringToFront(id);
    },
    [bringToFront],
  );

  const focusWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => {
        const win = prev[id];
        if (!win?.open || win.minimized) return prev;
        topZ.current += 1;
        return { ...prev, [id]: { ...win, zIndex: topZ.current } };
      });
      setFocusedId(id);
    },
    [],
  );

  const toggleWindow = useCallback(
    (id: WindowId) => {
      const win = windows[id];
      if (!win) return;

      if (!win.open) {
        openWindow(id);
        return;
      }

      if (win.minimized) {
        restoreWindow(id);
        return;
      }

      if (focusedId === id) {
        minimizeWindow(id);
        return;
      }

      focusWindow(id);
    },
    [windows, focusedId, openWindow, restoreWindow, minimizeWindow, focusWindow],
  );

  const setPosition = useCallback(
    (id: WindowId, x: number, y: number) => {
      setWindows((prev) => {
        const win = prev[id];
        const next = clampPosition(x, y, win.size, viewport);
        return {
          ...prev,
          [id]: { ...win, position: next, maximized: false },
        };
      });
    },
    [viewport],
  );

  const setBounds = useCallback(
    (id: WindowId, bounds: { x: number; y: number; width: number; height: number }) => {
      setWindows((prev) => {
        const win = prev[id];
        return {
          ...prev,
          [id]: {
            ...win,
            position: { x: bounds.x, y: bounds.y },
            size: { width: bounds.width, height: bounds.height },
            maximized: false,
            restoreBounds: undefined,
          },
        };
      });
    },
    [],
  );

  const toggleMaximize = useCallback(
    (id: WindowId) => {
      setWindows((prev) => {
        const win = prev[id];
        if (win.maximized) {
          const restore = win.restoreBounds ?? {
            position: win.position,
            size: win.size,
          };
          return {
            ...prev,
            [id]: {
              ...win,
              maximized: false,
              position: restore.position,
              size: restore.size,
              restoreBounds: undefined,
            },
          };
        }

        const maximized = getMaximizedBounds(viewport);
        return {
          ...prev,
          [id]: {
            ...win,
            maximized: true,
            restoreBounds: {
              position: win.position,
              size: win.size,
            },
            position: maximized.position,
            size: maximized.size,
          },
        };
      });
      bringToFront(id);
    },
    [viewport, bringToFront],
  );

  const openApp = useCallback(
    (id: AppWindowId) => {
      openWindow(id);
    },
    [openWindow],
  );

  const windowList = useMemo(() => WINDOW_DEFINITIONS.map((d) => d.id), []);

  return {
    windows,
    focusedId,
    windowList,
    openWindow,
    closeWindow,
    minimizeWindow,
    restoreWindow,
    focusWindow,
    toggleWindow,
    setPosition,
    setBounds,
    toggleMaximize,
    openApp,
  };
}

export type WindowManager = ReturnType<typeof useWindowManager>;
