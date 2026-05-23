"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { WindowManager } from "@/hooks/useWindowManager";

const WindowManagerContext = createContext<WindowManager | null>(null);

type ProviderProps = {
  value: WindowManager;
  children: ReactNode;
};

export function WindowManagerProvider({ value, children }: ProviderProps) {
  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManagerContext(): WindowManager {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) {
    throw new Error(
      "useWindowManagerContext must be used inside <WindowManagerProvider>",
    );
  }
  return ctx;
}
