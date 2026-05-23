"use client";

import { useCallback, useRef } from "react";
import {
  computeResizedBounds,
  RESIZE_HANDLES,
  type ResizeDirection,
  type WindowBounds,
} from "@/lib/windowResize";
import type { ViewportSize } from "@/lib/windowTypes";

type WindowResizeHandlesProps = {
  disabled?: boolean;
  viewport: ViewportSize;
  getBounds: () => WindowBounds;
  onPreview: (bounds: WindowBounds) => void;
  onCommit: (bounds: WindowBounds) => void;
  onResizeStart: () => void;
  onResizeEnd: () => void;
};

export function WindowResizeHandles({
  disabled = false,
  viewport,
  getBounds,
  onPreview,
  onCommit,
  onResizeStart,
  onResizeEnd,
}: WindowResizeHandlesProps) {
  const activeRef = useRef(false);

  const startResize = useCallback(
    (event: React.PointerEvent<HTMLDivElement>, direction: ResizeDirection) => {
      if (disabled || activeRef.current) return;

      event.preventDefault();
      event.stopPropagation();

      activeRef.current = true;
      onResizeStart();

      const origin = getBounds();
      const startX = event.clientX;
      const startY = event.clientY;
      const pointerId = event.pointerId;
      const target = event.currentTarget;

      try {
        target.setPointerCapture(pointerId);
      } catch {
        /* ignore */
      }

      const handleMove = (moveEvent: PointerEvent) => {
        onPreview(
          computeResizedBounds(
            origin,
            {
              dx: moveEvent.clientX - startX,
              dy: moveEvent.clientY - startY,
            },
            direction,
            viewport,
          ),
        );
      };

      const finish = (endEvent: PointerEvent) => {
        if (endEvent.pointerId !== pointerId) return;

        activeRef.current = false;
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", finish);
        window.removeEventListener("pointercancel", finish);

        try {
          target.releasePointerCapture(pointerId);
        } catch {
          /* ignore */
        }

        onCommit(
          computeResizedBounds(
            origin,
            {
              dx: endEvent.clientX - startX,
              dy: endEvent.clientY - startY,
            },
            direction,
            viewport,
          ),
        );
        onResizeEnd();
      };

      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", finish);
      window.addEventListener("pointercancel", finish);
    },
    [disabled, getBounds, onCommit, onPreview, onResizeEnd, onResizeStart, viewport],
  );

  if (disabled) return null;

  return (
    <>
      {RESIZE_HANDLES.map((handle) => (
        <div
          key={handle.dir}
          aria-label={handle.label}
          className={`window-resize-handle absolute z-20 touch-none ${handle.className} ${handle.cursor}`}
          data-resize={handle.dir}
          onPointerDown={(event) => startResize(event, handle.dir)}
        />
      ))}
    </>
  );
}
