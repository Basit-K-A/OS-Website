"use client";

import { useCallback, useEffect, useRef } from "react";

let activeLocks = 0;

function block(event: Event) {
  event.preventDefault();
}

function attachGlobalLock() {
  if (activeLocks === 0) {
    document.body.classList.add("window-dragging");
    document.addEventListener("selectstart", block);
    document.addEventListener("dragstart", block);
  }
  activeLocks += 1;
}

function detachGlobalLock() {
  activeLocks = Math.max(0, activeLocks - 1);
  if (activeLocks === 0) {
    document.body.classList.remove("window-dragging");
    document.removeEventListener("selectstart", block);
    document.removeEventListener("dragstart", block);
  }
}

/**
 * Adds a body-level `window-dragging` class while any window is being dragged.
 * CSS uses it to disable text selection and force grabbing cursor.
 */
export function useWindowDragLock() {
  const heldRef = useRef(false);

  const acquire = useCallback(() => {
    if (heldRef.current) return;
    heldRef.current = true;
    attachGlobalLock();
  }, []);

  const release = useCallback(() => {
    if (!heldRef.current) return;
    heldRef.current = false;
    detachGlobalLock();
  }, []);

  useEffect(
    () => () => {
      if (heldRef.current) detachGlobalLock();
      heldRef.current = false;
    },
    [],
  );

  return { acquire, release };
}
