"use client";

import {
  motion,
  useDragControls,
  useMotionValue,
  type PanInfo,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { WindowResizeHandles } from "@/components/window/WindowResizeHandles";
import { useWindowDragLock } from "@/hooks/useWindowDragLock";
import { snapToEdges } from "@/lib/windowBounds";
import type { WindowBounds } from "@/lib/windowResize";
import type {
  ViewportSize,
  WindowId,
  WindowState,
} from "@/lib/windowTypes";

type DesktopWindowProps = {
  windowState: WindowState;
  focused: boolean;
  viewport: ViewportSize;
  desktopRef: RefObject<HTMLDivElement | null>;
  onFocus: (id: WindowId) => void;
  onClose: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMaximize: (id: WindowId) => void;
  onPositionChange: (id: WindowId, x: number, y: number) => void;
  onBoundsChange: (id: WindowId, bounds: WindowBounds) => void;
  children: ReactNode;
};

function WindowButton({
  label,
  className,
  onClick,
}: {
  label: string;
  className: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm text-[10px] font-bold leading-none transition hover:brightness-125 ${className}`}
    />
  );
}

export function DesktopWindow({
  windowState,
  focused,
  viewport,
  desktopRef,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onPositionChange,
  onBoundsChange,
  children,
}: DesktopWindowProps) {
  const { id, title, position, size, zIndex, maximized, minimized } = windowState;
  const dragControls = useDragControls();
  const { acquire, release } = useWindowDragLock();

  const x = useMotionValue(position.x);
  const y = useMotionValue(position.y);
  const width = useMotionValue(size.width);
  const height = useMotionValue(size.height);
  const isDragging = useRef(false);
  const isResizing = useRef(false);

  useEffect(() => {
    if (isDragging.current || isResizing.current) return;
    x.set(position.x);
    y.set(position.y);
    width.set(size.width);
    height.set(size.height);
  }, [position.x, position.y, size.width, size.height, x, y, width, height]);

  const applyPreviewBounds = useCallback(
    (bounds: WindowBounds) => {
      x.set(bounds.x);
      y.set(bounds.y);
      width.set(bounds.width);
      height.set(bounds.height);
    },
    [x, y, width, height],
  );

  const getBounds = useCallback(
    (): WindowBounds => ({
      x: x.get(),
      y: y.get(),
      width: width.get(),
      height: height.get(),
    }),
    [x, y, width, height],
  );

  const handleDragStart = useCallback(() => {
    isDragging.current = true;
    acquire();
  }, [acquire]);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, _info: PanInfo) => {
      isDragging.current = false;
      release();

      const currentSize = { width: width.get(), height: height.get() };
      const snapped = snapToEdges(x.get(), y.get(), currentSize, viewport);
      x.set(snapped.x);
      y.set(snapped.y);
      onPositionChange(id, snapped.x, snapped.y);
    },
    [id, viewport, x, y, width, height, onPositionChange, release],
  );

  const startTitlebarDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (maximized) return;
      event.preventDefault();
      dragControls.start(event);
    },
    [dragControls, maximized],
  );

  const handleResizeStart = useCallback(() => {
    isResizing.current = true;
    acquire();
    onFocus(id);
  }, [acquire, id, onFocus]);

  const handleResizeEnd = useCallback(() => {
    isResizing.current = false;
    release();
  }, [release]);

  const handleResizeCommit = useCallback(
    (bounds: WindowBounds) => {
      applyPreviewBounds(bounds);
      onBoundsChange(id, bounds);
    },
    [applyPreviewBounds, id, onBoundsChange],
  );

  if (minimized || viewport.width <= 0) return null;

  return (
    <motion.div
      role="dialog"
      aria-label={title}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 480, damping: 36, mass: 0.7 }}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width,
        height,
        x,
        y,
        zIndex,
        touchAction: "none",
      }}
      drag={!maximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={desktopRef}
      onPointerDownCapture={() => onFocus(id)}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`desktop-window pointer-events-auto flex flex-col overflow-hidden rounded-lg ${
        focused ? "desktop-window--focused" : ""
      } ${maximized ? "desktop-window--maximized" : ""}`}
    >
      <header className="flex h-8 shrink-0 items-center gap-2 border-b border-white/10 bg-black/40 pl-2 pr-3">
        <div className="flex shrink-0 gap-1.5">
          <WindowButton
            label="Close"
            className="bg-[#ff5f57] text-black/70"
            onClick={() => onClose(id)}
          />
          <WindowButton
            label="Minimize"
            className="bg-[#febc2e] text-black/70"
            onClick={() => onMinimize(id)}
          />
          <WindowButton
            label={maximized ? "Restore" : "Maximize"}
            className="bg-[#28c840] text-black/70"
            onClick={() => onMaximize(id)}
          />
        </div>

        <div
          className={`min-w-0 flex-1 select-none ${
            maximized ? "cursor-default" : "cursor-grab active:cursor-grabbing"
          }`}
          onPointerDown={startTitlebarDrag}
          onDoubleClick={() => onMaximize(id)}
          role="presentation"
        >
          <span className="block truncate text-center font-mono text-[11px] text-gray-300">
            {title}
          </span>
        </div>

        <span className="w-12 shrink-0" aria-hidden />
      </header>

      <div
        className={`window-body min-h-0 flex-1 overflow-hidden bg-[var(--color-terminal)]/90 ${
          maximized ? "window-body--maximized" : ""
        }`}
      >
        {children}
      </div>

      <WindowResizeHandles
        disabled={maximized}
        viewport={viewport}
        getBounds={getBounds}
        onPreview={applyPreviewBounds}
        onCommit={handleResizeCommit}
        onResizeStart={handleResizeStart}
        onResizeEnd={handleResizeEnd}
      />
    </motion.div>
  );
}
