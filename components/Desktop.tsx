"use client";

import { AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { DesktopIcons } from "@/components/DesktopIcons";
import { MusicPlayer } from "@/components/MusicPlayer";
import { SystemStatus } from "@/components/SystemStatus";
import { Taskbar } from "@/components/Taskbar";
import { DesktopWindow } from "@/components/window/DesktopWindow";
import { WindowContent } from "@/components/window/WindowContent";
import { WindowManagerProvider } from "@/components/window/WindowManagerContext";
import { WINDOW_DEFINITIONS } from "@/config/windowDefaults";
import { useDesktopBounds } from "@/hooks/useDesktopBounds";
import { useWindowManager } from "@/hooks/useWindowManager";
import { TASKBAR_HEIGHT } from "@/lib/windowTypes";
import type { AppWindowId } from "@/lib/windowTypes";

export function Desktop() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const bounds = useDesktopBounds(desktopRef);
  const wm = useWindowManager(bounds);

  const focusedApp: AppWindowId | null =
    wm.focusedId && wm.focusedId !== "terminal" ? wm.focusedId : null;

  return (
    <WindowManagerProvider value={wm}>
      <div className="relative h-dvh w-full overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: "url(/khwallpaper.png)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/10 to-black/15" />
        </div>

        <SystemStatus />

        <MusicPlayer />

        <DesktopIcons onOpen={wm.openWindow} />

        <div
          ref={desktopRef}
          className="pointer-events-none absolute left-0 right-0 top-0 z-10 overflow-hidden"
          style={{ height: `calc(100dvh - ${TASKBAR_HEIGHT}px)` }}
          aria-label="Desktop workspace"
        >
          <AnimatePresence>
            {WINDOW_DEFINITIONS.map((def) => {
              const state = wm.windows[def.id];
              if (!state?.open) return null;

              return (
                <DesktopWindow
                  key={def.id}
                  windowState={state}
                  focused={wm.focusedId === def.id}
                  viewport={bounds}
                  desktopRef={desktopRef}
                  onFocus={wm.focusWindow}
                  onClose={wm.closeWindow}
                  onMinimize={wm.minimizeWindow}
                  onMaximize={wm.toggleMaximize}
                  onPositionChange={wm.setPosition}
                  onBoundsChange={wm.setBounds}
                >
                  <WindowContent
                    id={def.id}
                    maximized={state.maximized}
                    focusedApp={focusedApp}
                    onOpenApp={wm.openApp}
                  />
                </DesktopWindow>
              );
            })}
          </AnimatePresence>
        </div>

        <Taskbar />
      </div>
    </WindowManagerProvider>
  );
}
